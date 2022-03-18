// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./Interfaces/IBirdBath.sol";
import "./Interfaces/IDirt.sol";


contract BirdBath is IBirdBath, ERC1155, Ownable, Pausable {
    using Strings for uint256;
    string private baseURI;

    //This is the struct which we will use to handle what the returns for burning a token is 
    struct TypeInfo {
        uint16 mints;
        uint16 burns;
        uint16 maxSupply;
    }
    struct LastWrite {
        uint64 time;
        uint64 blockNum;
    }

    // Tracks the last block and timestamp that a caller has written to state.
    // Disallow some access to functions if they occur while a change is being written.
    mapping(address => LastWrite) private lastWrite;

    mapping(uint256 => TypeInfo) private typeInfo;

    // address => allowedToCallFunctions
    mapping(address => bool) private admins;

    mapping(uint256 => string) private _uris;

    // reference to the $GP contract for minting $GP earnings
    IDirt public dirtContract;

    constructor(string memory _baseURI) ERC1155(_baseURI) {
    //constructor() ERC1155() {
        baseURI =_baseURI;
        _pause();
    }

    modifier disallowIfStateIsChanging() {
        // frens can always call whenever they want :)
        require(admins[_msgSender()] || lastWrite[tx.origin].blockNum < block.number, "hmmmm what doing?");
        _;
    }

    /** CRITICAL TO SETUP */

    modifier requireContractsSet() {
        require(address(dirtContract) != address(0), "Contracts not set");
        _;
    }

    function setContracts(address _dirtContract) external onlyOwner {
        dirtContract = IDirt(_dirtContract);
    }

    /** 
    * Mint a token - any payment / game logic should be handled in the game contract. 
    */
    function mint(uint256 typeId, uint16 qty, address recipient) external override whenNotPaused {
        require(admins[_msgSender()], "Only admins can call this");
        require(typeInfo[typeId].mints - typeInfo[typeId].burns + qty <= typeInfo[typeId].maxSupply, "All tokens minted");

        typeInfo[typeId].mints += qty;
        _mint(recipient, typeId, qty, "");
    }

    /** 
    * Burn a token - any payment / game logic should be handled in the game contract. 
    */
    function burn(uint256 typeId, uint16 qty, address burnFrom) external override whenNotPaused {
        require(admins[_msgSender()], "Only admins can call this");
        typeInfo[typeId].burns += qty;
        _burn(burnFrom, typeId, qty);
    }
    
    function setType(uint256 typeId, uint16 maxSupply) external onlyOwner {
        require(typeInfo[typeId].mints <= maxSupply, "max supply too low");
        typeInfo[typeId].maxSupply = maxSupply;
    }

    function updateOriginAccess() external override {
        require(admins[_msgSender()], "Only admins can call this");
        lastWrite[tx.origin].blockNum = uint64(block.number);
        lastWrite[tx.origin].time = uint64(block.timestamp);
    }

    /**
    * enables an address to mint / burn
    * @param addr the address to enable
    */
    function addAdmin(address addr) external onlyOwner {
        admins[addr] = true;
    }

    /**
    * disables an address from minting / burning
    * @param addr the address to disbale
    */
    function removeAdmin(address addr) external onlyOwner {
        admins[addr] = false;
    }

    function setPaused(bool _paused) external onlyOwner requireContractsSet {
        if (_paused) _pause();
        else _unpause();
    }

    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function getInfoForType(uint256 typeId) external view disallowIfStateIsChanging returns(TypeInfo memory) {
        require(typeInfo[typeId].maxSupply > 0, "invalid type");
        return typeInfo[typeId];
    }

    function setTypeURI(uint256 typeId, string memory uri) external onlyOwner {
        _uris[typeId] = uri;
    }

    function uri(uint256 typeId) public view override returns (string memory)
    {
        require(typeInfo[typeId].maxSupply > 0, "invalid type");
        //return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, typeId.toString())) : baseURI;
        return typeId == 0 ? baseURI : _uris[typeId];
        //return(_uris[typeId]);
    }


    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override(ERC1155, IBirdBath) {
        // allow admin contracts to be send without approval
        if(!admins[_msgSender()]) {
            require(
                from == _msgSender() || isApprovedForAll(from, _msgSender()),
                "ERC1155: caller is not owner nor approved"
            );
        }
        _safeTransferFrom(from, to, id, amount, data);
    }

    /** SECURITEEEEEEE */
    
    function balanceOf(address account, uint256 id) public view virtual override(ERC1155, IBirdBath) disallowIfStateIsChanging returns (uint256) {
        // Y U checking on this address in the same block it's being modified... hmmmm
        require(admins[_msgSender()] || lastWrite[account].blockNum < block.number, "hmmmm what doing?");
        return super.balanceOf(account, id);
    }
}

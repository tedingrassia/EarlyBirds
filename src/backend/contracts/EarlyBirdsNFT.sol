// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Interfaces/IEarlyBirdsGame.sol";
import "./Interfaces/IDirt.sol";
import "./Interfaces/IEarlyBirdsNFT.sol";
import "./Interfaces/IBirdBath.sol";
import "./Interfaces/IRandomNumberConsumer.sol";
import "./Interfaces/IAncientTree.sol";

contract EarlyBirdsNFT is IEarlyBirdsNFT, ERC721Enumerable, Ownable, Pausable {

    event WormMinted(uint256 indexed tokenId);
    event BirdMinted(uint256 indexed tokenId);
    event WormStolen(uint256 indexed tokenId, address recipient);
    event BirdStolen(uint256 indexed tokenId, address recipient);
    event WormBurned(uint256 indexed tokenId);
    event BirdBurned(uint256 indexed tokenId);

    struct LastWrite {
        uint64 time;
        uint64 blockNum;
    }

    //external contracts
    IEarlyBirdsGame private immutable earlyBirdsGame;
    IDirt private immutable dirtContract;
    IRandomNumberConsumer private immutable random;
    IERC20 private immutable testERC20;
    IAncientTree private immutable ancientTree;

    //max number of tokens that can ever be minted
    uint256 public constant maxTokens = 55000;
    //number of tokens that are available for sale for gen 0
    uint256 public constant maxGen0 = 100;
    //number of tokens that have already been minted
    uint16 public numMinted;
    //maximum number of mints one user can do for gen 0
    uint16 maxMint = 10;

    //gen 0 mint acount
    mapping (address => uint32) public numGen0Minted;
    // Store previous trait combinations to prevent duplicates
    mapping(uint256 => bool) private knownCombinations;
    //mapping from tokenID to a struct containing the token's traits
    mapping(uint256 => WormBirdTraits) private tokenTraits;

    // Tracks the last block and timestamp that a caller has written to state.
    // Disallow some access to functions if they occur while a change is being written.
    mapping(address => LastWrite) private lastWriteAddress;
    mapping(uint256 => LastWrite) private lastWriteToken;

    // list of probabilities for each trait type
    // 0 - 9 are associated with Worm, 10 - 18 are associated with Birds
    uint8[][18] public rarities;
    // list of aliases for Walker's Alias algorithm
    // 0 - 9 are associated with Worm, 10 - 18 are associated with Birds
    uint8[][18] public aliases;

    //mint price for gen 0
    uint256 public constant MINT_PRICE = 0.05 ether;

    //admins
    mapping(address => bool) private admins;

    constructor(address _dirtContract, address _earlyBirdsGame, address _random, address _testERC20, address _ancientTree) ERC721("Early Birds", "EB") {
        earlyBirdsGame = IEarlyBirdsGame(_earlyBirdsGame);
        dirtContract = IDirt(_dirtContract);
        random = IRandomNumberConsumer(_random);
        testERC20 = IERC20(_testERC20);
        ancientTree = IAncientTree(_ancientTree);
        //Utilizing A.J. Walker's Alias Algorithm
        //See wikipedia

        /** WORM TRAITS */
        //worm body
        rarities[0] = [255,255,255,51,13];
        aliases[0] = [0,1,2,1,0];

        //worm eyes
        rarities[1] = [255,255,255,255,255,255,255,255,190,140,63,45];
        aliases[1] = [0,1,2,3,4,5,6,7,2,3,0,1];

        //worm mouth
        rarities[2] = [64,64,128,128,128,128,191,191,255,255];
        aliases[2] = [6,7,4,5,9,9,8,8,8,9];

        //worm hat
        rarities[3] = [255,255,255,255,255,255,95,85,29,16];
        aliases[3] = [0,1,2,3,4,5,6,3,2,1,0];

        //worm facial accessory
        rarities[4] = [255,255,255,255,255,255,255,255,190,140,63,45];
        aliases[4] = [0,1,2,3,4,5,6,7,2,3,0,1];

        //worm tail
        rarities[5] = [255,255,255,255,255,255,255,129,101,43,32,16];
        aliases[5] = [0,1,2,3,4,5,6,4,3,2,1,0];

        //worm heldItem
        rarities[6] = [255,231,215,220,255,255,255,255,255,175,167,132,103,73];
        aliases[6] = [0,0,1,1,4,5,6,7,8,4,3,2,1,0];

        //worm strength
        rarities[7] = [255,233,49];
        aliases[7] = [0,0,0];

        /** BIRD TRAITS */

        //bird body
        rarities[8] = [255,255,255,255,108,72,36];
        aliases[8] = [0,1,2,3,2,1,0];

        //bird head
        rarities[9] = [255,255,255,255,114,79,32];
        aliases[9] = [0,1,2,3,2,1,0];

        //bird eyes
        rarities[10] = [255,255,255,255,238,225,180,150];
        aliases[10] = [0,1,2,3,3,2,1,0];

        //bird beak
        rarities[11] = [255,255,255,255,255];
        aliases[11] = [0,1,2,3,4,5];

        //bird hat
        rarities[12] = [255,255,255,255,255,255,255,255,187,143,69,49];
        aliases[12] = [0,1,2,3,4,5,6,7,2,3,0,1];

        //bird heldItem
        rarities[13] = [255,255,255,255,255,255,255,112,98,75,50];
        aliases[13] = [0,1,2,3,4,5,6,3,2,1,0];

        //bird extra
        rarities[14] = [255,255];
        aliases[14] = [0,1];

        //bird size
        rarities[15] = [255,221,99,20];
        aliases[15] = [0,0,1,0];
    }

    function mint(address recipient, uint256 seed) external override whenNotPaused {

        numMinted++;

        //generate the traits for the worm/bird!
        _generateAndStoreTraits(numMinted, seed, 0).isWorm;

        if(tx.origin != recipient && recipient != address(ancientTree)) {
            // Stolen!
            if(tokenTraits[numMinted].isWorm) {
                emit WormStolen(numMinted, recipient);
            }
            else {
                emit BirdStolen(numMinted, recipient);
            }
        }


        _safeMint(recipient, numMinted);
    }

  /** 
    * Burn a token - any game logic should be handled before this function.
    */
    function burn(uint256 tokenId) external override whenNotPaused {
        require(admins[_msgSender()], "Only admins can call this");
        require(ownerOf(tokenId) == tx.origin, "Oops you don't own that");
        if(tokenTraits[tokenId].isWorm) {
            emit WormBurned(tokenId);
        }
        else {
            emit BirdBurned(tokenId);
        }
        _burn(tokenId);
    }

  /**
    * Calculate the dirt minting cost:
    * - the first 20% are paid in ETH
    * - the next 20% are 20000 $DIRT
    * - the next 40% are 40000 $DIRT
    * - the final 20% are 80000 $DIRT
    * @param tokenId the ID to check the cost of to mint
    * @return the cost of the given token ID
    */
    function getMintDirtCost(uint16 tokenId) public view override returns (uint256) {
        if (tokenId <= maxGen0 && earlyBirdsGame.getGen0MintingStatus() == true) return 0;
        if (tokenId <= maxTokens * 2 / 5) return 25000 ether; //55,000 * 2 / 5 = 22,000
        if (tokenId <= maxTokens * 4 / 5) return 45000 ether; //55,000 * 4 / 5 = 44,000
        return 75000 ether; // 44,001 - 55,000
    }

  /**
    * Ennumerate tokens by owner.
    */
    function tokensOf(address owner) external view returns (uint16[] memory) {
        uint32 tokenCount = uint32(balanceOf(owner));
        uint16[] memory tokensId = new uint16[](tokenCount);
        for (uint32 i = 0; i < tokenCount; i++){
            tokensId[i] = uint16(tokenOfOwnerByIndex(owner, i));
        }
        return tokensId;
    }

    function getMaxTokens() external pure override returns (uint256) {
        return maxTokens;
    }

    function getMaxMint() external view override returns (uint256) {
        return maxMint;
    }

    function getGen0Supply() external pure override returns (uint256) {
        return maxGen0;
    }

  /**
    * Expose traits to trait contract.
    */
    
    function getTraits(uint16 tokenId) external view override returns (WormBirdTraits memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenTraits[tokenId];
    }

    /** ADMIN */

  /**
    * updates the number of tokens for sale
    */
    /*
    function setGen0Supply(uint256 _numGen0) external onlyOwner {
        maxGen0 = uint16(_numGen0);
    }
    */




    function getNumMinted() external view override returns (uint16) {
        return numMinted;
    }

 /**
  * sets the initial random seed
  */

    function setInitialRandomSeed() external onlyOwner {
        random.getRandomNumber();
    }

    //JUST FOR TESTING PURPOSES, DELETE BEFORE LAUNCH
    function getRandomSeed() external onlyOwner returns (uint256){
        return random.getCurrentSeed();
    }

  /**
    * Set the max mints per account during persale and per tx during public sale
    */
    function setMaxMintAmount(uint16 _maxMint) external onlyOwner {
        maxMint = _maxMint;
    }

    function getTokenWriteBlock(uint256 tokenId) external view override returns(uint64) {
        require(admins[_msgSender()], "Only admins can call this");
        return lastWriteToken[tokenId].blockNum;
    }

    function updateOriginAccess(uint16[] memory tokenIds) external override {
        require(admins[_msgSender()], "Only admins can call this");
        uint64 blockNum = uint64(block.number);
        uint64 time = uint64(block.timestamp);
        lastWriteAddress[tx.origin] = LastWrite(time, blockNum);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            lastWriteToken[tokenIds[i]] = LastWrite(time, blockNum);
        }
    }

 /**
   * Generate and store player traits. Recursively called to ensure uniqueness.
   * Give users 3 attempts, bit shifting the seed each time (uses 5 bytes of entropy before failing)
   * @param tokenId id of the token to generate traits
   * @param seed random 256 bit seed to derive traits
   * @return t player trait struct
   */
    function _generateAndStoreTraits(uint16 tokenId, uint256 seed, uint8 attempt) internal returns (WormBirdTraits memory t) {
        require(attempt < 6, "unable to generate unique traits");
        //if(attempt == 3) { require(false, "1"); }
        t = _selectTraits(seed);
        
        if (!knownCombinations[_structToHash(t)]) {
            tokenTraits[tokenId] = t;
            knownCombinations[_structToHash(t)] = true;
            return t;
        }
        return _generateAndStoreTraits(tokenId, seed >> attempt, attempt + 1);
    }

  /**
    * uses A.J. Walker's Alias algorithm for O(1) rarity table lookup
    * ensuring O(1) instead of O(n) reduces mint cost by more than 50%
    * probability & alias tables are generated off-chain beforehand
    * @param seed portion of the 256 bit seed to remove trait correlation
    * @param traitType the trait type to select a trait for 
    * @return the ID of the randomly selected trait
    */
    function _selectTrait(uint16 seed, uint8 traitType) internal view returns (uint8) {
        uint8 trait = uint8(seed) % uint8(rarities[traitType].length);
        if (seed >> 8 < rarities[traitType][trait]) return trait;
        return aliases[traitType][trait];
    }

  /**
   * selects the species and all of its traits based on the seed value
   * @param seed a pseudorandom 256 bit number to derive traits from
   * @return t struct of randomly selected traits
   */
    function _selectTraits(uint256 seed) internal view returns (WormBirdTraits memory t) {
        t.isWorm = (seed & 0xFFFF) % 2 != 0;
        // Use 128 bytes of seed entropy to define traits
        // THIS IS USING WIZARDS AND DRAGONS TRAITS -- WE NEED TO DEFINE OUR OWN TRAITS
        // set offset to = 
        uint8 offset = t.isWorm ? 0 : 8;                                                    // Worm   Bird     
        seed >>= 16; t.body = _selectTrait(uint16(seed & 0xFFFF), 0 + offset);              // body
        seed >>= 16; t.eyes = _selectTrait(uint16(seed & 0xFFFF), 1 + offset);              // eyes    
        seed >>= 16; t.mouth = _selectTrait(uint16(seed & 0xFFFF), 2 + offset);             // mouth  
        seed >>= 16; t.hat = _selectTrait(uint16(seed & 0xFFFF), 3 + offset);               // hat  
        seed >>= 16; t.facialAccessory = _selectTrait(uint16(seed & 0xFFFF), 4 + offset);   // facial accessory   
        seed >>= 16; t.tail = _selectTrait(uint16(seed & 0xFFFF), 5 + offset);              // tail
        seed >>= 16; t.heldItem = _selectTrait(uint16(seed & 0xFFFF), 6 + offset);          // held item
        seed >>= 16; t.size = _selectTrait(uint16(seed & 0xFFFF), 7 + offset);         // rank index
        return t;
    }

  /**
   * converts a struct to a 256 bit hash to check for uniqueness
   * @param t the struct to pack into a hash
   * @return the 256 bit hash of the struct
   */
    function _structToHash(WormBirdTraits memory t) internal pure returns (uint256) {
        return uint256(keccak256(
            abi.encodePacked(
                t.isWorm,
                t.body,
                t.eyes,
                t.mouth,
                t.hat,
                t.facialAccessory,
                t.tail,
                t.heldItem,
                t.size
            )
        ));
    }

    /** READ */

    /**
    * checks if a token is a Wizards
    * @param tokenId the ID of the token to check
    * @return wizard - whether or not a token is a Wizards
    */
    function isWorm(uint256 tokenId) external view override returns (bool) {
        IEarlyBirdsNFT.WormBirdTraits memory w = tokenTraits[tokenId];
        return w.isWorm;
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

  /**
    * overrides ERC721 ownerOf
    * @param tokenId the ID of the token to check
    */ 

    function ownerOf(uint256 tokenId) public view override(ERC721, IEarlyBirdsNFT) returns (address) {
        return super.ownerOf(tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IEarlyBirdsNFT) {
        //if(msg.sender != address(earlyBirdsGame)) {
        if(!admins[msg.sender]) {
            require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller not owner nor approved");
        }
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override(ERC721, IEarlyBirdsNFT) {
        super.safeTransferFrom(from, to, tokenId, _data);
    }

}
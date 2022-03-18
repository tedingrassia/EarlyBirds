// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Interfaces/IEarlyBirdsGame.sol";
import "./Interfaces/IDirt.sol";
import "./Interfaces/IEarlyBirdsNFT.sol";
import "./Interfaces/IBirdBath.sol";
import "./Interfaces/IRandomNumberConsumer.sol";
import "./Interfaces/IAncientTree.sol";

contract EarlyBirdsGame is IEarlyBirdsGame, IERC721Receiver, Ownable, ReentrancyGuard, Pausable {

    using ECDSA for bytes32;

    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 private maxDirtCost = 72000;
    //whether or not minting is active for public sale 
    bool public mintingActive = false;
    //whether or not minting is active for gen0 sale
    bool public gen0MintingActive = false;


    uint256 public featherTypeID;
    uint128 public constant FEATHER_COST = 50000 ether;
    //maximum amount of $DIRT possible to be earned in act 1
    uint128 public constant MAXIMUM_DIRT = 3000000000 ether;
    //amount of $DIRT earned so far
    uint128 public totalDirtEarned; 

    //external contracts
    IDirt public dirtContract;
    IEarlyBirdsNFT public earlyBirdsNFT;
    IBirdBath public birdBath;
    IRandomNumberConsumer public randomGetter;
    IAncientTree public ancientTree;
    IERC20 public testERC20;

    modifier requireContractsSet() {
        require(address(dirtContract) != address(0) && address(earlyBirdsNFT) != address(0) && address(birdBath) != address(0) 
        && address(randomGetter) != address(0) && address(testERC20) != address(0), "Contracts not set");
        _;
    }

    function setContracts(address _dirtContract, address _earlyBirdsNFT, address _randomGetter, address _birdBath, address _ancientTree, address _testERC20) external onlyOwner {
        dirtContract = IDirt(_dirtContract);
        earlyBirdsNFT = IEarlyBirdsNFT(_earlyBirdsNFT);
        birdBath = IBirdBath(_birdBath);
        randomGetter = IRandomNumberConsumer(_randomGetter);
        ancientTree = IAncientTree(_ancientTree);
        testERC20 = IERC20(_testERC20);
    }

    function mint(uint32 amount, bool stake, uint256 originSeed) external whenNotPaused nonReentrant {
        require(tx.origin == _msgSender(), "Only EOA");
        uint16 numMinted = earlyBirdsNFT.getNumMinted();
        uint256 maxTokens = earlyBirdsNFT.getMaxTokens();
        uint256 maxMint = earlyBirdsNFT.getMaxMint();
        require(amount > 0 && amount <= maxMint, "invalid mint amount");
        require(mintingActive, "minting is not active");
        require(numMinted + amount <= maxTokens, "amount minted would exceed max supply");
        //require(ancientTree.getTotalDirtEarned() < 3000000000, "minting has ended due to the dirt supply reaching the maximum for Chapter One");
        uint16[] memory tokenIdsToStake = stake ? new uint16[](amount) : new uint16[](0);
        uint256 dirtCost;
        uint256 wETHCost;
        
        uint256 maxGen0 = earlyBirdsNFT.getGen0Supply();
        //bool gen0MintingActive = earlyBirdsNFT.getGen0MintingStatus();
        uint256 seed = originSeed;
        //uint256 seed = random.randomizeSeed();
        //seed = uint256(random.getCurrentSeed());
        if(numMinted + amount <= maxGen0 && gen0MintingActive == true)
        {
            wETHCost = amount * MINT_PRICE;
        }
        for(uint32 i = 0; i < amount; i++) {
            numMinted++; 
            dirtCost += earlyBirdsNFT.getMintDirtCost(numMinted); 
            
            seed = _reseedWithTokenId(seed, numMinted);
           
            //decide if mint will be stolen (set who receives it)
            address recipient = _selectRecipient(seed); 
            if(recipient != _msgSender() && birdBath.balanceOf(_msgSender(), featherTypeID) > 0) {
                // If the mint is going to be stolen, there's a 50% chance
                // the bird will see the feather of its family and take that instead
                if(seed & 1 == 1) {
                    birdBath.safeTransferFrom(_msgSender(), recipient, featherTypeID, 1, "");
                    recipient = _msgSender();}     
            }

            if(!stake || recipient != _msgSender()) {
                 earlyBirdsNFT.mint(recipient, seed);
             }
            else {
                tokenIdsToStake[i] = numMinted;
                earlyBirdsNFT.mint(address(ancientTree), seed);
            }
            
        }
        if(wETHCost > 0)
        {
            //Must call approve from middle layer before this can work
            uint256 allowance = testERC20.allowance(msg.sender, address(this));
            
            require(allowance >= wETHCost, "Check the token allowance");
            testERC20.transferFrom(msg.sender, address(this), wETHCost);
        }
        else if (dirtCost > 0) {
            dirtContract.burn(msg.sender, dirtCost);
        }
        if (stake) {
            ancientTree.stakeTokens(_msgSender(), tokenIdsToStake);
        }
        //emit event for type of mint (worm or )

    }

    function setFeatherId(uint256 typeId) external onlyOwner {
        featherTypeID = typeId;
    }

    function makeFeather(uint16 qty) external whenNotPaused {
        require(tx.origin == _msgSender(), "Only EOA");
        require(featherTypeID == 0, "DEVS DO SOMETHING");
        require(dirtContract.balanceOf(_msgSender()) >= FEATHER_COST*qty, "no money");
        // $GP exchange amount handled within birdBath contract
        // Will fail if sender doesn't have enough $GP
        // Transfer does not need approved,
        //  as there is established trust between this contract and the birdBath contract 
        dirtContract.burn(_msgSender(), FEATHER_COST*qty);
        birdBath.mint(featherTypeID, qty, _msgSender());
    }

    function buySecretKey(uint256 dirtAmount) external whenNotPaused nonReentrant {
        require(tx.origin == _msgSender(), "Only EOA");

        uint16 numMinted = earlyBirdsNFT.getNumMinted();
        uint256 dirtMintCost = earlyBirdsNFT.getMintDirtCost(numMinted);

        require(dirtMintCost > 0, "BirdBath currently closed");
        require(dirtAmount >= dirtMintCost, "Not enough $DIRT given");
        dirtContract.burn(_msgSender(), dirtAmount);
        if(dirtAmount < dirtMintCost * 2) {
            birdBath.mint(1, 1, _msgSender());
        }
        else {
            birdBath.mint(2, 1, _msgSender());
        }
    }

    function buySecretEgg(uint16 tokenId, uint256 dirtAmount) external whenNotPaused nonReentrant {
        require(tx.origin == _msgSender(), "Only EOA");
        uint64 lastTokenWrite = earlyBirdsNFT.getTokenWriteBlock(tokenId);
        // Must check this, as getTokenTraits will be allowed since this contract is an admin
        require(lastTokenWrite < block.number, "hmmmm what doing?");
        IEarlyBirdsNFT.WormBirdTraits memory nft = earlyBirdsNFT.getTraits(tokenId);

        uint16 numMinted = earlyBirdsNFT.getNumMinted();
        uint256 dirtMintCost = earlyBirdsNFT.getMintDirtCost(numMinted);

        require(dirtMintCost > 0, "BirdBath currently closed");
        if(nft.isWorm) {
            // Worm sacrifice requires 3x $DIRT cost to mint
            require(dirtAmount >= dirtMintCost * 3, "not enough $dirt");
            dirtContract.burn(_msgSender(), dirtAmount);
            // This will check if origin is the owner of the token
            earlyBirdsNFT.burn(tokenId);
            birdBath.mint(3, 1, _msgSender());
        }
        else {
            // Bird sacrifice requires 4x $DIRT cost to mint
            require(dirtAmount >= dirtMintCost * 4, "not enough $dirt");
            dirtContract.burn(_msgSender(), dirtAmount);
            // This will check if origin is the owner of the token
            earlyBirdsNFT.burn(tokenId);
            birdBath.mint(4, 1, _msgSender());
        }
   }

   /**
   * the first 15000 (20%) mints go directly to the minter (Gen 0)
   * the remaining 60000 (80%) have a 10% chance to be given to a random staked bird
   * @param seed a random value to select a recipient from
   * @return the address of the recipient (either the minter or the bird thief's owner)
   */
    function _selectRecipient(uint256 seed) internal view returns (address) {
        if ((((seed >> 245) % 10) != 0) || earlyBirdsNFT.getNumMinted() <= earlyBirdsNFT.getGen0Supply()) {
            return _msgSender(); // top 10 bits haven't been used
        } 
        // 144 bits reserved for trait selection
        address thief = ancientTree.randomBirdOwner(seed >> 144);
        if (thief == address(0x0)) {
           return _msgSender();
        }
        //should return either whoever minted or the thief's address
        return thief;
    }

  /**
    * sets the status of minting for public sale
    */
    function setMintingStatus(bool _mintingActive) external onlyOwner {
        mintingActive = _mintingActive;
    }

    function setGen0MintingStatus(bool _gen0MintingActive) external onlyOwner {
        gen0MintingActive = _gen0MintingActive;
    }

    function getMintingStatus() external view returns(bool) {
        return mintingActive;
    }

    function getGen0MintingStatus() external view override returns (bool) {
        return gen0MintingActive;
    }

 /**
   * Reseeds entropy with tokenId.
   * @param seed random seed
   * @param tokenId additional entropy during mint
   * @return rotated seed
   */
    function _reseedWithTokenId(uint256 seed, uint32 tokenId) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(
            seed,
            tx.origin,
            blockhash(block.number - 1),
            block.timestamp,
            tokenId
        )));
    }

    function setPaused(bool _paused) external requireContractsSet onlyOwner {
        if (_paused) _pause();
        else _unpause();
    }

  /**
    * Interface support to allow player staking.
    */
    function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {    
        require(from == address(0x0), "only allow directly from mint");
        return IERC721Receiver.onERC721Received.selector;
    }
}
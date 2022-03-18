// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

import "./Interfaces/IEarlyBirdsGame.sol";
import "./Interfaces/IDirt.sol";
import "./Interfaces/IEarlyBirdsNFT.sol";
import "./Interfaces/IRandomNumberConsumer.sol";
import "./Interfaces/IAncientTree.sol";

contract AncientTree is IAncientTree, IERC721Receiver, Ownable, ReentrancyGuard, Pausable {

    //maximum amount of $DIRT possible to be earned in act 1
    uint128 public constant MAXIMUM_DIRT = 1000000000 ether;

    //amount of $DIRT earned so far
    uint128 public totalDirtClaimed; 

    // Collected rewards before any birds staked
    uint128 public unaccountedBirdRewards;

    // Number of Worm staked
    uint32 public totalWormsStaked;

    // Number of Birds staked
    uint32 public totalBirdsStaked;

    // Total size of all birds staked - used for calculating distribution of $DIRT and steals to birds
    uint16 public totalSizeOfBirdsStaked;

    // Amount of $DIRT due for each size point (5-8) staked
    uint128 public dirtPerSizePoint; 

    // The last time $DIRT was claimed
    uint48 public lastClaimTimestamp;

    // Worms must have 2 days worth of $DIRT to unstake or else it's too cold
    uint48 public constant WORM_MINIMUM_STAKE_TIME = 2 days;

    // Worms earn 10000 $DIRT per day
    uint128 public constant WORM_EARNING_RATE = 115740740740740740; // 10000 ether / 1 days;

    // Worm tax rate when claiming without unstaking
    uint8 public constant WORM_CLAIM_TAX_PERCENTAGE = 25;

    // Maximum size for birds - bigger birds bring more worms home to their nest and take more dirt
    uint16 public constant MAXIMUM_BIRD_SIZE = 8; 

    //external contracts
    IDirt public dirtContract;
    IEarlyBirdsNFT public earlyBirdsNFT;
    IEarlyBirdsGame public earlyBirdsGame;
    IRandomNumberConsumer public randomNumberConsumer;

    // Staking maps for both time-based and ad-hoc-earning-based
    struct TimeStake { uint16 tokenId; uint48 time; address owner; }
    struct EarningStake { uint16 tokenId; uint128 earningRate; address owner; } 


    // Staked worms
    //mapping(uint16 => TimeStake) public wormStakeByToken;
    // mapping of staked worms by strength
    // mapping(uint16 => uint16[]) public wormStakeByStrength;
    // mapping(uint16 => uint16) public wormHierarchy;
    mapping(uint16 => TimeStake[]) public wormStakeByStrength;
    mapping(uint16 => uint16) public wormHierarchy;

    //Staked birds
    mapping(uint16 => EarningStake[]) public birdStakeBySize; //birds grouped by size
    mapping(uint16 => uint16) public birdHierarchy; // bird location within size group

    modifier requireContractsSet() {
        require(address(dirtContract) != address(0) && address(earlyBirdsNFT) != address(0) && address(randomNumberConsumer) != address(0)
        && address(earlyBirdsGame) != address(0), "Contracts not set");
        _;
    }
    
    function setContracts(address _dirtContract, address _earlyBirdsNFT, address _randomNumberConsumer, address _earlyBirdsGame) external onlyOwner {
        dirtContract = IDirt(_dirtContract);
        earlyBirdsNFT = IEarlyBirdsNFT(_earlyBirdsNFT);
        randomNumberConsumer = IRandomNumberConsumer(_randomNumberConsumer);
        earlyBirdsGame = IEarlyBirdsGame(_earlyBirdsGame);
    }

    /** STAKING TOKENS */

  /**
   * Adds Worms and Birds to their Nests and Home
   * @param account the address of the staker
   * @param tokenIds the IDs of the Worm and Birds to stake
   */
    function stakeTokens(address account, uint16[] calldata tokenIds) external override whenNotPaused nonReentrant {
        //require that account = user or NFT contract
        require(tx.origin == _msgSender() || _msgSender() == address(earlyBirdsGame), "not approved to stake the token(s)");       
        require(account == tx.origin, "account to sender mismatch");
        for (uint16 i = 0; i < tokenIds.length; i++) {
            // ignore gaps for stolen tokens
            if (tokenIds[i] == 0) {
                continue;
            }
            // Add to respective safe homes
            //check if dealing with worm or bird
            bool isWorm = earlyBirdsNFT.isWorm(tokenIds[i]);
            //if it is a worm, stake it with worms.
            if (isWorm) {
                _addWormToSoil(account, tokenIds[i]);
            } 
            //stake it with the birds
            else{
                _addBirdToNest(account, tokenIds[i]);
            }

            // Transfer into safe house
            if (_msgSender() != address(earlyBirdsGame)) { // dont do this step if its a mint + stake
                require(earlyBirdsNFT.ownerOf(tokenIds[i]) == msg.sender, "only token owners can stake");
                earlyBirdsNFT.transferFrom(msg.sender, address(this), tokenIds[i]); 
            }
        }
    }

   /**
    * Adds Worm to the Soil!.
    * @param account the address of the staker
    * @param tokenId the ID of the Worm to add to the Soil
    */ 
    function _addWormToSoil(address account, uint16 tokenId) internal {
        //update mapping for tokenId with staking struct
        /*
        wormStakeByToken[tokenId] = TimeStake({
            owner: account,
            tokenId: tokenId,
            time: uint48(block.timestamp)
        }); 
        */

        uint16 strength = earlyBirdsNFT.getTraits(tokenId).size;   
        wormHierarchy[tokenId] = uint16(wormStakeByStrength[strength].length);
        wormStakeByStrength[strength].push(TimeStake({
            owner: account,
            tokenId: tokenId,
            time: uint48(block.timestamp)
        }));
        totalWormsStaked += 1;
    }

   /**
    * Add Bird to the Den.
    * @param account the address of the staker
    * @param tokenId the ID of the Bird to add to the Nest
    */
    function _addBirdToNest(address account, uint16 tokenId) internal {
        //get Size of bird being staked
        uint16 size = _getBirdSize(tokenId);
        totalSizeOfBirdsStaked += size;
        // Store Bird by rating
        birdHierarchy[tokenId] = uint16(birdStakeBySize[size].length);
        // Add bird to their size group
        birdStakeBySize[size].push(EarningStake({
            owner: account,
            tokenId: tokenId,
            earningRate: dirtPerSizePoint
        }));
        totalBirdsStaked += 1;
    }

    /** UNSTAKING AND CLAIMING REWARDS */

   /**
    * Realize $DIRT earnings and optionally unstake tokens.
    * @param tokenIds the IDs of the tokens to claim earnings from
    * @param unstake whether or not to unstake ALL of the tokens listed in tokenIds
    * @param seed account seed
    */
    //function claimRewardsAndUnstake(uint16[] calldata tokenIds, bool unstake, bool membership, uint48 expiration, uint256 seed, bytes memory sig) external whenNotPaused nonReentrant _updateEarnings {
    function claimRewardsAndUnstake(uint16[] calldata tokenIds, bool unstake, uint256 seed) external whenNotPaused nonReentrant {
        require(tx.origin == msg.sender, "eos only");

        uint128 reward;
        uint48 time = uint48(block.timestamp);
        for (uint8 i = 0; i < tokenIds.length; i++) {
            bool isWorm = earlyBirdsNFT.isWorm(tokenIds[i]);
            if (isWorm) {
                reward += _claimWormsFromSoil(tokenIds[i], unstake, time, seed);
            } else {
                reward += _claimBirdFromNest(tokenIds[i], unstake);
            } 
        }
        if (reward != 0) {
            
            dirtContract.mint(msg.sender, reward);
        }
    }
/** USED FOR TESTING ONLY  */

    //put this back once done testing with event
    function calculateReward(uint16 tokenId) external view returns (uint128 reward) {
        if(earlyBirdsNFT.isWorm(tokenId)) {
            uint16 strength = earlyBirdsNFT.getTraits(tokenId).size;
            //require(false, "made it here");
            TimeStake memory stake = wormStakeByStrength[strength][wormHierarchy[tokenId]];
            
            uint48 time = uint48(block.timestamp);

            if (totalDirtClaimed < MAXIMUM_DIRT) {
                reward = (time - stake.time) * WORM_EARNING_RATE + _getWormStrengthBonus(tokenId, strength);
                
            } else if (stake.time > lastClaimTimestamp) {
                reward = 0; // $DIRT production stopped already
            } else {
                reward = (lastClaimTimestamp - stake.time) * WORM_EARNING_RATE +  _getWormStrengthBonus(tokenId, strength); // stop earning additional $GP if it's all been earned
            }
            return reward;
        }
        else {           
            uint16 size = _getBirdSize(tokenId);
            EarningStake memory stake = birdStakeBySize[size][birdHierarchy[tokenId]];

            // Calculate size-based rewards
            reward = (size) * (dirtPerSizePoint - stake.earningRate);
            return reward;
        }
    }

   /**
    * realize $DIRT earnings for a single Worm and optionally unstake it
    * if not unstaking, pay a 20% tax to the staked Birds
    * if unstaking, there is a 50% chance all $DIRT is stolen
    * @param tokenId the ID of the Worm to claim earnings from
    * @param unstake whether or not to unstake the Worm
    * @param time currnet block time
    * @param seed account seed
    * @return reward - the amount of $DIRT earned
    */
    function _claimWormsFromSoil(uint16 tokenId, bool unstake, uint48 time, uint256 seed) internal returns (uint128 reward) {
        uint16 strength = earlyBirdsNFT.getTraits(tokenId).size;

        TimeStake memory stake = wormStakeByStrength[strength][wormHierarchy[tokenId]];
        require(stake.owner == _msgSender(), "only token owners can unstake");
        //require(!(unstake && block.timestamp - stake.time < WORM_MINIMUM_STAKE_TIME), "worms need 2 days of dirt");
        // Calculate time-based rewards
        
        uint128 wormStrengthBonus = _getWormStrengthBonus(tokenId, strength);
        
        if (totalDirtClaimed < MAXIMUM_DIRT) {
            reward = ((time - stake.time) * WORM_EARNING_RATE) + wormStrengthBonus;    
            totalDirtClaimed += reward;
        } else if (stake.time <= lastClaimTimestamp) {
            // stop earning additional $DIRT if the maximum has been earned
            reward = ((lastClaimTimestamp - stake.time) * WORM_EARNING_RATE) + wormStrengthBonus;
            totalDirtClaimed += reward;
        }
        
        // Update reward based on game rules
        if (unstake) {
            //uint16 lastWorm = wormStakeByStrength[strength][wormStakeByStrength[strength].length - 1];
            TimeStake memory lastStake = wormStakeByStrength[strength][wormStakeByStrength[strength].length - 1];
            wormStakeByStrength[strength][wormHierarchy[tokenId]] = lastStake; // Shuffle last Worm to current position
            wormHierarchy[lastStake.tokenId] = wormHierarchy[tokenId];
            wormStakeByStrength[strength].pop(); // Remove duplicate
            delete wormHierarchy[tokenId]; // Delete old mapping
            //getCurrentSeed from RandomNumberConsumer.sol
            //reseed see with some current block info and tokenId.
            seed = _reseedWithTokenId(seed, tokenId);
            // 50% chance that all of $DIRT earned is stolen by a bird
            if (((seed >> 245) % 2) == 0) {
                _payTaxToBirds(reward);
                reward = 0;
            }
            totalWormsStaked -= 1;
            // send back Worm
            earlyBirdsNFT.safeTransferFrom(address(this), msg.sender, tokenId, "");
        } else {
            // Pay Birds their tax
            uint128 tax = reward * WORM_CLAIM_TAX_PERCENTAGE / 100;
            _payTaxToBirds(tax);
            reward = reward * (100 - WORM_CLAIM_TAX_PERCENTAGE) / 100; //update reward to reward - bird tax
            // Update last earned time
            wormStakeByStrength[strength][wormHierarchy[tokenId]] = TimeStake({
                owner: msg.sender,
                tokenId: tokenId,
                time: time
            });
        }
    }

  /**
    * realize $DIRT earnings for a single Bird and optionally unstake it
    * Birds earn $DIRT proportional to their Alpha rank
    * @param tokenId the ID of the Bird to claim earnings from
    * @param unstake whether or not to unstake the Bird
    * @return reward - the amount of $DIRT earned
    */
    function _claimBirdFromNest(uint16 tokenId, bool unstake) internal returns (uint128 reward) {
        require(earlyBirdsNFT.ownerOf(tokenId) == address(this), "must be staked to claim rewards");
        uint16 size = _getBirdSize(tokenId);
        EarningStake memory stake = birdStakeBySize[size][birdHierarchy[tokenId]];
        require(stake.owner == _msgSender(), "only token owners can unstake");

        // Calculate size-based rewards
        reward = (size) * (dirtPerSizePoint - stake.earningRate);
        if (unstake) {
            totalSizeOfBirdsStaked -= size; // Remove Alpha from total staked
            EarningStake memory lastStake = birdStakeBySize[size][birdStakeBySize[size].length - 1];
            birdStakeBySize[size][birdHierarchy[tokenId]] = lastStake; // Shuffle last Bird to current position
            birdHierarchy[lastStake.tokenId] = birdHierarchy[tokenId];
            birdStakeBySize[size].pop(); // Remove duplicate
            delete birdHierarchy[tokenId]; // Delete old mapping
            totalBirdsStaked -= 1;

            earlyBirdsNFT.safeTransferFrom(address(this), msg.sender, tokenId, "");
        } else {
            // Update earning rate
            birdStakeBySize[size][birdHierarchy[tokenId]] = EarningStake({
                owner: msg.sender,
                tokenId: tokenId,
                earningRate: dirtPerSizePoint
            });
        }
    }

    /** 
    * Add $DIRT claimable pots for birds
    * @param amount $DIRT to add to the pot
    */
    function _payTaxToBirds(uint128 amount) internal {
        uint128 amountDueBirds = amount;
        

        // Update Bird pools
        if (totalSizeOfBirdsStaked == 0) {
            unaccountedBirdRewards += amountDueBirds;
        } else {
            // makes sure to include any unaccounted $DIRT
            dirtPerSizePoint += (amountDueBirds + unaccountedBirdRewards) / totalSizeOfBirdsStaked;
            unaccountedBirdRewards = 0;
        }
        
    }

    /**
    * chooses a random Bird thief when a newly minted token is stolen
    * @param seed a random value to choose a Bird from
    * @return the owner of the randomly selected Bird thief
    */
    function randomBirdOwner(uint256 seed) external view override returns (address) {
        if (totalSizeOfBirdsStaked == 0) {
            return address(0x0); // use 0x0 to return to msg.sender
        }
        // choose a value from 0 to total alpha staked
        uint256 bucket = (seed & 0xFFFFFFFF) % totalSizeOfBirdsStaked;
        uint256 cumulative;
        seed >>= 32;
        // loop through each size bucket of birds
        for (uint16 k =  MAXIMUM_BIRD_SIZE - 3; k <= MAXIMUM_BIRD_SIZE; k++) {
            cumulative += birdStakeBySize[k].length * k;
            // if the value is not inside of that bucket, keep going
            if (bucket >= cumulative) continue;
            // get the address of a random Bird with that alpha score
            return birdStakeBySize[k][seed % birdStakeBySize[k].length].owner;
        } 
        return address(0x0);
    }
    /** CALCULATE REWARDS */

  

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

    
    // function setPaused(bool _paused) external requireContractsSet onlyOwner {
    //     if (_paused) _pause();
    //     else _unpause();
    // }

  /**
    * gets the strength bonus for a Worm
    * @param tokenId the ID of the Worm to get the strength for
    * @return the bonus dirt earned by a 
    */
    function _getWormStrengthBonus(uint16 tokenId, uint16 strength) public view returns (uint128) {
        uint16 bonus;    
        if(earlyBirdsNFT.isWorm(tokenId)) {
            if(earlyBirdsNFT.getTraits(tokenId).size == 0) { 
                bonus = 0;  //default worm earning rate, no  bonus
            } 
            else if(earlyBirdsNFT.getTraits(tokenId).size == 1) {
                bonus = 12; //12 percent more dirt
            }
            else { 
                bonus = 30; //30 percent more dirt
            } 

            TimeStake memory stake = wormStakeByStrength[strength][wormHierarchy[tokenId]];
            uint48 time = uint48(block.timestamp);

            uint128 wormStrengthBonus = (((time - stake.time) * WORM_EARNING_RATE) / 100) * bonus;
            return wormStrengthBonus;
        }
        else { return 0; } //if bird, no bonus for strength     
        
    }

/*
    function getWormStrengthBonus(uint16 tokenId) public view returns (uint128) {
        TimeStake memory stake = wormStakeByToken[tokenId];
        uint48 time = uint48(block.timestamp);

        uint128 wormStrengthBonus = ((((time - stake.time) * WORM_EARNING_RATE) / 100) * (_getWormStrength(tokenId)));
        return wormStrengthBonus;
    }
*/

  /**
    * gets the size for a Bird
    * @param tokenId the ID of the Bird to get the size for
    * @return the size of the Bird (5-8) 
    */
    function _getBirdSize(uint16 tokenId) internal view returns (uint16) {
        return MAXIMUM_BIRD_SIZE - earlyBirdsNFT.getTraits(tokenId).size; // size is 0-3, MAXIMUM_BIRD_SIZE is 8
    }

  /**
    * returns total dirt earned
    * @return the total amount of dirt earned so far
    */
    function getTotalDirtClaimed() external view override returns (uint256){
        return totalDirtClaimed;
    }

  /**
    * Interface support to allow player staking.
    */
    function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {    
        require(from == address(0x0), "only allow directly from mint");
        return IERC721Receiver.onERC721Received.selector;
    }

}
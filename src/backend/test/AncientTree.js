const { expect } = require("chai");

//get rid of the only if i want to run multiple test files
describe.only("Early Birds Ancient Tree Contract Testing", function () {
    
    let game
    let gameContract

    let dirt
    let dirtContract

    let nft
    let nftContract

    let traits
    let traitsContract

    let wETH
    let wETHContract

    let birdBath
    let birdBathContract

    let ancientTree
    let ancientTreeContract

    let random
    let randomContract


    let owner;
    let alice;
    let bob;

    describe('Deployment', function () {
        it('Sets the contracts and the accounts', async () => {
            game = await ethers.getContractFactory("EarlyBirdsGame");
            gameContract = await game.deploy();

            dirt = await ethers.getContractFactory("Dirt");
            dirtContract = await dirt.deploy();

            traits = await ethers.getContractFactory("EarlyBirdsTraits");
            traitsContract = await traits.deploy();

            wETH = await ethers.getContractFactory("testERC20");
            wETHContract = await wETH.deploy();

            birdBath = await ethers.getContractFactory("BirdBath");
            birdBathContract = await birdBath.deploy("Bird Bath");

            ancientTree = await ethers.getContractFactory("AncientTree");
            ancientTreeContract = await ancientTree.deploy();

            random = await ethers.getContractFactory("RandomNumberConsumer");
            randomContract = await random.deploy();
            
            nft = await ethers.getContractFactory("EarlyBirdsNFT");
            nftContract = await nft.deploy(dirtContract.address, gameContract.address, randomContract.address, wETHContract.address, ancientTreeContract.address);
            
            [owner, addr1, addr2] = await ethers.getSigners();

            console.log("Dirt Contract.address: ", dirtContract.address)
            console.log("Worm Contract.address: ", nftContract.address)
            console.log("Game Contract.address: ", gameContract.address)
            console.log("Trait Contract address: ", traitsContract.address)
            console.log("wETH Contract address: ", wETHContract.address)
            console.log("BirdBath Contract address: ", birdBathContract.address)
            console.log("AncientTree Contract address: ", ancientTreeContract.address)
            console.log("RandomNumberConsumer Contract address: ", randomContract.address)
        })

        it("Should set the right owner", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.
      
            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            console.log("Owner address", owner.address)
            expect(await ancientTreeContract.owner()).to.equal(owner.address);
        });       

        it('sets the contracts properly', async () => {
            console.log("Setting contract addresses in game contract and ancient tree contract")
            await gameContract.setContracts(dirtContract.address, nftContract.address, randomContract.address, birdBathContract.address, ancientTreeContract.address, wETHContract.address)
            await ancientTreeContract.setContracts(dirtContract.address, nftContract.address, randomContract.address, gameContract.address)
            await dirtContract.addAdmin(ancientTreeContract.address)
            await dirtContract.addAdmin(owner.address)
        })
    })

    describe('Minting', function () {
        it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
            await gameContract.setMintingStatus(true)
            await gameContract.setGen0MintingStatus(true)
            await nftContract.addAdmin(ancientTreeContract.address)
        })
        it('Mints Test wETH to use as payment for minting', async () => {
            await wETHContract.addAdmin(owner.address)
            await wETHContract.mint(owner.address, ethers.utils.parseEther('3'))

            let bal = await wETHContract.balanceOf(owner.address)
            console.log("Balance of Owner: ", ethers.utils.formatEther(bal), " $wETH")
        })
        it('Tries to mint an NFT without being approved to transfer the ERC20 from the user -- should fail', async () => {
            // const response = await gameContract.mint(1, true, BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            // await expect(response.wait()).to.be.reverted
            await expect (
                gameContract.mint(1, true, BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            ).to.be.reverted;
        })
        it('Approves contract to use wETH from user, then uses wETH as payment for minting', async () => {
            await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.05'))
        })
        it('mints successfully without staking', async () => {
            await gameContract.mint(1,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
        })
        it('mints successfully with staking', async () => {
            await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.15'))
            let result = await gameContract.mint(3,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184), {from: alice})  
            let bal = await wETHContract.balanceOf(owner.address)
            console.log("Balance of Owner: ", ethers.utils.formatEther(bal), " $wETH")
        })
    })
    describe('Staking', function () {
        it('unstakes successfully and increases balance', async () => {
            let bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner prior to minting: ", ethers.utils.formatEther(bal), " $DIRT")
            console.log("Unstaking...")
            //await new Promise(resolve => setTimeout(resolve, 5000)); //gives them time to stake and earn dirt this is the timeout for 30 seconds rn 
            let totalWormsStaked = await ancientTreeContract.totalWormsStaked()
            console.log("Total Worms Staked: ", totalWormsStaked) 
            await ancientTreeContract.claimRewardsAndUnstake([2,3,4], true, BigInt(33636372696322013812339853064557097738409437130383684865192230861215769821184), {from : alice})
            let totalDirt = await ancientTreeContract.getTotalDirtClaimed() 
            console.log("Total Dirt: ", ethers.utils.formatEther(totalDirt))
            bal = await dirtContract.balanceOf(owner.address) 
            console.log("Balance of Owner after unstaking: ", ethers.utils.formatEther(bal), " $DIRT" )
        })
    })

    describe('Calculating reward', async () => {
        it('mints 10 new tokens for calculating rewards', async () => {
            await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.55'))
            await gameContract.mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            await new Promise(resolve => setTimeout(resolve, 5000));
            await gameContract.mint(1,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
        })    
        it('calculates the reward of a staked worm', async () => {    
            for(let i =6; i < 15; i++) {
                let traits = await nftContract.getTraits(i)
                if(traits.isWorm){
                    console.log("Strength of token ", i, " is: ", traits.size)
                    let reward = await ancientTreeContract.calculateReward(i)
                    console.log("Reward of token ", i, " is: ", ethers.utils.formatEther(reward), " $DIRT")
                }
                
            } 
        })
        it('claims worms and updates the totalDirtClaimed', async () => {    
            await ancientTreeContract.claimRewardsAndUnstake([6,7,8,9,10,11,12,13,14,15], true, BigInt(33636372696322013812339853064557097738409437130383684865192230861215769821184), {from : alice})
            let totalDirt = await ancientTreeContract.getTotalDirtClaimed() 
            console.log("Total Dirt Claimed: ", ethers.utils.formatEther(totalDirt))
        })
    })

    describe('Getting staked birds/worms', async () => {
        it('returns staked birds', async () => {
            await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.55'))
            await gameContract.mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            
            for(let i = 16; i < 25; i++) {
                if(await nftContract.isWorm(i)) {
                    console.log("It is a worm")
                    let traits = await nftContract.getTraits(i)
                    let size = traits.size
                    console.log(size)
                    let location = await ancientTreeContract.wormHierarchy(i)
                    let readableLocation = location.toString()
                    let result = await ancientTreeContract.wormStakeByStrength(size, readableLocation)
                    console.log(result)
                    if(result.owner == owner.address) {
                        ownedByUser = true
                    }
                }
                else {
                    console.log("It is a bird")
                    let traits = await nftContract.getTraits(i)
                    let size = 8 - traits.size
                    let location = await ancientTreeContract.birdHierarchy(i)
                    let readableLocation = location.toString()
                    console.log(typeof(readableLocation))
                    //let result = await ancientTreeContract.birdStakeBySize(size, readableLocation)
                    let result = await ancientTreeContract.birdStakeBySize(size, location)
                    console.log(result)
                    if(result.owner == owner.address) {
                        ownedByUser = true
                    }
                }
            }
            
        })
        it('unstakes successfully', async () => {
            await ancientTreeContract.claimRewardsAndUnstake([16,17,18,19,20,21,22,23,24,25], true, BigInt(33636372696322013812339853064557097738409437130383684865192230861215769821184))
            console.log("successfully unstaked")
        })
    })
})
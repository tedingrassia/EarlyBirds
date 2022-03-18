const { expect } = require("chai");

describe("Early Birds Game Contract Testing", function () {
    
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
            let traits = await nftContract.getTraits(1)
            console.log(traits)
        })
        it('mints successfully with staking', async () => {
            await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.15'))
            await gameContract.mint(3,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184), {from: alice})  
            let bal = await wETHContract.balanceOf(owner.address)
            console.log("Balance of Owner: ", ethers.utils.formatEther(bal), " $wETH")

            let traits = await nftContract.getTraits(2)
            let strength = traits.size
            console.log("Strength of worm 2 : ", strength)

            traits = await nftContract.getTraits(3)
            strength = traits.size
            console.log("Strength of worm 3 : ", strength)

            traits = await nftContract.getTraits(4)
            strength = traits.size
            console.log("Strength of worm 4 : ", strength)

        })
    })
})
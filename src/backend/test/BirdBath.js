const { expect } = require("chai");

describe("Early Birds Bird Bath Contract Testing", function () {
    
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
            birdBathContract = await birdBath.deploy("https://bafkreibmddszibrpxbik4pbqggahpncmk5krcjkyc73wkp3756vr2pnpky.ipfs.nftstorage.link/");

            ancientTree = await ethers.getContractFactory("AncientTree");
            ancientTreeContract = await ancientTree.deploy();

            random = await ethers.getContractFactory("RandomNumberConsumer");
            randomContract = await random.deploy();
            
            nft = await ethers.getContractFactory("EarlyBirdsNFT");
            nftContract = await nft.deploy(dirtContract.address, gameContract.address, randomContract.address, wETHContract.address, ancientTreeContract.address);
            
            [owner, alice, bob] = await ethers.getSigners();

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
    describe('Feather Testing', function () {
        it('Sets the contracts and the Type ID', async () => {
            await birdBathContract.setContracts(dirtContract.address)
            await birdBathContract.setType(0, 100)
            //add admin
            await birdBathContract.addAdmin(owner.address)
            //unpausing
            await birdBathContract.setPaused(false)
        })
        it('Mints a feather', async () =>{
            await birdBathContract.mint(0, 1, owner.address)
            await birdBathContract.balanceOf(owner.address, 0)
        })
        it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
            await gameContract.setMintingStatus(true)
            await gameContract.setGen0MintingStatus(true)
            await nftContract.addAdmin(ancientTreeContract.address)
            await birdBathContract.addAdmin(gameContract.address)
        })
        it('Mints birds/worms to owner and to alice in preparation for claiming', async () => {
            let bal = await wETHContract.balanceOf(owner.address)
            console.log("Balance of Owner: ", ethers.utils.formatEther(bal))
            
            await wETHContract.transfer(alice.address, ethers.utils.parseEther("10"))
            bal = await wETHContract.balanceOf(alice.address)
            console.log("Balance of Alice: ", ethers.utils.formatEther(bal))

            await dirtContract.mint(alice.address, ethers.utils.parseEther("3000000"))
            bal = await dirtContract.balanceOf(alice.address)
            console.log("Balance of Alice in $DIRT: ", ethers.utils.formatEther(bal))

            await dirtContract.mint(owner.address, ethers.utils.parseEther("3000000"))
            bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT: ", ethers.utils.formatEther(bal))
            
            for(let i =0; i < 10; i++) {
                await wETHContract.approve(gameContract.address, ethers.utils.parseEther('.5'))
                await gameContract.mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))

                await wETHContract.connect(alice).approve(gameContract.address, ethers.utils.parseEther('.5'))
                await gameContract.connect(alice).mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            }
            
            bal = await dirtContract.balanceOf(alice.address)
            console.log("Balance of Alice in $DIRT: ", ethers.utils.formatEther(bal))

            bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT: ", ethers.utils.formatEther(bal))
        })
        it('Mints Feathers the correct way', async () => {
            let bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT before mint: ", ethers.utils.formatEther(bal))

            let featherBal = await birdBathContract.balanceOf(owner.address, 0)
            console.log("Balance of feathers of Owner before mint: ", featherBal)

            await gameContract.makeFeather(10)

            bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT after mint: ", ethers.utils.formatEther(bal))

            featherBal = await birdBathContract.balanceOf(owner.address, 0)
            console.log("Balance of feathers of Owner after mint: ", featherBal)
        })
    })
    describe('Buy Secret Key/Eggs Testing', function () {
        it('Sets the Type ID of 1 and 2 (Keys)', async () => {
            await birdBathContract.setType(1, 100)
            await birdBathContract.setType(2, 100)
        })
        it('Successfully gives an NFT Type 1 from birdBath for paying tribute', async () => {
            let bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT before mint: ", ethers.utils.formatEther(bal))

            let featherBal = await birdBathContract.balanceOf(owner.address, 1)
            console.log("Balance of NFT type 1 of Owner before mint: ", featherBal)

            await gameContract.buySecretKey(ethers.utils.parseEther('25000'))

            bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT after mint: ", ethers.utils.formatEther(bal))

            featherBal = await birdBathContract.balanceOf(owner.address, 1)
            console.log("Balance of NFT type 1 of Owner after mint: ", featherBal)
        })
        it('Successfully gives an NFT Type 2 from birdBath for paying tribute with 2*minting cost of dirt', async () => {
            let bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT before mint: ", ethers.utils.formatEther(bal))

            let featherBal = await birdBathContract.balanceOf(owner.address, 2)
            console.log("Balance of NFT type 2 of Owner before mint: ", featherBal)

            await gameContract.buySecretKey(ethers.utils.parseEther('50000'))

            bal = await dirtContract.balanceOf(owner.address)
            console.log("Balance of Owner in $DIRT after mint: ", ethers.utils.formatEther(bal))

            featherBal = await birdBathContract.balanceOf(owner.address, 2)
            console.log("Balance of NFT type 2 of Owner after mint: ", featherBal)
        })
        it('Sets the URI of feather', async () => {
            //await birdBathContract.setTypeURI(0, "https://bafkreibmddszibrpxbik4pbqggahpncmk5krcjkyc73wkp3756vr2pnpky.ipfs.nftstorage.link/")
            await birdBathContract.setTypeURI(1, "test1")
            console.log("URI of 0: ", await birdBathContract.uri(0))
            console.log("URI of 1: ", await birdBathContract.uri(1))
            console.log("URI of 2: ", await birdBathContract.uri(2))
            console.log("URI of 3: ", await birdBathContract.uri(3))
        })
    })
})
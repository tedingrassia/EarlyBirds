async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const game = await ethers.getContractFactory("EarlyBirdsGame");
    const gameContract = await game.deploy();
    console.log("Deployed Game Contract to: ", gameContract.address)

    const dirt = await ethers.getContractFactory("Dirt");
    const dirtContract = await dirt.deploy();
    console.log("Deployed Dirt Contract to: ", dirtContract.address)

    const traits = await ethers.getContractFactory("EarlyBirdsTraits");
    const traitsContract = await traits.deploy();
    console.log("Deployed Traits Contract to: ", traitsContract.address)

    const wETH = await ethers.getContractFactory("testERC20");
    const wETHContract = await wETH.deploy();
    console.log("Deployed testERC20 Contract to: ", wETHContract.address)

    const birdBath = await ethers.getContractFactory("BirdBath");
    const birdBathContract = await birdBath.deploy("Bird Bath");
    console.log("Deployed Bird Bath Contract to: ", birdBathContract.address)

    const ancientTree = await ethers.getContractFactory("AncientTree");
    const ancientTreeContract = await ancientTree.deploy();
    console.log("Deployed Ancient Tree Contract to: ", ancientTreeContract.address)

    const random = await ethers.getContractFactory("RandomNumberConsumer");
    const randomContract = await random.deploy();
    console.log("Deployed Random Contract to: ", randomContract.address)
    
    const nft = await ethers.getContractFactory("EarlyBirdsNFT");
    const nftContract = await nft.deploy(dirtContract.address, gameContract.address, randomContract.address, wETHContract.address, ancientTreeContract.address);
    //const nfContract = await nft.deploy("0x96dbDAed42867AcBBC8A4a18C26817fFb5d40DF0", "0xE01743AeE99518097368aE2f1A71fA34E338be42", "0xB8584132BadB4da4eDEB0bA68f97e5989cebFEa2", "0x5DAEA3fe63447516e4dea37152763E691F46236B", "0xbd2575b6fAA0a8534f96B9957B35deFefF8a2C68")
    console.log("Deployed NFT Contract to: ", nftContract.address)
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
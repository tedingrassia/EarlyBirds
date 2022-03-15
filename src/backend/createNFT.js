import {nftAbi, dirtAbi, gameAbi, randAbi} from "./backendConstants.js"
import { ethers } from "ethers"

const nftAddress = "0x6bF9E95Aa7b19DD60f4554e4fF2Dc8D1F0a79FA1"
const dirtAddress = "0x5548C90FcA73c3b2B4aeEf02687D8EE339E4Bbb9"
const gameAddress = "0xdC71253b62Eb6D2ED150eE2390BFf9f4D43B2BaE"
const randAddress = "0xd8eA73c0c42ECC0390e7F8DbDFaB34fBB0884158"

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner()

export async function getAddress() {
  const signer = await provider.getSigner()
  try {
    const address = await signer.getAddress()
    return address;
  } catch {
    return "not connected"
  }
}

const earningRatePerSecond = 0.11574074074 //10000 dirt per day in seconds

export async function connectToMetamask() { 
    //let accounts = await provider.send("eth_requestAccounts", []);
    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    console.log("Accounts: ", accounts)
   // console.log("Account: ", await signer.getAddress())
    console.log(ethereum.selectedAddress)
}

//when multiple accounts are connected, log the switch of accounts
ethereum.on('accountsChanged', async function() {
  //currentAccount = await getAccount()
  console.log("Changed accounts to: ")
})

const nftContract = new ethers.Contract(nftAddress, nftAbi, provider)
const randContract = new ethers.Contract(randAddress, randAbi, provider)
const gameContract = new ethers.Contract(gameAddress, gameAbi, provider)
const dirtContract = new ethers.Contract(dirtAddress, dirtAbi, provider)


const nftContractWithSigner = nftContract.connect(signer)
const randContractWithSigner = randContract.connect(signer)
const gameContractWithSigner = gameContract.connect(signer)
const dirtContractWithSigner = dirtContract.connect(signer)

async function getRandom() {
    let randomNum = await randContractWithSigner.getRandomNumber()
    console.log(randomNum)
}

async function randomizeSeed() {
  let randSeed = await randContractWithSigner.randomizeSeed()
  console.log(randSeed)
}

async function getCurrentSeed() {
  let currentSeed = await randContract.getCurrentSeed()
  //console.log(currentSeed)
  readableSeed = BigInt(parseInt(currentSeed._hex, 16));
  //return currentSeed
  //const addressInBase10 = parseInt(currentSeed._hex,16)
  //console.log(addressInBase10)
  return readableSeed
}

export async function mintTokens(address, stake, amount) {
  let seed = await getCurrentSeed()
  let cost = amount*.05
  cost = cost.toString()
  console.log(seed)
  let result = await nftContractWithSigner.mint(amount, stake, seed, {value: ethers.utils.parseEther(cost), from:address, gasLimit: 2500000})
  console.log(result)
  let tokenIds = []

  await nftContract.on("Transfer", (from , to, token) => {
    let tokenId = parseInt(token._hex,16)
    console.log(from, " sent ", tokenId, " to ", to)
    tokenIds.push(tokenId)
  })

  console.log(tokenIds)

  return tokenIds

  //filter = nftContract.filters.Transfer("0x0", address)
  //console.log(filter)
  
  //let event = result.logs[0]
  //let token = event.args.tokenId;
  //return token
}

gameContract.on("TokenStaked", (kind, tokenId, owner) => {
  console.log(tokenId, " of type ", kind, " staked by ", owner)
})

export async function setContracts(dirt, nft) {
  await gameContractWithSigner.setContracts(dirt, nft)
}

export async function ownerOf(tokenId) {
  let owner = await nftContract.ownerOf(tokenId)
  console.log(owner)
}

export async function getTraits(tokenId) {
  let traits = await nftContract.getTraits(tokenId)
  console.log(traits)
}

export async function getTotalDirtMinted() {
  let totalDirt = await gameContract.totalDirtEarned()
  let readableTotalDirt = ethers.utils.formatEther(BigInt(parseInt(totalDirt._hex,16))) 
  console.log(readableTotalDirt)
  return readableTotalDirt
}

export async function getTotalWormsStaked() {
  let wormsStaked = await gameContract.totalWormsStaked()
  console.log(wormsStaked)
  return wormsStaked
}

export async function getTotalBirdsStaked() {
  let birdsStaked = await gameContract.totalBirdsStaked()
  console.log(birdsStaked)
  return birdsStaked
}

//will return 0 until the maxGen0Supply has been reached, then will return cost in dirt
export async function getCurrentMintCost() {
  let currentToken = await nftContract.numMinted()
  let mintCost = await nftContract.getMintDirtCost(currentToken)
  let readableMintCost = ethers.utils.formatEther(BigInt(parseInt(mintCost._hex,16))) 
  return readableMintCost
}

export async function claimRewardsAndUnstake(tokenIds, unstake) {
  let seed = await getCurrentSeed()
  let allowUnstake
  for(let i = 0; i < tokenIds.length; i++) {  
    let stake = await gameContract.wormStakeByToken(tokenIds[i])
    let owner = stake.owner
    if(owner != await signer.getAddress()) {
      allowUnstake = false
    }
    else {
      allowUnstake = true
    }
  }
  if(allowUnstake) {
    await gameContractWithSigner.claimRewardsAndUnstake(tokenIds, unstake, seed)
    //console.log(result)
  }
  else {
    console.log("Only owner of token can unstake!")
  }
}

export async function stakeTokens(tokenIds) {
  let result = await gameContractWithSigner.stakeTokens(signer.getAddress(), tokenIds)
  console.log(result)
}

export async function balanceOf() {
  const address = await signer.getAddress();
  let bal = await nftContract.balanceOf(address)
  let readableBal = ethers.utils.formatEther(bal)
  console.log("Balance: ", readableBal)
  return readableBal;
}

export async function unrealizedWormDirt(tokenId) {
  let stake = await gameContract.wormStakeByToken(tokenId)
  let stakeTime = stake.time
  console.log(stakeTime)
  let currentTime = Math.floor(Date.now() / 1000)
  console.log(currentTime)
  let timeStaked = currentTime - stakeTime
  let dirtEarned = timeStaked * earningRatePerSecond
  console.log(dirtEarned, " unclaimed dirt for token: ", tokenId)
}

//can run this function at the load of the webpage, then can calculate the
//unclaimed rewards based on this
export async function usersUnstakedTokens() {
  let tokens = await nftContract.tokensOf(signer.getAddress())
  console.log(tokens)
  return tokens
}

export async function usersStakedTokens() {
  let stakedWorms = []
  let stakedBirds = []
  let stakedTokens = []
  let numMinted = await nftContract.numMinted()
  for(let i =0; i < numMinted; i++) {
      if(await nftContract.isWorm(i)) {
          let result = await gameContract.wormStakeByToken(i)
          if(result.owner == signer.getAddress()) {
              stakedWorms.push(i)
              stakedTokens.push(i)
          }
      }
      else {
          let traits = await nftContract.getTraits(i)
          let size = traits.size
          let location = await gameContract.birdHierarchy(i)
          let readableLocation = location.toString()
          let result = await gameContract.birdStakeBySize(size,readableLocation)
          if(result.owner == signer.getAddress()) {
              stakedBirds.push(i)
              stakedTokens.push(i)
          }
      }
  }
  console.log("Staked Worms of: ", signer.getAddress(), " are: ", stakedWorms)
  console.log("Staked Birds of: ", signer.getAddress(), " are: ", stakedBirds)

  return stakedTokens

}

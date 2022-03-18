const dirt = artifacts.require('./Dirt.sol')
const nft = artifacts.require('./EarlyBirdsNFT.sol')
const game = artifacts.require('./EarlyBirdsGame.sol')
const traits = artifacts.require('./EarlyBirdsTraits.sol')
const weth = artifacts.require('./testERC20.sol')
const birdbath = artifacts.require('./BirdBath.sol')
const ancienttree = artifacts.require('./AncientTree.sol')
const random = artifacts.require('./RandomNumberConsumer.sol')

contract('Testing Early Birds Code Migration', (accounts) => {
    let dirtContract
    let nftContract
    let gameContract
    let traitsContract
    let wETHContract
    let birdBathContract
    let ancientTreeContract
    let randomContract
    let [alice, bob, teddy, cammy] = accounts

    console.log(accounts)

    //deploys token and tests to ensure that token deployed properly
    describe('deployment\n', async () => {
        //tests to make sure the contract deployed successfully
        it('deploys successfuly', async () => {
            dirtContract = await dirt.deployed()
            nftContract = await nft.deployed()
            gameContract = await game.deployed()
            traitsContract = await traits.deployed()
            wETHContract = await weth.deployed()
            birdBathContract = await birdbath.deployed()
            ancientTreeContract = await ancienttree.deployed()
            randomContract = await random.deployed()
            
            console.log("Dirt Contract.address: ", dirtContract.address)
            console.log("Worm Contract.address: ", nftContract.address)
            console.log("Game Contract.address: ", gameContract.address)
            console.log("Trait Contract address: ", traitsContract.address)
            console.log("wETH Contract address: ", wETHContract.address)
            console.log("BirdBath Contract address: ", birdBathContract.address)
            console.log("AncientTree Contract address: ", ancientTreeContract.address)
            console.log("RandomNumberConsumer Contract address: ", randomContract.address)
            
            console.log("Alice address: ", alice)
            console.log("Bob address: ", bob)
            console.log("Teddy address: ", teddy)
            console.log("Cammy address: ", cammy)
        })
        it('sets the contracts properly', async () => {
            console.log("Setting contract addresses in game contract and ancient tree contract")
            await gameContract.setContracts(dirtContract.address, nftContract.address, randomContract.address, birdBathContract.address, ancientTreeContract.address, wETHContract.address)
            await ancientTreeContract.setContracts(dirtContract.address, nftContract.address, randomContract.address, gameContract.address)
            await dirtContract.addAdmin(ancientTreeContract.address)
            await dirtContract.addAdmin(alice)
            await gameContract.setGen0MintingStatus(true)
        })
    })
    // describe('mints and stakes tokens using new file structure', async () => {
    //     it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
    //         await gameContract.setMintingStatus(true)
    //         await gameContract.setGen0MintingStatus(true)
    //         await nftContract.addAdmin(ancientTreeContract.address)
    //     })
        // it('Mints Test wETH to use as payment for minting', async () => {
        //     await wETHContract.addAdmin(alice)
        //     await wETHContract.mint(alice, web3.utils.toWei('3', 'ether'))

        //     let bal = await wETHContract.balanceOf(alice)
        //     console.log("Balance of Alice: ", web3.utils.fromWei(bal), " $wETH")
        // })
        // it('Tries to mint an NFT without being approved to transfer the ERC20 from the user -- should fail', async () => {
        //     await gameContract.mint(1, true, BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
        // })
        // it('Approves contract to use wETH from user, then uses wETH as payment for minting', async () => {
        //     await wETHContract.approve(gameContract.address, web3.utils.toWei('.05', 'ether'))
        // })
        // it('mints successfully without staking', async () => {
        //     await gameContract.mint(1,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
        //     let traits = await nftContract.getTraits(1)
        //     console.log(traits)
        // })
        // it('mints successfully with staking', async () => {
        //     await wETHContract.approve(gameContract.address, web3.utils.toWei('.15', 'ether'))
        //     let result = await gameContract.mint(3,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184), {from: alice})  
        //     let bal = await wETHContract.balanceOf(alice)
        //     console.log("Balance of Alice: ", web3.utils.fromWei(bal), " $wETH")

        //     let traits = await nftContract.getTraits(2)
        //     let strength = traits.size
        //     console.log("Strength of worm 2 : ", strength)

        //     traits = await nftContract.getTraits(3)
        //     strength = traits.size
        //     console.log("Strength of worm 3 : ", strength)

        //     traits = await nftContract.getTraits(4)
        //     strength = traits.size
        //     console.log("Strength of worm 4 : ", strength)

        // })
        // it('unstakes successfully and increases balance', async () => {
        //     let bal = await dirtContract.balanceOf(alice)
        //     console.log("Balance of Alice prior to minting: ", web3.utils.fromWei(bal), " $DIRT")
        //     console.log("Unstaking...")
        //     await new Promise(resolve => setTimeout(resolve, 5000)); //gives them time to stake and earn dirt this is the timeout for 30 seconds rn 
        //     let totalWormsStaked = await ancientTreeContract.totalWormsStaked()
        //     console.log("Total Worms Staked: ", totalWormsStaked.toString(10)) 
        //     await ancientTreeContract.claimRewardsAndUnstake([2,3,4], true, BigInt(33636372696322013812339853064557097738409437130383684865192230861215769821184), {from : alice})
        //     let totalDirt = await ancientTreeContract.getTotalDirtEarned() 
        //     let readableDirt = totalDirt.toString(10)
        //     console.log("Total Dirt in wei: ", readableDirt)
        //     console.log("Total Dirt: ", web3.utils.fromWei(readableDirt))
        //     bal = await dirtContract.balanceOf(alice) 
        //     console.log("Balance of Alice after unstaking: ", web3.utils.fromWei(bal), " $DIRT" )

        // })
    //     it('gets the stake time, block time, current time, and strength', async () => {
    //         await wETHContract.approve(gameContract.address, web3.utils.toWei('.05', 'ether'))
    //         await gameContract.mint(1,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
    //         await new Promise(resolve => setTimeout(resolve, 5000));
    //         for(let i = 2; i < 6; i++) {
    //             console.log("TOKEN: ", i)

    //             let currentBlock = await web3.eth.getBlock("latest")
    //             console.log("Block.time: ", currentBlock.timestamp)
    //             let lastClaimTimeStamp = await ancientTreeContract.lastClaimTimestamp()
    //             console.log("Last claim timestamp: ", lastClaimTimeStamp.toString(10))

    //             let stake = await ancientTreeContract.wormStakeByToken(i)
    //             let stakeTime = stake.time
    //             console.log("Stake time: ", stakeTime.toString(10))

    //             let difference = currentBlock.timestamp - stakeTime
    //             console.log("Difference: ", difference)

    //             //log strength
    //             // let strength = await ancientTreeContract._getWormStrength(i)
    //             // let readableStrength = strength.toString()
    //             // console.log("Strength: ",readableStrength)

    //             let traits = await nftContract.getTraits(i)
    //             console.log("Is Worm?: ", traits.isWorm)
    //             if(traits.isWorm && stakeTime != 0) {
    //                 //log reward
    //                 let reward = await ancientTreeContract.calculateReward(i)
    //                 console.log("Reward With Bonus for Worm: ", web3.utils.fromWei(reward.toString(10)))

    //                 //log worm strength bonus 
    //                 let wormStrengthBonus = await ancientTreeContract._getWormStrengthBonus(i)
    //                 console.log("Worm Strength Bonus: ", web3.utils.fromWei(wormStrengthBonus.toString(10)))
    //             }
    //             else if(!traits.isWorm) {
    //                 let reward = await ancientTreeContract.calculateReward(i)
    //                 console.log("Reward for Bird: ", web3.utils.fromWei(reward.toString(10)))
    //             }
    //             else {
    //                 console.log("Token not staked or is bird!")
    //             }
                

    //             let totalDirt = await ancientTreeContract.getTotalDirtEarned() 
    //             let readableDirt = totalDirt.toString(10)
    //             console.log("Total Dirt: ", web3.utils.fromWei(readableDirt))
    //             console.log("-----------------------------\n")
    //         }
                
            
    //         let bal = await dirtContract.balanceOf(alice)
    //         console.log("Balance of Alice after unstaking: ", web3.utils.fromWei(bal), " $DIRT")
    //     })
    //     it('pays bird tax when claiming reward without unstaking and updates balance of claimer', async () => {
    //         let currentBlock = await web3.eth.getBlock("latest")
    //         console.log("Block.time: ", currentBlock.timestamp)
    //         let lastClaimTimeStamp = await ancientTreeContract.lastClaimTimestamp()
    //         console.log("Last claim timestamp: ", lastClaimTimeStamp.toString(10))

    //         let stake = await ancientTreeContract.wormStakeByToken(2)
    //         let stakeTime = stake.time
    //         console.log("Stake time for token 2: ", stakeTime.toString(10))

    //         await wETHContract.approve(gameContract.address, web3.utils.toWei('.15', 'ether'))
    //         await gameContract.mint(3,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184), {from: alice})  
            
    //         currentBlock = await web3.eth.getBlock("latest")
    //         console.log("Block.time: ", currentBlock.timestamp)
    //         lastClaimTimeStamp = await ancientTreeContract.lastClaimTimestamp()
    //         console.log("Last claim timestamp: ", lastClaimTimeStamp.toString(10))
    //         let difference = currentBlock.timestamp - stakeTime
    //         console.log("Difference: ", difference)

    //         stake = await ancientTreeContract.wormStakeByToken(2)
    //         stakeTime = stake.time
    //         console.log("Stake time for token 2: ", stakeTime.toString(10))

    //         await ancientTreeContract.claimRewardsAndUnstake([2,3,4], false, BigInt(45012372696322013812339853064557097738409437130383684865192230861215769821184), {from : alice})
    //         let totalDirt = await ancientTreeContract.getTotalDirtEarned() 
    //         let readableDirt = totalDirt.toString(10)
    //         console.log("Total Dirt: ", web3.utils.fromWei(readableDirt))
    //         let bal = await dirtContract.balanceOf(alice) 
    //         console.log("Balance of Alice after unstaking: ", web3.utils.fromWei(bal), " $DIRT" )
    //     })
    //     it('gets the stake time, block time, current time, and strength', async () => {
    //         await new Promise(resolve => setTimeout(resolve, 5000));
    //         for(let i = 2; i < 6; i++) {
    //             console.log("TOKEN: ", i)

    //             let currentBlock = await web3.eth.getBlock("latest")
    //             console.log("Block.time: ", currentBlock.timestamp)
    //             let lastClaimTimeStamp = await ancientTreeContract.lastClaimTimestamp()
    //             console.log("Last claim timestamp: ", lastClaimTimeStamp.toString(10))

    //             let stake = await ancientTreeContract.wormStakeByToken(i)
    //             let stakeTime = stake.time
    //             console.log("Stake time: ", stakeTime.toString(10))

    //             let difference = currentBlock.timestamp - stakeTime
    //             console.log("Difference: ", difference)

    //             //log strength
    //             // let strength = await ancientTreeContract._getWormStrength(i)
    //             // let readableStrength = strength.toString()
    //             // console.log("Strength: ",readableStrength)


    //             let traits = await nftContract.getTraits(i)
    //             console.log("Is Worm?: ", traits.isWorm)
    //             if(stakeTime != 0) {
    //                 //log reward
    //                 let reward = await ancientTreeContract.calculateReward(i)
    //                 console.log("Reward With Bonus for Worm: ", web3.utils.fromWei(reward.toString(10)))

    //                 //log worm strength bonus 
    //                 let wormStrengthBonus = await ancientTreeContract._getWormStrengthBonus(i)
    //                 console.log("Worm Strength Bonus: ", web3.utils.fromWei(wormStrengthBonus.toString(10)))
    //             }
    //             else if(!traits.isWorm) {
    //                 let reward = await ancientTreeContract.calculateReward(i)
    //                 console.log("Reward for Bird: ", web3.utils.fromWei(reward.toString(10)))
    //             }
    //             else {
    //                 console.log("Token not staked!")
    //             }

    //             let totalDirt = await ancientTreeContract.getTotalDirtEarned() 
    //             let readableDirt = totalDirt.toString(10)
    //             console.log("Total Dirt: ", web3.utils.fromWei(readableDirt))
    //             console.log("----------------------------------------------------------\n")
    //         }
                
            
    //         let bal = await dirtContract.balanceOf(alice)
    //         console.log("Balance of Alice after unstaking: ", web3.utils.fromWei(bal), " $DIRT")
    //     })
    // })

    // describe('Testing seed use and minting of NFTs with traits', async () => {
    //     it('creates different traits with different seeds', async () => {
    //         await wETHContract.approve(gameContract.address, web3.utils.toWei('.1', 'ether'))
    //         let result = await gameContract.mint(2, false, BigInt(56789012013812339853064557097738409437130383684865192230861215769821184), {from : alice})
    //         let event = result.logs[0]
    //         console.log(event)
    //         let traits = await nftContract.getTraits(5)
    //         console.log(traits)

    //         traits = await nftContract.getTraits(6)
    //         console.log(traits)

    //         traits = await nftContract.getTraits(4)
    //         console.log("Traits of token 4: ", traits)
    //     })
    // })

    // describe('transfer tokens\n', async () => {
    //     it('transfers $DIRT properly', async () => {
    //         await dirtContract.mint(alice, web3.utils.toWei('100', 'ether'))
    //         let bal = await dirtContract.balanceOf(alice)
    //         console.log("Balance of Alice prior to transfer: ", web3.utils.fromWei(bal), " $DIRT")
    //         console.log("Transferring...")

    //         //console.log("Allowance is: ", await contract.allowance(alice, bob))

    //         await dirtContract.transfer(bob, web3.utils.toWei('10'),{from:alice})

    //         bal = await dirtContract.balanceOf(alice)
    //         console.log("Balance of Alice after transfer: ", web3.utils.fromWei(bal), " $DIRT" )
    //     })
    // })

    // describe('Testing Upload Art', async () => {
    //     it('Uploads Art To Block Chain', async () => {
    //         //Body
    //         let result = await traitsContract.uploadTraits(0,[0,1,2,3,4],[
    //             ["normal","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWIVjYBgFo2AUjIKRDhhJUPufSuaQpfH/+kx7BiUZCRRBNiEIXzNzItmOIEYTVsthgJmTh4GZk4dsRzARowiX5QwMDAx/v38h1U7SHUAI/Hr3YmAdQAkYdcCQcACjfvVKvAr0q1cyaEoJ0qwcgIH/F1vDcVp+/dl7cuwnvShGdgRSyJBdFJMC/q/PtP8Pdch/ND5R+pEwHLCQ6or1mfakamFggBbnDAyQUlW/euV/BmiokewAfMUyOXpJyoaB0w+i8AnlDlqA/+iYyHSAoQ8mQa80wICWBuDiJDsAZgiR4D/Mclx6SC6KCaQD9OjB0I9eapJTgGDE98XWcAb96pUY0QPzNbIc1ANwe8mKAuT4RAfYxGAOZGBgYFAW5WG8+xrRigIAsUpkeNRBduMAAAAASUVORK5CYII="],
    //             ["maroon","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARdJREFUWIXtVEsOwiAQfTXGRI0xcedK4r538Co9SFcepDfxElygrly70cTNuLAQSn8MpSZGXsKCgcc8mOEBEREREf+OhLGXAp3jRaRcCBw3m1pwu1pht17jdLl4i3AhtSYPJWLusqkrOQDcHw9uzhpmo9gBRAQRMAZRwE8ISDIpezdkUuKwXE7mAwpUpGln8uvz6ZOfb8WmCONlvK2YA8qFoEoIWXMnvjE0nJzQRC4ElwJUdg58XDWTklC9GltAny37cFnf8FyWtfnQ75gCZA/HPmjw1MK3egBWD+g4W4A6xBGkkndx2FY80Ad2eRp82zV9DKRR7yJNkUnZKI+6tblWXUDn9SqBWU8bbTElEAD2i0Vye7302huhrmNo03JuMAAAAABJRU5ErkJggg=="],
    //             ["green","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAR1JREFUWIXtVEsKwjAQffUDglSxqCAeqEt3HqKnyMIzeIjewLO4FhdKBd240XFhU9L0YyZWQcyDLDLJy7xkJg9wcHBw+Hd4jL3U0DlWRAojH8NpNxccz3sIpn2sFltrESak0uRNieiYbKpKDgDH3ZWbM4fWW+wGRDQi4B04AT8hwItFUrshFglGs/bHfECCliKoTH7a32zy861YFaG8jLUVc0Bh5FMqhLS5EV8ZGYycUEUY+VwKkNo58HTVWCSE9NXYAups2YbL+oab9SU3f/U7PgHSh2EfFHhy4Vs9AK0HsjhbgDzEECSTV3HYVvyiD/TyFPi6a9oYSKHeSxEgFkmhPPLW6lp6gSyvVQnUeuooi0mBADCYtLzz4Z6tPQDncmMVphhcWAAAAABJRU5ErkJggg=="],
    //             ["pink","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAStJREFUWIVjYBgFo2AUjIKRDhhJUPufSuaQpfH/puAcBlVlVRRBXgUZBgYGBgaZrGCyHUGMJqyWwwCbhDADOwcn2Y5gIkYRLssZGBgYfr14S6qdpDuAEPj84MnAOoASMOqAIeEARs2ufLwKNLvyGbTFZWlWDsDA/+tlE3FafvXlY3LsJ70oRnYEUsiQXRSTAv5vCs75D3XIfzQ+UfqRMBywkOqKTcE5pGphYIAW5wwMkFJVsyv/PwM01Eh2AL5imRy9JGVDv7VTUPiEcgctwH90TGQ6wNAHk6BXGmBASwNwcZIdADOESPAfZjkuPSQXxQTSAXr0YOhHLzXJKUAw4vt62UQGza58jOiB+RpZDuoBuL1kRQFyfKIDbGIwBzIwMDAoC4gy3v3wGi4HAHt9ZKTGQG3aAAAAAElFTkSuQmCC"],
    //             ["gold","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUVJREFUWIXtVDFOAzEQHKOTkgJOpIihQEhAgYQE+QDSdfmDv0DFa+4L+YM7noBOooOCMhESClBQwFJwtozNJfaSQIFHcuG1xzv2rgfIyMjI+O8QCXtpReewiNTUFXYGPRsoyj0Mijmwew4xumSLiCEFyV1sDY/QHx6zRRQxm7qSA8DT7Bb9t1lqXosNNtPBwwufuxIB76/zvxXwE2QBMQKEVLr7gF4JqTTODsq1+YABTSfjICiVxuhwW1zfPXLyp1uxK8J5GbYVp4CauqJWCHnzKL4zLKKc0EVTV6kUoLVz4NNVpdKE9tWSBSyyZQ436RueXlx9mS/6HesC+SOyDwKeWfitHoDXAzaeLMAcEgkyybs4yVa8pA/88gR83zU5BhLUezoZQyodlMfc2l1rL2Dzskrg1tPHdzEjEABO9jfFzf2zXfsAzGBpZPMh+OoAAAAASUVORK5CYII="]])
    //         console.log(result)
    //         //Eyes
    //         await traitsContract.uploadTraits(1,[0,1,2,3,4,5,6,7,8,9,10,11],[
    //             ["angry","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADxJREFUWIXtzrENADAIA0HIjuw/irMBgiCKSH+daXgzAAA+ouKt5Qwixs9bAZLSvR6wpRPgEeHJBgAATy5ulQwBBYr/VgAAAABJRU5ErkJggg=="],
    //             ["angryred","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEhJREFUWIXtzjEKACAMQ1HNvdx7AO/q6YpujkoVB+G/LYWSpAQAwC9M6iZtb1HR71loUr9qjg5o7sv8fMArkQG51JoXGQAAHBlaqQz9y3V3RAAAAABJRU5ErkJggg=="],
    //             ["big","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE5JREFUWIXtz7ENwCAMBVF/xIrefxTThCohYJSI5p5EczICmwEAcJhWByMi+h1Jw5ZVko+/th01MyzJ3H3aPndt28+w/fmB25ZPDQAA7GiXTCXwrljN1gAAAABJRU5ErkJggg=="],
    //             ["bigblue","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGJJREFUWIVjYBgFo2AUjIJRMAoGGDASq3Danvf/YXqyXARxipEKmEi0HK8YOYCFFMVZLoIMRnb+BMWoDqC+hWGcYuQAoqKAgYGB0cjOn5EBNc1gExsFo2AUjIJRMApGAckAAHv8HYbLlZNQAAAAAElFTkSuQmCC"],
    //             ["cute","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEpJREFUWIXtz7ENgEAMQ9EYsaL3H8U0R4UOQRDQ/NdZcqKkCgCAn+lqMUn2GUmH3LXeKUsq29P8qvFxZrlrebrgywNkWycZAAC0bFKWFgb04kzxAAAAAElFTkSuQmCC"],
    //             ["cuteblue","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFlJREFUWIVjYBgFo2AUjIJRMAoGGDASq3Danvf/YXqyXAQx+OQCFlIUZ7kIMhjZ+ePkkwOYSNVw7tBGvHyaO4DagBQHMBrZ+TPi4Y+CUTAKRsEoGAWjgCwAAICdEQy8s63yAAAAAElFTkSuQmCC"],
    //             ["normal","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADdJREFUWIXtzrENACAQw8CI/Sf5Jc0ECD0IKl/nJkoiSZJ62HTbuB34egBIVS37OSDAsiVJ0okJv98X7UOxBTwAAAAASUVORK5CYII="],
    //             ["normalpink","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWIXtzrERABAUBNGjIJlSRDrQiSrkmqQCzB9DtC/b5OYkAABgMw5t5m8Hvh4YtannsuznByS5FOKuAQCA2QTGFgqj/VY0WQAAAABJRU5ErkJggg=="],
    //             ["sleepy1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADZJREFUWIXtzrENACAQw8BMmP1nyBJhgkc0ICH5OneWAADAuSZpkqnvD0iq7amfTewaAAD8ZwGpTBbD5cdkdwAAAABJRU5ErkJggg=="],
    //             ["sleepy2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAClJREFUWIXtziEKAAAIBEH//2ktVo2CMAMXtl0EAPBI9qY+O7E1APBPAf3UBfvoXzj+AAAAAElFTkSuQmCC"],
    //             ["snake_color","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFhJREFUWIVjYBgFo2AUjIJRMAqGErh+zuT/9XMmOPnkAEZSLNc0OsMAtZCRgYEBha9pdIYsBzCRpYuKYEg5gNHdRZBxx+53jDj4o2AUjIJRMApGwSggCwAAjIsaatBQ6gUAAAAASUVORK5CYII="],
    //             ["snake_white","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEdJREFUWIXtzjEOgDAMQ1F/7phT5pAwwNKhElQslf7bPMROIknSTs7bNK/gyziQZ5AkQ4bXVYNj6epHWz1AVdHdTLIkSVpyAYYqHwCZYkvBAAAAAElFTkSuQmCC"]])
    //         //Mouths
    //         await traitsContract.uploadTraits(2,[0,1,2,3,4,5,6,7,8,9],[
    //             ["1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACFJREFUWIXtw7EJAAAIA7D+/7QuPcFFSCAJAAAPTQPAiQWyJgH/zhnL9gAAAABJRU5ErkJggg=="],
    //             ["2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAChJREFUWIXtzjERADAIBLD3b5oOKGCixyUKkgAAMFPbgaQTX0QAuOEBibEC/lmfDW4AAAAASUVORK5CYII="],
    //             ["3","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACFJREFUWIXtzgENAAAIA6D3L60xPh0kIAEA4KhpBwD4YwFfJQEAYB/UggAAAABJRU5ErkJggg=="],
    //             ["4","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACRJREFUWIXtzqERAAAIxLDff2nwOA6BSUxtEwAA9mr0dQIAzhr+PAL+VxVP/gAAAABJRU5ErkJggg=="],
    //             ["5","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACpJREFUWIXtzqENADAMA0F3/6EbHFQlpXfsgSUnAADM3EePnc8Tmz0ANAUPIQMA0O7hcwAAAABJRU5ErkJggg=="],
    //             ["6","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADtJREFUWIXtzkENADAIBEGoJXTgokKQUbFNqAcg6Wfnv5cTAQAAwGdaaLLZ992I3GYjW6vY6XEfOQAAeNhaBfw7FwhCAAAAAElFTkSuQmCC"],
    //             ["7","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWIXt0dEJACAIRVFrJedwiwZpjIYNbAcVhLjn/8oDRQAAANBsBBpP9nl3b1+qJbdmNDxmvQOqRAf0/B7Alx7qfgYAq1oZBAAAAABJRU5ErkJggg=="],
    //             ["8","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADFJREFUWIXtzSEOACAMALEt4f9fHgqFGggQrb9cBAAAj2U3qKpabWY734yD5v4KwE8moAAEB8mXv0YAAAAASUVORK5CYII="],
    //             ["9","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADFJREFUWIXtzSESACAMA8F2hv9/uViQBQFi118SAQDAY9kNqqrWPrM9sRkHzd0jAL+Zn/AEB9WaEoMAAAAASUVORK5CYII="],
    //             ["10","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADlJREFUWIXtzrENACAMA8FAmTHYIUuzZFLTxkgU/PUv2wwAAOB3o9Gk2B9mJ9oR6q4sl/vrDwCAOwreOQNNs6fxIgAAAABJRU5ErkJggg=="]])
    //         //Hats
    //         await traitsContract.uploadTraits(3,[0,1,2,3,4,5,6,7,8,9,10],[
    //             ["afro","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPxJREFUWIXtlT0OgzAMhZ+rwoA8cADufzJ2MjDBkC4ERSaJnRbUJd8EkWU//yVAo/FnyGLEzD7+H8cRzjnIMwA0z/N9AmTgJ0S8zJYC51wIKPHM7JnZ5CdbgVL2FqzVUCuQyVLlaI+fpqlo99YCyz4jXbWvq5VsgVJ+WtdV2p8i5HB2XUfLsmSd1QwhISP4EETAdTj3fS86vbQgkf0ZVGYuRTBzcj2rBOScW6kJDvxwD9zFIwKiGVCv+pQA0/tQIgziMAxq+y4CavpdgLZto77vdcPUYbzXwU4TFm0PAfZESm9B+Dwd55x+GxworGFwwsyWmTDdFY1Go9FI8QHEV2UipGmpuAAAAABJRU5ErkJggg=="],
    //             ["baseball","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKBJREFUWIXt0rENwyAQheH/UIor3HkJSk/loZiGMSxYBArbaZzIUpzEpkmK+yQkQMA9EGCM+TE5syjGuKrqy7yqss2L974pgGspHkIAoJRCKQVgnaapKcDt6oYQAuM4PsdbAJz7epdDl3fti+8ty9IU4PAPpJRWgL7vTx2iquScAWQYhksB3r2AAFJrlUf/U5vnWbquO/WhjTHGGGPM37kDofUpt4YnQtoAAAAASUVORK5CYII="],
    //             ["bucket","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH1JREFUWIXt00EKgCAQheFntBDdiPe/2ZxBDyCCLapd2khFm/eBmxzyRxAgop8Z7WBKqV19t9YCgPHefxfQO/yNiFUzlHO+nTkipt3egIi0GKM2YPoWhgHaw59EdANEpDnn1D86hRCmIpbBnqm1GuyR6lVKUb8sIiIiIgKADf8AHN+NEkvrAAAAAElFTkSuQmCC"],
    //             ["cowboy","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJlJREFUWIVjYBgFo2AUDDBgJFZhkZvhf252VgxxqBhjxZqjtHMALsup4QiCDiBkOaWOYMEmmGSr/Z+BgYFx3uGrRBv06tM3BnYWZpL1Y3UAFPwvcjNk4GZnZfj68zdBg6Ah8D/JVpsoBxNyACMDA8P/D99/MXz4/osog9DUEZ24cSok1SfogJToGwWjYBSMglEwCkbBKBjZAAD8qypdPFWzMwAAAABJRU5ErkJggg=="],
    //             ["crown","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALlJREFUWIXtzyEOwjAUBuC/g5maySaI3gBOwQ12FRIOsJNwhd0AMzFBCAZDEAgyuRpI2kIRzWYQbZOJifep5uXPe38BQsjc2Vo4W4vwrCmdbcrk/VlUqlg7e9yOx8Hl/8wowL6mL9BWEsPy4fi54n4GjCXancLtoKYv0GntH874nwN49L2fGQUY5cAlOq1xP72TC7BQwNbCIS+ilj0vCyb316QCy4gMw9cAWR4MrjafpOOEEEIIIWQWfmi/Tev3YsnqAAAAAElFTkSuQmCC"],
    //             ["halo","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIlJREFUWIVjYBgFo2AUDDBgJKTg//GA/wRN4ZKDm8eoP4kkBzDhtXyv0X+G3x8ZGSAOxY3/fIOx//+/mEeSA1gIyDMy/P4ICQFWftyqfr1hYPjPz8DAxM7IwMxBkgPwhgCj8zmII/79hmB8ofDvNyPDv58MpEbBKBgFo2AUjIJRMApGwSgYBQMOAIYvHecHlY9rAAAAAElFTkSuQmCC"],
    //             ["horns","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJ5JREFUWIXt0rEJwzAUBND7bv0RHiALZZBMkDkygQbxIFnBrRthF4agSxE7pLJsUBO4Vwn+53QgASJSEN0Z3Yt7fQjsQzid3+wNH23LhbSDWXZpGj67rl4BAFgA3KapGHRNCUPOGHOuWyCYHXqC6M5EYiTrFkifwN0S0Z3bbqpcwNbQ0j/Y5vY6dX2hwH2evyX2/sE6s5+ziIiIiPyPN0/xP5mgHcOSAAAAAElFTkSuQmCC"],
    //             ["pot","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHhJREFUWIXt0L0JwCAQBeBnSOEYVi7jZFau5hbeCHZJEyEEQRMtEvI+OPAP7ylA9Heq55D3fjPGIMZY3c85A4AKIcwP0Go+GmLpOaS1vnXp9ADH694bYCTgel2w1m5l7JyDiEBEHjdoqf2AKpVSUud5RxERERHR9+yh9CdlLUGInAAAAABJRU5ErkJggg=="],
    //             ["tophat","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFxJREFUWIXt0jsKgEAMRdGn2GcB2f/Sso7Y2E4cw4CC97T5EHiRgL/bHvTmoj2twXT3YTEi2kfsnaGVXj/gmG00s2HtiqClyi0lqcq+OGT6H+4aq8/v7gQAAMC3nEJ1DOl+sJlFAAAAAElFTkSuQmCC"],
    //             ["vikinghat","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWIXt0jFOwzAUgOHfIS1BqpCFGDohZWbiFNk4SA7QAzDlBAy9AWtYOnGA7kGVmLplBCmRrIjUDMWVQUmViKVI71siO8/vPT0bhDhVm9XCblaL0ee266XdrpeD44OuzSJP7a5t1OjqewoY3ETY92NycWW/kx1kWWbjOCaKIgD3VUmSHGKaqrQAQRj9qQHVVKWdzub27eWBpip5fr3BLw5gjEFrbYs8ZTqbuwY4O78cPL3ewCJPASzQWdynteb642mfMAiV3X1ye/84qIHONwC4BOpYk44xhvfJnQJGFXcFjnL37vs9CW/94z0M0TsBj6rr2k1CAapt2761EEIIIYT4f74AXYtTB4DhR88AAAAASUVORK5CYII="],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    //         //Facial
    //         await traitsContract.uploadTraits(4,[0,1,2,3,4,5,6,7,8,9,10,11],[
    //             ["beard","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK5JREFUWIXt0D0KwkAQhuF380NgC20UUiQ2KTdtIPfIVQUPIWIlaGEVC08QCFHXKhAEIVliIczTzs5+HwNCCCGEEOIfmCS2Jom/zqsyt1WZO/0djHynAFtkKYDaX2uKLLUAm/WynzsZvWiS2OoopGk7AHQUArBaaHxPqe3h7FRg7AUAVNN29jP88Xwp8JzCYcLm6XaHwcX68MD32B0vvy8wLDFX+OQCwxJzhAshAN7tUS1+xbe0FQAAAABJRU5ErkJggg=="],
    //             ["clown","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE1JREFUWIXtzrEJwCAYBeH7wcYFUtm5/xDuIlnBJmBmiAZS5L7+8Q4kSdLfxdPBWetMpQDE0dp2QFoZXb0TOW+frwYEwBzjlQBJkj53A5dtCc9JCyAzAAAAAElFTkSuQmCC"],
    //             ["earring","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC9JREFUWIXtzsENACAIBEG0QrqmLKzBBD9m5r+XiwAA+ElXdldeNXv4wxreA4D3DpsYBS+V3U4HAAAAAElFTkSuQmCC"],
    //             ["glasses","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHBJREFUWIVjYBgFo2AUjIJRMNIBIyEFAXri/9H1bLj0kqAcVRwAtQBdDUwMpxwpjmAhRhGygQF64jCLcMmRBJhI1gEBBKOO1g6gGiCUBhgYkIIbix6scqSkAWJyAYYYUi7AKTcKRsEoGAWjYBQMGQAA33ohDfxB6yMAAAAASUVORK5CYII="],
    //             ["goatee","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIVJREFUWIXt0r8NgmAQh+H3DJUFA5g4ARMwh3PasoILaGNrQkFBgQYh/DkaGAAxX8Pv6S/35nIgIiIisne2diA9H/0URwB2fVSbAw5rlwP27UYD/JLEYQMW2fNDXvWU9RA24N2OAD5fgqb3sAGAzRHww/9sDrgXDYB1gxvA7VX/o0FEdm4CoLEllxVi4/kAAAAASUVORK5CYII="],
    //             ["long","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALhJREFUWIXtkK0SgkAUhc/+wQxPQIBEIJgIPASPbTZr06LBYDIw4zhwDQqD/CiQz9d29+yc716AEEIIIWSETRTKJgpX/y+yVIosnZXVY+UA1Or2NwrALAk7dhn4biCRJ7H8Ktwdz+3hdi8l8B2M/j/HIPFZvQS+a94FAMrHE541yprB0rpibd5qrTxnsD2clgn0JZriqq5R1YL95fqVzZN4SgTdrSwSaCQ8azBV3KcjgrnlhBBCAOAFjUg3DTuItgwAAAAASUVORK5CYII="],
    //             ["monocle","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKFJREFUWIVjYBgFo2AUjIJRMMCAkQg1/8nQQzUH/K9fe56Bm50FLlDmo0tVRzCRYjk3OwtD15bLDAyYoUITB6AAMT4Ohq8//1DLXtIcoCjKw/Dq0w+qW06UA8T4OBjuv/5CE8sJOYCxMdiQ4f7rLyhBX+ajyyCtokXVnIAL/Eei4VhaRYsedqM4gKaA6FwwUIAuoUAIDApHjIJRMApGAc0AAAseJMPyYccqAAAAAElFTkSuQmCC"],
    //             ["scar","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWIXtzjkVACAQQ8GAnkikXIn4gQoDpOLxp88hAQAAvK7sVfZ1vqfjklrSER0442POsAYA8LMNGloGvWPaCxkAAAAASUVORK5CYII="],
    //             ["short","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEpJREFUWIXtzrEJgDAYROH3CyHgBBZu4P4DuIRlJlFjo5A2aX1fc83BHUiSJP1d9JS3dalzTgB8CcR+lOEDU2c/zuuONoeXJUl6PSEyCfcTR1bJAAAAAElFTkSuQmCC"],
    //             ["sunglasses","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAG5JREFUWIVjYBgFo2AUjIJRMAoGGDASoeY/lc1DASzEKLpaks/AwMDAwKWowvDt/h24OIyv3TORVHvhgIkYRb9evWBg5uZh+HDyCIN2z0QU/q9XL8i2nFjwHxlrCgniEhsFo2AUjIJRMApGwdAEAOu1IXJGakt2AAAAAElFTkSuQmCC"],
    //             ["tattoo","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFFJREFUWIXt0cENwDAIQ1Gno3j/mVglvaQL4EhVlP/uIBskAMDtRjJse357qqq140kCKCwQB+i23hZgGZKm7X8CrCvEr2iz3W4v7XsBAADnegGyAQx0YX9IOAAAAABJRU5ErkJggg=="],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]]) 
    //         //Tail
    //         await traitsContract.uploadTraits(5,[0,1,2,3,4,5,6,7,8,9,10,11],[
    //             ["c_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAN1JREFUWIXtlTGOgzAQRZ9XW1DScYMppuEqPuqcxkdA4gTQeRvbchJnq9hN/CSKIMF/MH8ITCaTyWQy+QJiOpq43uGqCkAIoZnZU6CE1ySRkvvTUeAhNISAiOC9h2okPQVc9doBnJl1jGsTVTV67+si/lvKURJDiaqaw18keq9hLQGAiJC64GDQFmRE5OXcUIEWw0bwLvt3kACNDjBCIObw1vzh8x14WLf81MdxlFGbGeu6lt+f7EDM90t7z3Vdbt/3aGY8/Sv2E0hfPM7zdNu2lfLluS/L4u77Lhf9AYPwVCr0wNZ0AAAAAElFTkSuQmCC"],
    //             ["c_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJRJREFUWIXt07ENgzAUBND7KVJZKIWVCZAnYAQPwKgMwAhMgFggkrtUVKaAIEdYdN8S4p7k+k72GSAiIqIbiNvJEu1w7ywAoB9DNlOzwB6e2orsuQ/FAn+h/RhgqhfapgaSJ9EsIMm1A4B0w6QYlxe9s7Ft6nSIp6MsVaKo6J39hR9KlBihfL6zvM1TsK5f++sT0cUsPGQqdRETqM0AAAAASUVORK5CYII="],
    //             ["demon","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKxJREFUWIXtljEKg0AQRZ/ZFArewSqwsGCbY+RwniQH8ABpLUTINbawm1QJibtpv4X72in+Z/4fGCgUCoWdqcR6ttU/K8Xv3tM6R+sc12kC4CQ0UN2WRSiXYmMIBtij7400Do34pa4BzDfNbuI/KDvAc133NZDjGAbmGBlDAHHzv/kUcTuQRpDbgszAHKNK6i/ZGFQbsKHrgDSGY5zhm1wPVA9J7v7Vz1ChkOcFZkI0O6ukmHoAAAAASUVORK5CYII="],
    //             ["d_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANBJREFUWIXtlDGOhDAQBMunCwjJ+IGDTviKn+rX8AQkXgDZXLB4xCKtdMF6k52SjGxL0O1xDxAEQRAEQRB8IXYOAFJnobuOSQJgWRaA9NNLXBKSKKXczZBz9nkvA09CVxPnyT+CAVZKMR4VMUm+boZ6ZsCNSHoqe621Tbtl4D8kf3TGXux/zABc2i/n3K4gAfz2Fga4Z+DKuzNwTbifel1Xr3StlXEcff3OK7D2PUkGsO97mufZaq3c/4DdDJx9zrZtaZomD2BrvWEY0nEc/tIfRpJIgb33YnwAAAAASUVORK5CYII="],
    //             ["d_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKNJREFUWIXt0rENgzAQheH/QkqEKDwC8gSM4AEYNVLajBApfZQiAzBC0KWIbSEUl6bhPgkk3LzH+cAYY4wxxhyQxgcAqRy0zdHgHQC35wwg51rhKajtei73l65K0HY9MANwqlRgFQTTOECcSPzzXSig0zgov4lo8C5/p0I1dyAXCd7laSzLR66Pd9oPqXoFf0jT5LWT/KpMC+d7ZBdLlEqZA/oCo3Inv3Aq3lgAAAAASUVORK5CYII="],
    //             ["fish","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAL9JREFUWIVjYBgFo2AUjIJRMApGGPiPLsA4QJbD7WWik4UMDAwMDFnV8zHkaOkAmEVwyz59/IDsCNo7wCu8hCEmp5+BgYHhf0xOP8Ovn9+RHfGf5g4QEpVmePf6KQPMcjZ2ToZfP7+jqKGlAxiXTCmEOwJmORs7J6oiGjqAgQEp/r3CSxiERKUZ+PgFGKa1JsLtp1c2xMgRDFDPs9DJAbhCgObZEA6ERKUxEiBdHQBLiAPmAFwhMOCJcBSMggEHABKzPR7lkBGrAAAAAElFTkSuQmCC"],
    //             ["n_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJxJREFUWIXtk7ENQyEMRI8oBSUdG1C4YRVG9TSMgMQE0PlXoCQi3Y+b+EmU+B46AxiGYRiGYRjGv+MUs+SUqyUgRAQASCmBmXf2Q0lgh3+iKnBCrYJv2U8lARx2ABoCssJP/QP374C8nvXq1tqumpkRQvjJN5Q1j4gEAMYYLucszLwrqLW+5d4uUEoRAOi9uxjjkpLVu/fezTn3pQuGMC3j/rk4BAAAAABJRU5ErkJggg=="],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["p_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALRJREFUWIXtlLENxCAMRT+nK1KmywYUbliFUT1NRoiUCaBzGrCSXMqcafwkCiyBP/7GgOM4juM4ji1yD3xGqHABowQIEQG3PhheASuEiASA5JwFpyqYVqBZcMFUQIxxrIAnglGenwnYc3+NBKj/MUYws8b/LUB68if/gfd7QM6rv3rbNrWamTHPs+7f7AHp97U/j1JKSCkJM6sF67pe8r4uoA0a7PselmXR5uu+T9MUaq166AC+8TJPHdRUeQAAAABJRU5ErkJggg=="],
    //             ["p_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGFJREFUWIXt1LENgDAMRNGDGiGKjIAyASNkAPZfxjQUISDKc/NfmcansxUJAADAK8aHOSMFAbICRKtFGu4gvQGXaLWEpDiPPdS1YG3gXsGDNcCybrkBvkymOa8f0Dgb+HcBaa0LVvu3vnQAAAAASUVORK5CYII="],
    //             ["snake","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAG9JREFUWIXt0TEKgDAUA9AI/wAfx87O7l7H0Yt5s84eQGgHsYi0a/6SB126JG0AERGRYBMxq/RyWQVKPg+YJ5gnzNvesmkFOne0Au31r+8vGKEAzBPuKzOihsr/rMvzI7QJALQZQiYAEDrDcAIREakgTR7cfMyqaAAAAABJRU5ErkJggg=="],
    //             ["spring","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPRJREFUWIXtlDGOhDAMRZ83EEVUOQJno6SYY+QIlJyPMlKgCaBssUM0s1uT2SJPshQphb/tb0OlUqlUPoyUSDKOY7rexhj6vgeQx+PB193Jh2FIx3EIP8XKeZ6ybVsuvLlbACBN0+QOKKUIIRBCECg3gvxu2xZjDEqpBMjtI3iSrtj3PV3JgfIeACTGKADOuaIekGma/n4WEHB5IBvRWgsgzrkyAl5EANB1HVrrBEiJEbwdIgCtNfwXE5ZYQ1nXNa8hkJ7tBwp0YJ5nrLV473Msy4L3HihzioHsfAC898QYywm4qn0VU1QAv+5NjPHahErl83wDLu5l20PIqEwAAAAASUVORK5CYII="]])
    //         //Held Item   
    //         await traitsContract.uploadTraits(6,[0,1,2,3,4,5,6,7,8,9,10,11,12,13],[
    //             ["axe","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAN1JREFUWIXt07FqwkAcgPHvQpFgoWRwcCkODu0eyCAOhWxmKhldMvkOXRz6GA5uHTOmT+Ak5AEcpS+QQSHK0et0QeKgDmeX/2867g7u444DIYQQQgjxz1R7oixLY9fCMHQe8GAHRVEY3/epqoogCJwfbCmAPM/N6aHLj4zHjgegFqut0wDPhtR13UyO3jO1P/4CmNl44D4gTdMmQmutXqM3gLtE2BsgSRIApbUmjmO+1j9NRP/JN/PJi5OAs1/QNo2eAcyw1wVQn9+b+wa4jvAub6F5jt1BXxUsxC3+ABIjPyR3nbUkAAAAAElFTkSuQmCC"],
    //             ["book","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAM5JREFUWIXt0S8OwjAUgPGvMIPiCA0hlVhUEwRcAonZAUi4AEg8AsMd0EgUFjlBSE8wxcRIEcsWIPxNCur9bJO+L++BEEIIIYQQ4o1xv+2dc94595P/a68eY6t9vQazoSXLMp8kyf8CYqt9sxEBYHuG+WgAEDxCvRve6bbY7w4ApKecyWoDoIwxQQKebUClpxygGg7QbETBN/EwYLk93kRAsYnriPViGiTg4QlKsdUA1TmgOENdoc6+Cv1dwH1E6OEfBVxHhB7+ldjqMiSoC0jkT0P1XA7SAAAAAElFTkSuQmCC"],
    //             ["bucket","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIlJREFUWIXt0zEKQyEQRdFnSDGFhat0DVNaWlu6TospFNMFfiBfCGKTdzoZkcuAABERERER/Tu3upBSmiICAE5Vtwc87oaqOnvvbozhAMyc8/aA57dBKWWGEABgAoCIoLW2PeB2A2Z2OXvvzwacsAz43MLJgPcPMTOY2fLH/OL20Vrr5Rxj3B7wAsIpJJoZIT8JAAAAAElFTkSuQmCC"],
    //             ["flower1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANdJREFUWIXtka0KwgAQgL+TMUFkPoHFNgwGq89hs2mwmH0EwQcwaPN5DAZZEHwDmwyEubNs6OYPhm0g3NeOC9/HHRiGYRiGYRhvWPi+Lny/ElftnbzTaABUEpEJSOWDdYuqIpzcLKcwVCZwCkMOMxfvGENQXkDmAvMgSCM4zFyul4hzW8uz5wOeI7xjLDVHJI5Uh8tuaQH5FzwiAhitegpwi+LSAuTTIpGnewVkO90XHvDygicEIJFKvenoeNsvPODjBfIkcgVkM9oVFvDtAhkS6c/Bxt9wB9wXQgkZFDUTAAAAAElFTkSuQmCC"],
    //             ["flower2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANJJREFUWIXtkT0OgkAQRr/ZkGhhQocHoDSEwsaT2NHZeAOPQGJNbOy4DI0FsfEKUNsYfsZmSQDBWMAmJvO6zRTv5VtAEARBEARBGCAJPU5Cz4hLDcmdtQMARiI6AY186TNMRVi9N+VZzk7qIM9yRLaCW/CsAZ0Fdqd7E4HIVng9Szyq2lxAO8ItmJRFVJfM+/NmtoD+F7QjEFx8BoCqnG8FGjtoeXNnABQf08kDPr6gBQGAltJiZfEh3k4eMLpAHy1nAHQNbpMFfFugg5b+HCz8DW+/fkMcYI4ILwAAAABJRU5ErkJggg=="],
    //             ["gloves","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIFJREFUWIXt0LENg0AQBMBdcxk0RAXklOHiaIKAkDYowJY+4HROkCUIzL+FRLIT7u9LdweIiIiIiIjcjDmloW2jNvv+6cbxZ17ikVt8r2tRnsvOK8CSEppt04o8zUvkXoCvbVOP2D00ZvAIHvNLB3jOMwAwuR/XZHJnRaKfpr8GkA/FTimQIzVxQQAAAABJRU5ErkJggg=="],
    //             ["lolipop","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALZJREFUWIXt0zEOgjAUxvH/wyaQuBuP4BUYGuNFPAenciQxYWLlHq5dcGuog1QXogy2i+83ERLe95W2oJRSSql/J/Hham0AqMoSQI5dl6/Apa5DfLE1JmsJAzB6z+g9APuqAqAoiuThrwJRDL97z0Zk8YNfi8sUeP+JU9tyaJp8Bc7DACB+mgSQW9/LztrgnMtSYpFzjvCUNOfjRs/hARBJdCa+Tk1dYtXElCVWXfY5NM+9VCq3BzKaO1KPfhFiAAAAAElFTkSuQmCC"],
    //             ["pan","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAI9JREFUWIXt0bEKhDAQhOF/wxGsgl0eyjLPaJlKUvowlrYpBfGKQ8gdlso181UbWJgJCyIiIiIi8md2Diml45y7rvvaGcfx2QLDMBwxxsuFZVkA6PsewHLOtxZ4tY+fn7ds2za897eGtwVsXdfjqkQIwWqtTNN0eziAAyilwOcctu+7nTNgzjnmeX4kXATgDcR0HmxwHmGdAAAAAElFTkSuQmCC"],
    //             ["rollingpin","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALlJREFUWIXt0jEKwjAUgOE/CqWCQx2EguDkURw9gmfIAXqMnqFjj9CjBItCQTeFgkUqcZEiteJiWof3bQmB/DweCCGEEEKIf5Knkc3TqNc/R62z2tdzW2SxLbK4lwDVvjCJtl4QMvanAGqx1k4D2hMAULfzkXtVAjifxNsEAEyiAawXhM275cbNbnQG9BnxMaCviK4daKy2MYC6Hg27csKp8n76+deA1wi/vqhZdbDPqQzDJJpBA4QLD6ikOahEHOwaAAAAAElFTkSuQmCC"],
    //             ["shovel","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAORJREFUWIXtlD8KwjAUh7/XOtStOCm6CILgPVy7eQEP0AN4A0E8gkLdOtax4BmcnBwVOkmGDl1KHGyhi38GzWK+JbyQ8PseeQQsFovFYrH8O9IskiTR9X4QBGYF4jiuw/E8z5iEAERRpBvBRiUcAKUUAEVRUNd5nsvza9+jVa2ilNK+75NlGcf9ks5gwmqb/lzAAQjDsJbAdV3xe2O5XU56Pu2bEWhKlGXJOjrAYz5+LvHynatwDcgmvZoXMCHx0aTPp31G3bYGZLE7f1XAeX8Eqs4lL0q9mA3NCwBUnRv5Gyz/xR1YCkheHl/f0gAAAABJRU5ErkJggg=="],
    //             ["stave","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKFJREFUWIVjYBgFo2AUjIJRMApGwSgYBaMADdR6qf+v9VKnm30sMEaajfx/BgYGRrrZDAVMSGxGcT4OujsC2QH/v/z8w/jy04//DAwMdIsGuG/TbOThgvycrAwcrMz/YWqat92kvQPQAVII/OdhZ2FgYGBgLF9/lX4OQHYIBwsTw48//2jiECZCCpq33WSo3nSdgYGBgfHP3390zyWjYPgDAMpZJY+CMic1AAAAAElFTkSuQmCC"],
    //             ["sword","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKZJREFUWIXt0bENAiEUgOGfi4UlG9iQsAClE9A6g70LMIWVcRkLyzcCiXEDNsDG4uKRizEnWryvpOD98EAppZRSSv2bnHPNOXebN7welFIAukVMAgDTM8K0DkUEoFprAYxzrm9Az4jWCgAIIUBjHSn6mqL/fkArIkVfmfm1T7x1mYhwOuwqwHo1mOPl1jdgv92MX14Bc77eFwmYXcGIAXgOXXQF6uceqs45dNEMx+oAAAAASUVORK5CYII="],
    //             ["wand","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIRJREFUWIVjYBgFo2AUjIJRMApGwSgYBaNgpANGGCPKVPo/TGzZ6acD4gAGBgYGBh52FrhDZh15SD8HwECajTyMSReHYDgAm0N42FkYxPk4GBgYGBjL11+ljwOQHaIsyvP/5acfDF9+/mFgoHKIMBFSALWMkZ2FiZGFiZGgg0fBKCAVAAD5oxxeUT7ILgAAAABJRU5ErkJggg=="],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    //         //Worm Strength
    //         await traitsContract.uploadTraits(7, [0,1,2], [
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
            
    //         /**BIRD TRAITS */
    //         //body 
    //         await traitsContract.uploadTraits(8, [0,1,2,3,4,5,6], [
    //             ["Blue", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAS5JREFUWIXtkz1Lw1AYRk+kIGiGUAJC4iJIqXUTKw5SB3+A0lFwlNZZHIuUjv0B0lnIKO3mkqHgUGyhW3HoakGQ4pAOhcJ10FwSEMwNdhDuWd77/ZzAG9BoNBqNRqPR/CHlxkAAQuWOkSbo4OJOAMbz/ZUch8GbuSIPtf3Eb6sKiHrLpzsKCKYTAMysQzCdYGYdeciy3cQSGUUBSRi4mM9i4aqspLl0XDBj85cnD8t2sWwXgI/3V8qNASToB1UB47ZyEpPIrK6zXTyl127SazelROIHFQXg+6vqLV8udEcBi/kMgHG/w+HZjdz7rRdS/QU/ifjDN7kx7ncAyB+dKzVkKonHy10RrYAoVT1Rqnpybjn5ZWR/CQyv90S0huuAMO2tpQXHJHY21qJV87/4BOnwX2L2/3bpAAAAAElFTkSuQmCC"],
    //             ["Grey", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARRJREFUWIXtkztqhUAUQI8h4JCBCDZvDTGVhYU7sJgdTJ09uAQ34g4sXIBgYfE6lyFYCFpNmrzhCfk4Jk1gTnPne+8ZmAsej8fj8Xg8nj9Ea20A43InOFOoKAoDBG3b2jFgpJQIIajr+nBuVwFTVRXDMLAsCwBSSpZlQUppD7lIPDoKWG4Ft23bFXfl4cylLMt28+v1ihACIQQA67qitYYD/8FVICjLcicRhiFJktD3PX3fW4nDCR0F4ONVVVXZhWEY2LYNgHEcyfPc7v30F051wWciXdfZjXEcAUjT1LkrnCXat1dzHwGjlDJKKTuP4/jLBKe74MblOdxFIGiaxgBEURTM88w0Tb8t8y3m5fJ0Hz3/i3dDIV0zOZEXEAAAAABJRU5ErkJggg=="],
    //             ["Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQhJREFUWIXtkz9uhTAMhz9KRSWGRsLDG5kYqk4MOUnO0OOx9w4gcQAmDgASCwNSlC7vRQ+pfwjtUinfYjtW7F+sGCKRSCQSiUQif4jW2gEu5E5yppGIOCCZpsn7gFNKISK0bXu49kNgb2eMcUopACci3r9apmlCaw0HJ/EYKMBza2it9f4ZQicAQF3Xu3ieZ0QEEQHCphAqIGmaZiciTVOUUgzDwDAMXsThgoEC4PoqY4w/6Pseay0Ay7JQVZXP/fQhT23BZ0K6rvOJZVkAKIoieCuCRby/vbp7C7iyLF1Zlj7O8/zLAqe34Mbl+WlngWQcRweQZVmybRvruv62zbe4l0t+byP/iw9TlVtH4haM3gAAAABJRU5ErkJggg=="],
    //             ["Green", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASpJREFUWIXtkz1Lw1AYRk9UimggiQjpoC4BJbjp4lIXB3EK9D9kdBIcOzi6dujgTxACnbSgS126FHchLl3aRQ20S6BcB80lAcHcYAfhnuW9388JvAGNRqPRaDQazR8SdhsCECp3jCpBZ9e7AjDuLl/kOAve2nO5CZ5Kv60qINq9Fv1JxHScAmDWa0zHKWa9Jg/ZllNaYkVRQJIFprN5IVyVpSqXjt1mYR4/vmFbDrblAPCRvBN2G1CiH1QFjPPTq4JEbX2Z7SOLYRQzjGIpUfpBRQH4/qp2ryUX+pOIdDYHYDRIOGx6cu+3Xqj0F/wk8vB6KzdGgwQA72RDqSErSdyH+yJfARF0fBF0fDnf9MxFZH8JPF8ciHzN1gFh7awuLLgg4btr+ar5X3wCsKRfFFnNmkYAAAAASUVORK5CYII="],
    //             ["Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWIXtk79KA0EQh78zG45YKFxxIblDO0GsrrP0HXwDIaS1lDzAkTJVIAR8g/SWKdOlsLNTEg4sAqlCyB1jc1ly4J/b00bYr5mZHXbmt8MOWCwWi8VisVj+kGkUCSAmd5wqjQZBIIBzv1xqH5C2Uviex818Xrr2kWFvmcWxtJUCkEEQaD+3vK9WTKMISk5CGQrQ7Buus0z7VTCdAABn3W4hftxu8T0P3/MAsymYCnCue72CiNNajVul6CcJ/STRIkoXNBQA+atmcawP3kYj1lkGwCRNeWi1dO6nD1lpCz4T8jwc6sQkTQG4c13jrTAW8dS5kkMLyDgMZRyGOr5oNL4sUP375jRP3IIFnM5iIQDn9brzutvxstn8ts23yGXz+NBa/hcfA5pdzT+31tUAAAAASUVORK5CYII="],
    //             ["Eagle", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAATRJREFUWIXtk79KA0EQh7+ToOKBROGS0+KQqzwEwTLEwiKdhWBlTG3pG0gKyRvkFfQUCyGFYGGRQrEMpImVBAsVD7Q6CBIYm2RJwD+3p42wXzMzO+zMb4cdMBgMBoPBYDD8IbVyUQDRuWOlaVQKcgJYV50X5QPiu1k81+Hg5CZx7QnN3tKoV8V3swBSCnLKH1geniNq5SIknERGU4Bi2DDu9ZWfBt0JALC5vTMWX9894bkOnusAelPQFWBt7R+OibCnM6wtOYTNNmGzrUQkLqgpAAavatSr6uDi/JS41weg1Y3Y3VhVuZ8+ZKot+EzIWXikEq1uBMD68oL2VmiLuNxbkVELSKXgS6Xgq3hxzv6yQOotGJKfnRqzgHV8ey8A8/ak9Rq/8/gW/7bNt0iQnxm1hv/FByaoXfwGBdnmAAAAAElFTkSuQmCC"],
    //             ["Gold", ",iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASBJREFUWIXtkz1KA0EUgL+IEhBkSOUWG4sVBBG3sM0B7NYDWEsOsL0E60CKnMEqlRsQ0+UAASEHCBhSpAnLRglYhGchO+yCkJ1BC2G+5s3/+5h5Aw6Hw+FwOByOX2SeRAKIyZ6aTaKn+4YAtZuHVLcBCXyF8kJOoqTy2aYCMhm0qacjZosMgMBXzBYZga/0IhOJfUMBTZ5wtd6WkpuyZ7Pps3Fd6nce31FeiPJCALLllHkSQYV6sKkBmQzaANTTEfB9C/3hBoBe3CJbTis/g5UAQC6Ri6zWWwD6ww29uKXndklY/YKfRD7envVEfhud2yPjX2Es8XJ3IcUIyLjblHG3qfuXp/ZFulPgNb6SYszHATnzD/4scUni/PiwGB3/iy/vkmdyA+9zOgAAAABJRU5ErkJggg=="]])

    //         //head
    //         await traitsContract.uploadTraits(9, [0,1,2,3,4,5,6], [
    //             ["Blue", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOm/bvR8Bl4hKbiAgLAYAwMDA8O2BkOyHMFEqgZ08OHtK4r0k+JiDN8jAwFhMbJCgeIQoBSQ5ABcvqebA2gBSHEA47HJ7gyf3z0bMAfgBR/evmJQcy2mTzb88fUDI1JIwCxlFNFwI9ksUh3A+PHhacbfP78xMDAwMP7+9R1uOQMDA8Oxye4kO2AUjIJRMApGwYADAFxxJGMzk58zAAAAAElFTkSuQmCC"],
    //             ["Grey", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJpJREFUWIXt1LENAyEMBdBPlJ4t3LEFHZMwjYejc09ByQSX6tApUSIZkrsifhVCGD6WADDGmH/nJmq2L+6lLtpijAghjAkiAgDknKdC3LQFz0RkqV6T+OX2R0Q01YXlDqxSBXh3+9MC/IImgGNmlFIuC/CRiCCldM4zrLW6Qyf2Q93+J2jcletda22Me+/w3o8QzKwOYIwx5nIPYekgythyoDoAAAAASUVORK5CYII="],
    //             ["Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJdJREFUWIXt07EKAyEMBuCk1CmIo/j+D+Set3AICg7XqXK0tBBt74bLN4kY/RMQwBhjrg4narYf3qUu2mKMEEIYG0QEAAA556kQN23BKxFZqtckfut+j4imprA8gVWqAJ+6PyzAP2gCIDNDKeW0AF+JCKSUjvmGtVbcTeL5KHrv1XfdleextTbWvXdwzo0QzKwOYIwx5nQPaowjCvP+HC8AAAAASUVORK5CYII="],
    //             ["Green", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOm/Y6USg4gmF1yAn5+PgYGBgWGO/zGyHMFEqgZ08PHjJ4r0k+JiDN8jA35+PrJCgeIQoBSQ5ABcvqebA2gBSHEA4+q4Kwxvrn8bMAfgBR8/fmIwS5GlTzb88vwXI1JIwCxllLfjJ9ksUh3A+Or6F8YfH/4wMDAwMP789AduOQMDA8PquCskO2AUjIJRMApGwYADAIPfJLH7V2LtAAAAAElFTkSuQmCC"],
    //             ["Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKlJREFUWIXt0zEKg0AQBdA/6cTWtbHzDNY5hqfIXXIxi5xA2CLVFlYmLCyYKiIJEWY30SL/lQsz82dgASKifycRNdMXe6mLpnNRoMrz+aE2BgDQdF1UiIO24FXvXFK9JvHb9ku1MVFXSL5AKlWAT9tvFuAXNAGktRbXcdwtwKreOZzKcptvOHgvi0s8h8oxy9S9tAHk4r3cQgAAuYcwDweA1lp1ACIi2t0DYWAk7SPJtawAAAAASUVORK5CYII="],
    //             ["Eagle", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANlJREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOn/qlmTGJRU1OACUpISEFrTgCxHMJGqAR08e/6CIv2kuBjD98hASlKCrFCgOAQoBSQ5AJfv6eYAWgBSHMBo4uTB0FCUhSExraGEbAeQnA0dNWUZFEX5GRgYGBiyGnrglnOzszK8YeRhXL7rMEkGkhwF3OysDB++/WRkYID4XFRShpGBgYHh5++/jCL/v5BqHMkOYHz24Qvjrz9/GRggocf4+vkTBgYGBsY///4xTN59nmQHjIJRMApGwSgYcAAAytkvK6xoIXcAAAAASUVORK5CYII="],
    //             ["Gold", ",iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOn/kSn6DFJivHABYQklBgYGBgZ+u0VkOYKJVA3o4O2LexTpJ8XFGL5HBsISSmSFAsUhQCkgyQG4fE83B9ACkOIARqWwIwzPXn0eMAfgBW9f3GPozNKiTzb88OkHI1JIwCxlDHUQItksUh3AuO/cB8ZvP34zMDAwMH7/8RtuOQMDA4NS2BGSHTAKRsEoGAWjYMABAJr1I6xKzTfXAAAAAElFTkSuQmCC"]])


    //         //eyes
    //         await traitsContract.uploadTraits(10, [0,1,2,3,4,5,6,7], [
    //             ["1", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABCSURBVFhH7c4xDgAhCERR8I6ckkOuEincxEStjMl/zTDQIAAAPOVrInr7iVPIuq9kXnP6gJqZ5jxSd5/tAQAAFkQq/ewP/P7yeVEAAAAASUVORK5CYIIcitkyAAAAAElFTkSuQmCC"],
    //             ["2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADRJREFUWIXtzTENADAMxMBX+SMJSRdCkqFDJd/oxYkkSR9i2EbO+g6pqrY9AwRomyRJ0tQFOXwX6yUO8j4AAAAASUVORK5CYII="],
    //             ["3", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADJJREFUWIXtzSEOACAMBMFC+P+XwWCBtI5kxq24XAQAfGhup07phfdrZ43Cpj0aACBlAd6xFfPN13/dAAAAAElFTkSuQmCC"],
    //             ["4","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEZJREFUWIXt0DEOACAIQ1HxjpySQ9bFERMwDg7/jR1owxgAAPSpmJXMByOuy/utkg6F2to3bz/wTHeAubtleURkOQAA+N8CNRIT+tPf5roAAAAASUVORK5CYII="],
    //             ["7", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADtJREFUWIXtzzEKACAMQ9Hg/U+SS8bFTaQVXIT/oMufUgkAgM9kXbeXxvWCRLbb/TnbSvZnTx0AAKAyAQ/CF+snU8SDAAAAAElFTkSuQmCC"],
    //             ["8", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEFJREFUWIXtzsENABAQBdFPO9uNZPvRixqdKcEKDpJ5xzmNBADAh0awheSDkSu2B3qtau7L9mxAUipmkQYAAP4wAXGdCdsU0SxWAAAAAElFTkSuQmCC"],
    //             ["6", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFpJREFUWIXtzrENgDAQBMF72rFoBsn9fB1OqYZKXIHjJ4EAIQLLIrC0E94mJwEAMJOICEnxka7cZxl+Naj3gDV37Tk/xuauoxT7/YCZSZJtKb3SWuvdAQDAXE7PmBbbA3khQQAAAABJRU5ErkJggg=="],
    //             ["5", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE5JREFUWIXt0DERACAMQ1FACF7QEa9MNYKSYgDuKMfA8N+Yock1JQAA4vwwO1IejLguDzPJN4VukpsUvnn7gWeiA3KrNa/yPsYqBwAA/5sZIw9u6SktjAAAAABJRU5ErkJggg=="]])

    //         //beak
    //         await traitsContract.uploadTraits(11, [0,1,2,3,4], [
    //             ["1", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGxJREFUWIVjYBgFo2AUjIJRMApGOmAkV+PtfOv/MDNUJx4l2wFM5GjaG6X9n19ChoGBgYHh0esP//dGaZPtABYy9TFevnzlPwMDAwMbCzPjrz9/yXYA2VGA7GvnZVfJdsAoGAWjYBSMglEwCgCqqxUGXmpgUQAAAABJRU5ErkJggg=="],
    //             ["2", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGVJREFUWIXt0SEOgDAQRNFpQxCrSSX36Fk4H/fAcQtSXd1UILooEvRY5vlp/qaAiIjI3wV2uKXk7xt7rXRAZEbZzNdlAQBcrXk2owMmcheOUhwA5hjDPQYdQH/B9+qzdzpAREREHjV2Ey5wJj3fAAAAAElFTkSuQmCC"],
    //             ["3", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGJJREFUWIXt0LENgDAMRNFvEbFMyBRskQHZIlMACyAKJBpoESh0DOCG5l7l5k62QURERH5mnlDJsabUcW4ry34AWD/MrgWCKwU2jlMFaENj1/04a5wfACg5frP3ehEREQF4AQX3E4JdXk4EAAAAAElFTkSuQmCC"],
    //             ["4", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAF5JREFUWIXt0aENgEAQRNG/ORAUQkk0RAcURQ+gcKAQKBJy3GGoYE8gmOdn85MFERGRvzPvcOm7HPcVwNphdAdU3mG9TVzRILhPlAXMRwKgCembAN73nXcuChAREZEHD+kRlt/k4hwAAAAASUVORK5CYII="],
    //             ["5", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFBJREFUWIVjYBgFo2AUjIJRMApGOmAkV+P9ptD/f94+Y2BgYGBUnXiUbAewkKvx1+ObEAYz2UZQ5gAGWOj9/UORA0bBKBgFo2AUjIJRMOAAAGzgC8F/SeqqAAAAAElFTkSuQmCC"]])


    //         //hats
    //         await traitsContract.uploadTraits(12, [0,1,2,3,4,5,6,7,8,9,10,11], [
    //             ["None", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["Long Hair Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWIXtlDGOhSAQQB8bE2NiBaWFZ/D+h/AAVnZaQCOFGhK3+fz1uz8KuxabLK8aYcK8DDiQSCT+OyImua7rTUoJINq2fa4BHNdvFfBFPFJKjDHf8n4i8RFaXGuN1hrgXXHh92I5FTi0F746Jg4xgHiIbU3T3CPgi3ddB4BSavMF+75nH1tr2XUhWOJSYIdYlmVfnL7vn7HP8bKhZGeb8zy/fA/DcHqYtZayLKMELjtgjEEpFXWwMQZr7S0CwjkHQJ7nwQIA67r+XmAcR7yA1nqL6YKUMughXl5Blp0+k3dEzYSQv0A45yiKImhqPu5eTNMUNeZPqaqKqqpuOy+RSCQSf4pPo7VucOmotcAAAAAASUVORK5CYII="],
    //             ["Long Hair Turquoise", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVJJREFUWIXtlDFugzAUhn/TNKISHYgqlSFSVamoO2fIlJuwZsgBMmbIBTLmGp44gE/QpRNIiWDAQ0oC7kBMo7QKLw1DpfpbDM9P7//x4xkwGAz/HXZJ8tN0qm49DwDY22TSxADgNN6pAS2isRwHlZTf8n5jwqKKp0IgFQIAfhJneu9SzhrQ4pbjNEJHKzuN7ZIEANTLYtGNAS2+iSIAwCAIlBZ8n89x/JxzjlQIlFKilFI9z2YkAz2yVYAVWYa+62rxZj3O2USRehyPofb76w0UcQzb95v3eLk8WyznHPejUe2kR/u21qxKSgyCAEWWISeVBHZJAmbbpNy2f4CVeS3bd12ifI3abq83EK9WKA8jlwqh9PFSsH1fvba0DCC04OZrBKmwVAj14DiwCG1oHUMc2nDneaRbM+ccANjHes0qYhtaGYYhhmHYTTGDwWAw/DU+AXFfes/f4yRzAAAAAElFTkSuQmCC"],
    //             ["Chef Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMVJREFUWIXtksEKgzAQRGelkGAIePNH/H//xKO3gBCUAcH0UAoptdQ9lF72XRJ2h81kWMD4M6IRz/Nczuree3jvAUDatlUZaK4Kp2kq67qe9kiCJACUbdtUBm4aMUmEEN7qtbGmufynh16l/vBozXEcvzMQQkBKCQCekSOldJrKLwx8Xdh931VLfWlozTiOpeu6096yLIgxyjAMKgPqHej7/uWs7zln7Ti1Ack5i3NOSIpzTgAISYkxquM3DMMwDMMwDAC4A/lhP1iowuluAAAAAElFTkSuQmCC"],
    //             ["Cowboy Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYhJREFUWIXtlDFu2zAUhr8nUZRsq07s2IHRHqRT75G9U06QpWNPkSknyJ6hUw+QuQcoENRVDDmyxFi0XofaRsYohYYC+ib+wCPx8RF88D9zf3up97eX/3SGvGXT3fWFns8mGJsyn88AZPHxqnuBbzefdTq2bMpKwjBkOBpzejphvX7S6UkMIB8+fW0lELy28O76QqdjS5IuGA0HmsRWG++0dKoAv5YZgP78/qUbAYB1sZFR+MggiYV992qXiwRGJDASpe8Jk0l3AuN0pFm+pW4iBRRg5yvVxms8nKl7/IF3q24E6ufNYSlN4yVJF4RmIIcMkFeWoqi6EXiBNt6pKx6QINSXOUkXEE27EShdzfJ3JoCcnVhiG0jTeJHAHLMrHth510rAvLZwmETMZ2cKkOVbADXW4L0jy9lnaFoKtHqC1Wp1mBvHtzc2RQIjgPht0V0HAMpyo/UO2P8AgMG7c6qn5THHNmol0KYDf2+984cZIIDsaiehOc4Fed7WrQR6enp6enp6enr+ANacn92NEHF3AAAAAElFTkSuQmCC"],
    //             ["Headphones Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANhJREFUWIXtkzEKg0AQRf9YaCFYCQuKjX0KOw+Qwt5T5AA5S06RPkUOYJ8bxCjYGAJBJSCbIjEIEdy1sZlX7bKzM4/ZWYBhGGZlSPfCPorkeB9a1i/XLsu0BQyd4DQI5L1pCB9xAkDPvh/W8hDH2gLKHUiDQA7xxzz/O/8Wl9DshJJAIoS0TRMAaKr4WHLr+9CRmH2CRAi58TzYpqkiS+eiADSeQ3kGhONMtn7M3PlSAbqUJa51rZQwdF3c2lZ5tmYFTlUFAPToOtWc9DIMLPmSDMMwDMOswhvTDDniaXIWswAAAABJRU5ErkJggg=="],
    //             ["Headphones", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMJJREFUWIXtkjEOgzAMRZ87+QgsjDkCx+C0jBwhI2MWJBbEjJiC0qGiqtRWJFUlFr8pkRPn5ctgGIZxMVJ6YRiG9LpX1Wcv51yxwK3ksPc+xRiFh7gAsu/7sU4hhGKB7AS89+k43zTNWz2EgKomQOq6zhbISqDv+2fsnx4HcM4xzzNAmqbpfwJd16WqqiAvLSmVyJ4BVf36+4Oz+q8CMo4jy7JkNVRV1nXNnq1TgbZtAWTbttyeEmOkZBANwzAMw7iUO4TyPhDhHvCYAAAAAElFTkSuQmCC"],
    //             ["Bird Cage", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYhJREFUWIXtlDFu2zAUhr8nUZRsq07s2IHRHqRT75G9U06QpWNPkSknyJ6hUw+QuQcoENRVDDmyxFi0XofaRsYohYYC+ib+wCPx8RF88D9zf3up97eX/3SGvGXT3fWFns8mGJsyn88AZPHxqnuBbzefdTq2bMpKwjBkOBpzejphvX7S6UkMIB8+fW0lELy28O76QqdjS5IuGA0HmsRWG++0dKoAv5YZgP78/qUbAYB1sZFR+MggiYV992qXiwRGJDASpe8Jk0l3AuN0pFm+pW4iBRRg5yvVxms8nKl7/IF3q24E6ufNYSlN4yVJF4RmIIcMkFeWoqi6EXiBNt6pKx6QINSXOUkXEE27EShdzfJ3JoCcnVhiG0jTeJHAHLMrHth510rAvLZwmETMZ2cKkOVbADXW4L0jy9lnaFoKtHqC1Wp1mBvHtzc2RQIjgPht0V0HAMpyo/UO2P8AgMG7c6qn5THHNmol0KYDf2+984cZIIDsaiehOc4Fed7WrQR6enp6enp6enr+ANacn92NEHF3AAAAAElFTkSuQmCC"],
    //             ["Graduation Cap", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANZJREFUWIXt0rFLw0AUx/HvhcNcaFrpEqVThwqO3UX6R2Tq3v/B0T+nf0EnZ9dO2dx0sAQHSxSPEJMO7RXdLjTo8j7w4A3Hez94B0KIf6ZOHXA5uW1cb+KEh7sNgLqaP3Yf4Ocyt/D9NQNAh30VDS64Ty2za9v4htBtAgDKFvkxhC1yTD/BxAnl15aXbMUig6fljffAoM32qvxsdNjbLz0UgP3IOYvOm/E0BUDHIwIz7D4A+5Opuq6U6119V/bXOQMdeQ1sdYK357Xv05M/txBCCCGE+DM7XpswSpvYOOIAAAAASUVORK5CYII="],
    //             ["Witch Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANlJREFUWIXt1D8OgjAUBvCvYgnBGEn8g4O6MjowezTv4AE8gJtn8AAeQFcnVo2kUhAHAomIsRWNg++XdKCUvpevDQD5Mab7wXQ0SwHAsXsAwDb79fcbyItWqdvIywY81y+KW9z+eBMNhTUsH0KG2gVUNlfmuT6EPKeO3X94924KKgkUdsEWACBkiOX8iNWiq1WsilICbnucWrx1N1d+zg07E0AjiabSKoBl0Q+eXkQgOwaZRIwbpuK2ikcQnA4AwKJYsOQaF5eyPKL4wrhhou6/gRBCCCGE/Jcb+kU4HWM7foIAAAAASUVORK5CYII="],
    //             ["Wizard Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOZJREFUWIVjYBgFAwwYiVXomnPgPwMDA8Mkp+kMlcdzGRgYGBg3dNvQxwGOaVv/w9gsbNwMDAwMDNycLFRxBEEHXF8X/n/rHX3GrXf0YUL/YY6ghkOYiFDD6K1ykWH/LG+G/bO8USQmOU1n+Pr9DwMDA8P/gNIjZDmAhZACzaCVOOXy9mWSZSkyICYE4MAxbet/FjZuhklO01HEv37/w9Druvr/3V35JDuA6FyA7ABsgJuThUFf/DFjY0kkdR2g79f/n5AaXGZf3FRIUBHBNMBAYiiNglEwCkbBKBgFo2AUjIJRQCoAAF/fNnX3acj+AAAAAElFTkSuQmCC"],
    //             ["Tricorne", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPBJREFUWIVjYBgFo2CkA0ZSNdgqSPznZmOB85HYjGuvPKCdA7ZO9vkPY3f0nkG2mCE314CBg1cMbqZzwjzqOuDQ8tz/1ZWr4fyKYhM4m4NXjKG7bRcDAwMDw9dffxi6ehMYGBgYGC2DO6jjgNXd7v8nTb2IVQ45FGDg668/DK3toQwMDAyMdpGTCToA0wQSwNdff7A65vfPrwyMTMxEmcFEhBrGvGx9OBsX/vPvH+PXX38YKopNGB4/fMH4/99fohxAFFjd7c6Q6KzOYKsggVedrYIEQ2+OFcPWyT7Us3wUjIJRMApGwSgYBaNgFNAaAADbNjut5BccjQAAAABJRU5ErkJggg=="]])

    //         //held item
    //         await traitsContract.uploadTraits(13, [0,1,2,3,4,5,6,7,8,9,10], [
    //             ["None", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["Mug", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHxJREFUWIXt0jEKwCAMBdAfqeCVvP/gMbxGIAQ7SaWbEdrlPxAdlHw1ABERERHRz2Rnc+99qCpUFQDmLLXWcIAUPvkEGK21bwLMm6/MTE5CbL/AO4S7hwqHAqzF57qUMrDZS6vrNICZSc4Z0Ubc/QKZI6UkAMTdw8WJAOAG7lw2ak06GHYAAAAASUVORK5CYII="],
    //             ["Briefcase", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOpJREFUWIXt0rFtg0AUxvH/BQfLloUUicg0biJ3dJ7AEzCAS2cDBskYGYAJMkE6JnDjIAorQicRGZ4LYwSKS1/3fs3pdCd99z4ApZRSSimllHIoiUNJ4rDfp9uVpNvV6I5xEQqYLC/pwgUw69eZVHXDYuoBmI+vAwBPj34A16EkiUOyvAQgCnyp6gaAbu2beHgDwHByosD/d17YlreXZwDjogGyvCQK/FH4/n1NYVsK2zL3hOPvHyd7dtPAbrOU7lsD14kB5p4MrxmAiYsHAKaqGylsw2I6uRsM8Pn946YBgN1mCd1/cC/45gLMMkZ8RqTD5AAAAABJRU5ErkJggg=="],
    //             ["Controller", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOBJREFUWIXt0rFKxEAQxvH/JiSkOBufImUKCx/gSgtJmUJwC8HG0uIaewsPrhTZ68VHkDxHHmPKIbCJjQmWiXDVzQ+2GQa+b2HAGGOMMcaYc+eWLrZtOwKoKqpK13VUVYWIALimaf5VIFkaXhQFIsL+9QuAsixRVQAOb5/j9dXt6QqoKi+7DwAen27mGcDx/ZuLzSXAGEIYQwinKTAFA4gIwzC4v/Pn3d2q4FUFADf9WERI09T1fT/P7x+2qCp5ni++qVUF6roGcDFGl2WZizHivef38Nz0kiTBe7+2gzlzPz2kWFn7Zed5AAAAAElFTkSuQmCC"],
    //             ["Cookie", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOpJREFUWIVjYBgFo2AUjIJRMApGwSgYBaNgpANGcjQ9WZr6n4GBgeHfj88M0d17GRgYGBgP33hNHwc8WZr6/9+Pzyhiz15/YGBgYGC0qNhBWwdgs5xSRzCRorhq9h6GtMkH4fyaxSdR+OQAFlIUt6W6MCCHQEusOUPN4pP0cwC24G+JNWdgYGBgKF1wlkFPQZBkB5AUBQzQNIMe7M9ef2CIsFVkvPTgPW0dIJe8goGBgYHx648/DNHdexmevf7A8Oz1BwZWFmZGY2UhBnKyIqkhAHcEAwMD48UH7xkZGBgYf//5y0BOFhwUAADlxVDLEhNVhAAAAABJRU5ErkJggg=="],
    //             ["Grocery Bag", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVNJREFUWIXtlL9Lw0AUx7/vEmmwIkIh/0AU7ODmUMSx/4VuJUhB6OTW1aWbU4bQQaE4d/APcMuis9D/oFCQYGtakzuHYNr86HZXl/vADbn3cu+97717gEaj0Wg0Gs0OGPfbYtxvV9pM1cH920sxj2IYjCrtTHUC8ygGACRc/E8CdcvE9zKm17OVuHm8KNmVXsH99bkAgJdGKGpTE2atXK8yBZ6aTWEfWZh+RqjVTfBEULzku0sAAAHA2/EqDWQQnu/eq51U8THsFDuPTjvD3IY0BQLPFQPHEQPHyfYM6yBb25CmwGTUE7NwkZ3b6vqYjHo5BZLoCyioILMHyLZtNA73AUAEnlv98Is/SUygVHEVRRVkzwECsDWJ9IoY9tjaReozPLl6wEYfZEH/lsEYAaAfvhZexSSkWbjISjQYo4SnAyjhHK2un3dWkAACz819F4Nu8gtSY28OHDi/WQAAAABJRU5ErkJggg=="],
    //             ["Phone", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMdJREFUWIXtk7sRgzAMQJ8oOErm8BjMBB2lS3XswwjM4lKd0wQuuaSwIZ9Gr7N9kt5JMjiO4ziO4zh/RmoDYox5j53n+XcCqprN7DinlABEVS8JNKXFQwiEEI67vu8B8jiO3xcAWJYF4OMSpQIyTdMh8ShyVaJ4B9Z1Zdu2pz145OxOFI9gGAYA6bru7fvZThQLANyTv0iYGWZG27bV37pK4J2EmSEiAkjTNNSOoNp4R1VJKWURkZwzMcZTeao7sLN34kpxB+AGD2dM1QTKdAMAAAAASUVORK5CYII="],
    //             ["Mace", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALpJREFUWIXt0rEKgzAQgOE/teAQhAMXR5c8ik/tS4jvIDjeEkRU0qWFDhbaUtuh940JXH7IgTHGGGP+nXt0EUJIdV0DuLZtDws47R0WRZEAuq4DSE3TfDegqirGcUREUFVijIcF7H5BCAEgqSrLsuC9B3DDMHwn4BYRY2SaJlJKyXtPWZYAru/74wPuiQh5njPP88dDngo4MuSlgEch1yV1qvryrPM7AbeHRMSt60qWZWzb9s4oY8zvXQATX0pHOoN+UAAAAABJRU5ErkJggg=="],
    //             ["Morning Star", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARpJREFUWIXtkqFOw1AUhr+7XuCKhlRA1WxlUzW9YCt5hD0WggfA4DBTEwhSRSqnSJawoCq25Ka0O5h1CYGuIXRDcD91cs/JPV/+HHA4HA6Hw+H476h9zeurRC4CH0Dd3D8eV2A0Gsn5aa3OVgvxjQeg7p5ejyMQx7ForZXWmsvyBUB849GI3M4WvQkM2sS01gLw8PwGoKpa1LIoWdlaJuOhTMbDXgQ6E8iybPeeJiHmZIB93/SWiG4T2ybwSXCbBmkSqqoWlkUpvvEkTUIA1fR/QlcCEgQBgJpOp1/mmkSqWqg2Qp8CWGvFGIMxhn0Sv+XbI8zzfFdbaymKgvV63ftyaL8BAGWtlaY+yPauj6Mo2tXz+fxQDo6/5QNB/WOlUmKcqQAAAABJRU5ErkJggg=="],
    //             ["Quill Pen", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAW5JREFUWIXtlLFuwkAMhn+nFfJoVYqUASEGxjxAlY13ySNcN4YOGRkjpE7dmJh5iU5dEOOJKYLlhlQ6ApK7AArtQtWkS/OtZ/v3/fYd0NHR0dHR8QdkWaZZlgEAjDFqjLmc3bclmue5AiBrrXrviZmR57k658g5d4kL2mrAWovtdouiKFAUBQCo955EBNPp9BJHbYgbY/RUW8uypNFopNZaMDNFUaQA6DyG1hwAoACo3+/rer0GM4OZ1Xt/denGGzjNGfv9nobDoVprISI4Ho8kIgiCAPUlbM2B8Xh8FqeqqiiOY2Vm6vV6V3GN7kCapioiSJIEy+USYRjSbrfTKIogIiQiSNP0KqdRB+riIoLD4aDMTN57cs59EwcadMAYo3Xxev36s/tKYw4kSYL5fA5mpqqq6BZxoKGfcDabaVmWNBgMsNlssFgsbs69+614/PisACh8ACaTCVar1Y/ym3CA3t4/8Pry1ECpjo7/yCeRG5bMIuFpIQAAAABJRU5ErkJggg=="],
    //             ["Umbrella", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUdJREFUWIXtlk9Kw0AcRt/UsX8wpVAh3WSV7rLttgfIYdwWXOgJegmP4QG8QBd1UdBVNgoVQ7GRCI6LZgImWhOYsYJ5q8nA5Pfm44MEGv47wvQLL31fAZz0egDifLn8PYHCcABekoRRvw8gzhYLOwIzz1MA3Xa7NFw/O1J+KdEyIcDuIuI1TVnHcWk4wMNmgyOluppMSgeNMfM8vVQAp4NBSaaYhPES7hPRMh0pxcVqZU9AMx0Plf/WFqN3mYsUS2mqA99yf5xC1pF1HH/qBZgrYYnpeKiywcyjiHkUoSXiJMmTtybgdCRd2eLm7inf0xLP2y26hNKWAIA8Kt8vk8ixkkAYuHn8P2G1hNe3j4cVqIJxgTrxWxHQVInfqkBVjArUjd+4gKZq/NYEwsBVYeAeTqAOpgUEu38Aq5/5vYSBS9X4Gxr+BB8BY2TOGy6PuAAAAABJRU5ErkJggg=="]])

    //         //Bird Extra
    //         await traitsContract.uploadTraits(14, [0,1], [
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
            
    //         //Bird Size
    //         await traitsContract.uploadTraits(15, [0,1,2,3], [
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
    //             ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    //         await traitsContract.setContracts(nftContract.address, gameContract.address)
    //         //Art checking
    //         result = await traitsContract.getTraitBase64(8,3)
    //         console.log(result)
    //         result = await traitsContract.getTraitBase64(9,4)
    //         console.log(result)
    //         result = await traitsContract.getTraitBase64(10,5)
    //         console.log(result)
    //         result = await traitsContract.getTraitBase64(11,4)
    //         console.log(result)
    //         result = await traitsContract.getTraitBase64(12,7)
    //         console.log(result)
    //         result = await traitsContract.getTraitBase64(13,7)
    //         console.log(result)
    //         // result = await traitsContract.getTraitBase64(0,4)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(1,5)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(2,6)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(3,7)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(4,8)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(5,9)
    //         // console.log(result)
    //         // result = await traitsContract.getTraitBase64(6,10)
    //         // console.log(result)
    //     })
    // })
    // describe('Gets traits of token that doesnt exist', async () => {
    //     it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
    //         await gameContract.setMintingStatus(true)
    //         await gameContract.setGen0MintingStatus(true)
    //         await nftContract.addAdmin(ancientTreeContract.address)
    //     })
    //     it('Gets traits of token that doesnt exist', async () => {
    //         let traits = await nftContract.getTraits(100)
    //         console.log(traits)
            
    //         let result = await traitsContract.tokenURI(100)
    //         let decodedString = Buffer.from(result, 'base64').toString()
    //         let jsonOutput = JSON.parse(decodedString)
    //         console.log(jsonOutput)
    //         console.log(jsonOutput.image)
    //     })
    //     it('Mints a token and gets the uri', async () => {
    //         await wETHContract.approve(gameContract.address, web3.utils.toWei('.1', 'ether'))
    //         await gameContract.mint(2,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
        
    //         let traits = await nftContract.getTraits(1)
    //         console.log(traits)
    //     })
    // })
    // describe('Mints more tokens than max gen0 to test minting with dirt and test that the traits are correct for non-gen0 tokens', async () => {
    //     it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
    //         await gameContract.setMintingStatus(true)
    //         await gameContract.setGen0MintingStatus(true)
    //         await nftContract.addAdmin(ancientTreeContract.address)
    //     })
    //     it('mints 1000000 $DIRT successfully', async () => {
    //         await dirtContract.addAdmin(alice)
    //         await dirtContract.addAdmin(gameContract.address)
    //         //await contract.mint(alice, 1)
    //         await dirtContract.mint(alice, web3.utils.toWei('1000001', 'ether'))

    //         let bal = await dirtContract.balanceOf(alice)

    //         //console.log("Balance of Alice: ", BigInt(bal))
    //         console.log("Balance of Alice: ", web3.utils.fromWei(bal), " $DIRT")
    //     })
    //     it('Mints Test wETH to use as payment for minting', async () => {
    //         await wETHContract.addAdmin(alice)
    //         await wETHContract.mint(alice, web3.utils.toWei('10', 'ether'))

    //         let bal = await wETHContract.balanceOf(alice)
    //         console.log("Balance of Alice: ", web3.utils.fromWei(bal), " $wETH")
    //     })
    //     it('Mints 100 tokens', async () => {
    //         for(let i =0; i < 10; i++) {
    //             await wETHContract.approve(gameContract.address, web3.utils.toWei('.5', 'ether'))
    //             await gameContract.mint(10,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
    //         }
    //         console.log("Finished minting 100 tokens with wETH")
    //         await gameContract.mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))

    //         console.log("Finished minting 10 tokens with $Dirt")
    //         for(let i = 98; i < 109; i++) {
    //             let traits = await nftContract.getTraits(i)
    //             console.log(traits)
                
    //             let result = await traitsContract.tokenURI(i)
    //             let decodedString = Buffer.from(result, 'base64').toString()
    //             let jsonOutput = JSON.parse(decodedString)
    //             console.log(jsonOutput)
    //             console.
    //             log(jsonOutput.image)
    //         }
    //         let reward = await ancientTreeContract.calculateRewards(105)
    //         console.log("Reward of token 105: ", web3.utils.fromWei(reward), " $DIRT")
    //     })
    // })

    describe('Calculating reward', async () => {
        it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
            await gameContract.setMintingStatus(true)
            await gameContract.setGen0MintingStatus(true)
            await nftContract.addAdmin(ancientTreeContract.address)
        })
        it('calculates the reward of a staked worm', async () => {
            await wETHContract.approve(gameContract.address, web3.utils.toWei('.5', 'ether'))
            await gameContract.mint(10,true,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))

            for(let i =1; i < 10; i++) {
                console.log("Made it to token: ", i)
                let traits = await nftContract.getTraits(i)
                console.log("Is token a worm? ", traits.isWorm)
                await ancientTreeContract.calculateReward(i)
                //console.log("Reward of token ", i, " is: ", web3.utils.fromWei(reward), " $DIRT")
            }
            
        })
    })

    // describe('Minting token and getting art', async () => {
    //     it('sets minting to active and set gen0 minting to active, and sets ancient tree contract to admin', async () => {
    //         await gameContract.setMintingStatus(true)
    //         await gameContract.setGen0MintingStatus(true)
    //         await nftContract.addAdmin(ancientTreeContract.address)
    //     })
        
    //     it('Mints a token and gets the uri', async () => {
    //         await wETHContract.approve(gameContract.address, web3.utils.toWei('.3', 'ether'))
    //         await gameContract.mint(6,false,BigInt(11912372696322013812339097185306443775573840930383684865192230861215769821184))
            
    //         for(let i=1; i < 7; i++) {
    //             let traits = await nftContract.getTraits(i)
    //             console.log(traits)
                
    //             let result = await traitsContract.tokenURI(i)
    //             let decodedString = Buffer.from(result, 'base64').toString()
    //             let jsonOutput = JSON.parse(decodedString)
    //             console.log(jsonOutput)
    //             console.log(jsonOutput.image)
    //         }
            
    //     })
    // })
    


})
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";
const PRIVATE_KEY = "d41d34b8aae7ce74b921dadf0de0e065691e8c7ccd7be4955678da221ad932b6"


module.exports = {
  solidity: "0.8.1",
  networks: {
    mumbai: {
        url: "https://rpc-mumbai.maticvigil.com/v1/63d49c5cd25ac094bc2b7e6cc3ac4cd8aa8a9aad",
        accounts: [PRIVATE_KEY],
        gasPrice: 8000000000
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
};

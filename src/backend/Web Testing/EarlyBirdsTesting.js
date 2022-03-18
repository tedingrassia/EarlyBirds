const nftAddress = "0x30BB5E58fD28ad386C62373EC5Df0f852eEe35DE"
const dirtAddress = "0xBa81d6906b10873d4784Fb7Dc3FC5D26923fB428"
const gameAddress = "0x4d243115d17Ce9ca0B54048c52b68A5519BB6456"
const randAddress = "0xb4587E3A555bc38fE6F6de2E181F993829de7d02"
const traitsAddress = "0x9b56eFf89d4332259Df429DC8F9fE8392d60D1e4"
const ancientTreeAddress = "0x330dad4fd7682a3B53D509ffB047CFA41DDB5a0E"
const testERC20Address = "0x7637C8c8b282f2819a4427990725d316E13AB6E5"
const birdBathAddress = "0x6256ce776783C655aE801b0Ed6A28D2aC35BB2C5"

const nftAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dirtContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_earlyBirdsGame",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_random",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_testERC20",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_ancientTree",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "BirdBurned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "BirdMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "BirdStolen",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "WormBurned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "WormMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "WormStolen",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "aliases",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGen0Supply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMaxMint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMaxTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      }
    ],
    "name": "getMintDirtCost",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumMinted",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRandomSeed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getTokenWriteBlock",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      }
    ],
    "name": "getTraits",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isWorm",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "body",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "eyes",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "mouth",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "hat",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "facialAccessory",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "tail",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "heldItem",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "size",
            "type": "uint8"
          }
        ],
        "internalType": "struct IEarlyBirdsNFT.WormBirdTraits",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "isWorm",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxGen0",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "seed",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "numGen0Minted",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numMinted",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rarities",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setInitialRandomSeed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_maxMint",
        "type": "uint16"
      }
    ],
    "name": "setMaxMintAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "tokensOf",
    "outputs": [
      {
        "internalType": "uint16[]",
        "name": "",
        "type": "uint16[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16[]",
        "name": "tokenIds",
        "type": "uint16[]"
      }
    ],
    "name": "updateOriginAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const dirtAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const gameAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "FEATHER_COST",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAXIMUM_DIRT",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ancientTree",
    "outputs": [
      {
        "internalType": "contract IAncientTree",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "birdBath",
    "outputs": [
      {
        "internalType": "contract IBirdBath",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "dirtAmount",
        "type": "uint256"
      }
    ],
    "name": "buySecretEgg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "dirtAmount",
        "type": "uint256"
      }
    ],
    "name": "buySecretKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dirtContract",
    "outputs": [
      {
        "internalType": "contract IDirt",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "earlyBirdsNFT",
    "outputs": [
      {
        "internalType": "contract IEarlyBirdsNFT",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "featherTypeID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gen0MintingActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGen0MintingStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMintingStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "qty",
        "type": "uint16"
      }
    ],
    "name": "makeFeather",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      },
      {
        "internalType": "bool",
        "name": "stake",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "originSeed",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintingActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomGetter",
    "outputs": [
      {
        "internalType": "contract IRandomNumberConsumer",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dirtContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_earlyBirdsNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_randomGetter",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_birdBath",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_ancientTree",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_testERC20",
        "type": "address"
      }
    ],
    "name": "setContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      }
    ],
    "name": "setFeatherId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_gen0MintingActive",
        "type": "bool"
      }
    ],
    "name": "setGen0MintingStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_mintingActive",
        "type": "bool"
      }
    ],
    "name": "setMintingStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_paused",
        "type": "bool"
      }
    ],
    "name": "setPaused",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "testERC20",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDirtEarned",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const randAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getCurrentSeed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRandomNumber",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomResult",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomizeSeed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "randomness",
        "type": "uint256"
      }
    ],
    "name": "rawFulfillRandomness",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const traitsAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "traitString",
        "type": "string"
      }
    ],
    "name": "traitString",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "traitTypeId",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "traitValueId",
        "type": "uint8"
      }
    ],
    "name": "getTraitBase64",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_earlyBirdsNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_earlyBirdsGame",
        "type": "address"
      }
    ],
    "name": "setContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "traitData",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "png",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "traitTypeId",
        "type": "uint8"
      },
      {
        "internalType": "uint8[]",
        "name": "traitValueIds",
        "type": "uint8[]"
      },
      {
        "internalType": "string[][]",
        "name": "traits",
        "type": "string[][]"
      }
    ],
    "name": "uploadTraits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const ancientTreeAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAXIMUM_BIRD_SIZE",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAXIMUM_DIRT",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WORM_CLAIM_TAX_PERCENTAGE",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WORM_EARNING_RATE",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WORM_MINIMUM_STAKE_TIME",
    "outputs": [
      {
        "internalType": "uint48",
        "name": "",
        "type": "uint48"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "strength",
        "type": "uint16"
      }
    ],
    "name": "_getWormStrengthBonus",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "name": "birdHierarchy",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "birdStakeBySize",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      },
      {
        "internalType": "uint128",
        "name": "earningRate",
        "type": "uint128"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      }
    ],
    "name": "calculateReward",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "reward",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16[]",
        "name": "tokenIds",
        "type": "uint16[]"
      },
      {
        "internalType": "bool",
        "name": "unstake",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "seed",
        "type": "uint256"
      }
    ],
    "name": "claimRewardsAndUnstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dirtContract",
    "outputs": [
      {
        "internalType": "contract IDirt",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dirtPerSizePoint",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "earlyBirdsGame",
    "outputs": [
      {
        "internalType": "contract IEarlyBirdsGame",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "earlyBirdsNFT",
    "outputs": [
      {
        "internalType": "contract IEarlyBirdsNFT",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalDirtClaimed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastClaimTimestamp",
    "outputs": [
      {
        "internalType": "uint48",
        "name": "",
        "type": "uint48"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "seed",
        "type": "uint256"
      }
    ],
    "name": "randomBirdOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomNumberConsumer",
    "outputs": [
      {
        "internalType": "contract IRandomNumberConsumer",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dirtContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_earlyBirdsNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_randomNumberConsumer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_earlyBirdsGame",
        "type": "address"
      }
    ],
    "name": "setContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint16[]",
        "name": "tokenIds",
        "type": "uint16[]"
      }
    ],
    "name": "stakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBirdsStaked",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDirtClaimed",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSizeOfBirdsStaked",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalWormsStaked",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unaccountedBirdRewards",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "name": "wormHierarchy",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "wormStakeByStrength",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "tokenId",
        "type": "uint16"
      },
      {
        "internalType": "uint48",
        "name": "time",
        "type": "uint48"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const testERC20Abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const birdBathAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_baseURI",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "qty",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "burnFrom",
        "type": "address"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dirtContract",
    "outputs": [
      {
        "internalType": "contract IDirt",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      }
    ],
    "name": "getInfoForType",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "mints",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "burns",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "maxSupply",
            "type": "uint16"
          }
        ],
        "internalType": "struct BirdBath.TypeInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "qty",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_baseURI",
        "type": "string"
      }
    ],
    "name": "setBaseUri",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_dirtContract",
        "type": "address"
      }
    ],
    "name": "setContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_paused",
        "type": "bool"
      }
    ],
    "name": "setPaused",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "maxSupply",
        "type": "uint16"
      }
    ],
    "name": "setType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "setTypeURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "updateOriginAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "typeId",
        "type": "uint256"
      }
    ],
    "name": "uri",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner()
console.log(provider)
console.log(signer)

const connectButton = document.getElementById('connectButton')
const uploadButton = document.getElementById('uploadTraits')
const mintButton = document.getElementById('mintButton')
const getTraitsButton = document.getElementById('getTraits')
const getInitialSeedButton = document.getElementById('getInitialSeed')
const randomizeSeedButton = document.getElementById('randomizeSeed')
const getCurrentSeedButton = document.getElementById('getCurrentSeed')
const setContractsGameButton = document.getElementById('setContractsGame')
const setContractsAncientTreeButton = document.getElementById('setContractsAncientTree')
const addAdminDirtButton = document.getElementById('addAdminDirt')
const setGen0MintingStatusButton = document.getElementById('setGen0MintingStatus')
const calculateRewardButton = document.getElementById('calculateReward')
const mintDirtButton = document.getElementById('mintDirt')
const getBalanceButton = document.getElementById('getBalance')
const claimDirtButton = document.getElementById('claimDirt')
const mintFeatherButton = document.getElementById('mintFeather')
const setTypeIdButton = document.getElementById('setTypeId')
const getFeatherBalanceButton = document.getElementById('getFeatherBalance')
const getOwnerButton = document.getElementById('getOwner')


async function getAddress() {
    const signer = await provider.getSigner()
    try {
        const address = await signer.getAddress()
        return address;
    } catch {
        return "not connected"
    }
}

async function connectToMetamask() { 
    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    console.log("Accounts: ", accounts)
    console.log(ethereum.selectedAddress)
}

async function getInitialSeed() {
    await randContractWithSigner.getRandomNumber()
}

async function randomizeSeed() {
    let randSeed = await randContractWithSigner.randomizeSeed()
    console.log(randSeed)
  }

async function getCurrentSeed() {
    let currentSeed = await randContractWithSigner.getCurrentSeed()
    console.log(currentSeed)
    let readableSeed = BigInt(parseInt(currentSeed._hex, 16));
    //return currentSeed
    //const addressInBase10 = parseInt(currentSeed._hex,16)
    //console.log(addressInBase10)
    return readableSeed
}

connectButton.addEventListener('click', () => {
    connectToMetamask()
})

uploadButton.addEventListener('click', () => {
    uploadTraits()
})

mintButton.addEventListener('click', () => {
    mintTokens(getAddress(), true, 10)
})

getInitialSeedButton.addEventListener('click', async () => {
    getInitialSeed()
})

randomizeSeedButton.addEventListener('click', async () => {
    randomizeSeed()
})

getCurrentSeedButton.addEventListener('click', () => {
    getCurrentSeed()
})

getTraitsButton.addEventListener('click', () => {
    getBase64(9)
})

setContractsGameButton.addEventListener('click', () => {
    setContractsGame(dirtAddress, nftAddress, randAddress, birdBathAddress, ancientTreeAddress, testERC20Address)
})

setContractsAncientTreeButton.addEventListener('click', () => {
    setContractsAncientTree(dirtAddress, nftAddress, birdBathAddress, randAddress, gameAddress)
})

addAdminDirtButton.addEventListener('click', () => {
  addAdmin(ancientTreeAddress)
})

setGen0MintingStatusButton.addEventListener('click', () => {
  setMintingStatus(true)
})

calculateRewardButton.addEventListener('click', () => {
  calculateReward(3)
})

mintDirtButton.addEventListener('click', () => {
  mintDirt(getAddress(), ethers.utils.parseEther("10000000"))
})

getBalanceButton.addEventListener('click', () => {
  dirtBalance(getAddress())
})

claimDirtButton.addEventListener('click', () => {
  //63 has glitch
  claimDirt([76], true)
})

mintFeatherButton.addEventListener('click', () => {
  mintFeather(1, getAddress())
})

setTypeIdButton.addEventListener('click', () => {
  setMaxSupply(0, 100)
})

getFeatherBalanceButton.addEventListener('click', () => {
  birdBathBalance(getAddress())
})

getOwnerButton.addEventListener('click', () => {
  ownerOf(54)
})

//when multiple accounts are connected, log the switch of accounts
ethereum.on('accountsChanged', async function() {
  console.log("Changed accounts to: ")
})

const nftContract = new ethers.Contract(nftAddress, nftAbi, provider)
const randContract = new ethers.Contract(randAddress, randAbi, provider)
const gameContract = new ethers.Contract(gameAddress, gameAbi, provider)
const dirtContract = new ethers.Contract(dirtAddress, dirtAbi, provider)
const traitsContract = new ethers.Contract(traitsAddress, traitsAbi, provider)
const ancientTreeContract = new ethers.Contract(ancientTreeAddress, ancientTreeAbi, provider)
const testERC20Contract = new ethers.Contract(testERC20Address, testERC20Abi, provider)
const birdBathContract = new ethers.Contract(birdBathAddress, birdBathAbi, provider)

const nftContractWithSigner = nftContract.connect(signer)
const randContractWithSigner = randContract.connect(signer)
const gameContractWithSigner = gameContract.connect(signer)
const dirtContractWithSigner = dirtContract.connect(signer)
const traitsContractWithSigner = traitsContract.connect(signer)
const ancientTreeContractWithSigner = ancientTreeContract.connect(signer)
const testERC20ContractWithSigner = testERC20Contract.connect(signer)
const birdBathContractWithSigner = birdBathContract.connect(signer)

async function unpauseBirdBath() {
  await birdBathContractWithSigner.setPaused(false)
}
//unpauseBirdBath()

async function uploadTraits() {
    let result = await traitsContractWithSigner.uploadTraits(0,[0,1,2,3,4],[
        ["normal","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWIVjYBgFo2AUjIKRDhhJUPufSuaQpfH/+kx7BiUZCRRBNiEIXzNzItmOIEYTVsthgJmTh4GZk4dsRzARowiX5QwMDAx/v38h1U7SHUAI/Hr3YmAdQAkYdcCQcACjfvVKvAr0q1cyaEoJ0qwcgIH/F1vDcVp+/dl7cuwnvShGdgRSyJBdFJMC/q/PtP8Pdch/ND5R+pEwHLCQ6or1mfakamFggBbnDAyQUlW/euV/BmiokewAfMUyOXpJyoaB0w+i8AnlDlqA/+iYyHSAoQ8mQa80wICWBuDiJDsAZgiR4D/Mclx6SC6KCaQD9OjB0I9eapJTgGDE98XWcAb96pUY0QPzNbIc1ANwe8mKAuT4RAfYxGAOZGBgYFAW5WG8+xrRigIAsUpkeNRBduMAAAAASUVORK5CYII="],
        ["maroon","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARdJREFUWIXtVEsOwiAQfTXGRI0xcedK4r538Co9SFcepDfxElygrly70cTNuLAQSn8MpSZGXsKCgcc8mOEBEREREf+OhLGXAp3jRaRcCBw3m1pwu1pht17jdLl4i3AhtSYPJWLusqkrOQDcHw9uzhpmo9gBRAQRMAZRwE8ISDIpezdkUuKwXE7mAwpUpGln8uvz6ZOfb8WmCONlvK2YA8qFoEoIWXMnvjE0nJzQRC4ElwJUdg58XDWTklC9GltAny37cFnf8FyWtfnQ75gCZA/HPmjw1MK3egBWD+g4W4A6xBGkkndx2FY80Ad2eRp82zV9DKRR7yJNkUnZKI+6tblWXUDn9SqBWU8bbTElEAD2i0Vye7302huhrmNo03JuMAAAAABJRU5ErkJggg=="],
        ["green","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAR1JREFUWIXtVEsKwjAQffUDglSxqCAeqEt3HqKnyMIzeIjewLO4FhdKBd240XFhU9L0YyZWQcyDLDLJy7xkJg9wcHBw+Hd4jL3U0DlWRAojH8NpNxccz3sIpn2sFltrESak0uRNieiYbKpKDgDH3ZWbM4fWW+wGRDQi4B04AT8hwItFUrshFglGs/bHfECCliKoTH7a32zy861YFaG8jLUVc0Bh5FMqhLS5EV8ZGYycUEUY+VwKkNo58HTVWCSE9NXYAups2YbL+oab9SU3f/U7PgHSh2EfFHhy4Vs9AK0HsjhbgDzEECSTV3HYVvyiD/TyFPi6a9oYSKHeSxEgFkmhPPLW6lp6gSyvVQnUeuooi0mBADCYtLzz4Z6tPQDncmMVphhcWAAAAABJRU5ErkJggg=="],
        ["pink","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAStJREFUWIVjYBgFo2AUjIKRDhhJUPufSuaQpfH/puAcBlVlVRRBXgUZBgYGBgaZrGCyHUGMJqyWwwCbhDADOwcn2Y5gIkYRLssZGBgYfr14S6qdpDuAEPj84MnAOoASMOqAIeEARs2ufLwKNLvyGbTFZWlWDsDA/+tlE3FafvXlY3LsJ70oRnYEUsiQXRSTAv5vCs75D3XIfzQ+UfqRMBywkOqKTcE5pGphYIAW5wwMkFJVsyv/PwM01Eh2AL5imRy9JGVDv7VTUPiEcgctwH90TGQ6wNAHk6BXGmBASwNwcZIdADOESPAfZjkuPSQXxQTSAXr0YOhHLzXJKUAw4vt62UQGza58jOiB+RpZDuoBuL1kRQFyfKIDbGIwBzIwMDAoC4gy3v3wGi4HAHt9ZKTGQG3aAAAAAElFTkSuQmCC"],
        ["gold","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUVJREFUWIXtVDFOAzEQHKOTkgJOpIihQEhAgYQE+QDSdfmDv0DFa+4L+YM7noBOooOCMhESClBQwFJwtozNJfaSQIFHcuG1xzv2rgfIyMjI+O8QCXtpReewiNTUFXYGPRsoyj0Mijmwew4xumSLiCEFyV1sDY/QHx6zRRQxm7qSA8DT7Bb9t1lqXosNNtPBwwufuxIB76/zvxXwE2QBMQKEVLr7gF4JqTTODsq1+YABTSfjICiVxuhwW1zfPXLyp1uxK8J5GbYVp4CauqJWCHnzKL4zLKKc0EVTV6kUoLVz4NNVpdKE9tWSBSyyZQ436RueXlx9mS/6HesC+SOyDwKeWfitHoDXAzaeLMAcEgkyybs4yVa8pA/88gR83zU5BhLUezoZQyodlMfc2l1rL2Dzskrg1tPHdzEjEABO9jfFzf2zXfsAzGBpZPMh+OoAAAAASUVORK5CYII="]])
    console.log(result)
    //Eyes
    await traitsContractWithSigner.uploadTraits(1,[0,1,2,3,4,5,6,7,8,9,10,11],[
        ["angry","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADxJREFUWIXtzrENADAIA0HIjuw/irMBgiCKSH+daXgzAAA+ouKt5Qwixs9bAZLSvR6wpRPgEeHJBgAATy5ulQwBBYr/VgAAAABJRU5ErkJggg=="],
        ["angryred","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEhJREFUWIXtzjEKACAMQ1HNvdx7AO/q6YpujkoVB+G/LYWSpAQAwC9M6iZtb1HR71loUr9qjg5o7sv8fMArkQG51JoXGQAAHBlaqQz9y3V3RAAAAABJRU5ErkJggg=="],
        ["big","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE5JREFUWIXtz7ENwCAMBVF/xIrefxTThCohYJSI5p5EczICmwEAcJhWByMi+h1Jw5ZVko+/th01MyzJ3H3aPndt28+w/fmB25ZPDQAA7GiXTCXwrljN1gAAAABJRU5ErkJggg=="],
        ["bigblue","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGJJREFUWIVjYBgFo2AUjIJRMAoGGDASq3Danvf/YXqyXARxipEKmEi0HK8YOYCFFMVZLoIMRnb+BMWoDqC+hWGcYuQAoqKAgYGB0cjOn5EBNc1gExsFo2AUjIJRMApGAckAAHv8HYbLlZNQAAAAAElFTkSuQmCC"],
        ["cute","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEpJREFUWIXtz7ENgEAMQ9EYsaL3H8U0R4UOQRDQ/NdZcqKkCgCAn+lqMUn2GUmH3LXeKUsq29P8qvFxZrlrebrgywNkWycZAAC0bFKWFgb04kzxAAAAAElFTkSuQmCC"],
        ["cuteblue","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFlJREFUWIVjYBgFo2AUjIJRMAoGGDASq3Danvf/YXqyXAQx+OQCFlIUZ7kIMhjZ+ePkkwOYSNVw7tBGvHyaO4DagBQHMBrZ+TPi4Y+CUTAKRsEoGAWjgCwAAICdEQy8s63yAAAAAElFTkSuQmCC"],
        ["normal","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADdJREFUWIXtzrENACAQw8CI/Sf5Jc0ECD0IKl/nJkoiSZJ62HTbuB34egBIVS37OSDAsiVJ0okJv98X7UOxBTwAAAAASUVORK5CYII="],
        ["normalpink","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWIXtzrERABAUBNGjIJlSRDrQiSrkmqQCzB9DtC/b5OYkAABgMw5t5m8Hvh4YtannsuznByS5FOKuAQCA2QTGFgqj/VY0WQAAAABJRU5ErkJggg=="],
        ["sleepy1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADZJREFUWIXtzrENACAQw8BMmP1nyBJhgkc0ICH5OneWAADAuSZpkqnvD0iq7amfTewaAAD8ZwGpTBbD5cdkdwAAAABJRU5ErkJggg=="],
        ["sleepy2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAClJREFUWIXtziEKAAAIBEH//2ktVo2CMAMXtl0EAPBI9qY+O7E1APBPAf3UBfvoXzj+AAAAAElFTkSuQmCC"],
        ["snake_color","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFhJREFUWIVjYBgFo2AUjIJRMAqGErh+zuT/9XMmOPnkAEZSLNc0OsMAtZCRgYEBha9pdIYsBzCRpYuKYEg5gNHdRZBxx+53jDj4o2AUjIJRMApGwSggCwAAjIsaatBQ6gUAAAAASUVORK5CYII="],
        ["snake_white","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEdJREFUWIXtzjEOgDAMQ1F/7phT5pAwwNKhElQslf7bPMROIknSTs7bNK/gyziQZ5AkQ4bXVYNj6epHWz1AVdHdTLIkSVpyAYYqHwCZYkvBAAAAAElFTkSuQmCC"]])
    //Mouths
    await traitsContractWithSigner.uploadTraits(2,[0,1,2,3,4,5,6,7,8,9],[
        ["1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACFJREFUWIXtw7EJAAAIA7D+/7QuPcFFSCAJAAAPTQPAiQWyJgH/zhnL9gAAAABJRU5ErkJggg=="],
        ["2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAChJREFUWIXtzjERADAIBLD3b5oOKGCixyUKkgAAMFPbgaQTX0QAuOEBibEC/lmfDW4AAAAASUVORK5CYII="],
        ["3","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACFJREFUWIXtzgENAAAIA6D3L60xPh0kIAEA4KhpBwD4YwFfJQEAYB/UggAAAABJRU5ErkJggg=="],
        ["4","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACRJREFUWIXtzqERAAAIxLDff2nwOA6BSUxtEwAA9mr0dQIAzhr+PAL+VxVP/gAAAABJRU5ErkJggg=="],
        ["5","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAACpJREFUWIXtzqENADAMA0F3/6EbHFQlpXfsgSUnAADM3EePnc8Tmz0ANAUPIQMA0O7hcwAAAABJRU5ErkJggg=="],
        ["6","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADtJREFUWIXtzkENADAIBEGoJXTgokKQUbFNqAcg6Wfnv5cTAQAAwGdaaLLZ992I3GYjW6vY6XEfOQAAeNhaBfw7FwhCAAAAAElFTkSuQmCC"],
        ["7","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEJJREFUWIXt0dEJACAIRVFrJedwiwZpjIYNbAcVhLjn/8oDRQAAANBsBBpP9nl3b1+qJbdmNDxmvQOqRAf0/B7Alx7qfgYAq1oZBAAAAABJRU5ErkJggg=="],
        ["8","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADFJREFUWIXtzSEOACAMALEt4f9fHgqFGggQrb9cBAAAj2U3qKpabWY734yD5v4KwE8moAAEB8mXv0YAAAAASUVORK5CYII="],
        ["9","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADFJREFUWIXtzSESACAMA8F2hv9/uViQBQFi118SAQDAY9kNqqrWPrM9sRkHzd0jAL+Zn/AEB9WaEoMAAAAASUVORK5CYII="],
        ["10","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADlJREFUWIXtzrENACAMA8FAmTHYIUuzZFLTxkgU/PUv2wwAAOB3o9Gk2B9mJ9oR6q4sl/vrDwCAOwreOQNNs6fxIgAAAABJRU5ErkJggg=="]])
    //Hats
    await traitsContractWithSigner.uploadTraits(3,[0,1,2,3,4,5,6,7,8,9,10],[
        ["afro","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPxJREFUWIXtlT0OgzAMhZ+rwoA8cADufzJ2MjDBkC4ERSaJnRbUJd8EkWU//yVAo/FnyGLEzD7+H8cRzjnIMwA0z/N9AmTgJ0S8zJYC51wIKPHM7JnZ5CdbgVL2FqzVUCuQyVLlaI+fpqlo99YCyz4jXbWvq5VsgVJ+WtdV2p8i5HB2XUfLsmSd1QwhISP4EETAdTj3fS86vbQgkf0ZVGYuRTBzcj2rBOScW6kJDvxwD9zFIwKiGVCv+pQA0/tQIgziMAxq+y4CavpdgLZto77vdcPUYbzXwU4TFm0PAfZESm9B+Dwd55x+GxworGFwwsyWmTDdFY1Go9FI8QHEV2UipGmpuAAAAABJRU5ErkJggg=="],
        ["baseball","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKBJREFUWIXt0rENwyAQheH/UIor3HkJSk/loZiGMSxYBArbaZzIUpzEpkmK+yQkQMA9EGCM+TE5syjGuKrqy7yqss2L974pgGspHkIAoJRCKQVgnaapKcDt6oYQAuM4PsdbAJz7epdDl3fti+8ty9IU4PAPpJRWgL7vTx2iquScAWQYhksB3r2AAFJrlUf/U5vnWbquO/WhjTHGGGPM37kDofUpt4YnQtoAAAAASUVORK5CYII="],
        ["bucket","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH1JREFUWIXt00EKgCAQheFntBDdiPe/2ZxBDyCCLapd2khFm/eBmxzyRxAgop8Z7WBKqV19t9YCgPHefxfQO/yNiFUzlHO+nTkipt3egIi0GKM2YPoWhgHaw59EdANEpDnn1D86hRCmIpbBnqm1GuyR6lVKUb8sIiIiIgKADf8AHN+NEkvrAAAAAElFTkSuQmCC"],
        ["cowboy","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJlJREFUWIVjYBgFo2AUDDBgJFZhkZvhf252VgxxqBhjxZqjtHMALsup4QiCDiBkOaWOYMEmmGSr/Z+BgYFx3uGrRBv06tM3BnYWZpL1Y3UAFPwvcjNk4GZnZfj68zdBg6Ah8D/JVpsoBxNyACMDA8P/D99/MXz4/osog9DUEZ24cSok1SfogJToGwWjYBSMglEwCkbBKBjZAAD8qypdPFWzMwAAAABJRU5ErkJggg=="],
        ["crown","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALlJREFUWIXtzyEOwjAUBuC/g5maySaI3gBOwQ12FRIOsJNwhd0AMzFBCAZDEAgyuRpI2kIRzWYQbZOJifep5uXPe38BQsjc2Vo4W4vwrCmdbcrk/VlUqlg7e9yOx8Hl/8wowL6mL9BWEsPy4fi54n4GjCXancLtoKYv0GntH874nwN49L2fGQUY5cAlOq1xP72TC7BQwNbCIS+ilj0vCyb316QCy4gMw9cAWR4MrjafpOOEEEIIIWQWfmi/Tev3YsnqAAAAAElFTkSuQmCC"],
        ["halo","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIlJREFUWIVjYBgFo2AUDDBgJKTg//GA/wRN4ZKDm8eoP4kkBzDhtXyv0X+G3x8ZGSAOxY3/fIOx//+/mEeSA1gIyDMy/P4ICQFWftyqfr1hYPjPz8DAxM7IwMxBkgPwhgCj8zmII/79hmB8ofDvNyPDv58MpEbBKBgFo2AUjIJRMApGwSgYBQMOAIYvHecHlY9rAAAAAElFTkSuQmCC"],
        ["horns","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJ5JREFUWIXt0rEJwzAUBND7bv0RHiALZZBMkDkygQbxIFnBrRthF4agSxE7pLJsUBO4Vwn+53QgASJSEN0Z3Yt7fQjsQzid3+wNH23LhbSDWXZpGj67rl4BAFgA3KapGHRNCUPOGHOuWyCYHXqC6M5EYiTrFkifwN0S0Z3bbqpcwNbQ0j/Y5vY6dX2hwH2evyX2/sE6s5+ziIiIiPyPN0/xP5mgHcOSAAAAAElFTkSuQmCC"],
        ["pot","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHhJREFUWIXt0L0JwCAQBeBnSOEYVi7jZFau5hbeCHZJEyEEQRMtEvI+OPAP7ylA9Heq55D3fjPGIMZY3c85A4AKIcwP0Go+GmLpOaS1vnXp9ADH694bYCTgel2w1m5l7JyDiEBEHjdoqf2AKpVSUud5RxERERHR9+yh9CdlLUGInAAAAABJRU5ErkJggg=="],
        ["tophat","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFxJREFUWIXt0jsKgEAMRdGn2GcB2f/Sso7Y2E4cw4CC97T5EHiRgL/bHvTmoj2twXT3YTEi2kfsnaGVXj/gmG00s2HtiqClyi0lqcq+OGT6H+4aq8/v7gQAAMC3nEJ1DOl+sJlFAAAAAElFTkSuQmCC"],
        ["vikinghat","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWIXt0jFOwzAUgOHfIS1BqpCFGDohZWbiFNk4SA7QAzDlBAy9AWtYOnGA7kGVmLplBCmRrIjUDMWVQUmViKVI71siO8/vPT0bhDhVm9XCblaL0ee266XdrpeD44OuzSJP7a5t1OjqewoY3ETY92NycWW/kx1kWWbjOCaKIgD3VUmSHGKaqrQAQRj9qQHVVKWdzub27eWBpip5fr3BLw5gjEFrbYs8ZTqbuwY4O78cPL3ewCJPASzQWdynteb642mfMAiV3X1ye/84qIHONwC4BOpYk44xhvfJnQJGFXcFjnL37vs9CW/94z0M0TsBj6rr2k1CAapt2761EEIIIYT4f74AXYtTB4DhR88AAAAASUVORK5CYII="],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    //Facial
    await traitsContractWithSigner.uploadTraits(4,[0,1,2,3,4,5,6,7,8,9,10,11],[
        ["beard","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK5JREFUWIXt0D0KwkAQhuF380NgC20UUiQ2KTdtIPfIVQUPIWIlaGEVC08QCFHXKhAEIVliIczTzs5+HwNCCCGEEOIfmCS2Jom/zqsyt1WZO/0djHynAFtkKYDaX2uKLLUAm/WynzsZvWiS2OoopGk7AHQUArBaaHxPqe3h7FRg7AUAVNN29jP88Xwp8JzCYcLm6XaHwcX68MD32B0vvy8wLDFX+OQCwxJzhAshAN7tUS1+xbe0FQAAAABJRU5ErkJggg=="],
        ["clown","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE1JREFUWIXtzrEJwCAYBeH7wcYFUtm5/xDuIlnBJmBmiAZS5L7+8Q4kSdLfxdPBWetMpQDE0dp2QFoZXb0TOW+frwYEwBzjlQBJkj53A5dtCc9JCyAzAAAAAElFTkSuQmCC"],
        ["earring","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAC9JREFUWIXtzsENACAIBEG0QrqmLKzBBD9m5r+XiwAA+ElXdldeNXv4wxreA4D3DpsYBS+V3U4HAAAAAElFTkSuQmCC"],
        ["glasses","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHBJREFUWIVjYBgFo2AUjIJRMNIBIyEFAXri/9H1bLj0kqAcVRwAtQBdDUwMpxwpjmAhRhGygQF64jCLcMmRBJhI1gEBBKOO1g6gGiCUBhgYkIIbix6scqSkAWJyAYYYUi7AKTcKRsEoGAWjYBQMGQAA33ohDfxB6yMAAAAASUVORK5CYII="],
        ["goatee","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIVJREFUWIXt0r8NgmAQh+H3DJUFA5g4ARMwh3PasoILaGNrQkFBgQYh/DkaGAAxX8Pv6S/35nIgIiIisne2diA9H/0URwB2fVSbAw5rlwP27UYD/JLEYQMW2fNDXvWU9RA24N2OAD5fgqb3sAGAzRHww/9sDrgXDYB1gxvA7VX/o0FEdm4CoLEllxVi4/kAAAAASUVORK5CYII="],
        ["long","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALhJREFUWIXtkK0SgkAUhc/+wQxPQIBEIJgIPASPbTZr06LBYDIw4zhwDQqD/CiQz9d29+yc716AEEIIIWSETRTKJgpX/y+yVIosnZXVY+UA1Or2NwrALAk7dhn4biCRJ7H8Ktwdz+3hdi8l8B2M/j/HIPFZvQS+a94FAMrHE541yprB0rpibd5qrTxnsD2clgn0JZriqq5R1YL95fqVzZN4SgTdrSwSaCQ8azBV3KcjgrnlhBBCAOAFjUg3DTuItgwAAAAASUVORK5CYII="],
        ["monocle","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKFJREFUWIVjYBgFo2AUjIJRMMCAkQg1/8nQQzUH/K9fe56Bm50FLlDmo0tVRzCRYjk3OwtD15bLDAyYoUITB6AAMT4Ohq8//1DLXtIcoCjKw/Dq0w+qW06UA8T4OBjuv/5CE8sJOYCxMdiQ4f7rLyhBX+ajyyCtokXVnIAL/Eei4VhaRYsedqM4gKaA6FwwUIAuoUAIDApHjIJRMApGAc0AAAseJMPyYccqAAAAAElFTkSuQmCC"],
        ["scar","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADpJREFUWIXtzjkVACAQQ8GAnkikXIn4gQoDpOLxp88hAQAAvK7sVfZ1vqfjklrSER0442POsAYA8LMNGloGvWPaCxkAAAAASUVORK5CYII="],
        ["short","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEpJREFUWIXtzrEJgDAYROH3CyHgBBZu4P4DuIRlJlFjo5A2aX1fc83BHUiSJP1d9JS3dalzTgB8CcR+lOEDU2c/zuuONoeXJUl6PSEyCfcTR1bJAAAAAElFTkSuQmCC"],
        ["sunglasses","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAG5JREFUWIVjYBgFo2AUjIJRMAoGGDASoeY/lc1DASzEKLpaks/AwMDAwKWowvDt/h24OIyv3TORVHvhgIkYRb9evWBg5uZh+HDyCIN2z0QU/q9XL8i2nFjwHxlrCgniEhsFo2AUjIJRMApGwdAEAOu1IXJGakt2AAAAAElFTkSuQmCC"],
        ["tattoo","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFFJREFUWIXt0cENwDAIQ1Gno3j/mVglvaQL4EhVlP/uIBskAMDtRjJse357qqq140kCKCwQB+i23hZgGZKm7X8CrCvEr2iz3W4v7XsBAADnegGyAQx0YX9IOAAAAABJRU5ErkJggg=="],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]]) 
    //Tail
    await traitsContractWithSigner.uploadTraits(5,[0,1,2,3,4,5,6,7,8,9,10,11],[
        ["c_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAN1JREFUWIXtlTGOgzAQRZ9XW1DScYMppuEqPuqcxkdA4gTQeRvbchJnq9hN/CSKIMF/MH8ITCaTyWQy+QJiOpq43uGqCkAIoZnZU6CE1ySRkvvTUeAhNISAiOC9h2okPQVc9doBnJl1jGsTVTV67+si/lvKURJDiaqaw18keq9hLQGAiJC64GDQFmRE5OXcUIEWw0bwLvt3kACNDjBCIObw1vzh8x14WLf81MdxlFGbGeu6lt+f7EDM90t7z3Vdbt/3aGY8/Sv2E0hfPM7zdNu2lfLluS/L4u77Lhf9AYPwVCr0wNZ0AAAAAElFTkSuQmCC"],
        ["c_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJRJREFUWIXt07ENgzAUBND7KVJZKIWVCZAnYAQPwKgMwAhMgFggkrtUVKaAIEdYdN8S4p7k+k72GSAiIqIbiNvJEu1w7ywAoB9DNlOzwB6e2orsuQ/FAn+h/RhgqhfapgaSJ9EsIMm1A4B0w6QYlxe9s7Ft6nSIp6MsVaKo6J39hR9KlBihfL6zvM1TsK5f++sT0cUsPGQqdRETqM0AAAAASUVORK5CYII="],
        ["demon","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKxJREFUWIXtljEKg0AQRZ/ZFArewSqwsGCbY+RwniQH8ABpLUTINbawm1QJibtpv4X72in+Z/4fGCgUCoWdqcR6ttU/K8Xv3tM6R+sc12kC4CQ0UN2WRSiXYmMIBtij7400Do34pa4BzDfNbuI/KDvAc133NZDjGAbmGBlDAHHzv/kUcTuQRpDbgszAHKNK6i/ZGFQbsKHrgDSGY5zhm1wPVA9J7v7Vz1ChkOcFZkI0O6ukmHoAAAAASUVORK5CYII="],
        ["d_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANBJREFUWIXtlDGOhDAQBMunCwjJ+IGDTviKn+rX8AQkXgDZXLB4xCKtdMF6k52SjGxL0O1xDxAEQRAEQRB8IXYOAFJnobuOSQJgWRaA9NNLXBKSKKXczZBz9nkvA09CVxPnyT+CAVZKMR4VMUm+boZ6ZsCNSHoqe621Tbtl4D8kf3TGXux/zABc2i/n3K4gAfz2Fga4Z+DKuzNwTbifel1Xr3StlXEcff3OK7D2PUkGsO97mufZaq3c/4DdDJx9zrZtaZomD2BrvWEY0nEc/tIfRpJIgb33YnwAAAAASUVORK5CYII="],
        ["d_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKNJREFUWIXt0rENgzAQheH/QkqEKDwC8gSM4AEYNVLajBApfZQiAzBC0KWIbSEUl6bhPgkk3LzH+cAYY4wxxhyQxgcAqRy0zdHgHQC35wwg51rhKajtei73l65K0HY9MANwqlRgFQTTOECcSPzzXSig0zgov4lo8C5/p0I1dyAXCd7laSzLR66Pd9oPqXoFf0jT5LWT/KpMC+d7ZBdLlEqZA/oCo3Inv3Aq3lgAAAAASUVORK5CYII="],
        ["fish","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAL9JREFUWIVjYBgFo2AUjIJRMApGGPiPLsA4QJbD7WWik4UMDAwMDFnV8zHkaOkAmEVwyz59/IDsCNo7wCu8hCEmp5+BgYHhf0xOP8Ovn9+RHfGf5g4QEpVmePf6KQPMcjZ2ToZfP7+jqKGlAxiXTCmEOwJmORs7J6oiGjqAgQEp/r3CSxiERKUZ+PgFGKa1JsLtp1c2xMgRDFDPs9DJAbhCgObZEA6ERKUxEiBdHQBLiAPmAFwhMOCJcBSMggEHABKzPR7lkBGrAAAAAElFTkSuQmCC"],
        ["n_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJxJREFUWIXtk7ENQyEMRI8oBSUdG1C4YRVG9TSMgMQE0PlXoCQi3Y+b+EmU+B46AxiGYRiGYRjGv+MUs+SUqyUgRAQASCmBmXf2Q0lgh3+iKnBCrYJv2U8lARx2ABoCssJP/QP374C8nvXq1tqumpkRQvjJN5Q1j4gEAMYYLucszLwrqLW+5d4uUEoRAOi9uxjjkpLVu/fezTn3pQuGMC3j/rk4BAAAAABJRU5ErkJggg=="],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["p_black","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALRJREFUWIXtlLENxCAMRT+nK1KmywYUbliFUT1NRoiUCaBzGrCSXMqcafwkCiyBP/7GgOM4juM4ji1yD3xGqHABowQIEQG3PhheASuEiASA5JwFpyqYVqBZcMFUQIxxrIAnglGenwnYc3+NBKj/MUYws8b/LUB68if/gfd7QM6rv3rbNrWamTHPs+7f7AHp97U/j1JKSCkJM6sF67pe8r4uoA0a7PselmXR5uu+T9MUaq166AC+8TJPHdRUeQAAAABJRU5ErkJggg=="],
        ["p_none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGFJREFUWIXt1LENgDAMRNGDGiGKjIAyASNkAPZfxjQUISDKc/NfmcansxUJAADAK8aHOSMFAbICRKtFGu4gvQGXaLWEpDiPPdS1YG3gXsGDNcCybrkBvkymOa8f0Dgb+HcBaa0LVvu3vnQAAAAASUVORK5CYII="],
        ["snake","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAG9JREFUWIXt0TEKgDAUA9AI/wAfx87O7l7H0Yt5s84eQGgHsYi0a/6SB126JG0AERGRYBMxq/RyWQVKPg+YJ5gnzNvesmkFOne0Au31r+8vGKEAzBPuKzOihsr/rMvzI7QJALQZQiYAEDrDcAIREakgTR7cfMyqaAAAAABJRU5ErkJggg=="],
        ["spring","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPRJREFUWIXtlDGOhDAMRZ83EEVUOQJno6SYY+QIlJyPMlKgCaBssUM0s1uT2SJPshQphb/tb0OlUqlUPoyUSDKOY7rexhj6vgeQx+PB193Jh2FIx3EIP8XKeZ6ybVsuvLlbACBN0+QOKKUIIRBCECg3gvxu2xZjDEqpBMjtI3iSrtj3PV3JgfIeACTGKADOuaIekGma/n4WEHB5IBvRWgsgzrkyAl5EANB1HVrrBEiJEbwdIgCtNfwXE5ZYQ1nXNa8hkJ7tBwp0YJ5nrLV473Msy4L3HihzioHsfAC898QYywm4qn0VU1QAv+5NjPHahErl83wDLu5l20PIqEwAAAAASUVORK5CYII="]])
    //Held Item   
    await traitsContractWithSigner.uploadTraits(6,[0,1,2,3,4,5,6,7,8,9,10,11,12,13],[
        ["axe","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAN1JREFUWIXt07FqwkAcgPHvQpFgoWRwcCkODu0eyCAOhWxmKhldMvkOXRz6GA5uHTOmT+Ak5AEcpS+QQSHK0et0QeKgDmeX/2867g7u444DIYQQQgjxz1R7oixLY9fCMHQe8GAHRVEY3/epqoogCJwfbCmAPM/N6aHLj4zHjgegFqut0wDPhtR13UyO3jO1P/4CmNl44D4gTdMmQmutXqM3gLtE2BsgSRIApbUmjmO+1j9NRP/JN/PJi5OAs1/QNo2eAcyw1wVQn9+b+wa4jvAub6F5jt1BXxUsxC3+ABIjPyR3nbUkAAAAAElFTkSuQmCC"],
        ["book","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAM5JREFUWIXt0S8OwjAUgPGvMIPiCA0hlVhUEwRcAonZAUi4AEg8AsMd0EgUFjlBSE8wxcRIEcsWIPxNCur9bJO+L++BEEIIIYQQ4o1xv+2dc94595P/a68eY6t9vQazoSXLMp8kyf8CYqt9sxEBYHuG+WgAEDxCvRve6bbY7w4ApKecyWoDoIwxQQKebUClpxygGg7QbETBN/EwYLk93kRAsYnriPViGiTg4QlKsdUA1TmgOENdoc6+Cv1dwH1E6OEfBVxHhB7+ldjqMiSoC0jkT0P1XA7SAAAAAElFTkSuQmCC"],
        ["bucket","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIlJREFUWIXt0zEKQyEQRdFnSDGFhat0DVNaWlu6TospFNMFfiBfCGKTdzoZkcuAABERERER/Tu3upBSmiICAE5Vtwc87oaqOnvvbozhAMyc8/aA57dBKWWGEABgAoCIoLW2PeB2A2Z2OXvvzwacsAz43MLJgPcPMTOY2fLH/OL20Vrr5Rxj3B7wAsIpJJoZIT8JAAAAAElFTkSuQmCC"],
        ["flower1","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANdJREFUWIXtka0KwgAQgL+TMUFkPoHFNgwGq89hs2mwmH0EwQcwaPN5DAZZEHwDmwyEubNs6OYPhm0g3NeOC9/HHRiGYRiGYRhvWPi+Lny/ElftnbzTaABUEpEJSOWDdYuqIpzcLKcwVCZwCkMOMxfvGENQXkDmAvMgSCM4zFyul4hzW8uz5wOeI7xjLDVHJI5Uh8tuaQH5FzwiAhitegpwi+LSAuTTIpGnewVkO90XHvDygicEIJFKvenoeNsvPODjBfIkcgVkM9oVFvDtAhkS6c/Bxt9wB9wXQgkZFDUTAAAAAElFTkSuQmCC"],
        ["flower2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANJJREFUWIXtkT0OgkAQRr/ZkGhhQocHoDSEwsaT2NHZeAOPQGJNbOy4DI0FsfEKUNsYfsZmSQDBWMAmJvO6zRTv5VtAEARBEARBGCAJPU5Cz4hLDcmdtQMARiI6AY186TNMRVi9N+VZzk7qIM9yRLaCW/CsAZ0Fdqd7E4HIVng9Szyq2lxAO8ItmJRFVJfM+/NmtoD+F7QjEFx8BoCqnG8FGjtoeXNnABQf08kDPr6gBQGAltJiZfEh3k4eMLpAHy1nAHQNbpMFfFugg5b+HCz8DW+/fkMcYI4ILwAAAABJRU5ErkJggg=="],
        ["gloves","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIFJREFUWIXt0LENg0AQBMBdcxk0RAXklOHiaIKAkDYowJY+4HROkCUIzL+FRLIT7u9LdweIiIiIiIjcjDmloW2jNvv+6cbxZ17ikVt8r2tRnsvOK8CSEppt04o8zUvkXoCvbVOP2D00ZvAIHvNLB3jOMwAwuR/XZHJnRaKfpr8GkA/FTimQIzVxQQAAAABJRU5ErkJggg=="],
        ["lolipop","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALZJREFUWIXt0zEOgjAUxvH/wyaQuBuP4BUYGuNFPAenciQxYWLlHq5dcGuog1QXogy2i+83ERLe95W2oJRSSql/J/Hham0AqMoSQI5dl6/Apa5DfLE1JmsJAzB6z+g9APuqAqAoiuThrwJRDL97z0Zk8YNfi8sUeP+JU9tyaJp8Bc7DACB+mgSQW9/LztrgnMtSYpFzjvCUNOfjRs/hARBJdCa+Tk1dYtXElCVWXfY5NM+9VCq3BzKaO1KPfhFiAAAAAElFTkSuQmCC"],
        ["pan","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAI9JREFUWIXt0bEKhDAQhOF/wxGsgl0eyjLPaJlKUvowlrYpBfGKQ8gdlso181UbWJgJCyIiIiIi8md2Diml45y7rvvaGcfx2QLDMBwxxsuFZVkA6PsewHLOtxZ4tY+fn7ds2za897eGtwVsXdfjqkQIwWqtTNN0eziAAyilwOcctu+7nTNgzjnmeX4kXATgDcR0HmxwHmGdAAAAAElFTkSuQmCC"],
        ["rollingpin","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALlJREFUWIXt0jEKwjAUgOE/CqWCQx2EguDkURw9gmfIAXqMnqFjj9CjBItCQTeFgkUqcZEiteJiWof3bQmB/DweCCGEEEKIf5Knkc3TqNc/R62z2tdzW2SxLbK4lwDVvjCJtl4QMvanAGqx1k4D2hMAULfzkXtVAjifxNsEAEyiAawXhM275cbNbnQG9BnxMaCviK4daKy2MYC6Hg27csKp8n76+deA1wi/vqhZdbDPqQzDJJpBA4QLD6ikOahEHOwaAAAAAElFTkSuQmCC"],
        ["shovel","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAORJREFUWIXtlD8KwjAUh7/XOtStOCm6CILgPVy7eQEP0AN4A0E8gkLdOtax4BmcnBwVOkmGDl1KHGyhi38GzWK+JbyQ8PseeQQsFovFYrH8O9IskiTR9X4QBGYF4jiuw/E8z5iEAERRpBvBRiUcAKUUAEVRUNd5nsvza9+jVa2ilNK+75NlGcf9ks5gwmqb/lzAAQjDsJbAdV3xe2O5XU56Pu2bEWhKlGXJOjrAYz5+LvHynatwDcgmvZoXMCHx0aTPp31G3bYGZLE7f1XAeX8Eqs4lL0q9mA3NCwBUnRv5Gyz/xR1YCkheHl/f0gAAAABJRU5ErkJggg=="],
        ["stave","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKFJREFUWIVjYBgFo2AUjIJRMApGwSgYBaMADdR6qf+v9VKnm30sMEaajfx/BgYGRrrZDAVMSGxGcT4OujsC2QH/v/z8w/jy04//DAwMdIsGuG/TbOThgvycrAwcrMz/YWqat92kvQPQAVII/OdhZ2FgYGBgLF9/lX4OQHYIBwsTw48//2jiECZCCpq33WSo3nSdgYGBgfHP3390zyWjYPgDAMpZJY+CMic1AAAAAElFTkSuQmCC"],
        ["sword","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKZJREFUWIXt0bENAiEUgOGfi4UlG9iQsAClE9A6g70LMIWVcRkLyzcCiXEDNsDG4uKRizEnWryvpOD98EAppZRSSv2bnHPNOXebN7welFIAukVMAgDTM8K0DkUEoFprAYxzrm9Az4jWCgAIIUBjHSn6mqL/fkArIkVfmfm1T7x1mYhwOuwqwHo1mOPl1jdgv92MX14Bc77eFwmYXcGIAXgOXXQF6uceqs45dNEMx+oAAAAASUVORK5CYII="],
        ["wand","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAIRJREFUWIVjYBgFo2AUjIJRMApGwSgYBaNgpANGGCPKVPo/TGzZ6acD4gAGBgYGBh52FrhDZh15SD8HwECajTyMSReHYDgAm0N42FkYxPk4GBgYGBjL11+ljwOQHaIsyvP/5acfDF9+/mFgoHKIMBFSALWMkZ2FiZGFiZGgg0fBKCAVAAD5oxxeUT7ILgAAAABJRU5ErkJggg=="],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    //Worm Strength
    await traitsContractWithSigner.uploadTraits(7, [0,1,2], [
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    
    /**BIRD TRAITS */
    //body 
    await traitsContractWithSigner.uploadTraits(8, [0,1,2,3,4,5,6], [
        ["Blue", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAS5JREFUWIXtkz1Lw1AYRk+kIGiGUAJC4iJIqXUTKw5SB3+A0lFwlNZZHIuUjv0B0lnIKO3mkqHgUGyhW3HoakGQ4pAOhcJ10FwSEMwNdhDuWd77/ZzAG9BoNBqNRqPR/CHlxkAAQuWOkSbo4OJOAMbz/ZUch8GbuSIPtf3Eb6sKiHrLpzsKCKYTAMysQzCdYGYdeciy3cQSGUUBSRi4mM9i4aqspLl0XDBj85cnD8t2sWwXgI/3V8qNASToB1UB47ZyEpPIrK6zXTyl127SazelROIHFQXg+6vqLV8udEcBi/kMgHG/w+HZjdz7rRdS/QU/ifjDN7kx7ncAyB+dKzVkKonHy10RrYAoVT1Rqnpybjn5ZWR/CQyv90S0huuAMO2tpQXHJHY21qJV87/4BOnwX2L2/3bpAAAAAElFTkSuQmCC"],
        ["Grey", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARRJREFUWIXtkztqhUAUQI8h4JCBCDZvDTGVhYU7sJgdTJ09uAQ34g4sXIBgYfE6lyFYCFpNmrzhCfk4Jk1gTnPne+8ZmAsej8fj8Xg8nj9Ea20A43InOFOoKAoDBG3b2jFgpJQIIajr+nBuVwFTVRXDMLAsCwBSSpZlQUppD7lIPDoKWG4Ft23bFXfl4cylLMt28+v1ihACIQQA67qitYYD/8FVICjLcicRhiFJktD3PX3fW4nDCR0F4ONVVVXZhWEY2LYNgHEcyfPc7v30F051wWciXdfZjXEcAUjT1LkrnCXat1dzHwGjlDJKKTuP4/jLBKe74MblOdxFIGiaxgBEURTM88w0Tb8t8y3m5fJ0Hz3/i3dDIV0zOZEXEAAAAABJRU5ErkJggg=="],
        ["Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQhJREFUWIXtkz9uhTAMhz9KRSWGRsLDG5kYqk4MOUnO0OOx9w4gcQAmDgASCwNSlC7vRQ+pfwjtUinfYjtW7F+sGCKRSCQSiUQif4jW2gEu5E5yppGIOCCZpsn7gFNKISK0bXu49kNgb2eMcUopACci3r9apmlCaw0HJ/EYKMBza2it9f4ZQicAQF3Xu3ieZ0QEEQHCphAqIGmaZiciTVOUUgzDwDAMXsThgoEC4PoqY4w/6Pseay0Ay7JQVZXP/fQhT23BZ0K6rvOJZVkAKIoieCuCRby/vbp7C7iyLF1Zlj7O8/zLAqe34Mbl+WlngWQcRweQZVmybRvruv62zbe4l0t+byP/iw9TlVtH4haM3gAAAABJRU5ErkJggg=="],
        ["Green", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASpJREFUWIXtkz1Lw1AYRk9UimggiQjpoC4BJbjp4lIXB3EK9D9kdBIcOzi6dujgTxACnbSgS126FHchLl3aRQ20S6BcB80lAcHcYAfhnuW9388JvAGNRqPRaDQazR8SdhsCECp3jCpBZ9e7AjDuLl/kOAve2nO5CZ5Kv60qINq9Fv1JxHScAmDWa0zHKWa9Jg/ZllNaYkVRQJIFprN5IVyVpSqXjt1mYR4/vmFbDrblAPCRvBN2G1CiH1QFjPPTq4JEbX2Z7SOLYRQzjGIpUfpBRQH4/qp2ryUX+pOIdDYHYDRIOGx6cu+3Xqj0F/wk8vB6KzdGgwQA72RDqSErSdyH+yJfARF0fBF0fDnf9MxFZH8JPF8ciHzN1gFh7awuLLgg4btr+ar5X3wCsKRfFFnNmkYAAAAASUVORK5CYII="],
        ["Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASdJREFUWIXtk79KA0EQh78zG45YKFxxIblDO0GsrrP0HXwDIaS1lDzAkTJVIAR8g/SWKdOlsLNTEg4sAqlCyB1jc1ly4J/b00bYr5mZHXbmt8MOWCwWi8VisVj+kGkUCSAmd5wqjQZBIIBzv1xqH5C2Uviex818Xrr2kWFvmcWxtJUCkEEQaD+3vK9WTKMISk5CGQrQ7Buus0z7VTCdAABn3W4hftxu8T0P3/MAsymYCnCue72CiNNajVul6CcJ/STRIkoXNBQA+atmcawP3kYj1lkGwCRNeWi1dO6nD1lpCz4T8jwc6sQkTQG4c13jrTAW8dS5kkMLyDgMZRyGOr5oNL4sUP375jRP3IIFnM5iIQDn9brzutvxstn8ts23yGXz+NBa/hcfA5pdzT+31tUAAAAASUVORK5CYII="],
        ["Eagle", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAATRJREFUWIXtk79KA0EQh7+ToOKBROGS0+KQqzwEwTLEwiKdhWBlTG3pG0gKyRvkFfQUCyGFYGGRQrEMpImVBAsVD7Q6CBIYm2RJwD+3p42wXzMzO+zMb4cdMBgMBoPBYDD8IbVyUQDRuWOlaVQKcgJYV50X5QPiu1k81+Hg5CZx7QnN3tKoV8V3swBSCnLKH1geniNq5SIknERGU4Bi2DDu9ZWfBt0JALC5vTMWX9894bkOnusAelPQFWBt7R+OibCnM6wtOYTNNmGzrUQkLqgpAAavatSr6uDi/JS41weg1Y3Y3VhVuZ8+ZKot+EzIWXikEq1uBMD68oL2VmiLuNxbkVELSKXgS6Xgq3hxzv6yQOotGJKfnRqzgHV8ey8A8/ak9Rq/8/gW/7bNt0iQnxm1hv/FByaoXfwGBdnmAAAAAElFTkSuQmCC"],
        ["Gold", ",iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASBJREFUWIXtkz1KA0EUgL+IEhBkSOUWG4sVBBG3sM0B7NYDWEsOsL0E60CKnMEqlRsQ0+UAASEHCBhSpAnLRglYhGchO+yCkJ1BC2G+5s3/+5h5Aw6Hw+FwOByOX2SeRAKIyZ6aTaKn+4YAtZuHVLcBCXyF8kJOoqTy2aYCMhm0qacjZosMgMBXzBYZga/0IhOJfUMBTZ5wtd6WkpuyZ7Pps3Fd6nce31FeiPJCALLllHkSQYV6sKkBmQzaANTTEfB9C/3hBoBe3CJbTis/g5UAQC6Ri6zWWwD6ww29uKXndklY/YKfRD7envVEfhud2yPjX2Es8XJ3IcUIyLjblHG3qfuXp/ZFulPgNb6SYszHATnzD/4scUni/PiwGB3/iy/vkmdyA+9zOgAAAABJRU5ErkJggg=="]])

    //head
    await traitsContractWithSigner.uploadTraits(9, [0,1,2,3,4,5,6], [
        ["Blue", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOm/bvR8Bl4hKbiAgLAYAwMDA8O2BkOyHMFEqgZ08OHtK4r0k+JiDN8jAwFhMbJCgeIQoBSQ5ABcvqebA2gBSHEA47HJ7gyf3z0bMAfgBR/evmJQcy2mTzb88fUDI1JIwCxlFNFwI9ksUh3A+PHhacbfP78xMDAwMP7+9R1uOQMDA8Oxye4kO2AUjIJRMApGwYADAFxxJGMzk58zAAAAAElFTkSuQmCC"],
        ["Grey", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJpJREFUWIXt1LENAyEMBdBPlJ4t3LEFHZMwjYejc09ByQSX6tApUSIZkrsifhVCGD6WADDGmH/nJmq2L+6lLtpijAghjAkiAgDknKdC3LQFz0RkqV6T+OX2R0Q01YXlDqxSBXh3+9MC/IImgGNmlFIuC/CRiCCldM4zrLW6Qyf2Q93+J2jcletda22Me+/w3o8QzKwOYIwx5nIPYekgythyoDoAAAAASUVORK5CYII="],
        ["Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJdJREFUWIXt07EKAyEMBuCk1CmIo/j+D+Set3AICg7XqXK0tBBt74bLN4kY/RMQwBhjrg4narYf3qUu2mKMEEIYG0QEAAA556kQN23BKxFZqtckfut+j4imprA8gVWqAJ+6PyzAP2gCIDNDKeW0AF+JCKSUjvmGtVbcTeL5KHrv1XfdleextTbWvXdwzo0QzKwOYIwx5nQPaowjCvP+HC8AAAAASUVORK5CYII="],
        ["Green", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOm/Y6USg4gmF1yAn5+PgYGBgWGO/zGyHMFEqgZ08PHjJ4r0k+JiDN8jA35+PrJCgeIQoBSQ5ABcvqebA2gBSHEA4+q4Kwxvrn8bMAfgBR8/fmIwS5GlTzb88vwXI1JIwCxllLfjJ9ksUh3A+Or6F8YfH/4wMDAwMP789AduOQMDA8PquCskO2AUjIJRMApGwYADAIPfJLH7V2LtAAAAAElFTkSuQmCC"],
        ["Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKlJREFUWIXt0zEKg0AQBdA/6cTWtbHzDNY5hqfIXXIxi5xA2CLVFlYmLCyYKiIJEWY30SL/lQsz82dgASKifycRNdMXe6mLpnNRoMrz+aE2BgDQdF1UiIO24FXvXFK9JvHb9ku1MVFXSL5AKlWAT9tvFuAXNAGktRbXcdwtwKreOZzKcptvOHgvi0s8h8oxy9S9tAHk4r3cQgAAuYcwDweA1lp1ACIi2t0DYWAk7SPJtawAAAAASUVORK5CYII="],
        ["Eagle", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANlJREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOn/qlmTGJRU1OACUpISEFrTgCxHMJGqAR08e/6CIv2kuBjD98hASlKCrFCgOAQoBSQ5AJfv6eYAWgBSHMBo4uTB0FCUhSExraGEbAeQnA0dNWUZFEX5GRgYGBiyGnrglnOzszK8YeRhXL7rMEkGkhwF3OysDB++/WRkYID4XFRShpGBgYHh5++/jCL/v5BqHMkOYHz24Qvjrz9/GRggocf4+vkTBgYGBsY///4xTN59nmQHjIJRMApGwSgYcAAAytkvK6xoIXcAAAAASUVORK5CYII="],
        ["Gold", ",iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK1JREFUWIVjYBgFo2AUjIKRDhjJ0POfimaRrOn/kSn6DFJivHABYQklBgYGBgZ+u0VkOYKJVA3o4O2LexTpJ8XFGL5HBsISSmSFAsUhQCkgyQG4fE83B9ACkOIARqWwIwzPXn0eMAfgBW9f3GPozNKiTzb88OkHI1JIwCxlDHUQItksUh3AuO/cB8ZvP34zMDAwMH7/8RtuOQMDA4NS2BGSHTAKRsEoGAWjYMABAJr1I6xKzTfXAAAAAElFTkSuQmCC"]])


    //eyes
    await traitsContractWithSigner.uploadTraits(10, [0,1,2,3,4,5,6,7], [
        ["1", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABCSURBVFhH7c4xDgAhCERR8I6ckkOuEincxEStjMl/zTDQIAAAPOVrInr7iVPIuq9kXnP6gJqZ5jxSd5/tAQAAFkQq/ewP/P7yeVEAAAAASUVORK5CYIIcitkyAAAAAElFTkSuQmCC"],
        ["2","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADRJREFUWIXtzTENADAMxMBX+SMJSRdCkqFDJd/oxYkkSR9i2EbO+g6pqrY9AwRomyRJ0tQFOXwX6yUO8j4AAAAASUVORK5CYII="],
        ["3", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADJJREFUWIXtzSEOACAMBMFC+P+XwWCBtI5kxq24XAQAfGhup07phfdrZ43Cpj0aACBlAd6xFfPN13/dAAAAAElFTkSuQmCC"],
        ["4","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEZJREFUWIXt0DEOACAIQ1HxjpySQ9bFERMwDg7/jR1owxgAAPSpmJXMByOuy/utkg6F2to3bz/wTHeAubtleURkOQAA+N8CNRIT+tPf5roAAAAASUVORK5CYII="],
        ["7", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADtJREFUWIXtzzEKACAMQ9Hg/U+SS8bFTaQVXIT/oMufUgkAgM9kXbeXxvWCRLbb/TnbSvZnTx0AAKAyAQ/CF+snU8SDAAAAAElFTkSuQmCC"],
        ["8", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEFJREFUWIXtzsENABAQBdFPO9uNZPvRixqdKcEKDpJ5xzmNBADAh0awheSDkSu2B3qtau7L9mxAUipmkQYAAP4wAXGdCdsU0SxWAAAAAElFTkSuQmCC"],
        ["6", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFpJREFUWIXtzrENgDAQBMF72rFoBsn9fB1OqYZKXIHjJ4EAIQLLIrC0E94mJwEAMJOICEnxka7cZxl+Naj3gDV37Tk/xuauoxT7/YCZSZJtKb3SWuvdAQDAXE7PmBbbA3khQQAAAABJRU5ErkJggg=="],
        ["5", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE5JREFUWIXt0DERACAMQ1FACF7QEa9MNYKSYgDuKMfA8N+Yock1JQAA4vwwO1IejLguDzPJN4VukpsUvnn7gWeiA3KrNa/yPsYqBwAA/5sZIw9u6SktjAAAAABJRU5ErkJggg=="]])

    //beak
    await traitsContractWithSigner.uploadTraits(11, [0,1,2,3,4], [
        ["1", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGxJREFUWIVjYBgFo2AUjIJRMApGOmAkV+PtfOv/MDNUJx4l2wFM5GjaG6X9n19ChoGBgYHh0esP//dGaZPtABYy9TFevnzlPwMDAwMbCzPjrz9/yXYA2VGA7GvnZVfJdsAoGAWjYBSMglEwCgCqqxUGXmpgUQAAAABJRU5ErkJggg=="],
        ["2", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGVJREFUWIXt0SEOgDAQRNFpQxCrSSX36Fk4H/fAcQtSXd1UILooEvRY5vlp/qaAiIjI3wV2uKXk7xt7rXRAZEbZzNdlAQBcrXk2owMmcheOUhwA5hjDPQYdQH/B9+qzdzpAREREHjV2Ey5wJj3fAAAAAElFTkSuQmCC"],
        ["3", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGJJREFUWIXt0LENgDAMRNFvEbFMyBRskQHZIlMACyAKJBpoESh0DOCG5l7l5k62QURERH5mnlDJsabUcW4ry34AWD/MrgWCKwU2jlMFaENj1/04a5wfACg5frP3ehEREQF4AQX3E4JdXk4EAAAAAElFTkSuQmCC"],
        ["4", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAF5JREFUWIXt0aENgEAQRNG/ORAUQkk0RAcURQ+gcKAQKBJy3GGoYE8gmOdn85MFERGRvzPvcOm7HPcVwNphdAdU3mG9TVzRILhPlAXMRwKgCembAN73nXcuChAREZEHD+kRlt/k4hwAAAAASUVORK5CYII="],
        ["5", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFBJREFUWIVjYBgFo2AUjIJRMApGOmAkV+P9ptD/f94+Y2BgYGBUnXiUbAewkKvx1+ObEAYz2UZQ5gAGWOj9/UORA0bBKBgFo2AUjIJRMOAAAGzgC8F/SeqqAAAAAElFTkSuQmCC"]])


    //hats
    await traitsContractWithSigner.uploadTraits(12, [0,1,2,3,4,5,6,7,8,9,10,11], [
        ["None", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["Long Hair Black", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWIXtlDGOhSAQQB8bE2NiBaWFZ/D+h/AAVnZaQCOFGhK3+fz1uz8KuxabLK8aYcK8DDiQSCT+OyImua7rTUoJINq2fa4BHNdvFfBFPFJKjDHf8n4i8RFaXGuN1hrgXXHh92I5FTi0F746Jg4xgHiIbU3T3CPgi3ddB4BSavMF+75nH1tr2XUhWOJSYIdYlmVfnL7vn7HP8bKhZGeb8zy/fA/DcHqYtZayLKMELjtgjEEpFXWwMQZr7S0CwjkHQJ7nwQIA67r+XmAcR7yA1nqL6YKUMughXl5Blp0+k3dEzYSQv0A45yiKImhqPu5eTNMUNeZPqaqKqqpuOy+RSCQSf4pPo7VucOmotcAAAAAASUVORK5CYII="],
        ["Long Hair Turquoise", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVJJREFUWIXtlDFugzAUhn/TNKISHYgqlSFSVamoO2fIlJuwZsgBMmbIBTLmGp44gE/QpRNIiWDAQ0oC7kBMo7QKLw1DpfpbDM9P7//x4xkwGAz/HXZJ8tN0qm49DwDY22TSxADgNN6pAS2isRwHlZTf8n5jwqKKp0IgFQIAfhJneu9SzhrQ4pbjNEJHKzuN7ZIEANTLYtGNAS2+iSIAwCAIlBZ8n89x/JxzjlQIlFKilFI9z2YkAz2yVYAVWYa+62rxZj3O2USRehyPofb76w0UcQzb95v3eLk8WyznHPejUe2kR/u21qxKSgyCAEWWISeVBHZJAmbbpNy2f4CVeS3bd12ifI3abq83EK9WKA8jlwqh9PFSsH1fvba0DCC04OZrBKmwVAj14DiwCG1oHUMc2nDneaRbM+ccANjHes0qYhtaGYYhhmHYTTGDwWAw/DU+AXFfes/f4yRzAAAAAElFTkSuQmCC"],
        ["Chef Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMVJREFUWIXtksEKgzAQRGelkGAIePNH/H//xKO3gBCUAcH0UAoptdQ9lF72XRJ2h81kWMD4M6IRz/Nczuree3jvAUDatlUZaK4Kp2kq67qe9kiCJACUbdtUBm4aMUmEEN7qtbGmufynh16l/vBozXEcvzMQQkBKCQCekSOldJrKLwx8Xdh931VLfWlozTiOpeu6096yLIgxyjAMKgPqHej7/uWs7zln7Ti1Ack5i3NOSIpzTgAISYkxquM3DMMwDMMwDAC4A/lhP1iowuluAAAAAElFTkSuQmCC"],
        ["Cowboy Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYhJREFUWIXtlDFu2zAUhr8nUZRsq07s2IHRHqRT75G9U06QpWNPkSknyJ6hUw+QuQcoENRVDDmyxFi0XofaRsYohYYC+ib+wCPx8RF88D9zf3up97eX/3SGvGXT3fWFns8mGJsyn88AZPHxqnuBbzefdTq2bMpKwjBkOBpzejphvX7S6UkMIB8+fW0lELy28O76QqdjS5IuGA0HmsRWG++0dKoAv5YZgP78/qUbAYB1sZFR+MggiYV992qXiwRGJDASpe8Jk0l3AuN0pFm+pW4iBRRg5yvVxms8nKl7/IF3q24E6ufNYSlN4yVJF4RmIIcMkFeWoqi6EXiBNt6pKx6QINSXOUkXEE27EShdzfJ3JoCcnVhiG0jTeJHAHLMrHth510rAvLZwmETMZ2cKkOVbADXW4L0jy9lnaFoKtHqC1Wp1mBvHtzc2RQIjgPht0V0HAMpyo/UO2P8AgMG7c6qn5THHNmol0KYDf2+984cZIIDsaiehOc4Fed7WrQR6enp6enp6enr+ANacn92NEHF3AAAAAElFTkSuQmCC"],
        ["Headphones Red", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANhJREFUWIXtkzEKg0AQRf9YaCFYCQuKjX0KOw+Qwt5T5AA5S06RPkUOYJ8bxCjYGAJBJSCbIjEIEdy1sZlX7bKzM4/ZWYBhGGZlSPfCPorkeB9a1i/XLsu0BQyd4DQI5L1pCB9xAkDPvh/W8hDH2gLKHUiDQA7xxzz/O/8Wl9DshJJAIoS0TRMAaKr4WHLr+9CRmH2CRAi58TzYpqkiS+eiADSeQ3kGhONMtn7M3PlSAbqUJa51rZQwdF3c2lZ5tmYFTlUFAPToOtWc9DIMLPmSDMMwDMOswhvTDDniaXIWswAAAABJRU5ErkJggg=="],
        ["Headphones", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMJJREFUWIXtkjEOgzAMRZ87+QgsjDkCx+C0jBwhI2MWJBbEjJiC0qGiqtRWJFUlFr8pkRPn5ctgGIZxMVJ6YRiG9LpX1Wcv51yxwK3ksPc+xRiFh7gAsu/7sU4hhGKB7AS89+k43zTNWz2EgKomQOq6zhbISqDv+2fsnx4HcM4xzzNAmqbpfwJd16WqqiAvLSmVyJ4BVf36+4Oz+q8CMo4jy7JkNVRV1nXNnq1TgbZtAWTbttyeEmOkZBANwzAMw7iUO4TyPhDhHvCYAAAAAElFTkSuQmCC"],
        ["Bird Cage", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYhJREFUWIXtlDFu2zAUhr8nUZRsq07s2IHRHqRT75G9U06QpWNPkSknyJ6hUw+QuQcoENRVDDmyxFi0XofaRsYohYYC+ib+wCPx8RF88D9zf3up97eX/3SGvGXT3fWFns8mGJsyn88AZPHxqnuBbzefdTq2bMpKwjBkOBpzejphvX7S6UkMIB8+fW0lELy28O76QqdjS5IuGA0HmsRWG++0dKoAv5YZgP78/qUbAYB1sZFR+MggiYV992qXiwRGJDASpe8Jk0l3AuN0pFm+pW4iBRRg5yvVxms8nKl7/IF3q24E6ufNYSlN4yVJF4RmIIcMkFeWoqi6EXiBNt6pKx6QINSXOUkXEE27EShdzfJ3JoCcnVhiG0jTeJHAHLMrHth510rAvLZwmETMZ2cKkOVbADXW4L0jy9lnaFoKtHqC1Wp1mBvHtzc2RQIjgPht0V0HAMpyo/UO2P8AgMG7c6qn5THHNmol0KYDf2+984cZIIDsaiehOc4Fed7WrQR6enp6enp6enr+ANacn92NEHF3AAAAAElFTkSuQmCC"],
        ["Graduation Cap", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANZJREFUWIXt0rFLw0AUx/HvhcNcaFrpEqVThwqO3UX6R2Tq3v/B0T+nf0EnZ9dO2dx0sAQHSxSPEJMO7RXdLjTo8j7w4A3Hez94B0KIf6ZOHXA5uW1cb+KEh7sNgLqaP3Yf4Ocyt/D9NQNAh30VDS64Ty2za9v4htBtAgDKFvkxhC1yTD/BxAnl15aXbMUig6fljffAoM32qvxsdNjbLz0UgP3IOYvOm/E0BUDHIwIz7D4A+5Opuq6U6119V/bXOQMdeQ1sdYK357Xv05M/txBCCCGE+DM7XpswSpvYOOIAAAAASUVORK5CYII="],
        ["Witch Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANlJREFUWIXt1D8OgjAUBvCvYgnBGEn8g4O6MjowezTv4AE8gJtn8AAeQFcnVo2kUhAHAomIsRWNg++XdKCUvpevDQD5Mab7wXQ0SwHAsXsAwDb79fcbyItWqdvIywY81y+KW9z+eBMNhTUsH0KG2gVUNlfmuT6EPKeO3X94924KKgkUdsEWACBkiOX8iNWiq1WsilICbnucWrx1N1d+zg07E0AjiabSKoBl0Q+eXkQgOwaZRIwbpuK2ikcQnA4AwKJYsOQaF5eyPKL4wrhhou6/gRBCCCGE/Jcb+kU4HWM7foIAAAAASUVORK5CYII="],
        ["Wizard Hat", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOZJREFUWIVjYBgFAwwYiVXomnPgPwMDA8Mkp+kMlcdzGRgYGBg3dNvQxwGOaVv/w9gsbNwMDAwMDNycLFRxBEEHXF8X/n/rHX3GrXf0YUL/YY6ghkOYiFDD6K1ykWH/LG+G/bO8USQmOU1n+Pr9DwMDA8P/gNIjZDmAhZACzaCVOOXy9mWSZSkyICYE4MAxbet/FjZuhklO01HEv37/w9Druvr/3V35JDuA6FyA7ABsgJuThUFf/DFjY0kkdR2g79f/n5AaXGZf3FRIUBHBNMBAYiiNglEwCkbBKBgFo2AUjIJRQCoAAF/fNnX3acj+AAAAAElFTkSuQmCC"],
        ["Tricorne", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAPBJREFUWIVjYBgFo2CkA0ZSNdgqSPznZmOB85HYjGuvPKCdA7ZO9vkPY3f0nkG2mCE314CBg1cMbqZzwjzqOuDQ8tz/1ZWr4fyKYhM4m4NXjKG7bRcDAwMDw9dffxi6ehMYGBgYGC2DO6jjgNXd7v8nTb2IVQ45FGDg668/DK3toQwMDAyMdpGTCToA0wQSwNdff7A65vfPrwyMTMxEmcFEhBrGvGx9OBsX/vPvH+PXX38YKopNGB4/fMH4/99fohxAFFjd7c6Q6KzOYKsggVedrYIEQ2+OFcPWyT7Us3wUjIJRMApGwSgYBaNgFNAaAADbNjut5BccjQAAAABJRU5ErkJggg=="]])

    //held item
    await traitsContractWithSigner.uploadTraits(13, [0,1,2,3,4,5,6,7,8,9,10], [
        ["None", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["Mug", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAHxJREFUWIXt0jEKwCAMBdAfqeCVvP/gMbxGIAQ7SaWbEdrlPxAdlHw1ABERERHRz2Rnc+99qCpUFQDmLLXWcIAUPvkEGK21bwLMm6/MTE5CbL/AO4S7hwqHAqzF57qUMrDZS6vrNICZSc4Z0Ubc/QKZI6UkAMTdw8WJAOAG7lw2ak06GHYAAAAASUVORK5CYII="],
        ["Briefcase", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOpJREFUWIXt0rFtg0AUxvH/BQfLloUUicg0biJ3dJ7AEzCAS2cDBskYGYAJMkE6JnDjIAorQicRGZ4LYwSKS1/3fs3pdCd99z4ApZRSSimllHIoiUNJ4rDfp9uVpNvV6I5xEQqYLC/pwgUw69eZVHXDYuoBmI+vAwBPj34A16EkiUOyvAQgCnyp6gaAbu2beHgDwHByosD/d17YlreXZwDjogGyvCQK/FH4/n1NYVsK2zL3hOPvHyd7dtPAbrOU7lsD14kB5p4MrxmAiYsHAKaqGylsw2I6uRsM8Pn946YBgN1mCd1/cC/45gLMMkZ8RqTD5AAAAABJRU5ErkJggg=="],
        ["Controller", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOBJREFUWIXt0rFKxEAQxvH/JiSkOBufImUKCx/gSgtJmUJwC8HG0uIaewsPrhTZ68VHkDxHHmPKIbCJjQmWiXDVzQ+2GQa+b2HAGGOMMcaYc+eWLrZtOwKoKqpK13VUVYWIALimaf5VIFkaXhQFIsL+9QuAsixRVQAOb5/j9dXt6QqoKi+7DwAen27mGcDx/ZuLzSXAGEIYQwinKTAFA4gIwzC4v/Pn3d2q4FUFADf9WERI09T1fT/P7x+2qCp5ni++qVUF6roGcDFGl2WZizHivef38Nz0kiTBe7+2gzlzPz2kWFn7Zed5AAAAAElFTkSuQmCC"],
        ["Cookie", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOpJREFUWIVjYBgFo2AUjIJRMApGwSgYBaNgpANGcjQ9WZr6n4GBgeHfj88M0d17GRgYGBgP33hNHwc8WZr6/9+Pzyhiz15/YGBgYGC0qNhBWwdgs5xSRzCRorhq9h6GtMkH4fyaxSdR+OQAFlIUt6W6MCCHQEusOUPN4pP0cwC24G+JNWdgYGBgKF1wlkFPQZBkB5AUBQzQNIMe7M9ef2CIsFVkvPTgPW0dIJe8goGBgYHx648/DNHdexmevf7A8Oz1BwZWFmZGY2UhBnKyIqkhAHcEAwMD48UH7xkZGBgYf//5y0BOFhwUAADlxVDLEhNVhAAAAABJRU5ErkJggg=="],
        ["Grocery Bag", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVNJREFUWIXtlL9Lw0AUx7/vEmmwIkIh/0AU7ODmUMSx/4VuJUhB6OTW1aWbU4bQQaE4d/APcMuis9D/oFCQYGtakzuHYNr86HZXl/vADbn3cu+97717gEaj0Wg0Gs0OGPfbYtxvV9pM1cH920sxj2IYjCrtTHUC8ygGACRc/E8CdcvE9zKm17OVuHm8KNmVXsH99bkAgJdGKGpTE2atXK8yBZ6aTWEfWZh+RqjVTfBEULzku0sAAAHA2/EqDWQQnu/eq51U8THsFDuPTjvD3IY0BQLPFQPHEQPHyfYM6yBb25CmwGTUE7NwkZ3b6vqYjHo5BZLoCyioILMHyLZtNA73AUAEnlv98Is/SUygVHEVRRVkzwECsDWJ9IoY9tjaReozPLl6wEYfZEH/lsEYAaAfvhZexSSkWbjISjQYo4SnAyjhHK2un3dWkAACz819F4Nu8gtSY28OHDi/WQAAAABJRU5ErkJggg=="],
        ["Phone", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMdJREFUWIXtk7sRgzAMQJ8oOErm8BjMBB2lS3XswwjM4lKd0wQuuaSwIZ9Gr7N9kt5JMjiO4ziO4zh/RmoDYox5j53n+XcCqprN7DinlABEVS8JNKXFQwiEEI67vu8B8jiO3xcAWJYF4OMSpQIyTdMh8ShyVaJ4B9Z1Zdu2pz145OxOFI9gGAYA6bru7fvZThQLANyTv0iYGWZG27bV37pK4J2EmSEiAkjTNNSOoNp4R1VJKWURkZwzMcZTeao7sLN34kpxB+AGD2dM1QTKdAMAAAAASUVORK5CYII="],
        ["Mace", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALpJREFUWIXt0rEKgzAQgOE/teAQhAMXR5c8ik/tS4jvIDjeEkRU0qWFDhbaUtuh940JXH7IgTHGGGP+nXt0EUJIdV0DuLZtDws47R0WRZEAuq4DSE3TfDegqirGcUREUFVijIcF7H5BCAEgqSrLsuC9B3DDMHwn4BYRY2SaJlJKyXtPWZYAru/74wPuiQh5njPP88dDngo4MuSlgEch1yV1qvryrPM7AbeHRMSt60qWZWzb9s4oY8zvXQATX0pHOoN+UAAAAABJRU5ErkJggg=="],
        ["Morning Star", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARpJREFUWIXtkqFOw1AUhr+7XuCKhlRA1WxlUzW9YCt5hD0WggfA4DBTEwhSRSqnSJawoCq25Ka0O5h1CYGuIXRDcD91cs/JPV/+HHA4HA6Hw+H476h9zeurRC4CH0Dd3D8eV2A0Gsn5aa3OVgvxjQeg7p5ejyMQx7ForZXWmsvyBUB849GI3M4WvQkM2sS01gLw8PwGoKpa1LIoWdlaJuOhTMbDXgQ6E8iybPeeJiHmZIB93/SWiG4T2ybwSXCbBmkSqqoWlkUpvvEkTUIA1fR/QlcCEgQBgJpOp1/mmkSqWqg2Qp8CWGvFGIMxhn0Sv+XbI8zzfFdbaymKgvV63ftyaL8BAGWtlaY+yPauj6Mo2tXz+fxQDo6/5QNB/WOlUmKcqQAAAABJRU5ErkJggg=="],
        ["Quill Pen", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAW5JREFUWIXtlLFuwkAMhn+nFfJoVYqUASEGxjxAlY13ySNcN4YOGRkjpE7dmJh5iU5dEOOJKYLlhlQ6ApK7AArtQtWkS/OtZ/v3/fYd0NHR0dHR8QdkWaZZlgEAjDFqjLmc3bclmue5AiBrrXrviZmR57k658g5d4kL2mrAWovtdouiKFAUBQCo955EBNPp9BJHbYgbY/RUW8uypNFopNZaMDNFUaQA6DyG1hwAoACo3+/rer0GM4OZ1Xt/denGGzjNGfv9nobDoVprISI4Ho8kIgiCAPUlbM2B8Xh8FqeqqiiOY2Vm6vV6V3GN7kCapioiSJIEy+USYRjSbrfTKIogIiQiSNP0KqdRB+riIoLD4aDMTN57cs59EwcadMAYo3Xxev36s/tKYw4kSYL5fA5mpqqq6BZxoKGfcDabaVmWNBgMsNlssFgsbs69+614/PisACh8ACaTCVar1Y/ym3CA3t4/8Pry1ECpjo7/yCeRG5bMIuFpIQAAAABJRU5ErkJggg=="],
        ["Umbrella", "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUdJREFUWIXtlk9Kw0AcRt/UsX8wpVAh3WSV7rLttgfIYdwWXOgJegmP4QG8QBd1UdBVNgoVQ7GRCI6LZgImWhOYsYJ5q8nA5Pfm44MEGv47wvQLL31fAZz0egDifLn8PYHCcABekoRRvw8gzhYLOwIzz1MA3Xa7NFw/O1J+KdEyIcDuIuI1TVnHcWk4wMNmgyOluppMSgeNMfM8vVQAp4NBSaaYhPES7hPRMh0pxcVqZU9AMx0Plf/WFqN3mYsUS2mqA99yf5xC1pF1HH/qBZgrYYnpeKiywcyjiHkUoSXiJMmTtybgdCRd2eLm7inf0xLP2y26hNKWAIA8Kt8vk8ixkkAYuHn8P2G1hNe3j4cVqIJxgTrxWxHQVInfqkBVjArUjd+4gKZq/NYEwsBVYeAeTqAOpgUEu38Aq5/5vYSBS9X4Gxr+BB8BY2TOGy6PuAAAAABJRU5ErkJggg=="]])

    //Bird Extra
    await traitsContractWithSigner.uploadTraits(14, [0,1], [
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
    
    //Bird Size
    await traitsContractWithSigner.uploadTraits(15, [0,1,2,3], [
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"],
        ["none","iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAABpJREFUWIXtwQEBAAAAgiD/r25IQAEAAADvBhAgAAFHAaCIAAAAAElFTkSuQmCC"]])
}

async function setContractsGame(dirt, earlyBirdsNFT, random, birdBath, ancientTree, testERC20) {
  await gameContractWithSigner.setContracts(dirt, earlyBirdsNFT, random, birdBath, ancientTree, testERC20)
}

async function setContractsAncientTree(dirt, earlyBirdsNFT, birdBath, random, game) {
  await ancientTreeContractWithSigner.setContracts(dirt, earlyBirdsNFT, random, game)
  await traitsContractWithSigner.setContracts(earlyBirdsNFT, game)
  await birdBathContractWithSigner.setContracts(dirt)
}

async function addAdmin() {
  await dirtContractWithSigner.addAdmin(ancientTreeAddress)
  await dirtContractWithSigner.addAdmin("0xeD830f3180D1744B22CEb75c1fFD89D4eCCfd862")
  await nftContractWithSigner.addAdmin(ancientTreeAddress)
  await birdBathContractWithSigner.addAdmin(gameAddress)
}

async function setMaxSupply(typeId, maxSupply) {
  await birdBathContractWithSigner.setType(typeId, maxSupply)
}

async function setMintingStatus(status) {
  await gameContractWithSigner.setGen0MintingStatus(true)
  await gameContractWithSigner.setMintingStatus(true)
}

async function calculateReward(tokenId) {
  let result = await ancientTreeContract.calculateReward(tokenId)
  let readableReward = BigInt(parseInt(result._hex, 16))

  console.log(ethers.utils.formatEther(readableReward))
}

async function mintDirt(address, amount) {
  await dirtContractWithSigner.mint(address, amount)
}

async function dirtBalance(address) {
  let result = await dirtContract.balanceOf(address)
  let readableReward = ethers.utils.formatEther(BigInt(parseInt(result._hex, 16)))
  console.log("Dirt Balance: ", readableReward)
  return readableReward
}

async function wethBalance(address) {
  let result = await testERC20Contract.balanceOf(address)
  let readableBal = ethers.utils.formatEther(BigInt(parseInt(result._hex, 16)))
  return readableBal
}

async function birdBathBalance(address) {
  let balType0 = await birdBathContract.balanceOf(address, 0)
  let balType1 = await birdBathContract.balanceOf(address, 1)
  let balType2 = await birdBathContract.balanceOf(address, 2)
  let balType3 = await birdBathContract.balanceOf(address, 3)
  let balType4 = await birdBathContract.balanceOf(address, 4)

  console.log("Balance of Type 0: ", balType0)
  console.log("Balance of Type 1: ", balType1)
  console.log("Balance of Type 2: ", balType2)
  console.log("Balance of Type 3: ", balType3)
  console.log("Balance of Type 4: ", balType4)

}


async function isWorm(tokenId) {
  let traits = await getTraits(tokenId)
  let isWorm = traits.isWorm
  return isWorm
}

//claim100Tokens()
async function claim100Tokens() {
  let address = await getAddress()
  let seed = await getCurrentSeed()
  let isOwnedByUser 
  for(let i = 10; i < 101; i++) { 
    isOwnedByUser = await isStakeOwnedByUser(i)
    console.log(isOwnedByUser)
    if(isOwnedByUser) {
      console.log("All tokens are owned by user")
      console.log("Token ", i, " traits: ", getBase64(i))
      await ancientTreeContractWithSigner.claimRewardsAndUnstake([i], true, seed, {gasLimit : 500000})
    }
    else {
      console.log("Tokens are not owned by this account!")
      break;
    }
  }
  if(isOwnedByUser) {
    console.log("All tokens are owned by user")
    await ancientTreeContractWithSigner.claimRewardsAndUnstake(tokenIds, unstake, seed)
  }
}

async function claimDirt(tokenIds, unstake) {
  
  let seed = await getCurrentSeed()
  let address = await getAddress()
  let balance = await dirtBalance(address)
  let isOwnedByUser 
  console.log("Balance before claiming: ", ethers.utils.formatEther(balance))
  for(let i = 0; i < tokenIds.length; i++) { 
    isOwnedByUser = await isStakeOwnedByUser(tokenIds[i])
    console.log(isOwnedByUser)
    if(isOwnedByUser) {
      //let reward = calculateReward(tokenIds[i])
      //console.log("Reward for token: ", tokenIds[i], " is: ", reward)
    }
    else {
      console.log("Tokens are not owned by this account!")
      break;
    }
  }
  if(isOwnedByUser) {
    console.log("All tokens are owned by user")
    await ancientTreeContractWithSigner.claimRewardsAndUnstake(tokenIds, unstake, seed)
  }
}

async function ownerOf(tokenId) {
  let owner = await nftContract.ownerOf(tokenId)
  console.log(owner)
  return owner
}

async function isStakeOwnedByUser(tokenId) {
  let ownedByUser = false
  if(await nftContract.isWorm(tokenId)) {
    let traits = await nftContract.getTraits(tokenId)
    let size = traits.size
    let location = await ancientTreeContract.wormHierarchy(tokenId)
    let readableLocation = location.toString()
    let result = await ancientTreeContract.wormStakeByStrength(size, readableLocation)
    console.log(result)
    let address = await signer.getAddress()
    if(result.owner == address) {
        ownedByUser = true
    }
  }
  else {
    let traits = await nftContract.getTraits(tokenId)
    let size = 8 - traits.size
    let location = await ancientTreeContract.birdHierarchy(tokenId)
    let readableLocation = location.toString()
    console.log(typeof(readableLocation))
    //let result = await ancientTreeContract.birdStakeBySize(size, readableLocation)
    let result = await ancientTreeContract.birdStakeBySize(size, 0)
    console.log(result)
    let address = await signer.getAddress()
    if(result.owner == address) {
      ownedByUser = true
    }
  }
  return ownedByUser
}

async function allUsersStakedTokens() {
  let stakedWorms = []
  let stakedBirds = []
  let stakedTokens = []
  let numMinted = await nftContract.numMinted()
  for(let i =0; i < numMinted; i++) {
      if(await nftContract.isWorm(i)) {
          let traits = await nftContract.getTraits(i)
          let size = traits.size
          let location = await ancientTreeContract.wormHierarchy(i)
          let readableLocation = location.toString()
          let result = await ancientTreeContract.wormStakeByStrength(size, readableLocation)
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


async function mintTokens(address, stake, amount) {
    /*if(await wethContract.allowance(address, nftAddress) > 0) {
      console.log("contract already given allowance")
      console.log(await wethContract.allowance(address, nftAddress))
    }
    else {
      await wethContractWithSigner.approve(nftAddress, APPROVAL_AMOUNT)//ethers.utils.parseEther(cost))
    } */
    let numMinted = await nftContract.numMinted()
    let maxGen0 = await nftContract.maxGen0()
    let allowMint
    console.log("Num Minted: ", numMinted)
    let seed = await getCurrentSeed()
    let cost
    if(numMinted + amount > maxGen0){
      console.log("Not all will be minted with wETH")
      //if gen0 minting has ended
      if(numMinted >= 100) {
        cost = 0
      }
      else {
        cost = (maxGen0 - numMinted) * .05
      }
      cost = cost.toString()
      console.log("wETH Cost: ", cost)
      //await testERC20ContractWithSigner.approve(gameAddress, ethers.utils.parseEther(cost))
      let dirtBal = await dirtBalance(address)
      let mintCostInDirt = await nftContract.getMintDirtCost(numMinted+amount)
      let readableMintCostInDirt = parseFloat(ethers.utils.formatEther(BigInt(parseInt(mintCostInDirt._hex, 16))))

      

      console.log("Dirt Balance: ", dirtBal)  
      console.log("Cost to mint in dirt: ", readableMintCostInDirt)
      if(dirtBal <= readableMintCostInDirt){
        console.log("Not enough dirt to mint!")
        allowMint = false
      }
      else {
        allowMint = true
      }
      // else if(wethBal < cost) {
          //allowMint = false
      // }

    }
    else { 
      cost = amount*.05
      cost = cost.toString()
      let wethBal = await wethBalance(address)
       if(wethBal < cost) {
          allowMint = false
          console.log("wETH Balance is too low!")
       }
       else {
         allowMint = true
       }
    }
    // let cost = amount*.05
    // cost = cost.toString()
    // //console.log(cost)
    
    if(allowMint == true) {
      await testERC20ContractWithSigner.approve(gameAddress, ethers.utils.parseEther(cost))
  
      console.log(seed)
      //let result = await nftContractWithSigner.mint(amount, stake, seed, {from:address, gasLimit: 3200000})
      let result = await gameContractWithSigner.mint(amount, stake, seed, {from:address, gasLimit: 3200000})
      console.log(result)
      let tokenIds = []
    
      await nftContract.on("Transfer", (from , to, token) => {
        let tokenId = parseInt(token._hex,16)
        console.log(from, " sent ", tokenId, " to ", to)
        tokenIds.push(tokenId)
      })
    
    }
    // await testERC20ContractWithSigner.approve(gameAddress, ethers.utils.parseEther(cost))
  
    // console.log(seed)
    // //let result = await nftContractWithSigner.mint(amount, stake, seed, {from:address, gasLimit: 3200000})
    // let result = await gameContractWithSigner.mint(amount, stake, seed, {from:address, gasLimit: 3200000})
    // console.log(result)
    // let tokenIds = []
  
    // await nftContract.on("Transfer", (from , to, token) => {
    //   let tokenId = parseInt(token._hex,16)
    //   console.log(from, " sent ", tokenId, " to ", to)
    //   tokenIds.push(tokenId)
    // })
  
    // console.log(tokenIds)
    
  
    //return tokenIds
  
    //filter = nftContract.filters.Transfer("0x0", address)
    //console.log(filter)
    
    //let event = result.logs[0]
    //let token = event.args.tokenId;
    //return token
}

async function mintFeather(amount, address) {
  let dirtBal = await dirtBalance(address)
  let readableDirtBal = ethers.utils.formatEther(dirtBal)
  console.log(readableDirtBal)
  if(readableDirtBal < 50000) {
    console.log("Dirt balance too low!")
  }
  else {
    console.log("Enough money")
    await gameContractWithSigner.makeFeather(amount)
  }
  
}

async function getBase64(tokenId) {
    let traits = await nftContract.getTraits(tokenId)
    console.log(traits)
    
    //let result = await traitsContract.tokenURI(tokenId)
    //console.log(result)
    //let decodedString = Buffer.from(result, 'base64').toString()
    //let jsonOutput = JSON.parse(decodedString)
    //console.log(jsonOutput)
    //console.log(jsonOutput.image)
}

async function getTraits(tokenId) {
  let traits = await nftContract.getTraits(tokenId)
  return traits
}



async function getName() {
  let name = await nftContract.name()
  console.log(name)
}

getName()

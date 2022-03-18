// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./Interfaces/IEarlyBirdsTraits.sol";
import "./Interfaces/IEarlyBirdsNFT.sol";
import "./Interfaces/IEarlyBirdsGame.sol";

contract EarlyBirdsTraits is IEarlyBirdsTraits, Ownable {
  using Strings for uint256; // add [uint256].toString()

  event traitString(string traitString);

  // Struct to store each trait's data for metadata and rendering
  struct Trait { string name; string png; }

  // Mapping of traits to metadata display names
  string[3] private _players = [ "Worm", "Bird" ];
  string[4] private _sizes = [ "5", "6", "7", "8"  ];

  // EarlyBirdss NFT address reference
  IEarlyBirdsNFT private earlyBirdsNFT;
  IEarlyBirdsGame private earlyBirdsGame;

  // Storage of each traits name and base64 PNG data [TRAIT][TRAIT VALUE]
  mapping(uint8 => mapping(uint8 => Trait)) public traitData;

  constructor() {}

  /**
   * Update the NFT contract address outside constructor as it would
   * create a cyclic dependency.
   */
   
  function setContracts(address _earlyBirdsNFT, address _earlyBirdsGame) external onlyOwner {
    earlyBirdsNFT = IEarlyBirdsNFT(_earlyBirdsNFT);
    earlyBirdsGame = IEarlyBirdsGame(_earlyBirdsGame);
  }

  /**
   * Upload trait art to blockchain!
   * @param traitTypeId trait name id (0 corresponds to "fur")
   * @param traitValueIds trait value id (3 corresponds to "black")
   * @param traits array of trait [name, png] (e.g,. [bandana, {bytes}])
   */
  function uploadTraits(uint8 traitTypeId, uint8[] calldata traitValueIds, string[][] calldata traits) external onlyOwner {
    require(traitValueIds.length == traits.length, "Mismatched inputs");
    for (uint8 i = 0; i < traits.length; i++) {
      traitData[traitTypeId][traitValueIds[i]] = Trait(
        traits[i][0],
        traits[i][1]
      );
    }
  }
  function getTraitBase64(uint8 traitTypeId, uint8 traitValueId) external returns(string memory) {
      emit traitString(traitData[traitTypeId][traitValueId].png);
      return traitData[traitTypeId][traitValueId].png;
  }
  /**
   * generates an <image> element using base64 encoded PNGs
   * @param trait the trait storing the PNG data
   * @return the <image> element
   */
  function _drawTrait(Trait memory trait) internal pure returns (string memory) {
    return string(abi.encodePacked(
      '<image x="4" y="4" width="32" height="32" image-rendering="pixelated" preserveAspectRatio="xMidYMid" xlink:href="data:image/png;base64,',
      trait.png,
      '"/>'
    ));
  }

  /**
   * Generates an entire SVG by composing multiple <image> elements of PNGs
   * @param t token trait struct
   * @return layered SVG
   */
  function _drawSVG(IEarlyBirdsNFT.WormBirdTraits memory t) internal view returns (string memory) {
    string memory svg;
    if (t.isWorm) {
      svg = string(abi.encodePacked(
        //these traits are not final but just an idea of what it might look like - not sure if i should include size here or not
        _drawTrait(traitData[0][t.body]), 
        _drawTrait(traitData[1][t.eyes]), 
        _drawTrait(traitData[2][t.mouth]), 
        _drawTrait(traitData[3][t.hat]), 
        _drawTrait(traitData[4][t.facialAccessory]), 
        _drawTrait(traitData[5][t.tail]), 
        _drawTrait(traitData[6][t.heldItem]),
        _drawTrait(traitData[7][t.size])
      ));
    } else {
      svg = string(abi.encodePacked(
        _drawTrait(traitData[8][t.body]), 
        _drawTrait(traitData[9][t.eyes]), 
        _drawTrait(traitData[10][t.mouth]), 
        _drawTrait(traitData[11][t.hat]), 
        _drawTrait(traitData[12][t.facialAccessory]), 
        _drawTrait(traitData[13][t.tail]), 
        _drawTrait(traitData[14][t.heldItem]),  
        _drawTrait(traitData[15][t.size])
      ));
    }

    return string(abi.encodePacked(
      '<svg width="100%" height="100%" version="1.1" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
      svg,
      "</svg>"
    ));
  }

  /**
   * Generates an attribute for the attributes array in the ERC721 metadata standard
   * @param traitType the trait type to reference as the metadata key
   * @param value the token's trait associated with the key
   * @return a JSON dictionary for the single attribute
   */
  function _attributeForTypeAndValue(string memory traitType, string memory value) internal pure returns (string memory) {
    return string(abi.encodePacked(
      '{"trait_type":"', traitType,
      '","value":"', value,
      '"}'
    ));
  }

  /**
   * Generates an array composed of all the individual traits and values
   * @param tokenId the ID of the token to compose the metadata for
   * @return traits JSON array of all of the attributes for given token ID
   */
  function _compileAttributes(uint16 tokenId, IEarlyBirdsNFT.WormBirdTraits memory t) internal view returns (string memory traits) {
    if (t.isWorm) {
      traits = string(abi.encodePacked(
        _attributeForTypeAndValue("Body", traitData[0][t.body].name), ",", 
        _attributeForTypeAndValue("Eyes", traitData[1][t.eyes].name), ",",
        _attributeForTypeAndValue("Mouth", traitData[2][t.mouth].name), ",",
        _attributeForTypeAndValue("Hat", traitData[3][t.hat].name), ",",
        _attributeForTypeAndValue("Facial Accessory", traitData[4][t.facialAccessory].name), ",",
        _attributeForTypeAndValue("Tail", traitData[5][t.tail].name), ",",
        _attributeForTypeAndValue("Held Item", traitData[6][t.heldItem].name), ",",
        _attributeForTypeAndValue("Strength", traitData[7][t.size].name), ","
      ));
    } else {
      traits = string(abi.encodePacked(
        _attributeForTypeAndValue("Body",   traitData[8][t.body].name), ",", 
        _attributeForTypeAndValue("Head",  traitData[9][t.eyes].name), ",",
        _attributeForTypeAndValue("Spell", traitData[10][t.mouth].name), ",",
        _attributeForTypeAndValue("Eyes",  traitData[11][t.hat].name), ",",
        _attributeForTypeAndValue("Neck",  traitData[12][t.facialAccessory].name), ",",
        _attributeForTypeAndValue("Mouth",  traitData[13][t.tail].name), ",",
        _attributeForTypeAndValue("Want",  traitData[14][t.heldItem].name), ",",
        _attributeForTypeAndValue("Size",  traitData[15][t.size].name), ","
      ));
    }
    uint8 wormValue = t.isWorm ? 0:1;

    //Make this more efficient
    bool reachedMaxGen0 = false;
    if(tokenId <= earlyBirdsNFT.getGen0Supply()) {
      reachedMaxGen0 = false;
    } else {
      reachedMaxGen0 = true;
    }
    //'{"trait_type":"Generation","value":', tokenId <= earlyBirdsNFT.getGen0Supply() ? '"GEN 0"' : '"GEN 1"',
    //'{"trait_type":"Generation","value":', (!reachedMaxGen0 && earlyBirdsGame.getGen0MintingStatus()) ? '"GEN 0"' : '"GEN 1"',
    return string(abi.encodePacked(
      '[',
        traits,
        '{"trait_type":"Generation","value":', (!reachedMaxGen0 && earlyBirdsGame.getGen0MintingStatus()) ? '"GEN 0"' : '"GEN 1"',
        '},{"trait_type":"Type","value":"', _players[wormValue],
      '"}]'
    ));
  }

  /**
   * ERC721 token URI interface. Generates a base64 encoded metadata response
   * without referencing off-chain content.
   * @param tokenId the ID of the token to generate the metadata for
   * @return a base64 encoded JSON dictionary of the token's metadata and SVG
   */
  function tokenURI(uint16 tokenId) external view override returns (string memory) {
    IEarlyBirdsNFT.WormBirdTraits memory traits = earlyBirdsNFT.getTraits(tokenId);
    uint8 wormValue = traits.isWorm ? 0:1;
    string memory metadata = string(abi.encodePacked(
      '{"name": "', _players[wormValue], " #", uint256(tokenId).toString(),
      '", "description": "The metaverse mainland is full of creatures. Around the Farm, an abundance of Rabbits scurry to harvest CARROT. Alongside Farmers, they expand the farm and multiply their earnings. There',
      "'", 's only one small problem -- the farm has grown too big and a new threat of nature has entered the game.", "image": "',
      _base64(bytes(_drawSVG(traits))),
      '", "attributes":',
      _compileAttributes(tokenId, traits),
      "}"
    ));

    // return string(abi.encodePacked(
    //   "data:application/json;base64,",
    //   _base64(bytes(metadata))
    // ));

    //return _base64(bytes(_drawSVG(traits)));
    return string(abi.encodePacked(_base64(bytes(metadata))));
    //return string(abi.encodePacked(_base64(bytes(_drawSVG(traits)))));
  }

  /* BASE 64 - Written by Brech Devos */
  string internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  function _base64(bytes memory data) internal pure returns (string memory) {
    if (data.length == 0) return "";
    
    // load the table into memory
    string memory table = TABLE;

    // multiply by 4/3 rounded up
    uint256 encodedLen = 4 * ((data.length + 2) / 3);

    // add some extra buffer at the end required for the writing
    string memory result = new string(encodedLen + 32);

    // solhint-disable-next-line no-inline-assembly
    assembly {
      // set the actual output length
      mstore(result, encodedLen)
      
      // prepare the lookup table
      let tablePtr := add(table, 1)
      
      // input ptr
      let dataPtr := data
      let endPtr := add(dataPtr, mload(data))
      
      // result ptr, jump over length
      let resultPtr := add(result, 32)
      
      // run over the input, 3 bytes at a time
      for {} lt(dataPtr, endPtr) {}
      {
          dataPtr := add(dataPtr, 3)
          
          // read 3 bytes
          let input := mload(dataPtr)
          
          // write 4 characters
          mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr(18, input), 0x3F)))))
          resultPtr := add(resultPtr, 1)
          mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr(12, input), 0x3F)))))
          resultPtr := add(resultPtr, 1)
          mstore(resultPtr, shl(248, mload(add(tablePtr, and(shr( 6, input), 0x3F)))))
          resultPtr := add(resultPtr, 1)
          mstore(resultPtr, shl(248, mload(add(tablePtr, and(        input,  0x3F)))))
          resultPtr := add(resultPtr, 1)
      }
      
      // padding with '='
      switch mod(mload(data), 3)
      case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
      case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
    }
    
    return result;
  }
}
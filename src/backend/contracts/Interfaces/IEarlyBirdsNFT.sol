// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IEarlyBirdsNFT {

    enum Kind {Bird, Worm}
    struct WormBirdTraits {
        bool isWorm;
        uint8 body;
        uint8 eyes;
        uint8 mouth;
        uint8 hat;
        uint8 facialAccessory;
        uint8 tail;
        uint8 heldItem;
        uint8 size;
    }

    function mint(address recipient, uint256 seed) external;
    function burn(uint256 tokenId) external;
    function isWorm(uint256) external view returns (bool);
    function ownerOf(uint256) external view returns (address owner);
    function transferFrom(address, address, uint256) external;
    function safeTransferFrom(address, address, uint256, bytes memory) external;
    function getTraits(uint16) external view returns (WormBirdTraits memory);
    function getGen0Supply() external pure returns (uint256);
    function getMaxTokens() external pure returns (uint256);
    function getMaxMint() external view returns (uint256);
    function getNumMinted() external view returns (uint16);
    function getMintDirtCost(uint16 tokenId) external view returns (uint256);
    function updateOriginAccess(uint16[] memory tokenIds) external;
    function getTokenWriteBlock(uint256 tokenId) external view returns(uint64);
}
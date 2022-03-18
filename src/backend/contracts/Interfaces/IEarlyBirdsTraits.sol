// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IEarlyBirdsTraits {
  function tokenURI(uint16 tokenId) external view returns (string memory);
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IAncientTree {
    function stakeTokens(address, uint16[] calldata) external;
    function randomBirdOwner(uint256 seed) external view returns (address);
    function getTotalDirtClaimed() external view returns (uint256);
}
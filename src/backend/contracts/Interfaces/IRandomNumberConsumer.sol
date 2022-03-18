// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IRandomNumberConsumer {
    function getRandomNumber() external returns (bytes32);
    function randomizeSeed() external returns (uint256);
    function getCurrentSeed() external returns (uint256);
}
// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract testERC20 is ERC20, Ownable {

    mapping(address => bool) private admins;

    //initializes token to have name and symbol of DIRT
    constructor() ERC20("TestCrypto", "TST") { 
        _mint(msg.sender, 100*10**18);
    }

/**
   * Mint $TST to a recipient.
   * @param to the recipient of the $TST
   * @param amount the amount of $TST to mint
   */

    function mint(address to, uint256 amount) external {
        require(admins[msg.sender], "Only allow admins to mint");
        _mint(to, amount);
    }

 /**
   * Burn $TST from a holder.
   * @param from the holder of the $TST
   * @param amount the amount of $TST to burn
   */
    function burn(address from, uint256 amount) external {
        //require(admins[msg.sender], "Only allow admins to burn");
        _burn(from, amount);
    }

 /**
   * enables an address to mint / burn
   * @param addr the address to enable
   */
    function addAdmin(address addr) external onlyOwner {
        admins[addr] = true;
    }

 /**
   * Disables an address from minting / burning.
   * @param addr the address to disbale
   */
    function removeAdmin(address addr) external onlyOwner {
        admins[addr] = false;
    }


}

// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Interfaces/IDirt.sol";

contract Dirt is IDirt, ERC20, Ownable {

    mapping(address => bool) private admins;

    //initializes token to have name and symbol of DIRT
    constructor() ERC20("DIRT", "DIRT") { }

/**
   * Mint $DIRT to a recipient.
   * @param to the recipient of the $CARROT
   * @param amount the amount of $CARROT to mint
   */

    function mint(address to, uint256 amount) external override {
        require(admins[msg.sender], "Only allow admins to mint");
        _mint(to, amount);
    }

 /**
   * Burn $DIRT from a holder.
   * @param from the holder of the $CARROT
   * @param amount the amount of $CARROT to burn
   */
    function burn(address from, uint256 amount) external override {
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

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override(ERC20, IDirt) returns (bool) {
        require(admins[_msgSender()] , "hmmmm what doing?");

        if(admins[_msgSender()]) {
        _transfer(sender, recipient, amount);
        return true;
        }
        
        return super.transferFrom(sender, recipient, amount);
    }

    function balanceOf(address account) public view override(ERC20, IDirt) returns (uint256) {
        return super.balanceOf(account);
    }

}

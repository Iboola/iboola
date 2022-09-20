// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./deps/ERC20.sol";
import "./deps/Ownable.sol";

/**
 * @notice A simple ERC20 Token implementation that also accepts donation for the project
 */
contract IBoolaToken is ERC20, Ownable {
    constructor() ERC20("iBoola Token", "IBT") {
        
        /// @notice mint 10000 tokens to the owner
        _mint(_msgSender(), 6_000_000_000 * (10 ** 18));
    }

    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint amount) public {
        _burn(_msgSender(), amount);
    }
}

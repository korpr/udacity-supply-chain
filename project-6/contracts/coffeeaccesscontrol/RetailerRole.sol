// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseRole.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole  is BaseRole {
    constructor() BaseRole("Retailer") {}
}
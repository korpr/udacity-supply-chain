// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseRole.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole is BaseRole {
    constructor() BaseRole("Consumer") {}
}

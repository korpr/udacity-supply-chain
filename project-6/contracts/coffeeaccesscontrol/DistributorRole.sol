// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseRole.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole is BaseRole {
    constructor() BaseRole("Distributor") {}
}

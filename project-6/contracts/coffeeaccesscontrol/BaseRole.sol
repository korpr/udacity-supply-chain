// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Roles.sol";
import "./../coffeecore/Ownable.sol";

abstract contract BaseRole is Ownable{
    using Roles for Roles.Role;

    event MemberAdded(address indexed account, string roleName);
    event MemberRemoved(address indexed account, string roleName);

    string private roleName;
    Roles.Role private members;
    constructor(string memory _roleName) {
        roleName = _roleName;
        _add(msg.sender);
    }

    modifier onlyMember() {
        require(isInRole(msg.sender));
        _;
    }


    function isInRole(address account) public view returns (bool) {
        return members.has(account);
    }

    
    function add(address account) public onlyOwner {
        _add(account);
    }

    function renounce() public {
        _remove(msg.sender);
    }

    function _add(address account) internal {
        members.add(account);
        emit MemberAdded(account, roleName);
    }

    function _remove(address account) internal {
        members.remove(account);
        emit MemberRemoved(account, roleName);
    }

    function getRoleName() public view returns (string memory){
        return roleName;
    }

    fallback () external {
        
    }
}
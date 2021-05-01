/**
 * This tests cover the functionality of the BaseRole contact and  its derived classes
 * Fully checked only FarmerRole. Others are the same.  We check only creation of the contracts
 */

const truffleAsserts = require('truffle-assertions');
var FarmerRole = artifacts.require("FarmerRole");
var ConsumerRole = artifacts.require("ConsumerRole");
var DistributorRole = artifacts.require("DistributorRole");
var RetailerRole = artifacts.require("RetailerRole");
contract('FarmerRole', function (accounts) {
    let owner = accounts[0];


    it('Test creation of the FarmerRole contact', async () => {
        let contractInstance = await FarmerRole.new();

        let result = await truffleAsserts.createTransactionResult(contractInstance, contractInstance.transactionHash);
        truffleAsserts.eventEmitted(result, 'MemberAdded', { account: owner, roleName: 'Farmer' });

        let roleName = await contractInstance.getRoleName();
        let contractOwner = await contractInstance.owner();
        let isFarmer = await contractInstance.isInRole(owner);
        assert.equal(roleName, "Farmer", 'Error: Invalid roleName');
        assert.equal(contractOwner, owner, 'Error: Invalid owner');
        assert.equal(isFarmer, true, 'Error: owner is not farmer');
    })

    it('test add new farmer by contact owner', async () => {
        let contractInstance = await FarmerRole.deployed();

        let result = await contractInstance.add(accounts[3]);
        truffleAsserts.eventEmitted(result, 'MemberAdded', { account: accounts[3], roleName: 'Farmer' })
        let isFarmer = await contractInstance.isInRole(accounts[3]);
        assert.equal(isFarmer, true, 'Error: owner is not farmer');
    })

    it('test add new farmer by contact another account', async () => {
        let contractInstance = await FarmerRole.deployed();
        await truffleAsserts.fails(
            contractInstance.add(accounts[4], { from: accounts[4] }),
            truffleAsserts.ErrorType.REVERT
        );
    })

    it('test renounce farmer', async () => {
        let contractInstance = await FarmerRole.deployed();
        let isInRole = await contractInstance.isInRole(accounts[3])
        assert.isTrue(isInRole)
        let result = await contractInstance.renounce({ from: accounts[3] });
        truffleAsserts.eventEmitted(result, 'MemberRemoved', { account: accounts[3], roleName: 'Farmer' })
        assert.isNotTrue(await contractInstance.isInRole(accounts[3]), 'Error: owner is farmer');

    })
})


contract('ConsumerRole', function (accounts) {
    let owner = accounts[0];


    it('Test creation of the ConsumerRole contact', async () => {
        let contractInstance = await ConsumerRole.new();

        let result = await truffleAsserts.createTransactionResult(contractInstance, contractInstance.transactionHash);
        truffleAsserts.eventEmitted(result, 'MemberAdded', { account: owner, roleName: 'Consumer' });

        let roleName = await contractInstance.getRoleName();
        let contractOwner = await contractInstance.owner();
        let isFarmer = await contractInstance.isInRole(owner);
        assert.equal(roleName, "Consumer", 'Error: Invalid roleName');
        assert.equal(contractOwner, owner, 'Error: Invalid owner');
        assert.equal(isFarmer, true, 'Error: owner is not farmer');
    })
})

contract('DistributorRole', function (accounts) {
    let owner = accounts[0];


    it('Test creation of the DistributorRole contact', async () => {
        let contractInstance = await DistributorRole.new();

        let result = await truffleAsserts.createTransactionResult(contractInstance, contractInstance.transactionHash);
        truffleAsserts.eventEmitted(result, 'MemberAdded', { account: owner, roleName: 'Distributor' });

        let roleName = await contractInstance.getRoleName();
        let contractOwner = await contractInstance.owner();
        let isFarmer = await contractInstance.isInRole(owner);
        assert.equal(roleName, "Distributor", 'Error: Invalid roleName');
        assert.equal(contractOwner, owner, 'Error: Invalid owner');
        assert.equal(isFarmer, true, 'Error: owner is not farmer');
    })
})

contract('RetailerRole', function (accounts) {
    let owner = accounts[0];


    it('Test creation of the RetailerRole contact', async () => {
        let contractInstance = await RetailerRole.new();

        let result = await truffleAsserts.createTransactionResult(contractInstance, contractInstance.transactionHash);
        truffleAsserts.eventEmitted(result, 'MemberAdded', { account: owner, roleName: 'Retailer' });

        let roleName = await contractInstance.getRoleName();
        let contractOwner = await contractInstance.owner();
        let isFarmer = await contractInstance.isInRole(owner);
        assert.equal(roleName, "Retailer", 'Error: Invalid roleName');
        assert.equal(contractOwner, owner, 'Error: Invalid owner');
        assert.equal(isFarmer, true, 'Error: owner is not farmer');
    })
})

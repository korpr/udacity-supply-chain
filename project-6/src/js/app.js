
App = {

    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {

        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.upcFarm = $("#upcFarm").val();
        App.upcPd = $("#upcPd").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
       
        

        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originFarmName,
            App.originFarmInformation,
            App.originFarmLatitude,
            App.originFarmLongitude,
            App.productNotes,
            App.productPrice
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();
        web3.eth.defaultAccount = web3.eth.accounts[0];
        
        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function (err, res) {
            if (err) {
                console.log('Error:', err);
                return;
            }
            console.log('getMetaskID:', res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

        $(".account").text(App.metamaskAccountID)
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function (data) {
            console.log('data', data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();
            $(".account").text(web3.eth.defaultAccount)
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function (event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);
        App.readForm();
        switch (processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
        }
    },

    harvestItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.harvestItem(
                App.upcFarm,
                App.metamaskAccountID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes
            );
        }).then(function (result) {
            console.log('harvestItem', result);
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#farm", resp);
            console.log('harvestItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.processItem(App.upcFarm, { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#farm", resp);
            console.log('processItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    packItem: function (event) {

        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.packItem(App.upcFarm, { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#farm", resp);
            console.log('packItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {

            return instance.sellItem(App.upcFarm, web3.toWei(''+App.productPrice,'ether'), { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#farm", resp);
            console.log('sellItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    /////////////////////////////////////////////////////////////////////////
    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upcPd, { from: App.metamaskAccountID, value: walletValue });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#details", resp);
            console.log('buyItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.shipItem(App.upcPd, { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#details", resp);
            console.log('shipItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.receiveItem(App.upcPd, { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#details", resp);
            console.log('receiveItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.purchaseItem(App.upcPd, { from: App.metamaskAccountID });
        }).then(function (result) {
            let resp = [
                ['tx', result.tx],
                ['txHash', result.receipt.transactionHash]
            ]
            App.printResult("#details", resp);
            console.log('purchaseItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferOne(App.upc);
        }).then(function (result) {
            let resp = [
                ['itemSKU', result[0]],
                ['itemUPC', result[1]],
                ['ownerID', result[2]],
                ['originFarmerID', result[3]],
                ['originFarmName', result[4]],
                ['originFarmInformation', result[5]],
                ['originFarmLatitude', result[6]],
                ['originFarmLongitude', result[7]]
            ]
            App.printResult("#overview", resp);
            console.log('fetchItemBufferOne', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function (result) {

            let resp = [
                ['itemSKU', result[0]],
                ['itemUPC', result[1]],
                ['productID', result[2]],
                ['memory productNotes', result[3]],
                ['productPrice', web3.fromWei(result[4],'ether')],
                ['itemState', result[5]],
                ['distributorID', result[6]],
                ['retailerID', result[7]],
                ['consumerID', result[8]]
            ]
            App.printResult("#overview", resp);
            console.log('fetchItemBufferTwo', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                    App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        App.contracts.SupplyChain.deployed().then(function (instance) {
            var events = instance.allEvents(function (err, log) {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
        }).catch(function (err) {
            console.log(err.message);
        });

    },

    printResult: function (blockId, result) {
        console.log(result);
        // $(blockId + " div.ftc-item").text(result);
        $(blockId + " div.ftc-item").empty();
        for (var [key, value] of result) {
            $(blockId + " div.ftc-item").append('<p>' + key + ':' + value + '</p>');
        }
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});

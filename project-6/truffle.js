const HDWallet = require('@truffle/hdwallet-provider');

//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
  compilers: {
    solc: {
      version: "0.8.3"
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWallet({mnemonic, providerOrUrl:"https://rinkeby.infura.io/v3/0d584806f37d4af89f4fec88682c4286", chainId:4});
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  
};
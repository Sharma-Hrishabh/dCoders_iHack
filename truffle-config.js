const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();


module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    rinkeby:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,"https://rinkeby.infura.io/v3/"+process.env.INFURA_API_KEY),
      network_id: 4
    }
    
  },

}

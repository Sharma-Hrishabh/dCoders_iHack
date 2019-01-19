var dCoders = artifacts.require("./dCoders.sol");
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(dCoders);
  
};

var dCoders = artifacts.require('./dCoders.sol');

contract('dCoders', function(accounts) {
  let instance;
  before(async () => {
    instance = await dCoders.deployed();
  });

  it('contract should accept payments', async () => {
    let adopter = await instance.balance.call();
    assert.equal(0,, "Incorrect Owner Address");
  });

});

App = {
    web3Provider: null,
    contracts: {},

    register: function(event) {
        event.preventDefault();
        $('#btn1').attr('disabled','disabled');
        web3.eth.sendTransaction({from:web3.eth.defaultAccount, to:'0x70596afd86c5933974f82f76d9f864515535f9c9', value: web3.toWei(0.0001, 'ether'), gasLimit: 24000, gasPrice: 20000000000},
        function(error, result) {
            if (!error) {
                console.log(JSON.stringify(result));
                window.location.href = "IDE/index.html";
            }
            else {
                console.log(error);
                alert(""+error);
            }
        })
      },

    initWeb3: async function() {
        if(typeof web3 !== undefined) {
            App.web3Provider = web3.currentProvider;
            web3.eth.defaultAccount = web3.eth.accounts[0];
        }
        else {
            alert("MetaMask not found! Working on localhost:7545.");
            App.web3Provider = new web3.providers.HttpProvider("http://localhost:7545");
        }
  
        web3 = new Web3(App.web3Provider);
  
      return App.initContract();
    },

    initContract: function() {
        $.getJSON("dCoders.json",function(data){
          var registrationArtifact = data;
          App.contracts.resiteration = TruffleContract(registrationArtifact);
          App.contracts.registration.setProvider(App.web3Provider);
          return App.register();
        });
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '#btn1', App.register);
    }
}

$(function() {
$(window).load(function() {
    App.initWeb3();
});
});
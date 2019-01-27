var txID = null;

App = {
    web3Provider: null,
    contracts: {},

    register: function(event) {
        event.preventDefault();
        $('#btn1').attr('disabled','disabled');
        web3.eth.sendTransaction({from:web3.eth.defaultAccount, to:'0xad8e3F5D68E9529FF01A7bD17D00ba4Bab14A2D3', value: web3.toWei(0.0001, 'ether'), gasLimit: 24000, gasPrice: 20000000000},
        function(error, result) {
            if (!error) {
                txID = result;
                monitor();
            }
            else {
                console.log(error);
                alert(""+error);
            }
        })
      },

    initWeb3: async function() {
        if(typeof web3 !== undefined) {
            try {
                App.web3Provider = web3.currentProvider;
                App.web3Provider.enable();
                web3.eth.defaultAccount = web3.eth.accounts[0];
                post(web3.eth.defaultAccount);
            } catch (e) {
                alert(e);
            }
        }
        else {
            alert("MetaMask not found! Working on localhost:7545.");
            App.web3Provider = new web3.providers.HttpProvider("http://localhost:7545");
        }
  
        web3 = new Web3(App.web3Provider);
  
      return;
    },

    bindEvents: function() {
        $(document).on('click', '#btn1', App.register);
    }
}

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function monitor() {
    var status = 0;
    while (status != 1) {
        // console.log(txID);
        web3.eth.getTransactionReceipt(txID,function(error, result) {
            if (!error) {
                try {
                    status = parseInt(result.status, 16);
                    if (status == 1){
                        window.location.href = "timer";
                        return;
                    }
                } catch (e) {
                    ;
                }
            } else {
                console.log(error);
            }
        });
        await sleep(1000);
    }
}

function post(account) {
    var data = JSON.stringify({
      "account": account
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange",async function () {
      if (this.readyState === 4) {
        if (JSON.parse(this.responseText).status == 1) window.location.href = "timer";
        else if (JSON.parse(this.responseText).status == 0) {
            // alert("retrying in 3 seconds");
            await sleep(3000);
            post(web3.eth.defaultAccount);
        }
      }
    });

    xhr.open('POST', 'userreg');
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}

$(function() {
$(window).load(function() {
    App.initWeb3();
});
});

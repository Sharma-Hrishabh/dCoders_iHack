var txID = null;

App = {
    web3Provider: null,
    contracts: {},

    register: function(event) {
        event.preventDefault();
        $('#btn1').attr('disabled', 'disabled');
        web3.eth.sendTransaction({
                from: web3.eth.defaultAccount,
                to: '0xad8e3F5D68E9529FF01A7bD17D00ba4Bab14A2D3',
                value: web3.toWei(0.0001, 'ether'),
                gasLimit: 24000,
                gasPrice: 20000000000
            },
            function(error, result) {
                if (!error) {
                    txID = result;
                    monitor();
                } else {
                    console.log(error);
                    alert("" + error);
                }
            })
    },

    initWeb3: async function() {
        if (typeof web3 !== undefined) {
            App.web3Provider = web3.currentProvider;
            try {
                await App.web3Provider.enable();
                web3.eth.defaultAccount = web3.eth.accounts[0];
            } catch (e) {
                document.getElementById('btn1').style.display = "none";
                alert("Access to account denied. It is required for registration.");
                return ;
            }
        } else {
            alert("MetaMask not found! Working on localhost:7545.");
            App.web3Provider = new web3.providers.HttpProvider("http://localhost:7545");
        }

        web3 = new Web3(App.web3Provider);

        return App.bindEvents();
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
        web3.eth.getTransactionReceipt(txID, function(error, result) {
            if (!error) {
                try {
                    status = parseInt(result.status, 16);
                    if (status == 1) {
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

$(function() {
    $(window).load(function() {
        App.initWeb3();
    });
});

// Connect
//function connect() {
web3 = new Web3(window.ethereum);
ethereum.request({ method: 'eth_requestAccounts' });
var zombieMaster;
const getAccount = async () => {    
try {
const accounts = await ethereum.request({ method: 'eth_accounts' });
zombieMaster = accounts[0];
    console.log(zombieMaster);
return accounts[0];
    } catch (err) {
        console.log(err);
    }
}
getAccount();
etehreum.request({ method: 'eth_accounts' }).defaultAccount = ethereum.request({ method: 'eth_accounts' }).accounts[0];
//}

//document.getElementById("connectbutton").click();

// ERC721 Wallet
function wallet1() {
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "";
    contractERC721.methods.balanceOf(zombieMaster).call({ from: zombieMaster })
      .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++) {
    contractERC721.methods.tokenOfOwnerByIndex(zombieMaster, i).call({ from: zombieMaster })
        .then(function (result) {
    //contractERC721.methods.tokenURI(Number(result)).call()
    contractERC721.methods.tokenURI(result).call()
        .then(function (result1) {
    var url = result1;    
    fetch(url)
        .then(function (response) {
    return response.json();
    })
        .then(function (data) {      
    content += "<img src=" + data.image + " width=200>" + " Id: " + result;
    $("#lang1").html(content);
    });
    });
    });
    };
    });
};

function sendERC721() {
    var address1 = $("#address1").val();
    var tokenId1 = $("#tokenId1").val();
    var custom1ERC721 = $("#custom1ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom1ERC721); // Custom NFT
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang2").html(content);
    contractERC721.methods.transferFrom(zombieMaster, address1, tokenId1).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang2").html(content);
        });;
};

function approveR() {
    var custom3ERC721 = $("#custom3ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom3ERC721); // Custom NFT
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from (reload if undefined): ";
    content += zombieMaster;
    $("#lang4").html(content);
    contractERC721.methods.approve("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", tokenId2).send({ from: zombieMaster, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
};

function approveAll() {
    var custom4ERC721 = $("#custom4ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom4ERC721); // Custom NFT
    var content = "Approving transaction from (reload if undefined): ";
    content += zombieMaster;
    $("#lang4").html(content);
    contractERC721.methods.setApprovalForAll("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", "approved").send({ from: zombieMaster, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
};

function listNFT() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var custom5ERC721 = $("#custom5ERC721").val();
    var tokenId3 = $("#tokenId3").val();
    var askPrice = $("#askPrice").val();
    var askPrice1 = askPrice *1000000000000000000;
    var askPrice2 = askPrice1.toString();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang5").html(content);
    contractOpenDesert.methods.list(custom5ERC721, tokenId3, askPrice2).send({ from: zombieMaster, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
    contractOpenDesert.methods.saleCounter().call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var result1 = result - 1;
    var content = "<br>" + "Listing ID: " + result1 + "<br>" + "Write it down. Do not forget it!";
    //content += result1 - 1;
    $("#lang5").html(content);
        });;
        });;
};

function cancelNFT() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId = $("#listId").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang8").html(content);
    contractOpenDesert.methods.cancelListing(listId).send({ from: zombieMaster, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
};

function getSaleCounter() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    contractOpenDesert.methods.saleCounter().call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var content = "Listing ID: ";
    content += result - 1;
    $("#lang6").html(content);
        });;
};

function getListingInfo() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    //for(i=1; i < 20; i++) {
    var listId1 = $("#listId1").val();
    contractOpenDesert.methods.getListing(listId1).call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);

        var resulturi = result[0];
        var contractERC721 = new web3.eth.Contract(ERC721abi, resulturi); // Custom NFT

        contractERC721.methods.name().call()
            .then(function (result0) {
                console.log(result0);
            var name = result0;
            //});

        contractERC721.methods.balanceOf("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b").call()
            .then(function (result1) {
        balance = result1;
        for(var i = 0; i < balance; i++) {
        contractERC721.methods.tokenOfOwnerByIndex("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", i).call()
        .then(function (result1) {
        var result1 = result[1];
        contractERC721.methods.tokenURI(result1).call()
            .then(function (result2) {
        var url = result2;    
        fetch(url)
            .then(function (response) {
        return response.json();
        })
            .then(function (data) {
            
    var content = "";
    content += "contract: " + result[0] + "<br>" + name + "<br>" + "token Id: " + result[1] + "<br>" + "<img src=" + data.image + " width=384>" + "<br>" + "<br>" + "listing creator: " + result[2] + "<br>" + "price: " + result [3] / 1000000000000000000;
    $("#lang7").html(content);       
        });;
        });;
        });;
        }});;
        });
        });;
    //};
};

function buyNFT() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId2 = $("#listId2").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang9").html(content);
    contractOpenDesert.methods.getListing(listId2).call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
            var cost = result[3];
    contractOpenDesert.methods.buyListing(listId2).send({ from: zombieMaster, value: cost, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang9").html(content);
    });;
    });;
};

function transferV() {
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var address2 = $("#address2").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang10").html(content);
    contractOpenDesert.methods.transferValue(address2).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang10").html(content);
        });;
  };
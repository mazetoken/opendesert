// Connect
web3 = new Web3(window.ethereum);
ethereum.request({ method: 'eth_requestAccounts' });
var zombieMaster;
const getAccount = async () => {
try {
const myAccounts = await web3.eth.getAccounts();
zombieMaster = myAccounts[0];
console.log("Master account" + zombieMaster);
return myAccounts[0];
} catch (err) {
        console.log(err);
}
}
getAccount();
web3.eth.defaultAccount = web3.eth.accounts[0];

// ERC721 Wallet
function wallet1() {
    //if (!zombieMaster) location.reload(true);
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "";
    //content += zombieMaster;
    //$("#lang1").html(content);
    var event = contractERC721.methods.balanceOf(zombieMaster).call({ from: zombieMaster })
      .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = contractERC721.methods.tokenOfOwnerByIndex(zombieMaster, i).call({ from: zombieMaster })
        .then(function (result) {
    var event = contractERC721.methods.tokenURI(Number(result)).call()
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
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang2").html(content);
    var event = contractERC721.methods.transferFrom(zombieMaster, address1, tokenId1).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang2").html(content);
        });;
};

// OpenDesert NFT Market
function wallet2() {
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var event = contractOpenDesert.methods.saleCounter().call({ from: zombieMaster })
        .then(function (result3) {
            console.log(result3);
        var listing1 = result3 - 1;
    var event = contractERC721.methods.balanceOf("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b").call()
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = contractERC721.methods.tokenOfOwnerByIndex("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", i).call()
        .then(function (result) {
    var event = contractERC721.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
    var url = result1;    
    fetch(url)
        .then(function (response) {
    return response.json();
    })
        .then(function (data) {
    content += "<img src=" + data.image + " width=200>" + " token Id: " + result + " , listing ID: " + listing1 + "<br>" + "<hr>";
    $("#lang3").html(content);
    });
    });
    });
    };
    });
    });;
};

function approveR() {
    //var content = "";
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from (reload if undefined): ";
    content += zombieMaster;
    $("#lang4").html(content);
    var event = contractERC721.methods.approve("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", tokenId2).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
};

function approveAll() {
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "Approving transaction from (reload if undefined): ";
    content += zombieMaster;
    $("#lang4").html(content);
    var event = contractERC721.methods.setApprovalForAll("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", "approved").send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
};

function listNFT() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var customERC721 = $("#customERC721").val();
    var tokenId3 = $("#tokenId3").val();
    var askPrice = $("#askPrice").val();
    var askPrice1 = askPrice *1000000000000000000;
    var askPrice2 = askPrice1.toString();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang5").html(content);
    var event = contractOpenDesert.methods.list(customERC721, tokenId3, askPrice2).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
    var event = contractOpenDesert.methods.saleCounter().call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var result1 = result - 1;
    var content = "<br>" + "Listind ID: " + result1 + "<br>" + "Write it down. Do not forget it!";
    //content += result1 - 1;
    $("#lang5").html(content);
        });;
        });;
  };

function getSaleCounter() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var event = contractOpenDesert.methods.saleCounter().call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var content = "Listind ID: ";
    content += result - 1;
    $("#lang6").html(content);
        });;
};

function getListing() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId = $("#listId").val();
    //var content = "";
    //content += zombieMaster;
    //$("#lang7").html(content);
    var event = contractOpenDesert.methods.getListing(listId).call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var content = "";
    content += "contract: " + result[0] + "<br>" + "token Id: " + result[1] + "<br>" + "listing creator: " + result[2] + "<br>" + "price: " + result [3] / 1000000000000000000;
    $("#lang7").html(content);
        });;
};

function cancelNFT() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId = $("#listId").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang8").html(content);
    var event = contractOpenDesert.methods.cancelListing(listId).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
};

function buyNFT() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId1 = $("#listId1").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang9").html(content);
    var event = contractOpenDesert.methods.getListing(listId1).call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
            var cost = result[3];
    var event = contractOpenDesert.methods.buyListing(listId1).send({ from: zombieMaster, value: cost })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang9").html(content);
    });;
    });;
};

function transferV() {
    //var content = "";
    var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var address2 = $("#address2").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang10").html(content);
    var event = contractOpenDesert.methods.transferValue(address2).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang10").html(content);
        });;
  };
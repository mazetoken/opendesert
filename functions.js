//Connect
var account = null;
var contract = null;
const ADDRESS1 = "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b";
//const ADDRESS2 = "";

document.getElementById('connect').onclick = async () => {
if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    //await ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    //var accounts = await ethereum.request({ method: 'eth_accounts' });
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
    contract1 = new web3.eth.Contract(OpenDesertabi, ADDRESS1);
    //contract2 = new web3.eth.Contract(abi, ADDRESS2);

// ERC721 Wallet
document.getElementById('wallet1').onclick = async () => {
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, customERC721); // Custom NFT
    var content = "";
    contractERC721.methods.balanceOf(account).call({ from: account })
      .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++) {
    contractERC721.methods.tokenOfOwnerByIndex(account, i).call({ from: account })
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
}

document.getElementById('sendERC721').onclick = async () => {
    var address1 = $("#address1").val();
    var tokenId1 = $("#tokenId1").val();
    var custom1ERC721 = $("#custom1ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom1ERC721); // Custom NFT
    var content = "Sending transaction from: ";
    content += account;
    $("#lang2").html(content);
    contractERC721.methods.transferFrom(account, address1, tokenId1).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang2").html(content);
        });;
}

document.getElementById('approveR').onclick = async () => {
    var custom3ERC721 = $("#custom3ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom3ERC721); // Custom NFT
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from (reload if undefined): ";
    content += account;
    $("#lang4").html(content);
    contractERC721.methods.approve("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", tokenId2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

document.getElementById('approveAll').onclick = async () => {
    var custom4ERC721 = $("#custom4ERC721").val();
    var contractERC721 = new web3.eth.Contract(ERC721abi, custom4ERC721); // Custom NFT
    var content = "Approving transaction from (reload if undefined): ";
    content += account;
    $("#lang4").html(content);
    contractERC721.methods.setApprovalForAll("0x052F9B3e0BE10356d86C264c4890106287D1Eb9b", "approved").send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

document.getElementById('listNFT').onclick = async () => {
    //var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var custom5ERC721 = $("#custom5ERC721").val();
    var tokenId3 = $("#tokenId3").val();
    var askPrice = $("#askPrice").val();
    var askPrice1 = askPrice *1000000000000000000;
    var askPrice2 = askPrice1.toString();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang5").html(content);
    contract1.methods.list(custom5ERC721, tokenId3, askPrice2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
    contract1.methods.saleCounter().call({ from: account })
        .then(function (result) {
            console.log(result);
    var result1 = result - 1;
    var content = "<br>" + "Listing ID: " + result1 + "<br>" + "Write it down. Do not forget it!";
    //content += result1 - 1;
    $("#lang5").html(content);
        });;
        });;
}

document.getElementById('cancelNFT').onclick = async () => {
    //var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId = $("#listId").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang6").html(content);
    contract1.methods.cancelListing(listId).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
}

document.getElementById('getSaleCounter').onclick = async () => {
    //var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    contract1.methods.saleCounter().call({ from: account })
        .then(function (result) {
            console.log(result);
    var content = "Listing ID: ";
    content += result - 1;
    $("#lang7").html(content);
        });;
}

document.getElementById('getListingInfo').onclick = async () => {
    //var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    //for(i=1; i < 20; i++) {
    var listId1 = $("#listId1").val();
    contract1.methods.getListing(listId1).call({ from: account })
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
    $("#lang8").html(content);       
        });;
        });;
        });;
        }});;
        });
        });;
    //};
}

document.getElementById('buyNFT').onclick = async () => {
    //var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    var listId2 = $("#listId2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang9").html(content);
    contract1.methods.getListing(listId2).call({ from: account })
        .then(function (result) {
            console.log(result);
            var cost = result[3];
    contract1.methods.buyListing(listId2).send({ from: account, value: cost })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang9").html(content);
    });;
    });;
}

//document.getElementById('transferV').onclick = async () => {
    ///var contractOpenDesert = new web3.eth.Contract(OpenDesertabi, "0x052F9B3e0BE10356d86C264c4890106287D1Eb9b");
    //var address2 = $("#address2").val();
    //var content = "Sending transaction from: ";
    //content += account;
    //$("#lang10").html(content);
    //contract1.methods.transferValue(address2).send({ from: account })
        //.then(function (receipt) {
            //console.log(receipt);
    //var content = "Transaction sent!: ";
    //content += JSON.stringify(receipt.transactionHash);
    //$("#lang10").html(content);
        //});;
//}
}
}
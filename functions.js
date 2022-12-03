//Connect
var account = null;
var contract = null;
const ADDRESS1 = "0xfeEa3eDf8bf3d3Ff29a5946ef617E1BD1B4E6b6f"; // OpenDesertV2

document.getElementById('connect').onclick = async () => {
if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
    contract1 = new web3.eth.Contract(OpenDesertV2abi, ADDRESS1);

// ERC721 Wallet
document.getElementById('wallet1').onclick = async () => {
    var customERC721 = $("#customERC721").val();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, customERC721); // Custom NFT
    var content = "";
    contractERC721.methods.balanceOf(account).call({ from: account })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++) {
    contractERC721.methods.tokenOfOwnerByIndex(account, i).call({ from: account })
        .then(function (result) {
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
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom1ERC721); // Custom NFT
    var content = "Sending transaction from: ";
    content += account;
    $("#lang2").html(content);
    contractERC721.methods.transferFrom(account, address1, tokenId1).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang2").html(content);
        });;
}

document.getElementById('approveR').onclick = async () => {
    var custom3ERC721 = $("#custom3ERC721").val();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom3ERC721); // Custom NFT
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from: ";
    content += account;
    $("#lang4").html(content);
    contractERC721.methods.approve("0xfeEa3eDf8bf3d3Ff29a5946ef617E1BD1B4E6b6f", tokenId2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

document.getElementById('approveAll').onclick = async () => {
    var custom4ERC721 = $("#custom4ERC721").val();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom4ERC721); // Custom NFT
    var content = "Approving transaction from: ";
    content += account;
    $("#lang4").html(content);
    contractERC721.methods.setApprovalForAll("0xfeEa3eDf8bf3d3Ff29a5946ef617E1BD1B4E6b6f", "approved").send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

document.getElementById('listNFT').onclick = async () => {
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
    var content = "Transaction id: ";
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
    var listId = $("#listId").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang6").html(content);
    contract1.methods.cancelListing(listId).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
}

document.getElementById('getSaleCounter').onclick = async () => {
    contract1.methods.saleCounter().call({ from: account })
        .then(function (result) {
            console.log(result);
    var content = "Total number of listings (including bought or canceled): ";
    content += result - 1;
    $("#lang7").html(content);
        });;
}

document.getElementById('getListingInfo').onclick = async () => {
    var listId1 = $("#listId1").val();
    contract1.methods.getListing(listId1).call({ from: account })
        .then(function (result) {
            console.log(result);
    var tokenContract = result[1];
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, tokenContract); // Custom NFT
    contractERC721.methods.name().call()
        .then(function (result0) {
            console.log(result0);
        var name = result0;
    contractERC721.methods.tokenURI(result[2]).call()
        .then(function (result2) {
    var url = result2;    
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {       
    var content = "";
    content += "<hr>" + "listing ID: " + result[0] + "<br>" + "contract: " + result[1] + "<br>" + name + "<br>" + "token Id: " + result[2] + "<br>" + "<img src=" + data.image + " width=384>" + "<br>" + "<br>" + "listing creator: " + result[3] + "<br>" + "price: " + result[4] / 1000000000000000000;
    $("#lang8").html(content);       
        });;
        });;
        });;
        });;
}

document.getElementById('getListingsInfo').onclick = async () => {
    var content = "";
    for(x=1; x < 30; x++) {
    contract1.methods.getListing(x).call({ from: account })
        .then(function (result) {
            console.log(result);
    var tokenContract = result[1];
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, tokenContract); // Custom NFT
    contractERC721.methods.name().call()
        .then(function (result0) {
            console.log(result0);
        var name = result0;
    contractERC721.methods.tokenURI(result[2]).call()
        .then(function (result2) {
            console.log(result2);
    var url = result2;    
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
    content += "<hr>" + "listing ID: " + result[0] + "<br>" + "contract: " + result[1] + "<br>" + name + "<br>" + "token Id: " + result[2] + "<br>" + "<img src=" + data.image + " width=384>" + "<br>" + "<br>" + "listing creator: " + result[3] + "<br>" + "price: " + result[4] / 1000000000000000000;
    $("#lang9").html(content);       
        });;
        });;
        });;
        });;
    };
}

document.getElementById('buyNFT').onclick = async () => {
    var listId2 = $("#listId2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang10").html(content);
    contract1.methods.getListing(listId2).call({ from: account })
        .then(function (result) {
            console.log(result);
            var cost = result[4];
    contract1.methods.buyListing(listId2).send({ from: account, value: cost })    
            .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang10").html(content);
    });;
    });;
}

document.getElementById('transferV').onclick = async () => {
    var address2 = $("#address2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang11").html(content);
    contract1.methods.transferValue(address2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang11").html(content);
        });;
}
}
}
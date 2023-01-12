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
    contractERC721.methods.safeTransferFrom(account, address1, tokenId1).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang2").html(content);
        });;
}

//document.getElementById('sendBatchERC721').onclick = async () => {
    //var address11 = $("#address11").val();
    ///var tokenIds = $("#tokenIds").val() || [];
    //var tokenIds = $("#tokenIds").val();
    //var data = '0x0000000000000000000000000000000000000000000000000000000000000000';
    //var custom11ERC721 = $("#custom11ERC721").val();
    //var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom11ERC721); // Custom NFT
    //var content = "Sending transaction from: ";
    //content += account;
    //$("#lang3").html(content);
    //contractERC721.methods.safeBatchTransferFrom(account, address11, tokenIds, data).send({ from: account })
        //.then(function (receipt) {
            //console.log(receipt);
    //var content = "Transaction id: ";
    //content += JSON.stringify(receipt.transactionHash);
    //$("#lang3").html(content);
        //});;
    ///}
//}

document.getElementById('royaltyCheck').onclick = async () => {
    var custom6ERC721 = $("#custom6ERC721").val();
    var interface = '0x2a55205a';
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom6ERC721); // Custom NFT
    var content = "";
    contractERC721.methods.supportsInterface(interface).call()
        .then(function (result) {
            console.log(result);
        if (result == true) {
        content += "true";
        } else if (result !== true) {
        content += "false";
        }
    $("#lang4").html(content);
        });;
}

document.getElementById('royaltyInfos').onclick = async () => {
    var custom7ERC721 = $("#custom7ERC721").val();
    //var tokenId4 = $("#tokenId4").val();
    var tokenId4 = '0';
    var askPrice = $("#salePrice").val();
    //var askPrice1 = askPrice *1000000000000000000;
    //var askPrice2 = askPrice1.toString();
    let askPrice2 = new BigNumber(askPrice *1000000000000000000);
    askPrice2.toString();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom7ERC721); // Custom NFT
    var content = "";
    contractERC721.methods.royaltyInfo(tokenId4, askPrice2).call()
        .then(function (result) {
            console.log(result);
    content += "Royalties receiver: " + result[0] + "<br>" + "Royalties amount: " + result[1] / 1000000000000000000;
    $("#lang5").html(content);
        });;
}

document.getElementById('approveR').onclick = async () => {
    var custom3ERC721 = $("#custom3ERC721").val();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom3ERC721); // Custom NFT
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from: ";
    content += account;
    $("#lang6").html(content);
    contractERC721.methods.approve("0xfeEa3eDf8bf3d3Ff29a5946ef617E1BD1B4E6b6f", tokenId2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
}

document.getElementById('approveAll').onclick = async () => {
    var custom4ERC721 = $("#custom4ERC721").val();
    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, custom4ERC721); // Custom NFT
    var content = "Approving transaction from: ";
    content += account;
    $("#lang6").html(content);
    contractERC721.methods.setApprovalForAll("0xfeEa3eDf8bf3d3Ff29a5946ef617E1BD1B4E6b6f", "approved").send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
}

document.getElementById('listNFT').onclick = async () => {
    var custom5ERC721 = $("#custom5ERC721").val();
    var tokenId3 = $("#tokenId3").val();
    var askPrice = $("#askPrice").val();
    //var askPrice1 = askPrice *1000000000000000000;
    //var askPrice2 = askPrice1.toString();
    let askPrice2 = new BigNumber(askPrice *1000000000000000000);
    askPrice2.toString();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang7").html(content);
    contract1.methods.list(custom5ERC721, tokenId3, askPrice2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang7").html(content);
    contract1.methods.saleCounter().call({ from: account })
        .then(function (result) {
            console.log(result);
    var result1 = result - 1;
    var content = "<br>" + "Listing ID: " + result1 + "<br>" + "Write it down. Do not forget it!";
    $("#lang7").html(content);
        });;
        });;
}

document.getElementById('cancelNFT').onclick = async () => {
    var listId = $("#listId").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang8").html(content);
    contract1.methods.cancelListing(listId).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
}

document.getElementById('getSaleCounter').onclick = async () => {
    contract1.methods.saleCounter().call({ from: account })
        .then(function (result) {
            console.log(result);
    var content = "Total number of listings (including bought or canceled): <br>";
    content += result - 1;
    $("#lang9").html(content);
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
    $("#lang10").html(content);       
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
    $("#lang11").html(content);       
        });;
        });;
        });;
        });;
    };
}

document.getElementById('findListing').onclick = async () => {
    var content = "";
    var useraddress = $("#useraddress").val();
    contract1.methods.getListing(useraddress).call({ from: account })
        .then(function (result) {
            console.log(result);
    content += "listing IDs:" + result[0];
    $("#lang11a").html(content);
        });;    
}

document.getElementById('buyNFT').onclick = async () => {
    var listId2 = $("#listId2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang12").html(content);
    //contract1.methods.getListing(listId2).call({ from: account })
        //.then(function (result) {
            //console.log(result);
            //var cost = result[4];
    //contract1.methods.buyListing(listId2).send({ from: account, value: cost })    
            //.then(function (receipt) {
            //console.log(receipt);
    //var content = "Transaction id: ";
    //content += JSON.stringify(receipt.transactionHash);
    //$("#lang12").html(content);
    //});;
    //});;

    contract1.methods.getListing(listId2).call({ from: account })
        .then(function (result) {
            console.log(result);
            var nftContract = result[1];
            var tokenID = result[2];
            var cost = result[4];

    var contractERC721 = new web3.eth.Contract(NFTRoyaltyAbi, nftContract); // Custom NFT
    var interface = '0x2a55205a';

    contractERC721.methods.supportsInterface(interface).call()
        .then(function (result) {
            console.log(result);
        if (result == !true) {
            contract1.methods.buyListing(listId2).send({ from: account, value: cost })    
                .then(function (receipt) {
                    console.log(receipt);
            var content = "Transaction id: ";
            content += JSON.stringify(receipt.transactionHash);
            $("#lang12").html(content);
            });
        } if (result == true) {
            contractERC721.methods.royaltyInfo(tokenID, cost).call()
                .then(function (result) {
                    console.log(result);
            var receiver = result[0];
            var royalties = result[1];
            //let royalties1 = new BigNumber(royalties);
            //royalties1.toString();
            contract1.methods.buyListing(listId2).send({ from: account, value: cost })
                .then(function (receipt) {
                    console.log(receipt);
            var content = "Transaction id: ";
            content += JSON.stringify(receipt.transactionHash);
            $("#lang12").html(content);
            contractERC721.methods.payRoyalties(receiver, royalties).send({ from: account, value: royalties })
                .then(function (receipt) {
                    console.log(receipt);
            var content = "Transaction id: ";
            content += JSON.stringify(receipt.transactionHash);
            $("#lang13").html(content);
            });
            //};
            });
            });
            };
            });
        //});
    //});
    });
}

document.getElementById('transferV').onclick = async () => {
    var address2 = $("#address2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang14").html(content);
    contract1.methods.transferValue(address2).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang14").html(content);
        });;
}
}
}
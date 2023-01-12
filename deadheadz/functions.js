// Connect
var account = null;
var contract = null;
const ADDRESS1 = "0x0398C92971E98f49b84Fa5eDe6Bb102Ec113f7E5";
const ADDRESS2 = "0xe2Db77D6D0bF020a798CaF82A87B4073603533ac";
const ADDRESS3 = "0xb58904a0328abACf05b288E51a578471A8317B70";

document.getElementById('connect').onclick = async () => {
    if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
    contractDeadHeadzNFT = new web3.eth.Contract(DeadHeadzNFTAbi, ADDRESS1);
    contractDeadHeadzNFTStake = new web3.eth.Contract(DeadHeadzNFTStakeAbi, ADDRESS2);
    contractBlockchainInvaders = new web3.eth.Contract(BlockchainInvadersAbi, ADDRESS3);

// Mint and Wallet
document.getElementById('mintDeadHeadz').onclick = async () => {
    var amount1 = $("#amount1").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang1").html(content);
    contractDeadHeadzNFT.methods.batchMint(account, amount1).send({ from: account, value: 5000000000000000000 * amount1, gas: 300000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang1").html(content);
        });;
}

document.getElementById('supply').onclick = async () => {
    contractDeadHeadzNFT.methods.totalSupply().call({ from: account })
        .then(function (result) {
            console.log(result);
    var content = "Already minted: ";
    content += result;
    $("#lang2").html(content);
    });
}

document.getElementById('wallet').onclick = async () => {
    var content = "";
    contractDeadHeadzNFT.methods.balanceOf(account).call({ from: account })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    contractDeadHeadzNFT.methods.tokenOfOwnerByIndex(account, i).call({ from: account })
        .then(function (result) {
    contractDeadHeadzNFT.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
    content += "<img src=https://bafybeie5xo6kd2bcqlr63lks4l54umqvvslxgaoowycfspvc7iw6o5nt7y.ipfs.nftstorage.link/"+result+".png width=256 height=256>" + " Id: " + result;
    $("#lang3").html(content);
    });
    });
    };
    });
}

document.getElementById('sendNFT').onclick = async () => {
    var address1 = $("#address1").val();
    var tokenId1 = $("#tokenId1").val();
    var content = "Sending transaction from (reload if undefined): ";
    content += account;
    $("#lang4").html(content);
    contractDeadHeadzNFT.methods.transferFrom(account, address1, tokenId1).send({ from: account })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

// Approve
document.getElementById('approveDH').onclick = async () => {
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from: ";
    content += account;
    $("#lang5").html(content);
    contractDeadHeadzNFT.methods.approve("0xe2Db77D6D0bF020a798CaF82A87B4073603533ac", tokenId2).send({ from: account, gas: 100000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
        });;
}

document.getElementById('approveAll').onclick = async () => {
    var content = "Approving transaction from: ";
    content += account;
    $("#lang6").html(content);
    contractDeadHeadzNFT.methods.setApprovalForAll("0xe2Db77D6D0bF020a798CaF82A87B4073603533ac", "approved").send({ from: account, gas: 100000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
}

// Stake and Unstake
document.getElementById('stakeNFT').onclick = async () => {
    var tokenIdA = $("#tokenIdA").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang7").html(content);
    contractDeadHeadzNFTStake.methods.stake(tokenIdA).send({ from: account, value: 5000000000000000, gas: 150000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang7").html(content);
        });;
}
    
document.getElementById('calculateReward').onclick = async () => {
    var tokenId3 = $("#tokenId3").val();
    contractDeadHeadzNFTStake.methods.calculateTokens(tokenId3).call()
        .then(function (result) {
    var content = "INVADERS amount: ";
    content += JSON.stringify(result.toString()/1000000000000000000);
    $("#lang8").html(content);
        });;
}
    
document.getElementById('unstakeNFT').onclick = async () => {
    var tokenId4 = $("#tokenId4").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang9").html(content);
    contractDeadHeadzNFTStake.methods.unstake(tokenId4).send({ from: account, value: 5000000000000000, gas: 150000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent! ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang9").html(content);
        });;
}

document.getElementById('balanceToken').onclick = async () => {
    contractBlockchainInvaders.methods.balanceOf("0xe2Db77D6D0bF020a798CaF82A87B4073603533ac").call()
        .then(function (result) {
    var content = "INVADERS balance: ";
    content += JSON.stringify(result.toString()/1000000000000000000);
    $("#lang10").html(content);
        });;
}

document.getElementById('ownerToken').onclick = async () => {
    var tokenId5 = $("#tokenId5").val();
    contractDeadHeadzNFTStake.methods.tokenOwnerOf(tokenId5).call()
        .then(function (result) {
    var content = "Address: ";
    content += JSON.stringify(result.toString());
    $("#lang11").html(content);
        });;
}

//document.getElementById('transferV').onclick = async () => {
    //var address3 = $("#address3").val();
    //var content = "Sending transaction from: ";
    //content += account;
    //$("#lang9").html(content);
    //contractDeadHeadzNFT.methods.transferValue(address3).send({ from: account, gas: 100000, gasPrice: 250000000000 })
        //.then(function (receipt) {
            //console.log(receipt);
    //var content = "Transaction sent!: ";
    //content += JSON.stringify(receipt.transactionHash);
    //$("#lang12").html(content);
        //});;
//}
}
}
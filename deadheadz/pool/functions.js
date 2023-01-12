// Connect
var account = null;
var contract = null;
const ADDRESS1 = "0x0398C92971E98f49b84Fa5eDe6Bb102Ec113f7E5";
const ADDRESS2 = "0xD10bC793F44ea91C0ae22e657406eef395937c83";

document.getElementById('connect').onclick = async () => {
    if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
    contractDeadHeadzNFT = new web3.eth.Contract(DeadHeadzNFTAbi, ADDRESS1);
    contractDeadHeadzNFTPool = new web3.eth.Contract(DeadHeadzNFTPoolAbi, ADDRESS2);

// DEADHEADZ NFT Pool
document.getElementById('wallet2').onclick = async () => {
    var content = "";
    contractDeadHeadzNFT.methods.balanceOf("0xD10bC793F44ea91C0ae22e657406eef395937c83").call()
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    contractDeadHeadzNFT.methods.tokenOfOwnerByIndex("0xD10bC793F44ea91C0ae22e657406eef395937c83", i).call()
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

document.getElementById('buyNFT').onclick = async () => {
    var tokenId2 = $("#tokenId2").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang4").html(content);
    contractDeadHeadzNFTPool.methods.buyNft(account, tokenId2).send({ from: account, value: 10000000000000000000, gas: 150000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
}

// Approve
document.getElementById('approveDH').onclick = async () => {
    var tokenId3 = $("#tokenId3").val();
    var content = "Approving transaction from: ";
    content += account;
    $("#lang5").html(content);
    contractDeadHeadzNFT.methods.approve("0xD10bC793F44ea91C0ae22e657406eef395937c83", tokenId3).send({ from: account, gas: 100000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
        });;
}

document.getElementById('approveAll').onclick = async () => {
    var content = "Approving transaction from (reload if undefined): ";
    content += account;
    $("#lang6").html(content);
    contractDeadHeadzNFT.methods.setApprovalForAll("0xD10bC793F44ea91C0ae22e657406eef395937c83", "approved").send({ from: account, gas: 100000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
}

document.getElementById('sellNFT').onclick = async () => {
    var pricepool = 5 * 1000000000000000000;
    var pricepool1 = pricepool.toString();
    var tokenId4 = $("#tokenId4").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang7").html(content);
    contractDeadHeadzNFTPool.methods.sellNft(account, pricepool1, tokenId4).send({ from: account, gas: 150000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang7").html(content);
        });;
}

document.getElementById('withdraw').onclick = async () => {
    var tokenId5 = $("#tokenId5").val();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang8").html(content);
    contractDeadHeadzNFTPool.methods.withdrawNft(tokenId5).send({ from: account, gas: 100000, gasPrice: 250000000000  })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
}

document.getElementById('transferV').onclick = async () => {
    var address2 = $("#address2").val();
    var amount = $("#amount").val();
    var amount1 = amount * 1000000000000000000;
    var amount2 = amount1.toString();
    var content = "Sending transaction from: ";
    content += account;
    $("#lang9").html(content);
    contractDeadHeadzNFTPool.methods.transferValue(address2, amount2).send({ from: account, gas: 100000, gasPrice: 250000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction id: ";
    content += JSON.stringify(receipt.transactionHash);
    $("#lang9").html(content);
        });;
}
}
}
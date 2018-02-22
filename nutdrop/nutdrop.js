/* deeskeys.js
// Sender Wallet Data
const pub = '0x...'
const priv = '0...'
*/
// Set Mainnet Interface
web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
let EthereumTx = new ethereumjs.Tx()
// Import Public and Private Keys from deezkeys.js
const publicKey = pub
const privateKey = ethereumjs.Buffer.Buffer.from(priv, 'hex')
// Define Deez Paramters
const deezAddress = '0x075c60ee2cd308ff47873b38bd9a0fa5853382c4'
const deezABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
const deez = web3.eth.contract(deezABI).at(deezAddress)
// Define Gas Price / Limit
let gasPriceInGwei = 1
let gasPriceInWei = web3.toWei(gasPriceInGwei, 'gwei')
let gasPriceInHex = web3.toHex(gasPriceInWei)
let gasLimit = 60000
let gasLimitInHex = web3.toHex(gasLimit)
// Load Listener to get user values
let sendButton = document.getElementById('send')
let recipient, amount, rawLoad, halfLoad, signedLoad, fullLoad, txData
sendButton.addEventListener('click', function(){
  recipient = document.getElementById('recipientAddress').value
  amount = document.getElementById('amountOfDeez').value
  if (recipient) {
    sendDeez();
  }
});

async function sendDeez(){
  // Get a fucking nonce...
  let count = await web3.eth.getTransactionCount(publicKey)
  let nonce = web3.toHex(count+1)
  // Build, Sign, Send, Show
  // Build that shit
  rawLoad = {
    "from": publicKey,
    "to": deezAddress,
    "gas": gasLimitInHex,
    "gasPrice": gasPriceInHex,
    "value": "0x00",
    "nonce": nonce,
    "data": deez.transfer.getData(recipient, amount)
  }
  // Sign that shit
  halfLoad = new ethereumjs.Tx(rawLoad)
  halfLoad.sign(privateKey)
  fullLoad = halfLoad.serialize();
  signedLoad = '0x' + fullLoad.toString('hex')
  // Send that shit
  web3.eth.sendRawTransaction(signedLoad, function(err,hash){
    if (!err) {
      // Show that shit
      txData = 'https://etherscan.io/tx/' + hash
      console.log(hash)
      document.getElementById('txData').innerHTML = txData
    }
    else {
      console.log(err)
    }
  });
}
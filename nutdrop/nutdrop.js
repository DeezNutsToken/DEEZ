/* deeskeys.js
// Sender Wallet Data
const publicKey = '0x...'
const privateKey = '0...'
*/
const eth = new window.Eth(new window.Eth.HttpProvider('https://api.myetherapi.com/eth'));
const deezABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
const deez = eth.contract(deezABI).at('0x075c60ee2cd308ff47873b38bd9a0fa5853382c4');
// Define default transaction values
let gasCost = 1000000000 // in wei
let gasLimit = 7000000

window.addEventListener('load', function() {
  // Get recipientAddress
  let sendButton = document.getElementById('send')
  sendButton.addEventListener('click', function(){
    let recipientAddress = document.getElementById('recipientAddress').value
    if (recipientAddress) {
      sendDeezTo(recipientAddress)
    }
  });
})
// Add listeners to button
function sendDeezTo (recipient) {
    if (recipient) {
      let amountOfDeez = document.getElementById('amountOfDeez').value
      eth.getTransactionCount(publicKey.toLowerCase()).then((nonce) => {
          eth.sendRawTransaction(window.ethSigner.sign([{
            to: '0x075c60ee2cd308ff47873b38bd9a0fa5853382c4',
            value: '0x00',
            gasLimit: new window.Eth.BN(gasLimit),
            gasPrice: new window.Eth.BN(gasCost),
            nonce: nonce,
            data: deez.Transfer(recipient, amountOfDeez, {from: publicKey.toLowerCase()})
          }], window.Eth.keccak256(privateKey))).then((txHash) => {
            console.log('Transaction Hash', txHash);
            let txData = 'https://etherscan.io/tx/' + txHash
            console.log(txData)
            document.getElementById('txData').innerHTML = txData
          });
        });
      }
      else {
        console.log('Missing Recipient')
      }
  }
   

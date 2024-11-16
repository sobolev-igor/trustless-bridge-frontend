import Web3 from 'web3';

import {setGoalChainId, setProof, setStatus} from "./store";
import {DESTINATION_BRIDGE_ADDRESS, DESTINATION_NETWORK_ID, SOURCE_BRIDGE_ADDRESS} from "../common";
import sourceBridge from '../../static/assets/json/abi/SourceBridge.json';
import destinationBridge from '../../static/assets/json/abi/DestinationBridge.json';

export function toWei(amount) {
  let f = parseFloat(amount?amount:0)
  f *= 1000000000000000000
  return parseInt(f).toString();
}

export function fromWei(amount) {
  let f = parseFloat(amount)
  f /= 1000000000000000000
  return f.toString();
}

export function add(a, b) {
  return Web3.utils.toBN(a).add(Web3.utils.toBN(b)).toString();
}

export function sub(a, b) {
  return Web3.utils.toBN(a).sub(Web3.utils.toBN(b)).toString();
}

export function getDisplayValue(amount) {
  return Web3.utils.fromWei(amount || 0, 'ether');
}

export function greaterThan(a, b) {
  return Web3.utils.toBN(a).gte(Web3.utils.toBN(b));
}

export function getProofFromReceipt(web3Instance, receipt) {
  console.log('getting proof for receipt:', receipt);

  // send post request to get proof
  getProofFromNode(web3Instance, receipt.blockNumber, receipt.events[0].raw.topics[1]);
}

export function sendBridgeTx(
  web3Instance,
  amount,
  account,
  recipient,
  chainId,
  setTxHash,
  receiptCallback = () => null,
  errorCallback = () => null
) {
  const contract = new web3Instance.eth.Contract(
    sourceBridge.abi,
    SOURCE_BRIDGE_ADDRESS,
  );
  contract.methods
    .depositEth(recipient, chainId)
    .send({
      from: account,
      value: amount,
    })
    .on('transactionHash', (hash) => setTxHash(hash))
    .on('receipt', (receipt) => receiptCallback(receipt))
    .on('error', (error) => errorCallback(error));
}

export function sendClaimTx(
  web3Instance,
  amount,
  account,
  recipient,
  chainId,
  proof,
  key,
  value,
  setTxHash,
  receiptCallback = () => null,
  errorCallback = () => null
) {
  const contract = new web3Instance.eth.Contract(
    destinationBridge.abi,
    DESTINATION_BRIDGE_ADDRESS,
  );
  contract.methods
    .claimEth(recipient, amount, 0, proof, key, value)
    .send({
      from: account,
    })
    .on('transactionHash', (hash) => setTxHash(hash))
    .on('receipt', (receipt) => receiptCallback(receipt))
    .on('error', (error) => errorCallback(error));
}

export function getProofFromNode(
  web3Instance,
  blockNumber,
  depositId,
) {
  console.log('getting proof for receipt and storage key');
  console.log('storage key:');
  console.log(Web3.utils.keccak256(depositId + '0000000000000000000000000000000000000000000000000000000000000004'));
  web3Instance.eth.getProof(
    SOURCE_BRIDGE_ADDRESS,
    [Web3.utils.keccak256(depositId + '0000000000000000000000000000000000000000000000000000000000000004')],
    blockNumber,
  ).then((resp) => {
    console.log('StorageProof:', resp);
    setProof(resp);
  }).catch((error) => {
    console.error('Error getting proof:', error);
  });
}

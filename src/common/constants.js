export const DESTINATION_TX_URL = process.env.DESTINATION_TX_URL;
export const SOURCE_TX_URL = process.env.SOURCE_TX_URL;
export const SOURCE_NETWORK_ID = process.env.SOURCE_NETWORK_ID;
export const DESTINATION_NETWORK_ID = process.env.DESTINATION_NETWORK_ID;
export const INFURA_ID = process.env.INFURA_ID;
export const CHAIN_TO_NAME = {
  '11155420': 'OP Sepolia',
  '534351': 'Scroll Sepolia',
  '2227728': 'Scroll Devnet',
}
export const SOURCE_BRIDGE_ADDRESS = '0x520A85f359619fB360c0887385f399a1EF295BB8';
export const DESTINATION_BRIDGE_ADDRESS = '0xb57cC87294c4640F3bC8a8A8Dfd412272F344ac2';
// export const VALIDATION_ERRORS = {
//   WRONG_VALUE: 'Wrong value',
//   NOT_ENOUGH_BALANCE: 'Not enough balance',
// };

export const goToTxSource = (txHash) =>
  window.open(SOURCE_TX_URL + txHash, '_blank');


export const goToTxDestination = (txHash) =>
  window.open(DESTINATION_TX_URL + txHash, '_blank');

export const DESTINATION_TX_URL = process.env.DESTINATION_TX_URL;
export const SOURCE_TX_URL = process.env.SOURCE_TX_URL;
export const SOURCE_NETWORK_ID = process.env.SOURCE_NETWORK_ID;
export const DESTINATION_NETWORK_ID = process.env.DESTINATION_NETWORK_ID;
export const CHAIN_TO_NAME = {
  '11155420': 'OP Sepolia',
  '534351': 'Scroll Sepolia',
  '2227728': 'Scroll Devnet',
}
export const CHAIN_TO_CONFIG = {
  '11155420': [
    {
      chainId: "0xaa37dc",
      chainName: "OP Sepolia",
      rpcUrls: [
        "https://optimism-sepolia.drpc.org"
      ],
      iconUrls: [],
      nativeCurrency: {
        name: "sETH",
        symbol: "sETH",
        decimals: 18
      },
      blockExplorerUrls: [
        "https://optimism-sepolia.blockscout.com"
      ]
    }
  ],
  '2227728': [
    {
      chainId: "0x21fe10",
      chainName: "Scroll Devnet",
      rpcUrls: [
        "https://l1sload-rpc.scroll.io"
      ],
      iconUrls: [],
      nativeCurrency: {
        name: "sETH",
        symbol: "sETH",
        decimals: 18
      },
      blockExplorerUrls: [
        "https://l1sload-blockscout.scroll.io"
      ]
    }
  ],
}


export const SOURCE_BRIDGE_ADDRESS = '0x0933F5d1740f510B7ec970cc2880024d6F3136Fa';
export const DESTINATION_BRIDGE_ADDRESS = '0xb57cC87294c4640F3bC8a8A8Dfd412272F344ac2';
// export const VALIDATION_ERRORS = {
//   WRONG_VALUE: 'Wrong value',
//   NOT_ENOUGH_BALANCE: 'Not enough balance',
// };

export const goToTxSource = (txHash) =>
  window.open(SOURCE_TX_URL + txHash, '_blank');


export const goToTxDestination = (txHash) =>
  window.open(DESTINATION_TX_URL + txHash, '_blank');

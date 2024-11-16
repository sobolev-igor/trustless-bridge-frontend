import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { INFURA_ID } from '../common';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    // options: {
    //   infuraId: INFURA_ID,
    // },
  },
};

export async function configureWeb3Modal() {
  // cacheProvider - optional, providerOptions - required
  const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    providerOptions,
  });

  web3Modal.clearCachedProvider();

  const provider = await web3Modal.connect();

  return {
    provider,
    web3Modal,
  };
}

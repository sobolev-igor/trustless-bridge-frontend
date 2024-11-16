import React from 'react';
import { useStore } from 'effector-react';
import { Button } from './Button';
import { SOURCE_NETWORK_ID } from '../../common';
import { Body0 } from '../Typography';
import {
    chainId$,
    initWeb3Instance,
    web3ModalInstance$,
    provider$,
    currentAccount$, proof$, goalChainId$,
} from '../../services';
import Web3 from "web3";

export const ConnectorButton = ({ children }) => {
  const web3ModalInstance = useStore(web3ModalInstance$);
  const chainId = useStore(chainId$);
  const goalChainId = useStore(goalChainId$);
  const account = useStore(currentAccount$);
  const provider = useStore(provider$);

  async function handleEthereumClick(provider, id) {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils.numberToHex(id) }], // chainId must be in hexadecimal numbers
    });
  }

  return React.useMemo(() => web3ModalInstance === null || account === null ? (
      <Button onClick={initWeb3Instance}>CONNECT WALLET</Button>
    ) : chainId === null || provider === null ? (
      children
    ) : chainId.toString() !== goalChainId.toString() ? (
        provider.isMetaMask ? (
            <Button onClick={() => handleEthereumClick(provider, goalChainId)}>
                SWITCH NETWORK
            </Button>
        ) : (
            <Body0>Please Switch Network!</Body0>
        )
    ) : (
        children
    ),
    [web3ModalInstance, account, chainId, provider, goalChainId, children]
  );
};

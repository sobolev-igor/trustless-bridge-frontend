import React, {useEffect} from 'react';
import { useStore } from 'effector-react';
import { Button } from './Button';
import {
  chainId$,
  provider$,
  currentAccount$,
  goalChainId$,
  setProvider, setAccounts, setChainId,
} from '../../services';
import Web3 from "web3";

export const ConnectorButton = ({ children }) => {
  const chainId = useStore(chainId$);
  const goalChainId = useStore(goalChainId$);
  const account = useStore(currentAccount$);
  const provider = useStore(provider$);

  useEffect(() => {
    const handleProviderAnnouncement = ({ detail }) => {
      if (detail.info.rdns === "io.metamask") {
        setProvider(detail.provider);
      }
    };

    window.addEventListener("eip6963:announceProvider", handleProviderAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleProviderAnnouncement);
    };
  }, []);

  async function handleEthereumClick(provider, id) {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId: Web3.utils.numberToHex(id)}], // chainId must be in hexadecimal numbers
    })
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId: Web3.utils.numberToHex(id)}], // chainId must be in hexadecimal numbers
    });
    setChainId(id);
  }

  const connectWallet = () => {
    provider.request({
      method: "eth_requestAccounts",
    }).then((accounts) => {
      setAccounts(accounts);
    });

    provider.request({
      method: 'eth_chainId',
    }).then((chainId) => {
      setChainId(parseInt(chainId, 16).toString());
    })

    window.dispatchEvent(new Event("eip6963:requestProvider"));
  };

  return React.useMemo(() => {
      return provider === null || account === null || chainId == null ? (
        <Button onClick={connectWallet}>CONNECT WALLET</Button>
      ) : chainId.toString() !== goalChainId.toString() ? (
        <Button onClick={() => handleEthereumClick(provider, goalChainId)}>
          SWITCH NETWORK
        </Button>
      ) : (
        children
      )
    },
    [account, chainId, provider, goalChainId, children]
  );
};

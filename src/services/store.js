import Web3 from 'web3';
import { attach, createDomain, forward, sample } from 'effector';

import { shortenAddress } from '../common';
import {toWei} from "./web3";

// domain of application
export const domain = createDomain('application');
export const reset = domain.event('reset');

// effects to fetch data from application
export const getChainIdFx = domain.effect();
export const getAccountsFx = domain.effect();
export const getBalanceFx = domain.effect();

// stores with data of application
export const accounts$ = domain.store(null).reset(reset);
export const chainId$ = domain.store(null).reset(reset);
export const goalChainId$ = domain.store('11155420').reset(reset);
export const inputValue$ = domain.store('0.001').reset(reset);
export const recipient$ = domain.store('').reset(reset);
export const balance$ = domain.store(null).reset(reset);
export const proof$ = domain.store(null).reset(reset);
export const status$ = domain.store(null).reset(reset);
export const activePage$ = domain
  .store([true, false])
  .reset(reset);

// stores for web3 instances
export const provider$ = domain.store(null);
export const web3ModalInstance$ = domain.store(null);
export const currentAccount$ = accounts$.map((accounts) =>
  accounts !== null && accounts.length > 0 ? accounts[0] : null
);
export const displayAddress$ = currentAccount$.map((account) =>
    account !== null ? shortenAddress(account) : null
);
export const web3Instance$ = provider$.map((provider) =>
  provider !== null ? new Web3(provider) : null
);
export const value$ = inputValue$.map((inputValue) => {
  return isNaN(parseFloat(inputValue)) ? '0' : toWei(parseFloat(inputValue).toString())
});

// events
export const getWeb3Data = domain.event('getWeb3Data');
export const setAccounts = domain.event('setAccounts');
export const setProvider = domain.event('setProvider');
export const setChainId = domain.event('setChainId');
export const setGoalChainId = domain.event('setGoalChainId');
export const setProof = domain.event('setProof');
export const setStatus = domain.event('setStatus');
export const setInputValue = domain.event('setInputValue');
export const setRecipient = domain.event('setRecipient');
export const setBalance = domain.event('setBalance');
export const setValue = domain.event('setValue');
export const setActivePage = domain.event('setActivePage');

getChainIdFx.use(async (web3Instance) => {
  console.log('web3Instance', web3Instance)
  if (web3Instance !== null) {
    return await web3Instance.eth.getChainId();
  }

  return null;
});
getAccountsFx.use(async (web3Instance) => {
  if (web3Instance !== null) {
    return await web3Instance.eth.getAccounts();
  }

  return null;
});
getBalanceFx.use(async ({ web3Instance, account }) => {
  if (web3Instance !== null && account !== null) {
    return await web3Instance.eth.getBalance(account);
  }

  return null;
});

provider$
  .on(setProvider, (_, payload) => payload);
chainId$
  .on(getChainIdFx.done, (_, { result }) => result)
  .on(setChainId, (_, chainId) => chainId);
goalChainId$
  .on(setGoalChainId, (_, payload) => payload);
accounts$
  .on(getAccountsFx.done, (_, { result }) => result)
  .on(setAccounts, (_, accounts) => accounts);
balance$
  .on(getBalanceFx.done, (_, { result }) => result)
  .on(setBalance, (_, payload) => payload);
activePage$
  .on(setActivePage, (_, payload) => payload);
recipient$
  .on(setRecipient, (_, payload) => payload);
inputValue$
  .on(setInputValue, (_, payload) => payload);
proof$
  .on(setProof, (_, payload) => payload);
status$
  .on(setStatus, (_, payload) => payload);
value$
  .on(setValue, (_, payload) => payload);

const getChainIdConnectedFx = attach({
  effect: getChainIdFx,
  source: provider$,
  mapParams: (_, provider) => provider,
});

const getAccountsConnectedFx = attach({
  effect: getAccountsFx,
  source: provider$,
  mapParams: (_, provider) => provider,
});

const getBalanceConnectedFx = attach({
  effect: getBalanceFx,
  source: web3Instance$,
  mapParams: (account, web3Instance) => ({ web3Instance, account }),
});

forward({
  from: currentAccount$,
  to: [getBalanceConnectedFx],
});

forward({
  from: proof$,
  to: [getBalanceConnectedFx],
});
sample({
  clock: chainId$,
  source: currentAccount$,
  target: getBalanceConnectedFx,
});

forward({
  from: getWeb3Data,
  to: [getChainIdConnectedFx, getAccountsConnectedFx],
});

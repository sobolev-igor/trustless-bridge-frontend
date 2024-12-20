import React, { useState } from 'react';
import { useStore } from 'effector-react';

import { Button } from '../../components/Button';
import {
  DESTINATION_NETWORK_ID,
  numberWithCommas,
  SOURCE_NETWORK_ID,
  CHAIN_TO_NAME,
  shortenAddress,
  goToTxDestination,
  goToTxSource,
} from '../../common';
import {
  currentAccount$,
  web3Instance$,
  greaterThan,
  sendBridgeTx,
  sendClaimTx,
  setActivePage,
  balance$,
  setBalance,
  value$,
  add,
  sub,
  getProofFromReceipt,
  proof$,
  setGoalChainId,
  goalChainId$,
  chainId$,
  setRecipient,
  recipient$,
  inputValue$,
  setInputValue, status$, setStatus, provider$, setValue,
} from '../../services';
import { BlackBlock, FormContainer } from '../../components/App';
import { getDisplayValue } from '../../services';
import { theme } from '../../components/App/theme';
import {Body0, Heading3, Heading3Green} from '../../components/Typography';
import {
  Container,
  FrameContainer,
  HorizontalFlex,
} from './styled';
import { ConnectorButton } from '../../components/Button/ConnectorButton';
import {Input} from "../../components/Input";
import {TotalContainer} from "../../components/Input/styled";

export const Bridge = () => {
  React.useEffect(() => {
    setActivePage([false, true]);
  }, []);

  const web3Instance = useStore(web3Instance$);
  const account = useStore(currentAccount$);
  const provider = useStore(provider$);

  const balance = useStore(balance$);
  const proof = useStore(proof$);
  const status = useStore(status$);
  const value = useStore(value$);
  const inputValue = useStore(inputValue$);
  const recipient = useStore(recipient$);
  const chainId = useStore(chainId$);
  const goalChainId = useStore(goalChainId$);

  const [txHashBridge, setTxHashBridge] = useState(null);
  const [txHashClaim, setTxHashClaim] = useState(null);

  const handleBridgeClick = React.useCallback(() => {
    sendBridgeTx(
      web3Instance,
      value,
      account,
      recipient || account,
      DESTINATION_NETWORK_ID,
      setTxHashBridge,
      (receipt) => {
        console.log('Tx Mined', receipt)
        setBalance(sub(balance, value));
        getProofFromReceipt(web3Instance, receipt, value, setValue);
      },
      (error) => {
        console.log(error);
        setTxHashBridge(null);
      }
    );
  }, [
    web3Instance,
    account,
    balance,
    recipient,
    setTxHashBridge,
    value,
    goalChainId,
  ]);

  const handleClaimClick = React.useCallback(() => {
    sendClaimTx(
      web3Instance,
      value,
      account,
      recipient || account,
      SOURCE_NETWORK_ID,
      '0xf9069af90211a002645a346bd8e10ed5b722bb33d1ccd74f1d197f94980e2f0313177b79fd1fcfa08d181105eed18d8f0a30a61acac82de69ea43c9497b67e7639c831824c3cc8a1a0628fe87da540845c04ff725ba1190c7e05687565bd4dc33e8fbb035070d9ecdda05f4ae11cd06e8b321c1cef2447f79a9d35d73cb965c4eb473b4d1d68261d26a0a095f97da3a582df69b5ab2850ac16ac77644202f09fe6843c1ade6957d6d7923da0eff8188960e877b4091ea43bbba53a683dc78edd9519c1e04c3d23355b1776e6a00d92241473bffa72c4a45490bc887db0995328ecc3c5519bc179d3ed13a6aabba0636e6a6f90170e9da8aef04a0fa45b1c4ac5087e1b1c42b1b4f4c977627d7298a088a3620c24ebd685d6d735e80f50c8e36b65268f7c4670a9ea30c433dd7e8536a001f2f92410c5d6425497e310448654384b26ea950ce23b357268f98c27ada0c0a0c17bee2a4b9be4f564a8f2c6e3edd3875ecd8d4573b2e61ae53c3d5034ac0b04a0091924c9fb5b5e4ed48804f54215b7f86a6a3b79589e5cd39532aa93a0558b44a05860820cc2f15bc7b4255efde0fd9a8f0349319340e38435d7c2578945e61056a04952d278e7205a852bd0cb6293ef70c578532d6c90b51b70d9a2aacda69d8f2da0a4dd75b91c1eb33cbf5b87dea6ffba40530377be2023c79bf5193f5b5184d261a0e199c94992c43999ada75360b0af5238a000d74b643ada065b36cb42516f85d180f90211a0774bf4e17341d3572960fdaca4e3cc99fc8951ee9d4f575f5ff5229b06a26f25a0111ba3fb3012e30a7e7ab5a3dcfd31d8f2da8e30261cacf6d6df320bbe31a1f0a04a391ac1758c30d3aff584289b2ae18d6cd84ca24c6fdbde1d6080cafe831f00a05de29bbadcd6dabbeb5259b16c8718c248176033f603f5b7c310df7302a2b71da0c670a625808d2b1de10c69028d9ad09d63c4599758f2da8a38d421bd49a88fb3a0dad3dbe851f410be44c0a2545dde497fbfc356bb0521eb19d8bfad6a4dcf795ea006f93cbcc09a05d7854a5ee7db0c99084b7a7d5c9769495d95d6269decfbadbea027cc5bc77dd26791ec416c32672c88ab787c2e23e8f4fa836e68bb2caf774ab3a0887e00867b289727f36693c249f0e747cf7d35df3d038ecb8691f4d96b09d075a0fc8715eecf3fb192d9405569a148c13ba34011e49d6131f2a1b8c75a287c18fea0d41d54290db65f975a155ae7c727f6104dd4f00a8e3dcb7c817200546484dafca0d24c4da4dbb910a951ec03a205aa79366efc73e8d203f2018305adfaf5b34417a0fd7fc75d1b8e9c143657f5291d7151569b435de52daa90174e3f5cee237e4ce3a0ee69fab5d886451b185cedc2b581c1b95b14103a7d24e14ed9e080bc460e6534a08c3c180b69d199006b715975241c869e822086995c16fdb4e0e0ae743094e825a02aefdfb60ea61089de23b0728f1a2b086543b27a5492a08add4ed9fb6fc9d1d680f901b1a0011980a6b6e041b58c8096c8a1f53e60cb645545b5765ad8714a77a00593bb15a09a500daeb2d86ccad7c4182cce7c4491ee18791e80f87e4c9c497b8bbddace79a0fad86e12002062120a9f039a9e1ec91a23508bac0eb10b143263b3cc08386933a01b4db9d5ffd747d8456ca63baba4d40743184f017e2930ece795a189d6f81d3f80a022daeb8ebd7c5156135689b0a4eafa4c9be8752d44771a77814aec4750a3d1afa00ac2b5c66db72143508518688e8ca9a96fe419c6495248fa1a81cc17ed0c0dcfa078d343df68497e7862e3862fbd021f291bec277f2cb8cb629871b677a21bac2ba0fde12386f6dc4ab6aae7616dcd3500fa90d6292e72bc192568f579c7494c6837a07da634f5f1e6df810d36836a91d51a88b006bcdc465d14a24b3a882d4dbf5d4aa03ac781c0a9afe37b14dbd4726bde3d86c8fea9782eeb9a1554fc3032e308561ba0f52c12ebe0b138ff6b41b428023a37560abeb2151a53381153b1263b291b942180a03f7020013076456729f60ffad825c6892c91bc632026ffc555fe393f1e093dc7a08821b54953c9b5d4b48592f397914dbec80997769e7dc49d9124ba0d44b912468080f89180a04d6f40d9021f68015528aa07e09cefcbc86646dfd84276657cde4688f5e414d880808080a04f3fcd7434fd6eb950c50a46a8a72a4d18764e9f7b6c49e70167a4caccb8a165a0be6ff8748fba6864b76a4ee196829eefa0b3207d6dbc9368ea66760f9455dbfd808080808080a04dbaa0c3028a10cce556b09a1961d1b205e0ccff0153d9ee963c0184cec38fea8080ea9f209233999db5852c0b7fc53629d08aaf78adc35d900e39158cf44f1bf820e7898851e89bcdb8c97b8e',
      '0x5f0e9233999db5852c0b7fc53629d08aaf78adc35d900e39158cf44f1bf820e7',
      '0x8851e89bcdb8c97b8e0000000000000000000000000000000000000000000000',
      setTxHashClaim,
      (receipt) => {
        console.log('Tx Mined', receipt);
        if (recipient === '') {
          setBalance(add(balance, value));
        }
        // setTxHashClaim(hash);
      },
      (error) => {
        console.log(error);
        setTxHashClaim(null);
      }
    );
  }, [
    web3Instance,
    account,
    balance,
    recipient,
    setTxHashClaim,
    value,
    goalChainId,
  ]);

  const handleGenerateClick = React.useCallback(() => {
    setStatus('generated');
    setGoalChainId(DESTINATION_NETWORK_ID);
  }, [
    setStatus,
    setGoalChainId,
  ]);

  const handleReturnClick = React.useCallback(() => {
    setStatus('');
    setGoalChainId(SOURCE_NETWORK_ID);
  }, [
    web3Instance,
    account,
    balance,
    goalChainId,
  ]);

  const bridgeButton = React.useMemo(() => {
    return txHashBridge === null ? (
      <Button
        disabled={greaterThan(value ? value : '0', balance ? balance : '0')}
        onClick={handleBridgeClick}>
        BRIDGE
      </Button>
    ) : (
      <Button onClick={() => {
        setStatus('bridged');
        goToTxSource(txHashBridge);
        setTxHashBridge(null);
      }}>
        SEE TX ON BLOCKSCOUT
      </Button>
    );
  }, [
    txHashBridge,
    handleBridgeClick,
    balance,
    value,
    goalChainId,
  ]);

  const generateButton = React.useMemo(() => {
    return (
      <Button
         disabled={proof===null} onClick={handleGenerateClick}>
        {proof===null ? 'Retrieving proof...' : 'Go to claim!'}
      </Button>
    )
  }, [
    setGoalChainId,
    proof,
  ]);

  const claimButton = React.useMemo(() => {
    return balance === '0' ? (
      <Button onClick={() => {
        window.open('https://t.me/+PDnffcaqW-5mNDYy', '_blank');
      }}>
        GO TO FAUCET
      </Button>
    ) : txHashClaim === null ? (
      <Button
        onClick={handleClaimClick}>
        CLAIM
      </Button>
    ) : (
      <Button onClick={() => {
        setStatus('claimed');
        goToTxDestination(txHashClaim);
        setTxHashClaim(null);
      }}>
        SEE TX ON BLOCKSCOUT
      </Button>
    );
  }, [
    txHashClaim,
    handleClaimClick,
    setTxHashClaim,
    balance,
  ]);

  const returnButton = React.useMemo(() => {
    return (
      <Button
        onClick={handleReturnClick}>
        RETURN TO BRIDGE
      </Button>
    );
  }, [
    handleReturnClick,
  ]);

  const renderBridge = React.useMemo(() => {
    if (balance === null) {
      return <></>
    }

    switch(status) {
      case 'generated':
        return (
            <Container>
              <FrameContainer>
                <Body0>
                  Destination chain: {CHAIN_TO_NAME[chainId]}
                </Body0>
                <Heading3 style={{ marginTop: '10px', marginBottom: '20px' }}>
                  {numberWithCommas(
                    parseFloat(getDisplayValue(balance)).toFixed(5)
                  )}
                  {' '}
                  ETH
                </Heading3>
                {
                  txHashClaim === null ? (
                    <>
                      <Body0>
                        Available to claim
                      </Body0>
                      <Heading3Green style={{ marginTop: '10px', marginBottom: '20px', }}>
                        {'+'}{numberWithCommas(
                        parseFloat(getDisplayValue(value)).toFixed(5)
                      )}
                        {' '}
                        ETH
                      </Heading3Green>
                    </>
                  ) : (<></>)
                }
                {claimButton}
              </FrameContainer>
            </Container>
        );
      case 'claimed':
        return (
            <Container>
              <FrameContainer>
                <Body0>
                  Destination chain: {CHAIN_TO_NAME[chainId]}
                </Body0>
                <Heading3 style={{ marginTop: '10px', marginBottom: '20px' }}>
                  {numberWithCommas(
                      parseFloat(getDisplayValue(balance)).toFixed(5)
                  )}
                  {' '}
                  ETH
                </Heading3>
                {returnButton}
              </FrameContainer>
            </Container>
        );
      case 'bridged':
        return (
            <Container>
              <FrameContainer>
                <Body0>
                  Source chain: {CHAIN_TO_NAME[chainId]}
                </Body0>
                <Heading3 style={{ marginTop: '10px', marginBottom: '20px' }}>
                  {numberWithCommas(
                    parseFloat(getDisplayValue(balance)).toFixed(5)
                  )}
                  {' '}
                  ETH
                </Heading3>
                {generateButton}
              </FrameContainer>
            </Container>
        );
      default:
        // This is the case before the bridge transaction is initiated
        switch (balance) {
          case '':
            return <></>;
          case '0':
            return (
                <Container>
                  <FrameContainer>
                    <Body0>
                      Nothing to bridge
                    </Body0>
                    <Heading3
                        style={{ marginTop: '10px', marginBottom: '20px' }}
                        color={theme.colors.gray}>
                      0 ETH
                    </Heading3>
                    <Button onClick={() => {
                      window.open('https://faucet.quicknode.com/optimism/sepolia', '_blank');
                    }}>
                      GO TO FAUCET
                    </Button>
                  </FrameContainer>
                </Container>
            );
          default:
            return (
                <Container>
                  <FrameContainer>
                    <Body0>
                      Source chain: {CHAIN_TO_NAME[chainId]}
                    </Body0>
                    <Heading3 style={{ marginTop: '10px', marginBottom: '20px' }}>
                      {numberWithCommas(
                          parseFloat(getDisplayValue(balance)).toFixed(5)
                      )}
                      {' '}
                      ETH
                    </Heading3>
                    <>
                      {
                        txHashBridge == null ? (
                          <>
                            <TotalContainer>
                              <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value.replace(',', '.'))}
                                label={'Enter bridge amount'}
                                // border={mintError === '' ? null : false}
                              />
                            </TotalContainer>
                            <TotalContainer>
                              <Input
                                value={shortenAddress(recipient)}
                                onChange={(e) => setRecipient(e.target.value)}
                                label={'Insert recipient address'}
                                // border={mintError === '' ? null : false}
                              />
                            </TotalContainer>
                          </>
                        ) : (
                          <></>
                        )
                      }
                    </>
                    {bridgeButton}
                  </FrameContainer>
                </Container>
            );
        }
    }
  }, [
    balance,
    bridgeButton,
    claimButton,
    returnButton,
    status,
    goalChainId,
    value,
    txHashBridge,
    chainId,
    inputValue,
    recipient,
    proof,
  ]);

  return React.useMemo(
    () => (
      <>
        {/*<GradientLine color={theme.gradientColors.green}>*/}
        {/*  <InLineHeading>BRIDGE</InLineHeading>*/}
        {/*</GradientLine>*/}
        <BlackBlock>
          <FormContainer>
            <ConnectorButton>
              <HorizontalFlex>
                {renderBridge}
              </HorizontalFlex>
            </ConnectorButton>
          </FormContainer>
        </BlackBlock>
      </>
    ),
    [
      balance,
      bridgeButton,
      claimButton,
      returnButton,
      status,
      goalChainId,
      value,
      txHashBridge,
      chainId,
      inputValue,
      recipient,
      proof,
    ],
  );
};

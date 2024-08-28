import React, { useCallback, useEffect, useState } from 'react';
import styles from './WalletList.module.scss';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import {
  ConnectWallet,
  useConnectionStatus,
  useWallet,
} from '@thirdweb-dev/react';
import Skeleton from '@/features/console/common/Skeleton';

interface WalletProps {
  title?: React.ReactNode;
}

export const copyClipboard = (target?: string) => {
  if (target) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(target)
        .then(() => {
          alert('클립보드에 복사되었습니다.');
        })
        .catch((err) => {
          console.error('클립보드 복사 실패:', err);
        });
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = target;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('클립보드에 복사되었습니다.');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        alert('클립보드 복사에 실패했습니다.');
      }
    }
  }
};

const WalletList = observer(({ title }: WalletProps) => {
  useUserInfo({ needLogin: true });
  const router = useRouter();
  const { baseUrl, currentMenu } = useBaseUrl();
  const { createNFTStore: store, commonStore } = useStore();
  const walletInstance = useWallet();
  const connectionStatus = useConnectionStatus();
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    const listener = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ethereum = window.ethereum;
      if (ethereum) {
        setHasProvider(true);
      }
    };
    window.addEventListener('focus', listener);
    return () => window.removeEventListener('focus', listener);
  }, []);

  useEffect(() => {
    if (router.isReady && router.query.appId) {
      store.getConsoleWallet(Number(router.query.appId)).then();
    }
  }, [commonStore.currentChainId, router.query.appId]);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      getConnectedWalletInfo().then();
    }
    // if (
    //   !commonStore.externalWallet.address &&
    //   connectionStatus === 'disconnected'
    // ) {
    //   commonStore.disConnectExternalWallet();
    // }
  }, [connectionStatus]);

  const getConnectedWalletInfo = useCallback(async () => {
    if (walletInstance) {
      const [walletAddress, currencyObject] = await Promise.all([
        walletInstance.getAddress(),
        walletInstance.getBalance(
          store.rootStore?.commonStore.currentChainId === 97
            ? process.env.NEXT_PUBLIC_PMG_CONTRACT_ADDRESS_TESTNET!
            : process.env.NEXT_PUBLIC_PMG_CONTRACT_ADDRESS_MAINNET
        ),
      ]);
      commonStore.setExternalWallet(walletAddress, currencyObject.displayValue);
    }
  }, [walletInstance]);

  return (
    <>
      {title && title}
      <div className={`walletWrap ${styles.walletWrap}`}>
        <div className="pocketWrap console">
          <div className="card">
            <div className="cardTop">
              <strong className="cardName">{'Console wallet'}</strong>
              <i className="cardIcon" />
            </div>
            {(currentMenu === 'dashboard' || currentMenu === 'wallet') && (
              <button
                onClick={() =>
                  router.push(
                    `${baseUrl}/wallet/console?walletAddress=${store.wallet?.address}`
                  )
                }
                className="cardButton"
              >
                View detail <i className="icon rarr" />
              </button>
            )}
            {currentMenu === 'nft' && (
              <button
                className="cardButton"
                onClick={() =>
                  store.wallet &&
                  store.setSelectedWallet(
                    store.wallet.address,
                    'console',
                    store.wallet.PMG_balance
                  )
                }
              >
                Select
              </button>
            )}
          </div>
          <div className="pocket">
            <div className="walletInfo">
              <div className="tags">
                {store.wallet && store.wallet.tokenCount > 0 && (
                  <span className="tag tokens">
                    {store.wallet.tokenCount} tokens
                  </span>
                )}
                {store.wallet && store.wallet.autoSignYn === 'Y' && (
                  <span className="tag autoSign">Auto sign</span>
                )}
              </div>
              <dl className="address">
                <dt>Wallet address</dt>
                {store.wallet?.address ? (
                  <dd>
                    <>
                      {store.wallet.address}
                      <button
                        className="btnCopy"
                        onClick={() =>
                          store.wallet && copyClipboard(store.wallet.address)
                        }
                      />
                    </>
                  </dd>
                ) : (
                  <dd>
                    <Skeleton style={{ width: 350 }} />
                    <Skeleton style={{ width: 20, marginLeft: 'auto' }} />
                  </dd>
                )}
              </dl>
            </div>
          </div>
        </div>
        <div
          className={`pocketWrap external${
            commonStore.externalWallet.address ? ' metamask' : ''
          }`}
        >
          <div className="card">
            <div className="cardTop">
              <strong className="cardName">
                {commonStore.externalWallet.address
                  ? 'MetaMask'
                  : 'External wallet'}
              </strong>
              <i
                className="cardIcon"
                style={
                  commonStore.externalWallet.address
                    ? {
                        background: `url(/assets/images/icons/metamask.svg) no-repeat center center / cover`,
                      }
                    : {}
                }
              />
            </div>

            {walletInstance && commonStore.externalWallet.address ? (
              <>
                {(currentMenu === 'dashboard' || currentMenu === 'wallet') && (
                  <button
                    onClick={() => {
                      walletInstance && walletInstance.disconnect();
                      commonStore.initExternalWallet();
                    }}
                    className="cardButton"
                  >
                    Disconnect wallet
                  </button>
                )}
                {currentMenu === 'nft' && (
                  <button
                    className="cardButton"
                    onClick={() =>
                      commonStore.externalWallet.address &&
                      store.setSelectedWallet(
                        commonStore.externalWallet.address,
                        'external',
                        commonStore.externalWallet.balance
                      )
                    }
                  >
                    Select
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="cardButton">
                  <i className="icon info" />
                  You can connect an external wallet
                </p>
              </>
            )}
          </div>
          <div className="pocket">
            <div className="walletInfo">
              {commonStore.externalWallet.address ? (
                <dl className="address">
                  <dt>Wallet address</dt>
                  <dd>
                    <>
                      {commonStore.externalWallet.address}
                      <button
                        className="btnCopy"
                        onClick={() =>
                          copyClipboard(commonStore.externalWallet.address)
                        }
                      />
                    </>
                  </dd>
                </dl>
              ) : (
                <>
                  {hasProvider ? (
                    <ConnectWallet
                      className={'connect'}
                      detailsBtn={() => (
                        <button className="connect">Connect wallet</button>
                      )}
                    />
                  ) : (
                    <button
                      className="connect"
                      onClick={() =>
                        window.open(
                          `https://metamask.io/download.html`,
                          '_blank'
                        )
                      }
                    >
                      Connect wallet
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default WalletList;

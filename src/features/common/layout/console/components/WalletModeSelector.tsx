import React, { useEffect, useState } from 'react';
import WalletModeWalletItem from './WalletModeWalletItem';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import ModeSelector from './ModeSelector';
import WalletModeSelected from './WalletModeSelected';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';

interface WalletModeSelectorProps {
  style?: React.CSSProperties;
  className?: string;
}

const WalletModeSelector = observer(
  ({ style, className }: WalletModeSelectorProps) => {
    const { commonStore } = useStore();
    const router = useRouter();
    const { baseUrl } = useBaseUrl();
    const [hasProvider, setHasProvider] = useState(false);

    const [showOption, setShowOption] = useState(false);

    const connectionStatus = useConnectionStatus();

    useEffect(() => {
      const listener = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ethereum = window.ethereum;
        if (ethereum) {
          setHasProvider(true);
        }
      };
      listener();
    }, [showOption, router.isReady]);

    return (
      <ModeSelector
        selectedValue={<WalletModeSelected />}
        optionContent={
          <div className="walletListWrap">
            <div className="walletList">
              <WalletModeWalletItem
                wallet={commonStore.consoleWallet}
                onClick={() => {
                  commonStore.setCurrentWallet('console');
                  if (router.query.walletId) {
                    router
                      .push(
                        `${baseUrl}/wallet/${commonStore.currentWallet}`,
                        undefined,
                        { shallow: true }
                      )
                      .then();
                  }
                }}
                className={`${
                  commonStore.currentWallet === 'console' ? 'selected' : ''
                }`}
              />
              {commonStore.externalWallet.address.length > 0 && (
                <>
                  <WalletModeWalletItem
                    wallet={commonStore.externalWallet}
                    onClick={() => {
                      if (commonStore.currentWallet !== 'metamask') {
                        commonStore.setCurrentWallet('metamask');
                        if (router.query.walletId) {
                          router
                            .push(
                              `${baseUrl}/wallet/${commonStore.currentWallet}`,
                              undefined,
                              { shallow: true }
                            )
                            .then();
                        }
                      } else {
                        const target = document.querySelectorAll(
                          '.tw-connected-wallet'
                        )[0] as HTMLButtonElement;
                        target?.click();
                      }
                    }}
                    className={`${
                      commonStore.externalWallet.address.length > 0
                        ? 'metamask'
                        : ''
                    } ${
                      commonStore.currentWallet !== 'console' ? 'selected' : ''
                    }`}
                    loading={connectionStatus === 'connecting'}
                  />
                </>
              )}
              {commonStore.externalWallet.address.length < 1 && (
                <>
                  {hasProvider ? (
                    <>
                      <WalletModeWalletItem
                        onClick={() => {
                          const target = document.querySelectorAll(
                            '.tw-connect-wallet'
                          )[0] as HTMLButtonElement;
                          target?.click();
                        }}
                        className="external"
                        connectIcon
                      />
                    </>
                  ) : (
                    <WalletModeWalletItem
                      onClick={() =>
                        window.open(
                          `https://metamask.io/download.html`,
                          '_blank'
                        )
                      }
                    />
                  )}
                </>
              )}
              <ConnectWallet
                style={{
                  width: 0,
                  height: 0,
                  padding: 0,
                  margin: 0,
                  visibility: 'hidden',
                  overflow: 'hidden',
                }}
              />
            </div>
            <button
              onClick={() => router.push(`${baseUrl}/wallet`)}
              className="goToWalletList"
            >
              Go to Wallet list
            </button>
          </div>
        }
        className={`walletSelector${className ? ` ${className}` : ''}`}
        style={{ boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)', ...style }}
        arrow={false}
        optionState={(e) => setShowOption(e)}
      />
    );
  }
);

export default WalletModeSelector;

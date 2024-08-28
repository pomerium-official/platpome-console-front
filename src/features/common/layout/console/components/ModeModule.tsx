import React, { useCallback, useEffect, useState } from 'react';
import styles from './ModeModule.module.scss';
import ModeSelector from './ModeSelector';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import {
  metamaskWallet,
  useChainId,
  useConnect,
  useConnectionStatus,
  useWallet,
} from '@thirdweb-dev/react';
import { useAccountCahngeObserver } from '@/libs/hooks/useAccountChangeObserver';
import WalletModeSelector from './WalletModeSelector';

export interface ChainOptionType {
  symbolImageUrl: string;
  name: string;
  net: string;
  chainId: number;
}

export interface WalletType {
  PMG_balance?: string;
  address?: string;
  appId?: number;
  autoSignYn?: string;
  createdAt?: string;
  createdId?: number;
  memberAccessYn?: string;
  tokenCount?: number;
  walletId?: string;
  balance?: string;
}

const chainOptions: ChainOptionType[] = [
  {
    symbolImageUrl: '/assets/images/symbols/symbol-bnb.svg',
    name: 'BNB Smart Chain',
    net: 'Mainnet',
    chainId: 56,
  },
  {
    symbolImageUrl: '/assets/images/symbols/symbol-bnb.svg',
    name: 'BNB Smart Chain',
    net: 'testnet',
    chainId: 97,
  },
];

const renderChainItem = (option: ChainOptionType) => {
  return (
    <div className={`chainItem`}>
      <i
        className="symbolIcon"
        style={{
          background: `${option.net === 'Mainnet' ? '#f0b90b' : '#c0c0c0'}`,
          WebkitMask: `url("${option.symbolImageUrl}") no-repeat center / contain`,
        }}
      />
      <div className="chainName">{option.name}</div>
      <div className="network">{option.net}</div>
    </div>
  );
};

const ModeModule = observer(() => {
  const {
    commonStore,
    createNFTStore: nftStore,
    consoleLayoutStore: layoutStore,
  } = useStore();
  const router = useRouter();
  const [isTestnet, setIsTestnet] = useState(false);

  useEffect(() => {
    setIsTestnet(commonStore.currentChainId === 97);
  }, [commonStore.currentChainId]);

  useEffect(() => {
    if (router.query.appId) {
      nftStore.getConsoleWallet(Number(router.query.appId)).then();
    }
  }, [nftStore, router.query]);

  // wallet actions
  const chainId = useChainId();

  const connect = useConnect();
  const connectionStatus = useConnectionStatus();
  const metamaskConfig = metamaskWallet();
  const walletInstance = useWallet();
  const accountChangeObserver = useAccountCahngeObserver();

  useEffect(() => {
    if (chainId) {
      const chainOption = findChain(chainId);
      if (chainOption) {
        commonStore.setNetwork(chainId);
      } else {
        alert('지원하지 않는 네트워크 입니다.');
      }
    }
  }, [chainId]);

  const findChain = useCallback((chainId: number) => {
    return chainOptions.find(
      (supportChainId) => chainId === supportChainId.chainId
    );
  }, []);

  const onChainChange = useCallback(async (chainId: number) => {
    await handleChangeNetwork(chainId);
  }, []);

  const handleChangeNetwork = useCallback(
    async (chainId: number) => {
      if (commonStore.externalWallet.address.length > 1) {
        await connect(metamaskConfig, { chainId });
        commonStore.setNetwork(chainId);
      }
    },
    [connectionStatus]
  );

  useEffect(() => {
    getConnectedWalletInfo().then();
  }, [connectionStatus, accountChangeObserver]);

  const getConnectedWalletInfo = async () => {
    if (walletInstance) {
      const walletAddress = await walletInstance.getAddress();
      let balance;
      if (chainId === commonStore.currentChainId) {
        balance = await walletInstance.getBalance(
          commonStore.currentChainId === 97
            ? process.env.NEXT_PUBLIC_PMG_CONTRACT_ADDRESS_TESTNET!
            : process.env.NEXT_PUBLIC_PMG_CONTRACT_ADDRESS_MAINNET
        );
      }
      commonStore.setExternalWallet(
        walletAddress,
        balance?.displayValue ?? '0.0'
      );
    }
  };

  useEffect(() => {
    commonStore.setShowLoading(
      !!commonStore.currentChainId &&
        !!chainId &&
        commonStore.currentChainId !== chainId
    );
  }, [commonStore.currentChainId, chainId]);

  return (
    <div
      className={`${styles.modeModule} modeModule${
        isTestnet ? ' testnet' : ''
      }${layoutStore.asideCollapse ? ' collapse' : ''}`}
    >
      <ModeSelector
        selectedValue={renderChainItem(
          chainOptions.find((f) => f.chainId === commonStore.currentChainId)!
        )}
        optionContent={
          <div className={`chainOptions`}>
            {chainOptions.map((v) => {
              return (
                <button
                  onClick={() => {
                    commonStore.setNetwork(v.chainId);
                    onChainChange(v.chainId).then();
                  }}
                  key={v.chainId}
                  className={
                    v.chainId === commonStore.currentChainId
                      ? 'selected'
                      : undefined
                  }
                >
                  {renderChainItem(v)}
                </button>
              );
            })}
          </div>
        }
        className="chainSelector"
      />
      <dl className="walletModule">
        <dt>Current wallet</dt>
        <dd>
          <WalletModeSelector />
        </dd>
      </dl>
    </div>
  );
});

export default ModeModule;

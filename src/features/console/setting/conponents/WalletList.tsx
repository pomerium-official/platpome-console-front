import React from 'react';
import styles from './WalletList.module.scss';
import WalletCard from './WalletCard';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { ConnectWallet } from '@thirdweb-dev/react';

const WalletList = observer(() => {
  const { commonStore } = useStore();

  return (
    <div className={`${styles.walletList} walletList`}>
      <WalletCard walletId="console" />
      {commonStore.externalWallet.address.length > 0 && (
        <WalletCard walletId="metamask" />
      )}
      <WalletCard
        walletId="connect"
        onClick={() => {
          const target = document.querySelector(
            '.tw-connect-wallet'
          ) as HTMLButtonElement;
          target?.click();
        }}
      />

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
  );
});

export default WalletList;

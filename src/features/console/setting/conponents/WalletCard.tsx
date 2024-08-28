import React from 'react';
import styles from './WalletCard.module.scss';
import WalletConnectIcon from '@/features/common/layout/console/components/WalletConnectIcon';
import AddressCopySet from '../../nft/components/nft-list/burn/AddressCopySet';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import DotsDropdown from './DotsDropdown';

interface WalletCardProps {
  walletId?: string;
  onClick?: () => void;
}

const WalletCard = observer(
  ({ walletId = 'connect', onClick }: WalletCardProps) => {
    const { commonStore } = useStore();
    return (
      <div
        className={`${styles.walletCard} WalletCard ${walletId}${
          walletId === 'console' ? ' gradient' : ''
        }`}
      >
        {walletId === 'connect' ? (
          <button onClick={() => onClick && onClick()}>
            <WalletConnectIcon
              noTooltip={commonStore.externalWallet.address.length > 0}
            />
            Connect wallet
          </button>
        ) : (
          <>
            <div className={'title'}>
              {walletId === 'console' ? 'Console wallet' : 'Metamask'}
            </div>
            <div className="bottom">
              {walletId === 'console' &&
                commonStore.consoleWallet?.autoSignYn === 'Y' && (
                  <div className="sign">Auto sign</div>
                )}
              <dl>
                <dt>Wallet address</dt>
                <dd>
                  <AddressCopySet
                    selectedWallet={
                      walletId === 'console'
                        ? commonStore.consoleWallet
                        : commonStore.externalWallet
                    }
                    addressDisplayOption={{ front: 8 }}
                  />
                </dd>
              </dl>
            </div>
            <DotsDropdown
              address={
                walletId === 'console'
                  ? commonStore.consoleWallet?.address
                  : commonStore.externalWallet?.address
              }
              walletId={walletId}
            />
          </>
        )}
      </div>
    );
  }
);

export default WalletCard;

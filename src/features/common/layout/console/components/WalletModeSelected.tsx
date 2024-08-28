import React, { useEffect, useState } from 'react';
import Skeleton from '@/features/console/common/Skeleton';
import { ellipsisWalletAddress } from '@/libs/utils/common';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useAccountCahngeObserver } from '@/libs/hooks/useAccountChangeObserver';
import styles from './WalletModeSelected.module.scss';

interface WalletModeSelectedProps {
  style?: React.CSSProperties;
  className?: string;
}

const WalletModeSelected = observer(
  ({ style, className }: WalletModeSelectedProps) => {
    const { commonStore: store } = useStore();

    const accountChangeObserver = useAccountCahngeObserver();

    const [isConsole, setIsConsole] = useState(true);

    useEffect(() => {
      setIsConsole(store.currentWallet === 'console');
    }, [store.currentWallet, accountChangeObserver]);

    return (
      <>
        {store.consoleWallet ? (
          <div
            className={`${styles.walletItem} walletItem ${
              isConsole ? 'console gradient' : 'external'
            }${className ? ` ${className}` : ''}`}
            style={style}
          >
            <i className="walletSymbol" />
            <strong>
              {ellipsisWalletAddress(
                isConsole
                  ? store.consoleWallet.address
                  : store.externalWallet.address
              )}
            </strong>
            {isConsole && store.consoleWallet.autoSignYn === 'Y' && (
              <span className="autoSign">Auto sign</span>
            )}
          </div>
        ) : (
          <div
            className={`${styles.walletItem} walletItem gradient${
              className ? ` ${className}` : ''
            }`}
            style={style}
          >
            <Skeleton
              style={{
                width: 20,
                height: 20,
                marginRight: 4,
                background: 'none',
              }}
            />
            <Skeleton style={{ width: 80, height: 20, background: 'none' }} />
            <Skeleton
              style={{
                width: 80,
                height: 20,
                marginLeft: 'auto',
                background: 'none',
              }}
            />
          </div>
        )}
      </>
    );
  }
);

export default WalletModeSelected;

import React, { CSSProperties } from 'react';
import styles from './TableAddressUi.module.scss';
import { MyIcons } from '@/features/common/components/common/MyIcons';

interface Props {
  type: 'txn-hash' | 'wallet' | 'contract' | 'wallet-copy';
  className?: string;
  text?: string;
  disabled?: boolean;
  wrapperStyle?: CSSProperties;
}

export const TableAddressUi = ({
  type,
  disabled,
  className,
  text,
  wrapperStyle,
}: Props): JSX.Element => {
  // return (
  //   <div style={{ display: 'flex', flexDirection: 'row' }}>
  //     <MyIcons.ContractIcon width={'1rem'} height={'1rem'} />
  //     <span>{text}</span>
  //   </div>
  // );
  return (
    <div
      className={`${styles.TableAddressUi} ${styles[type]} ${
        disabled ? styles.disabled : ''
      } ${className ?? ''}`}
      style={wrapperStyle}
    >
      {['wallet', 'contract'].includes(type) && (
        <div className={styles.iconWrapper}>
          {type === 'contract' && (
            <MyIcons.ContractIcon width={'1rem'} height={'1rem'} />
          )}
          {type === 'wallet' && (
            <MyIcons.WalletIcon width={'1rem'} height={'1rem'} />
          )}
        </div>
      )}

      <div className={`${styles['text-wrapper']} ${styles[`type-0-${type}`]}`}>
        {text}
      </div>

      {type === 'wallet-copy' && (
        <MyIcons.CopyIcon
          width={'1rem'}
          height={'1rem'}
          className={styles.copy}
        />
      )}
    </div>
  );
};

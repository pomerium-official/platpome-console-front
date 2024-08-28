import React from 'react';
import styles from './AddressCopySet.module.scss';
import { copyClipboard } from '@/features/console/wallet/component/WalletList';
import { ellipsisWalletAddress } from '@/libs/baseCommon/utils/common';

interface AddressCopySetProps {
  selectedWallet: any;
  className?: string;
  noBtn?: boolean;
  noAddress?: boolean;
  style?: React.CSSProperties;
  ellipsis?: boolean;
  addressDisplayOption?: { front?: number; rear?: number };
}

const AddressCopySet = ({
  selectedWallet,
  className,
  noBtn,
  noAddress,
  style,
  ellipsis = true,
  addressDisplayOption,
}: AddressCopySetProps) => {
  return (
    <div
      className={`addressCopySet ${styles.addressCopySet}${
        selectedWallet.id === 'console' ? ' console' : ''
      }${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="name">
        {selectedWallet.id === 'console' && (
          <img src="/assets/images/symbols/symbol-pmg.svg" alt="" />
        )}
        {selectedWallet.name}
      </div>
      {!noAddress && (
        <div className="address">
          {ellipsis
            ? ellipsisWalletAddress(
                selectedWallet.address,
                addressDisplayOption?.front,
                addressDisplayOption?.rear
              )
            : selectedWallet.address}
        </div>
      )}
      {!noBtn && (
        <button
          className="iconBtn copy"
          onClick={(e) => {
            e.stopPropagation();
            copyClipboard(selectedWallet.address);
          }}
        />
      )}
    </div>
  );
};

export default AddressCopySet;

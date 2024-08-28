import React from 'react';
import { WalletType } from './ModeModule';
import AddressCopySet from '@/features/console/nft/components/nft-list/burn/AddressCopySet';
import Connecting from './Connecting';
import WalletConnectIcon from './WalletConnectIcon';

interface WalletModeWalletItemProps {
  wallet?: WalletType;
  onClick?: () => void;
  className?: string;
  connectIcon?: boolean;
  loading?: boolean;
}
const renderWalletName = (wallet?: WalletType) => {
  if (wallet?.walletId) {
    return 'Console wallet';
  } else if (wallet && wallet.address && wallet.address.length > 0) {
    return 'Metamask';
  }
  return 'External wallet';
};

const WalletModeWalletItem = ({
  wallet,
  onClick,
  className,
  connectIcon,
  loading,
}: WalletModeWalletItemProps) => {
  return (
    <div
      className={`walletListItem${wallet?.walletId ? ' console' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      <button onClick={() => onClick && onClick()} className="walletItemButton">
        <div className="walletName">
          <i className="walletSymbol" />
          {renderWalletName(wallet)}
        </div>
        {connectIcon && (
          <WalletConnectIcon
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translate(0, -50%)',
            }}
          />
        )}
        {loading && <Connecting style={{ marginLeft: 'auto' }} />}
      </button>
      <div className="walletAddress">
        {wallet?.address ? (
          <AddressCopySet selectedWallet={wallet} />
        ) : (
          <>
            {loading ? (
              <span style={{ color: 'var(--color-404040)' }}>
                Connecting...
              </span>
            ) : (
              <span>not connected</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletModeWalletItem;

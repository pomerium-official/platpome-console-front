import React from 'react';
import styles from './WalletConnectIcon.module.scss';

interface WalletConnectIconProps {
  style?: React.CSSProperties;
  className?: string;
  tooltipContent?: React.ReactNode;
  noTooltip?: boolean;
}

const WalletConnectIcon = ({
  style,
  className,
  tooltipContent,
  noTooltip,
}: WalletConnectIconProps) => {
  return (
    <div
      className={`${styles.connectWallet} connectWallet${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      {!noTooltip && (
        <>
          {tooltipContent ? (
            tooltipContent
          ) : (
            <div className="tip">
              <i className="metamaskSymbol" />
              Connect Metamask
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletConnectIcon;

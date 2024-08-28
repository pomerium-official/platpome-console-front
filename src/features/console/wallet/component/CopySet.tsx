import React from 'react';
import styles from './CopySet.module.scss';
import { copyClipboard } from './WalletList';
import { ellipsisWalletAddress } from '@/libs/baseCommon/utils/common';

interface CopySetProps {
  className?: string;
  style?: React.CSSProperties;
  name?: React.ReactNode;
  address?: string;
  onCopy?: () => void;
  column?: boolean;
  color?: string;
  addressDisplayOption?: { front?: number; rear?: number };
  ellipsis?: boolean;
}

const CopySet = ({
  className,
  style,
  name,
  address,
  onCopy,
  column,
  color,
  addressDisplayOption = { front: 4, rear: 4 },
  ellipsis = true,
}: CopySetProps) => {
  return (
    <div
      className={`copySet ${styles.copySet}${className ? ` ${className}` : ''}${
        column ? ' column' : ''
      }`}
      style={{ color: color, ...style }}
    >
      <div
        className={`name${name ? ' custom' : ''}`}
        style={{ marginRight: column ? 0 : undefined, background: color }}
      >
        {name}
      </div>
      <div className="second">
        <div className="address" style={{ color: color }}>
          {address && (
            <>
              {ellipsis
                ? ellipsisWalletAddress(
                    address,
                    addressDisplayOption?.front,
                    addressDisplayOption?.rear
                  )
                : address}
            </>
          )}
        </div>
        <button
          onClick={() => {
            onCopy && onCopy();
            address && copyClipboard(address);
          }}
          className="btn"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

export default CopySet;

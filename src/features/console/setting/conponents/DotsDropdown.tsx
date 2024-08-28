import React, { useEffect, useRef, useState } from 'react';
import styles from './DotsDropdown.module.scss';
import { useDisconnect } from '@thirdweb-dev/react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';

interface DotsDropdownProps {
  address?: string;
  walletId?: string;
}

const DotsDropdown = ({ address, walletId }: DotsDropdownProps) => {
  const { commonStore } = useStore();
  const [showOptions, setShowOptions] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  const disconnect = useDisconnect();

  useEffect(() => {
    const optionDelete = (e: any) => {
      if (!dotsRef.current?.contains(e.target)) {
        setShowOptions(false);
      }
    };
    window.addEventListener('click', optionDelete);
    return () => window.removeEventListener('click', optionDelete);
  }, []);

  return (
    <div ref={dotsRef} className={`${styles.dotsDropdown} dotsDropdown`}>
      <button onClick={() => setShowOptions(!showOptions)} className="dots" />
      {showOptions && (
        <div className="buttons">
          <a href={`https://bscscan.com/address/${address}`} target="_blank">
            View on BscScan
          </a>
          {walletId !== 'console' && (
            <ul>
              <li>
                <button>Switch Account</button>
              </li>
              <li>
                <button
                  onClick={() => {
                    disconnect();
                    commonStore.initExternalWallet();
                  }}
                >
                  Disconnect wallet
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DotsDropdown;

import React, { useRef, useState } from 'react';
import ChangePrice from './ChangePrice';
import RemoveFromSale from './RemoveFromSale';
import CreateListing from './CreateListing';
import Burn from './burn/Burn';
import styles from './NFTUtilsDropdown.module.scss';
import {
  SelectedNFTInputType,
  NFTType,
} from '@/features/console/nft/stores/CreateNFTStore';

interface NFTUtilsDropdownProps {
  allowMint?: boolean;
  allowBurn?: boolean;
  type?: NFTType;
  onSale?: boolean;
  soldOut?: boolean;
  price?: string;
  tokenId: string | number;
  allowModal: boolean;
  modalType: string;
  setModalType: (value: string) => void;
  setInputValue?: (
    key: keyof SelectedNFTInputType,
    value: string | number
  ) => void;
  fetchListing?: () => Promise<boolean>;
  total: string | number;
  removeFromListing?: () => Promise<boolean>;
  changePrice?: () => Promise<boolean>;
  isLoading?: boolean;
}
const NFTUtilsDropdown = ({
  allowMint,
  allowBurn,
  type,
  onSale,
  price,
  tokenId,
  allowModal,
  modalType,
  setModalType,
  setInputValue,
  fetchListing,
  total,
  removeFromListing,
  changePrice,
  isLoading,
}: NFTUtilsDropdownProps) => {
  const [showCardMenu, setShowCardMenu] = useState(false);

  const [showBurn, setShowBurn] = useState(false);

  const leaveTimer = useRef<NodeJS.Timer>();

  return (
    <>
      <div className={`nftUtils ${styles.nftUtils}`}>
        <button
          className="iconBtn"
          onClick={() => setShowCardMenu(!showCardMenu)}
          onMouseLeave={() => {
            leaveTimer.current = setTimeout(() => setShowCardMenu(false), 400);
          }}
          onMouseEnter={() =>
            leaveTimer.current &&
            clearTimeout(leaveTimer.current as NodeJS.Timeout)
          }
        />
        {showCardMenu && (
          <div
            className="cardMenuLayer"
            onMouseLeave={() => {
              leaveTimer.current = setTimeout(
                () => setShowCardMenu(false),
                400
              );
            }}
            onMouseEnter={() =>
              leaveTimer.current &&
              clearTimeout(leaveTimer.current as NodeJS.Timeout)
            }
          >
            <ul>
              {onSale && (
                <li>
                  <button
                    onClick={() => {
                      setInputValue && setInputValue('tokenId', tokenId);
                      setModalType('changePrice');
                      setShowCardMenu(false);
                    }}
                  >
                    Change price
                  </button>
                </li>
              )}

              {onSale && (
                <li>
                  <button
                    onClick={() => {
                      setInputValue && setInputValue('tokenId', tokenId);
                      setModalType('remove');
                      setShowCardMenu(false);
                    }}
                  >
                    Remove from sale
                  </button>
                </li>
              )}
              <li>
                {!onSale && (
                  <button
                    onClick={() => {
                      if (setInputValue) {
                        setInputValue('tokenId', tokenId);
                        setInputValue('total', total);
                      }
                      setModalType('listing');
                      setShowCardMenu(false);
                    }}
                  >
                    Put on sale
                  </button>
                )}
              </li>
            </ul>
            <ul>
              <li>
                {allowBurn ? (
                  <button
                    disabled={false}
                    onClick={() => {
                      setShowBurn(true);
                      setShowCardMenu(false);
                    }}
                  >
                    Burn
                  </button>
                ) : (
                  <button disabled={true} style={{ color: 'grey' }}>
                    Burn
                  </button>
                )}
              </li>
              {type !== 'single' && allowMint && (
                <li>
                  <button>Additional Mint</button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {allowModal && (
        <>
          {modalType === 'changePrice' && (
            <ChangePrice
              price={price}
              setPrice={(price) =>
                setInputValue && setInputValue('price', price)
              }
              onClose={() => setModalType('')}
              changePrice={changePrice}
              isLoading={isLoading}
            />
          )}
          {modalType === 'remove' && (
            <RemoveFromSale
              onClose={() => setModalType('')}
              removeFromListing={removeFromListing}
              isLoading={isLoading}
            />
          )}
          {modalType === 'listing' && (
            <CreateListing
              onClose={() => setModalType('')}
              setPrice={(price) =>
                setInputValue && setInputValue('price', price)
              }
              price={price}
              fetchListing={fetchListing}
              isLoading={isLoading}
            />
          )}
        </>
      )}

      {showBurn && <Burn setShowBurn={() => setShowBurn(false)} />}
    </>
  );
};

export default NFTUtilsDropdown;

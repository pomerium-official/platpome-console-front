import React, { useEffect } from 'react';
import styles from './ConfirmNSign.module.scss';
import NFTPreview from '../../create-NFT/NFTPreview';
import {
  DISCOUNT_FEE,
  TRANSACTION_GAS_FEE,
} from '@/features/console/nft/stores/CreateNFTStore';

interface ConfirmNSignProps {
  feeNotEnough?: boolean;
  setFeeNotEnough?: (e: boolean) => void;
  burn?: boolean;
  create?: boolean;
}

const ConfirmNSign = ({
  feeNotEnough,
  setFeeNotEnough,
  burn,
  create,
}: ConfirmNSignProps) => {
  useEffect(() => {
    setFeeNotEnough && setFeeNotEnough(true);
  }, []);

  return (
    <div className={`confirmNSign ${styles.confirmNSign}`}>
      {create && <NFTPreview />}
      {!create && (
        <>
          <div className={`tokenInfo${feeNotEnough ? ' notEnough' : ''}`}>
            <div className="name">
              <img src="/assets/images/icons/icon_pmg.svg" alt="" />
              PMG
            </div>
            <div className="amount">Amount of token held : {0.021} PMG</div>
          </div>
          {feeNotEnough && (
            <p className="errorText">
              You do not have enough PMG in your wallet to pay transaction fees.
            </p>
          )}
        </>
      )}
      <div className="burnInfo">
        {burn && (
          <>
            <dl className="nft">
              <dt>NFT to be burn</dt>
              <dd>
                <img src="/assets/images/icons/icon_blue_hexagon.png" alt="" />
                Blue hexagon power
              </dd>
            </dl>
            <dl className="quantity">
              <dt>Qauntity of NFT to burn</dt>
              <dd>25</dd>
            </dl>
            <dl className="remain">
              <dt>↳ Qauntity of NFT to remain</dt>
              <dd>3</dd>
            </dl>
          </>
        )}
        <dl className="fee">
          <dt>
            Transaction Gas Fee <button className="iconBtn infoInSquare" />
          </dt>
          <dd>{TRANSACTION_GAS_FEE} PMG</dd>
        </dl>
        <dl className="fee">
          <dt>
            Discount <button className="iconBtn infoInSquare" />
          </dt>
          <dd>{-DISCOUNT_FEE} PMG</dd>
        </dl>
        <dl className="total">
          <dt>Total</dt>
          <dd>{TRANSACTION_GAS_FEE - DISCOUNT_FEE} PMG</dd>
        </dl>
      </div>
    </div>
  );
};

export default ConfirmNSign;

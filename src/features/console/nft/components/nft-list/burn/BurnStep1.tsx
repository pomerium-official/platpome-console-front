import Input from '@/features/common/components/common/Input/Input';
import React, { useEffect, useState } from 'react';

interface BurnStep1Props {
  setPassStep1: (e: boolean) => void;
  feeNotEnough: boolean;
}

const BurnStep1 = ({ setPassStep1, feeNotEnough }: BurnStep1Props) => {
  const [quantity] = useState(28);

  const [burnNumber, setBurnNumber] = useState('');

  useEffect(() => {
    setPassStep1(Number(burnNumber) > 0 && quantity >= Number(burnNumber));
  }, [burnNumber]);

  return (
    <div className="burnStep1">
      <div className="targetNft">
        <div className="name">
          <img src="/assets/images/icons/icon_blue_hexagon.png" alt="" />
          Blue hexagon power
        </div>
        <div className="quantity">Qauntity of NFT held : {quantity}</div>
      </div>
      <Input
        label="Enter the qauntity of NFT to burn."
        placeholder="Enter number"
        errorText="보유량 이하의 값을 입력해 주세요."
        value={burnNumber}
        onChange={(e) => {
          if (/^[0-9]*$/.test(e.target.value)) {
            setBurnNumber(e.target.value);
          }
        }}
        result={Number(burnNumber) > quantity ? 'error' : undefined}
      />
      <dl className="gasFee">
        <dt>
          Transaction Gas Fee <button className="iconBtn infoInSquare" />
        </dt>
        <dd>
          {0.000321} {'PMG'}
        </dd>
      </dl>
      {feeNotEnough && (
        <div className="notEnough">
          You do not have enough PMG in your wallet to pay transaction fees.
        </div>
      )}
    </div>
  );
};

export default BurnStep1;

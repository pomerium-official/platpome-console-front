import React, { useState } from 'react';
import Modal, { closeExportModal } from '../../../common/Modal';
import Input from '@/features/common/components/common/Input/Input';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import { regExpPrice } from '@/libs/baseCommon/regex';

interface ChangePriceProps {
  onClose: () => void;
  price?: string;
  setPrice?: (value: string) => void;
  changePrice?: () => Promise<boolean>;
  isLoading?: boolean;
}

const ChangePrice = ({
  onClose,
  price,
  changePrice,
  setPrice,
  isLoading,
}: ChangePriceProps) => {
  const [checkPrice, setCheckPrice] = useState<'error'>();
  return (
    <Modal
      exportModal
      onClose={() => {
        onClose();
        setPrice && setPrice('');
      }}
      header={'Change price'}
      content={
        <div style={{ color: 'var(--color-f2f2f2)' }}>
          <p>Set the price you would like to change.</p>
          <div style={{ position: 'relative', marginTop: 32 }}>
            <Input
              placeholder="Enter price"
              onChange={(e) => {
                if (setPrice) {
                  const value = e.target.value;
                  if (regExpPrice.test(value)) {
                    setPrice(value);
                    price && setCheckPrice(undefined);
                  } else {
                    price && setCheckPrice('error');
                  }
                }
              }}
              value={price}
              result={checkPrice}
            />
            <span
              style={{
                position: 'absolute',
                right: 18,
                top: '17px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src="/assets/images/icons/icon-pmg.svg"
                alt=""
                style={{ marginRight: 4 }}
              />
              PMG
            </span>
          </div>
        </div>
      }
      footer={
        <SolidButton
          onClick={async (e) => {
            if (checkPrice === 'error') {
              return alertConsole(
                'Failed to change price',
                'Changing price is fail. Please check and try again.',
                { icon: 'caution' }
              );
            }
            if (changePrice) {
              const result = await changePrice();
              if (result) {
                const check = await alertConsole(
                  'Changing price is complete',
                  'Complete to change price.',
                  { icon: 'confirm' }
                );

                if (check === 'ok' || check === 'close') {
                  setPrice && setPrice('');
                  onClose();
                  closeExportModal(e);
                }
              } else {
                return alertConsole(
                  'Failed to change price',
                  'Changing price is fail. Please check and try again.',
                  { icon: 'caution' }
                );
              }
            }
          }}
          size="small"
          styleType="color"
          label="Change price"
          disabled={isLoading ? true : price ? price.length < 1 : true}
        />
      }
      style={{ width: 400 }}
    />
  );
};

export default ChangePrice;

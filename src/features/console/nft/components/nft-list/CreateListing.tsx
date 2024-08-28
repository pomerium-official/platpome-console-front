import React, { useState } from 'react';
import Input from '@/features/common/components/common/Input/Input';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Modal, { closeExportModal } from '@/features/console/common/Modal';
import { regExpPrice } from '@/libs/baseCommon/regex';

interface CreateListingProps {
  onClose: () => void;
  price?: string;
  setPrice?: (value: string) => void;
  fetchListing?: () => Promise<boolean>;
  isLoading?: boolean;
}

const CreateListing = ({
  onClose,
  price,
  setPrice,
  fetchListing,
  isLoading,
}: CreateListingProps) => {
  const [checkPrice, setCheckPrice] = useState<'error'>();

  return (
    <Modal
      exportModal
      header="Create listing"
      onClose={() => {
        onClose();
        setPrice && setPrice('');
      }}
      content={
        <div style={{ color: 'var(--color-f2f2f2)' }}>
          <p>
            Set a price if you want to upload new NFTs to the PomeriumX store.
          </p>
          <div style={{ position: 'relative', marginTop: 32 }}>
            <Input
              placeholder="Enter price"
              onChange={(e) => {
                if (setPrice) {
                  const value =
                    e.target.value.charAt(0) === '0'
                      ? e.target.value.substring(1)
                      : e.target.value;
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
                'Failed to upload',
                'Upload NFT is fail. Please check and try again.',
                { icon: 'caution' }
              );
            }
            if (fetchListing) {
              const result = await fetchListing();
              if (result) {
                const check = await alertConsole(
                  'Complete to upload',
                  'Upload NFT to the store is complete.',
                  { icon: 'confirm' }
                );
                if (check === 'ok' || check === 'close') {
                  onClose();
                  setPrice && setPrice('');
                  closeExportModal(e);
                }
              } else {
                return alertConsole(
                  'Failed to upload',
                  'Upload NFT is fail. Please check and try again.',
                  { icon: 'caution' }
                );
              }
            }
          }}
          size="small"
          styleType="color"
          label="Put on sale"
          // disabled={isLoading ? true : price ? price.length < 1 : true}
          disabled={
            (!isLoading && !price) || (!!price && price.length < 1) || isLoading
          }
        />
      }
      style={{ width: 400 }}
    />
  );
};

export default CreateListing;

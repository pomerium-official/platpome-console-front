import React, { useState } from 'react';
import Modal, { closeExportModal } from '../../../common/Modal';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { alertConsole } from '@/libs/hooks/dialogConsole';

interface RemoveFromSaleProps {
  onClose: () => void;
  removeFromListing?: () => Promise<boolean>;
  isLoading?: boolean;
}

const RemoveFromSale = ({
  onClose,
  removeFromListing,
}: // isLoading,
RemoveFromSaleProps) => {
  const [onProcess, setOnProcess] = useState(false);
  return (
    <Modal
      exportModal
      header="Remove from sale"
      content={
        <p>
          Do you really want to remove your NFT from store? <br />
          You can put it on sale anytime.
        </p>
      }
      footer={
        <SolidButton
          size="small"
          styleType="neutral"
          label="Remove from sale"
          // disabled={isLoading}
          disabled={onProcess}
          onClick={async (e) => {
            setOnProcess(true);
            if (removeFromListing) {
              const result = await removeFromListing();
              if (result) {
                const check = await alertConsole(
                  'Remove from sale completed',
                  'Successfully removed from sale',
                  { icon: 'confirm', okText: 'Okay' }
                );
                if (check === 'ok' || check === 'close') {
                  onClose();
                  closeExportModal(e);
                }
              } else {
                alertConsole(
                  'Fail to remove',
                  'Remove from sale is fail. Please check and try again.',
                  { icon: 'caution' }
                ).then(() => setOnProcess(false));
              }
            }
          }}
        />
      }
      onClose={onClose}
      style={{ width: 400 }}
    />
  );
};

export default RemoveFromSale;

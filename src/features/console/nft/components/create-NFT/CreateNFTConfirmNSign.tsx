import Modal from '@/features/console/common/Modal';
import React from 'react';
import ConfirmNSign from '../nft-list/burn/ConfirmNSign';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { observer } from 'mobx-react';
import WalletModeSelected from '@/features/common/layout/console/components/WalletModeSelected';

interface CreateNFTConfirmNSignProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
  isLoading?: boolean;
}

const CreateNFTConfirmNSign = observer(
  ({
    onClickConfirm,
    onClickCancel,
    isLoading,
  }: CreateNFTConfirmNSignProps) => {
    return (
      <Modal
        header={
          <div style={{ display: 'flex' }}>
            Confirm & Sign
            <WalletModeSelected style={{ width: 216, marginLeft: 'auto' }} />
          </div>
        }
        content={<ConfirmNSign create />}
        footer={
          <>
            <LineButton
              disabled={isLoading}
              size="small"
              styleType="neutral"
              label="Cancel"
              onClick={() => onClickCancel()}
            />
            <SolidButton
              disabled={isLoading}
              size="small"
              styleType="color"
              label="Confirm"
              onClick={() => onClickConfirm()}
            />
          </>
        }
        hideClose
      />
    );
  }
);

export default CreateNFTConfirmNSign;

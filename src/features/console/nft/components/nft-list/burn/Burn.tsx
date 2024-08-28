import React, { useState } from 'react';
import Modal, { closeExportModal } from '../../../../common/Modal';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import BurnStep0 from './BurnStep0';
import styles from './Burn.module.scss';
import AddressCopySet from './AddressCopySet';
import BurnStep1 from './BurnStep1';
import ConfirmNSign from './ConfirmNSign';
import { alertConsole } from '@/libs/hooks/dialogConsole';

interface BurnProps {
  setShowBurn: () => void;
}

const Burn = ({ setShowBurn }: BurnProps) => {
  const [burnStep, setBurnStep] = useState(0);

  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  // console.log('selectedWallet', selectedWallet);

  const [passStep1, setPassStep1] = useState(true);

  const [feeNotEnough, setFeeNotEnough] = useState(false);

  const renderHeadTitle = (title: string) => {
    return (
      <>
        <button
          className="backStep"
          onClick={() =>
            setBurnStep((prev) => {
              return prev > 0 ? prev - 1 : prev;
            })
          }
        />
        {title}
        <AddressCopySet selectedWallet={selectedWallet} />
      </>
    );
  };

  return (
    <>
      <Modal
        exportModal
        header={
          <>
            {burnStep === 0 && 'Burn'}
            {burnStep === 1 && <>{renderHeadTitle('Burn')}</>}
            {burnStep === 2 && <>{renderHeadTitle('Confirm & Sign')}</>}
          </>
        }
        content={
          <>
            {burnStep === 0 && (
              <BurnStep0
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
              />
            )}
            {burnStep === 1 && (
              <BurnStep1
                setPassStep1={(e) => setPassStep1(!e)}
                feeNotEnough={feeNotEnough}
              />
            )}
            {burnStep === 2 && (
              <ConfirmNSign
                feeNotEnough={feeNotEnough}
                setFeeNotEnough={(e) => setFeeNotEnough(e)}
                burn
              />
            )}
          </>
        }
        footer={
          <>
            <LineButton
              onClick={(e) => {
                closeExportModal(e);
                setShowBurn();
              }}
              size="small"
              styleType="neutral"
              label="Cancel"
            />
            {burnStep === 0 && (
              <SolidButton
                onClick={() => setBurnStep(1)}
                size="small"
                styleType="color"
                label="Next"
                disabled={!selectedWallet || selectedWallet.id === 'connect'}
              />
            )}
            {burnStep === 1 && (
              <SolidButton
                onClick={() => setBurnStep(2)}
                size="small"
                styleType="color"
                label="Burn"
                disabled={passStep1}
              />
            )}
            {burnStep === 2 && (
              <SolidButton
                onClick={async (e) => {
                  const check = await alertConsole(
                    'Complete to burn',
                    '소각 성공',
                    { icon: 'confirm' }
                  );
                  if (check === 'ok' || check === 'close') {
                    closeExportModal(e);
                    setShowBurn();
                  }
                }}
                size="small"
                styleType="color"
                label="Confirm"
              />
            )}
          </>
        }
        className={styles.burnModal}
        hideClose
      />
    </>
  );
};

export default Burn;

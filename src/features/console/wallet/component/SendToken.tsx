import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import Input from '@/features/common/components/common/Input/Input';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import styles from './SendToken.module.scss';
import Select from '@/features/common/components/common/Select/Select';
import { DropdownProps } from 'primereact/dropdown';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { regExpPrice } from '@/libs/baseCommon/regex';

import { alertConsole } from '@/libs/hooks/dialogConsole';
import { useRouter } from 'next/router';
import { ellipsisWalletAddress } from '@/libs/baseCommon/utils/common';
import WalletModeSelected from '@/features/common/layout/console/components/WalletModeSelected';

const renderButtonText = (step: number) => {
  switch (step) {
    case 1: {
      return 'Confirm transaction';
    }
    case 2: {
      return 'Confirm';
    }
    default: {
      return 'Next';
    }
  }
};

interface SendTokenProps {
  onClose?: () => void;
  selectedWalletData?: { id: string; name: string; address: string };
}

const renderTemplate = (option: any) => {
  return (
    <dl>
      <dt>
        <i
          className="symbolImg"
          style={{
            background: `url(${option.iconUrl}) no-repeat center center / cover`,
          }}
        />
        {option.symbol.toUpperCase()}
      </dt>
      <dd>
        Amount of token held : {option.displayValue.toLocaleString()}
        {option.symbol.toUpperCase()}
      </dd>
    </dl>
  );
};

const tokenOptionTemplate = (option: any) => {
  return <div className="tokenOptionTemplete">{renderTemplate(option)}</div>;
};

const selectedTokenTemplate = (option: any, props: DropdownProps) => {
  if (option) {
    return (
      <div className="tokenOptionTemplete selected">
        {renderTemplate(option)}
      </div>
    );
  }
  return <span>{props.placeholder}</span>;
};

const SendToken = observer(({ onClose }: SendTokenProps) => {
  const { walletDetailStore: store } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const transferToken = useCallback(async () => {
    const result = await store.sendToken();
    await renderResult(result);
  }, []);

  const simulateTransferToken = useCallback(async () => {
    return await store.simulateSendToken();
  }, []);

  useEffect(() => {
    if (store.selectedToken) {
      simulateTransferToken().then();
    }
  }, [store.selectedToken]);

  const renderResult = useCallback((result?: boolean) => {
    store.loadAppWalletBalance(Number(router.query.appId as string)).then();
    if (result) {
      return alertConsole(
        'Sending token completed.',
        'Successfully sent tokens.',
        { icon: 'confirm', okText: 'Okay' },
        {
          handleOk: () => {
            store.initSendTokenInputs();
            onClose && onClose();
          },
          handleClose: () => {
            store.initSendTokenInputs();
            onClose && onClose();
          },
        }
      );
    } else {
      return alertConsole(
        'Failed to send token.',
        'Failed to send tokens. Please try it again.',
        {
          icon: 'caution',
          okText: 'Okay',
        },
        {
          handleOk: () => {
            store.initSendTokenInputs();
            onClose && onClose();
          },
          handleClose: () => {
            store.initSendTokenInputs();
            onClose && onClose();
          },
        }
      );
    }
  }, []);

  return (
    <Modal
      className={`sendTokenMoal ${styles.sendTokenModal}`}
      header={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => {
              if (step === 0) {
                store.initSendTokenInputs();
                onClose && onClose();
              } else {
                if (step === 1) {
                  store.backToStep0();
                }
                setStep((prev) => prev - 1);
              }
            }}
            className="iconBtn back"
            style={{ marginRight: 8 }}
          />
          {step === 2 ? 'Confirm & Sign' : 'Send Token'}
          {step !== 2 && (
            <WalletModeSelected style={{ width: 216, marginLeft: 'auto' }} />
          )}
        </div>
      }
      content={
        <>
          {step === 0 && (
            <div style={{ minHeight: 254 }}>
              <Input
                onChange={(e) =>
                  store.setSendTokenInput('address', e.target.value)
                }
                result={
                  !store.inputErrors.address.init &&
                  store.inputErrors.address.error
                    ? 'error'
                    : undefined
                }
                errorText={'Invalid address.'}
                value={store.sendTokenInput.address}
                label="Wallet address to send"
                placeholder="Wallet address(0x) or ENS"
                clear={() => store.setSendTokenInput('address', '')}
              />
            </div>
          )}
          {step === 1 && (
            <>
              <div className="walletAddressSet">
                <dl>
                  <dt>Wallet address to send</dt>
                  <dd>{store.sendTokenInput.address}</dd>
                </dl>
              </div>
              <Select
                onChange={(e) => store.setSelectedToken(e.value.symbol)}
                value={store.selectedToken}
                optionLabel="name"
                filterBy="symbol"
                options={store.appWalletBalances.map((f) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { value, ...rest } = f;
                  return { ...rest };
                })}
                itemTemplate={tokenOptionTemplate}
                valueTemplate={selectedTokenTemplate}
                label="Select token to send"
                placeholder="Select token to send"
                style={{ margin: `32px 0  12px` }}
                panelClassName="tokenOption"
              />
              <div className="amountWrap">
                <Input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      if (regExpPrice.test(value)) {
                        store.setSendTokenInput('amount', value);
                      }
                    } else {
                      store.setSendTokenInput('amount', '');
                    }
                  }}
                  result={
                    !store.inputErrors.amount.init &&
                    store.inputErrors.amount.error
                      ? 'error'
                      : undefined
                  }
                  errorText={'Unavailable token amount.'}
                  value={store.sendTokenInput.amount}
                  label="Amount of tokens to send"
                />
                <button
                  onClick={() => {
                    if (store.selectedToken?.displayValue) {
                      store.setSendTokenInput(
                        'amount',
                        store.selectedToken.displayValue
                      );
                    }
                  }}
                  className="max"
                >
                  MAX
                </button>
                <div className="unitName">
                  {store.selectedToken?.symbol.toUpperCase()}
                </div>
              </div>
              <dl className="fee">
                <dt>Estimated Gas Fee</dt>
                <dd>
                  {store.selectedToken &&
                    store.simulateResponse &&
                    store.simulateResponse?.gasCost.ether}
                  &nbsp;
                  {'BNB'}
                </dd>
              </dl>
              {store.notEnoughGas && (
                <p className="notEnough">
                  Your wallet doesn't have enough Gas fee.
                </p>
              )}
            </>
          )}
          {step === 2 && (
            <div className="final">
              <div className="top">
                <div className="walletAddressSet console">
                  <dl>
                    <dt>Console wallet</dt>
                    <dd>
                      {ellipsisWalletAddress(store.consoleWallet?.address)}
                    </dd>
                  </dl>
                </div>
                <div className="walletAddressSet">
                  <dl>
                    <dt>Wallet address to send</dt>
                    <dd>
                      {ellipsisWalletAddress(store.sendTokenInput?.address)}
                    </dd>
                  </dl>
                </div>
                <i className="arrow" />
              </div>
              <div className="summary">
                <dl>
                  <dt> Token to send</dt>
                  <dd>
                    <div className="tokenName">
                      <i
                        style={{
                          background: `url(${store.selectedToken?.iconUrl}) no-repeat center center / contain`,
                        }}
                      />
                      {store.selectedToken?.symbol.toUpperCase()}
                    </div>
                  </dd>
                </dl>
                {store.selectedToken && (
                  <dl>
                    <dt>Amount of tokens to send</dt>
                    <dd>
                      {store.sendTokenInput.amount}&nbsp;
                      {store.selectedToken?.symbol.toUpperCase()}
                    </dd>
                  </dl>
                )}
                <dl>
                  <dt>Transaction Gas Fee</dt>
                  <dd>
                    {store.selectedToken &&
                      store.simulateResponse?.gasCost.ether}{' '}
                    {'BNB'}
                  </dd>
                </dl>
                <dl className="total">
                  <dt>Total</dt>
                  <dd>
                    {Number(store.sendTokenInput.amount).toLocaleString(
                      'ko-kr',
                      { maximumFractionDigits: 10 }
                    )}
                    &nbsp;
                    {store.selectedToken?.symbol.toUpperCase()}&nbsp;+&nbsp;
                    {store.simulateResponse?.gasCost.ether}&nbsp;
                    {'BNB'}
                  </dd>
                </dl>
              </div>
            </div>
          )}
        </>
      }
      footer={
        <>
          <LineButton
            onClick={() => {
              onClose && onClose();
              store.initSendTokenInputs();
            }}
            size="xsmall"
            styleType="neutral"
            label="Cancel"
          />
          <SolidButton
            onClick={() => {
              if (step === 0) {
                store.onClickNext('amount', true);
                setStep((prev) => {
                  return prev + 1;
                });
              }
              if (step === 1) {
                if (store.consoleWallet?.autoSignYn === 'Y') {
                  transferToken().then();
                } else {
                  // 전송 시뮬레이션 재시도
                  simulateTransferToken().then();
                  setStep((prev) => {
                    return prev + 1;
                  });
                }
              }
              if (step === 2) {
                transferToken().then();
              }
            }}
            disabled={store.disabled}
            size="xsmall"
            styleType="color"
            label={renderButtonText(step)}
          />
        </>
      }
      hideClose
    />
  );
});

export default SendToken;

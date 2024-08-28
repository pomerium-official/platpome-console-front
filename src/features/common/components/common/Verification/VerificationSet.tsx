import React, { useEffect, useState } from 'react';
import styles from './VerificationSet.module.scss';
import Input from '../Input/Input';
import { LineButton } from '../Button/LineButton';
import Timer from '../Timer/Timer';
import { Dropdown, DropdownProps } from 'primereact/dropdown';

import countryList from '../../../../../libs/countryList.json';

interface VerificationSetProps {
  inputPhone?: (e: string) => void;
  inputCode?: (e: string) => void;
  onSend?: () => void;
  onVerification?: () => void;
  handleCountry?: (e: {
    name: string;
    dial_code: string;
    code: string;
  }) => void;
  phoneNumberLabel?: string;
  verificationNumberLabel?: string;
  errorInputPhone?: boolean;
  errorInputCode?: boolean;
  codeErrorText?: string;
  timer?: {
    time?: number;
    text?: string;
    expired?: (e: 'expired') => void;
  };
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  verified?: boolean;
}

const countryOptionTemplate = (option: any) => {
  return (
    <div className="country-item">
      <img
        alt={option.name}
        src="/assets/images/flag/flag-placeholder.png"
        className={`flag flag-${option.code.toLowerCase()}`}
      />
      <div>{option.name}</div>
      <div className="dialCode">{option.dial_code}</div>
    </div>
  );
};

const selectedCountryTemplate = (option: any, props: DropdownProps) => {
  if (option) {
    return (
      <div className="country-item country-item-value">
        <img
          alt={option.name}
          src="/assets/images/flag/flag-placeholder.png"
          onError={(e: any) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
          className={`flag flag-${option.code.toLowerCase()}`}
        />
        <div>{option.dial_code}</div>
      </div>
    );
  }

  return <span>{props.placeholder}</span>;
};

const VerificationSet = ({
  inputPhone,
  inputCode,
  onSend,
  onVerification,
  handleCountry,
  phoneNumberLabel,
  verificationNumberLabel,
  errorInputPhone,
  errorInputCode,
  codeErrorText,
  timer,
  className,
  style,
  count,
  verified,
}: VerificationSetProps) => {
  const [sendDisabled, setSendDisabled] = useState(true);
  const [verificationDisabled, setVerificationDisabled] = useState(true);
  const [pushSend, setPushSend] = useState(false);
  const [handlePhoneInput, setHandlePhoneInput] = useState('');
  const [handleCodeInput, setHandleCodeInput] = useState('');

  useEffect(() => {
    setSendDisabled(() => {
      if (verified) {
        return true;
      } else {
        return handlePhoneInput.length < 1 || count !== 0;
      }
    });
    setVerificationDisabled(() => {
      if (verified) {
        return true;
      } else {
        return handleCodeInput.length !== 6;
      }
    });
  }, [handlePhoneInput, handleCodeInput, count, verified]);

  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const onCountryChange = (e: { value: any }) => {
    setSelectedCountry(e.value);
  };

  return (
    <div
      className={`verificationSet ${styles.verificationSet}${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      <div className="pro">
        <Dropdown
          className="country"
          placeholder="County"
          value={selectedCountry}
          onChange={(e) => {
            onCountryChange(e);
            handleCountry && handleCountry(e.target.value);
          }}
          optionLabel="name"
          filterBy="name"
          options={countryList}
          itemTemplate={countryOptionTemplate}
          valueTemplate={selectedCountryTemplate}
        />
        <div className="inputWrapper">
          <Input
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value)) {
                setHandlePhoneInput(e.target.value);
                inputPhone && inputPhone(e.target.value);
              }
            }}
            value={handlePhoneInput}
            label={phoneNumberLabel ? phoneNumberLabel : 'Cell Phone Number'}
            integral
            result={errorInputPhone ? 'error' : undefined}
          />
          {handlePhoneInput.length > 0 && (
            <LineButton
              onClick={() => {
                onSend && onSend();
                setHandleCodeInput('');
                if (!pushSend) {
                  setPushSend(true);
                } else {
                  setPushSend(false);
                  setTimeout(() => setPushSend(true));
                }
              }}
              className={'send'}
              size="xsmall"
              styleType="color"
              label={pushSend ? 'Resend' : 'Send code'}
              disabled={sendDisabled}
            />
          )}
        </div>
      </div>
      {pushSend && (
        <div className={'epi'}>
          <div className="inputWrapper">
            <Input
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  setHandleCodeInput(e.target.value);
                  inputCode && inputCode(e.target.value);
                }
              }}
              maxLength={6}
              value={handleCodeInput}
              label={
                verificationNumberLabel
                  ? verificationNumberLabel
                  : '6-digit verification code'
              }
              integral
              errorText={
                codeErrorText
                  ? codeErrorText
                  : 'The validation number has expired.'
              }
              result={errorInputCode ? 'error' : undefined}
            />
            <LineButton
              onClick={() => onVerification && onVerification()}
              className={'access'}
              size="xsmall"
              styleType="color"
              label="Verify"
              disabled={verificationDisabled}
            />
          </div>
          {timer && (
            <Timer
              text={timer?.text}
              time={timer?.time}
              expired={(e) => timer?.expired && timer.expired(e)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationSet;

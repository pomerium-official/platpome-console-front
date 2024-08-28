import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { numberWithCommas } from '@/libs/baseCommon/utils/common';

export interface InputTextNumberProps extends Omit<InputTextProps, 'onChange'> {
  onChange?: ({
    event,
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    value?: number;
  }) => void;
  /**
   * 천자리 콤마. default true
   */
  thousandComma?: boolean;
}

/**
 * InputText 숫자만 입력가능. InputNumber는 한글이 보이기 떄문
 * @param props
 * @constructor
 */
const InputTextNumber: FC<InputTextNumberProps> = (props) => {
  const thousandComma = props.thousandComma ?? true;
  const [innerValue, setInnerValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value || '');

  const newDotPosition = useRef<number>();

  useEffect(() => {
    let value = props.value;
    if (value || value === 0) {
      value = value.toString();
      value = value.replace(/[^0-9-.]/g, '');

      if (thousandComma) {
        setInnerValue(numberWithCommas(value));
      } else {
        setInnerValue(value);
      }
    }
  }, [props.value, thousandComma]);

  function fireEvent(e: ChangeEvent<HTMLInputElement>, newValue: string) {
    if (props.onChange) {
      if (newValue === null || newValue === undefined || newValue === '') {
        props.onChange({ event: e, value: undefined });
      } else {
        const numberValue = Number(newValue.replace(/[,]/g, ''));

        props.onChange({
          event: e,
          value: Number.isNaN(numberValue) ? undefined : numberValue,
        });
      }
    }
  }

  const inputTextProps = { ...props };
  delete inputTextProps.thousandComma;

  return (
    <InputText
      {...inputTextProps}
      value={innerValue}
      keyfilter={/[0-9-.]/}
      pattern="[0-9]*"
      onKeyDown={(e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.key === '.') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newDotPosition.current = e.target.selectionStart;
          // console.log('-> newDotPosition.current', newDotPosition.current);
        } else {
          newDotPosition.current = undefined;
        }
      }}
      inputMode="numeric"
      onBlur={(e) => {
        let newValue = e.target.value;
        if (newValue === '-' || newValue === '.') {
          newValue = '';
        }

        if (newValue[newValue.length - 1] === '.') {
          newValue = newValue.slice(0, newValue.length - 1);
        }

        setInnerValue(newValue);
        fireEvent(e, newValue);
      }}
      onChange={(e) => {
        let newValue = e.target.value.replace(/[^0-9-.]/g, '');

        // -가 중간에 있으면 -를 맨 앞으로 붙여준다.
        if (newValue.includes('-')) {
          newValue = '-' + newValue.replace(/[-]/g, '');
        }

        // 맨 앞에 0으로 시작하면 0을 빼준다.
        if (
          newValue.indexOf('-') !== 0 &&
          newValue.length > 1 &&
          newValue.indexOf('0') === 0 &&
          newValue.indexOf('.') !== 1
        ) {
          newValue = newValue.substring(1);
        }

        // 음수 맨 앞에 0으로 시작하면 0을 빼준다.
        if (
          newValue.indexOf('-') === 0 &&
          newValue.length > 2 &&
          newValue.indexOf('0') === 1 &&
          newValue.indexOf('.') !== 2
        ) {
          newValue = '-' + newValue.substring(2);
        }

        // 소수점이 여러개 인 경우 처리
        // best는 현재 입력된 위치에 .을 살리고 나머지를 지우는것.
        const commas = e.target.value.match(/\./g);
        const currentCaret = e.target.selectionStart;
        // console.log('-> currentCaret', currentCaret);
        if (commas && commas.length > 1 && currentCaret) {
          newValue = e.target.value.replace(/[.]/g, '');
          newValue =
            newValue.slice(0, currentCaret) +
            '.' +
            newValue.slice(currentCaret);
          // console.log('-> e.target.value newValue', newValue);
        }

        if (
          props.maxLength !== undefined &&
          newValue.length > props.maxLength
        ) {
          return;
        }

        if (
          newValue !== undefined &&
          newValue !== '' &&
          props.max !== undefined &&
          newValue > props.max
        ) {
          newValue = props.max.toString();
        }

        if (
          newValue !== undefined &&
          newValue !== '' &&
          props.min !== undefined &&
          newValue < props.min
        ) {
          newValue = props.min.toString();
        }

        // const parts = newValue.toString().split('.');
        // newValue =
        //   parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        //   (parts[1] ? '.' + parts[1] : '');
        // console.log('-> newValue', newValue);

        if (
          newValue !== null &&
          newValue !== undefined &&
          newValue.indexOf('.') > -1 &&
          newValue.indexOf('.') !== newValue.length - 1
        ) {
          const parts = newValue.toString().split('.');
          newValue =
            parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            (parts[1] ? '.' + parts[1] : '');
        } else if (thousandComma) {
          newValue = numberWithCommas(newValue) ?? '';
        }

        setInnerValue(newValue);
        fireEvent(e, newValue);
      }}
    />
  );
};

export default InputTextNumber;

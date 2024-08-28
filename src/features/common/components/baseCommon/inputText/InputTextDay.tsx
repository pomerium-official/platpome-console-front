import React, { FC, useEffect, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

/**
 * InputText이면서 01~12만 입력 가능한 컴포넌트.
 * @param props
 * @constructor
 */
const InputTextDay: FC<InputTextProps> = (props) => {
  const [innerValue, setInnerValue] = useState<
    string | number | readonly string[] | undefined
  >(props.value || '');

  useEffect(() => {
    setInnerValue(props.value || '');
  }, [props.value]);

  return (
    <InputText
      {...props}
      value={innerValue}
      // type={'number'}
      onChange={(e) => {
        const oldValue = e.target.value;
        const newValue = e.target.value.replace(/[\D]/g, '');
        const regDay = /\b(0?[1-9]|[1|2]\d|3[01])\b/g;

        if (
          props.maxLength !== undefined &&
          newValue.length > props.maxLength
        ) {
          return;
        }

        if (oldValue === newValue) {
          //console.log(newValue);
          const isDay = regDay.test(newValue);
          //console.log(isDay);
          if (newValue === '' || newValue === '0' || isDay) {
            setInnerValue(newValue);
            props.onChange && props.onChange(e);
          }
        }
      }}
      onBlur={(e) => {
        if (e.target.value === '0') {
          e.target.value = '';
          setInnerValue('');
          props.onChange && props.onChange(e);
        } else if (e.target.value.length === 1) {
          e.target.value = `0${e.target.value}`;
          setInnerValue((prevState) => `0${prevState}`);
          props.onChange && props.onChange(e);
        }
      }}
    />
  );
};

export default InputTextDay;

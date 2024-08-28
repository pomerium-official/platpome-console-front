import React, { forwardRef, useEffect, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
/**
 * InputTextCellPhone. 핸드폰 번호 입력. - 표시.
 * @param props
 * @constructor
 */
const InputTextCellPhone = forwardRef<InputText, InputTextProps>(
  (props, ref) => {
    const [value, setValue] = useState<
      string | ReadonlyArray<string> | number
    >();

    useEffect(() => {
      if (props.onChange) {
        setValue(props.value);
      }
    }, [props.onChange, props.value]);

    return (
      <InputText
        {...props}
        ref={ref}
        maxLength={13}
        value={props.onChange ? props.value : value}
        onChange={(e) => {
          const newValue = e.target.value.replace(
            /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
            '$1-$2-$3'
          );
          if (props.onChange) {
            e.target.value = newValue;
            props.onChange && props.onChange(e);
          } else {
            setValue(newValue);
          }

          // setValue(() => {
          //   const newValue = e.target.value.replace(
          //     /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
          //     '$1-$2-$3'
          //   );
          //   props.onChange && props.onChange(e);
          //   return newValue;
          // });
        }}
        keyfilter={/[\d]/}
      />
    );
  }
);
InputTextCellPhone.displayName = 'InputTextCellPhone';
export default InputTextCellPhone;

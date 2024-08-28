import React, { FC, useEffect, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

/**
 * InputText이면서 한글만 입력 컴포넌트
 * @param props
 * @constructor
 */
const InputTextOnlyKor: FC<InputTextProps> = (props) => {
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
      style={{ imeMode: 'active' }}
      onChange={(e) => {
        const oldValue = e.target.value;
        const newValue = e.target.value.replace(
          /[a-z0-9]|[ [\]{}()<>?|`~!@#$%^&*-_+=,.;:"'\\]/g,
          ''
        );
        if (oldValue === newValue) {
          setInnerValue(newValue);
          props.onChange && props.onChange(e);
        }
      }}
    />
  );
};

export default InputTextOnlyKor;

import React, { FC } from 'react';
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton';
import { observer } from 'mobx-react';

export interface RadioWidthTextType {
  radios: {
    label: string;
    value: string;
  }[];
  onChange: (e: RadioButtonChangeParams) => void;
  checked: string;
  disabled?: boolean;
}

const RadioWithText: FC<RadioWidthTextType> = observer(
  ({ radios, onChange, checked, disabled }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: 35 }}>
        {radios.map((value) => {
          return (
            <label htmlFor={value.label} key={value.label}>
              <RadioButton
                inputId={value.label}
                value={value.value}
                onChange={onChange}
                checked={checked === value.value}
                disabled={disabled ?? false}
              />
              <span
                style={{
                  margin: '0 30px 0 10px',
                  opacity: `${disabled ? '.6' : ''}`,
                }}
              >
                {value.label}
              </span>
            </label>
          );
        })}
      </div>
    );
  }
);

export default RadioWithText;

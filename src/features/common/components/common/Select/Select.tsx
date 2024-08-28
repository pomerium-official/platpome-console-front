// platpome-console-front, platpome-keycloak-theme 와 동일한 컴포넌트 사용 중
import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownChangeParams,
  DropdownProps,
} from 'primereact/dropdown';
import styles from './Select.module.scss';
import InputMessage from '../InputMessage';

interface SelectProps extends DropdownProps {
  label?: React.ReactNode;
  result?: 'error' | 'success';
  errorText?: string;
  integral?: boolean;
  onChange?: (e: DropdownChangeParams) => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  disallowTextTransform?: boolean;
}

const Select = (props: SelectProps) => {
  const newProps = { ...props };
  delete newProps.label;
  delete newProps.result;
  delete newProps.integral;
  delete newProps.onChange;
  delete newProps.onBlur;
  delete newProps.onFocus;
  delete newProps.className;
  delete newProps.disabled;
  delete newProps.style;
  delete newProps.errorText;
  delete newProps.disallowTextTransform;

  props.integral && delete newProps.placeholder;

  const [isActive, setIsActive] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (newProps.value) {
      props.integral && setIsActive(true);
    }
  }, [newProps.value]);

  useEffect(() => {
    const isWheel = (e: any) => {
      if (!e.target.closest('.p-dropdown-panel')) {
        document.body.click();
      }
    };
    window.addEventListener('wheel', isWheel);
    return () => window.removeEventListener('wheel', isWheel);
  }, []);

  return (
    <div
      className={`select ${styles.select}${props.integral ? ` integral` : ''}${
        props.result ? ` ${props.result}` : ''
      }${props.className ? ` ${props.className}` : ''}${
        props.disabled ? ` disabled` : ''
      }${isActive ? ` active` : ''}${isFocus ? ` focus` : ''}`}
      style={props.style}
    >
      <label>
        {props.label && <span className="label">{props.label}</span>}
        <Dropdown
          {...newProps}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
          disabled={props.disabled}
          onFocus={(e) => {
            setIsFocus(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            props.onBlur && props.onBlur(e);
          }}
        />
      </label>
      <InputMessage
        status={props.result}
        text={props.errorText}
        disallowTextTransform={props.disallowTextTransform}
      />
    </div>
  );
};

export default Select;

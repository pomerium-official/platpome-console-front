import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { regexKor } from '@/libs/baseCommon/regex';

interface InputTextUserNameProps extends InputTextProps {
  onTriedKoreanInput?: () => void;
}

/**
 * 로그인 사용자 id
 * @param props
 * @constructor
 */
const InputTextUserName = forwardRef<InputText, InputTextUserNameProps>(
  (props, ref) => {
    const inputRef = useRef<InputText>(null);

    const [innerValue, setInnerValue] = useState<
      string | number | readonly string[] | undefined
    >(props.value || '');

    useEffect(() => {
      if (ref) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref = inputRef;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setInnerValue(props.value || '');
    }, [props.value]);

    const newProps = { ...props };
    delete newProps.onTriedKoreanInput;

    return (
      <InputText
        {...props}
        value={innerValue}
        style={{ imeMode: 'disabled' }}
        type={'email'}
        onChange={(e) => {
          if (regexKor.test(e.target.value)) {
            // TODO 작동 확인 필요
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current?.element?.blur();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current?.element?.focus();
            props.onTriedKoreanInput && props.onTriedKoreanInput();
            return;
          }

          const newValue = e.target.value;
          const regName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,20}$/;
          const checkValid = regName.test(newValue);

          if (checkValid || newValue === '') {
            setInnerValue(newValue.toLocaleLowerCase());
            props.onChange && props.onChange(e);
          }
        }}
      />
    );
  }
);

InputTextUserName.displayName = 'InputTextUserName';

export default InputTextUserName;

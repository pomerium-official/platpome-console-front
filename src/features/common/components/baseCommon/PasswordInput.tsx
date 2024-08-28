import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

export type PasswordInputProps = InputTextProps;

export interface PasswordInputElement {
  inputRef: InputText | null;
}

// InputText를 확장 해서 Props를 InputText컴포넌트에 흘려주는 방법.
// forwardRef로 ref를 이용하는 방법

/**
 *  Deprecated : primereact 의 Password : toggleMask 사용
 *
 */
const PasswordInput = forwardRef<PasswordInputElement, PasswordInputProps>(
  (props, ref) => {
    const inputRef = useRef<InputText>(null);
    useImperativeHandle(ref, () => {
      return { inputRef: inputRef.current };
    });
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    delete props.type;

    return (
      <span className="p-input-icon-right">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <i
          className={`pi ${
            visiblePassword ? 'pi-times' : 'pi-spin pi-spinner'
          }`}
          onClick={() => {
            setVisiblePassword((prevState) => !prevState);
          }}
        />
        <InputText
          {...props}
          ref={inputRef}
          type={visiblePassword ? 'text' : 'password'}
        />
      </span>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

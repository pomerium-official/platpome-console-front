import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
import styles from './InputTextClear.module.scss';

export interface InputTextClearProps extends Omit<InputTextProps, 'onChange'> {
  wrapperStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
}

export interface InputTextClearElementType {
  element: InputText | null;
}

const InputTextClear = forwardRef<
  InputTextClearElementType,
  InputTextClearProps
>((props, ref) => {
  const newProps = { ...props } as any;
  delete newProps.wrapperStyle;

  delete newProps.onChange;
  delete newProps.value;
  const [newValue, setNewValue] = useState<
    string | number | readonly string[]
  >();
  useEffect(() => {
    if (props.value !== undefined) {
      setNewValue(props.value);
    }
  }, [props.value]);

  const newOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    setNewValue(e.target.value || '');
  };

  // 내부에 ref를 외부로 전달해줘야함.
  const inputRef = useRef<InputText>(null);

  useImperativeHandle(
    ref,
    () => {
      return { element: inputRef.current };
    },
    []
  );

  return (
    <div className={styles.inputClear} style={props.wrapperStyle}>
      <InputText
        ref={inputRef}
        {...newProps}
        onChange={newOnChange}
        value={newValue}
      />
      {props.value ? (
        <button
          className={styles.clear}
          onClick={() => {
            setNewValue('');
            if (props.onChange) {
              props.onChange('');
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current?.focus();
          }}
        >
          <img src="/assets/images/btn_clear.svg" alt="인풋 초기화" />
        </button>
      ) : (
        ''
      )}
    </div>
  );
});

export default InputTextClear;

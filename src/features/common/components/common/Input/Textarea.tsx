import React, {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.scss';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  style?: React.CSSProperties;
  integral?: boolean;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  value?: string;
}

const Textarea = ({
  label,
  style,
  integral,
  onChange,
  readOnly,
  maxLength,
  ...props
}: TextareaProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current!.style.height =
        textareaRef.current!.scrollHeight + 2 + 'px';
    }
  }, [props.value]);
  return (
    <div
      className={`textarea inputWrap ${styles.inputWrap}${
        integral ? ' integral' : ''
      }${inputFocus ? ' focus' : ''}${inputFocus && integral ? ' active' : ''}`}
      style={style}
    >
      <label>
        <div className="label">{label}</div>
        <textarea
          {...props}
          readOnly={readOnly}
          ref={textareaRef}
          onChange={(e) => {
            onChange && onChange(e);
            e.target.style.height = '0px';
            e.target.style.height = e.target.scrollHeight + 2 + 'px';
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          maxLength={maxLength}
          style={readOnly ? { background: 'var(--color-191919)' } : {}}
        />
      </label>
    </div>
  );
};

export default Textarea;

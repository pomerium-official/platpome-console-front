import React from 'react';
import styles from './InputMessage.module.scss';

interface InputMessageProps {
  className?: string;
  disallowTextTransform?: boolean;
  text?: string;
  status?: 'success' | 'error';
}

const InputMessage = ({
  className,
  disallowTextTransform,
  status,
  text,
}: InputMessageProps) => {
  if (text === undefined) return null;

  return (
    <p
      className={`input-message ${className} ${styles.resultText} ${
        status === undefined ? '' : styles[status]
      }`}
      style={disallowTextTransform ? { textTransform: 'none' } : {}}
    >
      {text}
    </p>
  );
};

export default InputMessage;

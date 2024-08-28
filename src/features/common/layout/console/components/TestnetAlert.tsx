import React from 'react';
import styles from './TestnetAlert.module.scss';

interface TestnetAlertProps {
  className?: string;
  style?: React.CSSProperties;
}

const TestnetAlert = ({ className, style }: TestnetAlertProps) => {
  return (
    <div
      className={`${styles.testnetAlert}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <p>You are currently using testnet.</p>
    </div>
  );
};

export default TestnetAlert;

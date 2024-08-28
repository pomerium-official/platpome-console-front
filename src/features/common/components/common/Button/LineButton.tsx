import React from 'react';
import styles from './LineButton.module.scss';
import { Button, ButtonProps } from 'primereact/button';

interface LineButtonProps extends ButtonProps {
  styleType: 'neutral' | 'color';
  size: 'xlarge' | 'large' | 'xsmall' | 'small' | 'medium';
  // state: 'disabled' | 'pressed' | 'hover' | 'default';
  className?: string;
}

export const LineButton = ({
  styleType,
  size,
  // state,
  className,
  ...props
}: LineButtonProps): JSX.Element => {
  return (
    <Button
      className={`${styles['line-button']} ${styles[size] ?? ''} ${
        styles[styleType] ?? ''
      }  ${className ?? ''}`}
      {...props}
    />
  );
};

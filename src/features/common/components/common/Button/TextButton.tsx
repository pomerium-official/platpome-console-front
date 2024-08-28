import React from 'react';
import styles from './TextButton.module.scss';
import { Button, ButtonProps } from 'primereact/button';

interface TextButtonProps extends ButtonProps {
  styleType: 'neutral' | 'color';
  size: 'xlarge' | 'large' | 'xsmall' | 'small' | 'medium';
  // state: 'disabled' | 'pressed' | 'hover' | 'default';
  className?: string;
}

export const TextButton = ({
  styleType,
  size,
  // state,
  className,
  ...props
}: TextButtonProps): JSX.Element => {
  return (
    <Button
      className={`${styles['text-button']} ${styles[size] ?? ''} ${
        styles[styleType] ?? ''
      }  ${className ?? ''}`}
      {...props}
    />
  );
};

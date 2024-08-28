import React from 'react';
import styles from './SolidButton.module.scss';
import { Button, ButtonProps } from 'primereact/button';

interface SolidButtonProps extends ButtonProps {
  styleType: 'neutral' | 'color';
  size: 'xlarge' | 'large' | 'xsmall' | 'small' | 'medium';
  // state: 'disabled' | 'pressed' | 'hover' | 'default';
  className?: string;
}

export const SolidButton = ({
  styleType,
  size,
  // state,
  className,
  ...props
}: SolidButtonProps): JSX.Element => {
  return (
    <Button
      className={`p-button p-component ${styles['solid-button']} ${
        styles[size] ?? ''
      } ${styles[styleType] ?? ''}  ${className ?? ''}`}
      {...props}
    />
  );
};

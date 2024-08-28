import React from 'react';
import styles from './GnbMenuButton.module.scss';
import { Button, ButtonProps } from 'primereact/button';

interface GnbMenuButtonProps extends ButtonProps {
  styleType: 'neutral' | 'color';
  size: 'xlarge' | 'large' | 'xsmall' | 'small' | 'medium';
  // state: 'disabled' | 'pressed' | 'hover' | 'default';
  className?: string;
}

export const GnbMenuButton = ({
  styleType,
  size,
  // state,
  className,
  ...props
}: GnbMenuButtonProps): JSX.Element => {
  return (
    <Button
      className={`${styles['gnbmenu-button']} ${styles[size] ?? ''} ${
        styles[styleType] ?? ''
      }  ${className ?? ''}`}
      {...props}
    />
  );
};

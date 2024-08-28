import React, { ReactNode } from 'react';
import styles from './OnlyTextButton.module.scss';
import { Ripple } from 'primereact/ripple';

interface OnlyTextButtonProps {
  usage: 'link' | 'email' | 'button';
  size: 'fourteen-px' | 'sixteen-px';
  className?: string;
  children?: ReactNode;
}

export const OnlyTextButton = ({
  usage,
  size,
  className,
  children,
}: OnlyTextButtonProps): JSX.Element => {
  return (
    <a
      className={`${styles['only-text-button']} ${styles[usage]} ${
        className ?? ''
      }`}
    >
      <div
        className={`${styles['element']} ${styles[`usage-${usage}`]} ${
          styles[size]
        }`}
      >
        {children}
      </div>
      <Ripple />
    </a>
  );
};

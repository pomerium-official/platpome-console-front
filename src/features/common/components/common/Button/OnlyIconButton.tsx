import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import styles from './OnlyIconButton.module.scss';
import { Ripple } from 'primereact/ripple';
import { Button, ButtonProps } from 'primereact/button';

interface OnlyIconButtonProps extends ButtonProps {
  className?: string;
  children?: ReactNode | undefined;
}

export const OnlyIconButton = ({
  className,
  children,
  ...props
}: OnlyIconButtonProps): JSX.Element => {
  return (
    <Button
      className={`${styles['only-icon-button']}  ${className ?? ''}`}
      {...props}
    >
      {children}
      <Ripple />
    </Button>
  );
};

OnlyIconButton.propTypes = {
  state: PropTypes.oneOf(['pressed', 'hover', 'default']),
};

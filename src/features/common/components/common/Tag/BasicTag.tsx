import React, { CSSProperties, ReactNode } from 'react';
import styles from './BasicTag.module.scss';

interface BasicTagProps {
  stateDot?: boolean;
  color:
    | 'l-PK'
    | 'info'
    | 'bl2'
    | 'GR'
    | 'l-NV'
    | 'l-gray'
    | 'l-OR'
    | 'BL'
    | 'l-RD'
    | 'l-VL'
    | 'l-bl3'
    | 'RD'
    | 'success'
    | 'l-PP'
    | 'bl3'
    | 'l-GR'
    | 'error'
    | 'warning'
    | 'OR'
    | 'l-bl2'
    | 'VL'
    | 'PP'
    | 'l-YL'
    | 'NV'
    | 'YL'
    | 'PK'
    | 'l-BL';
  line: 'off' | 'on';
  styleClass: 'round' | 'square';
  className?: string;
  children?: ReactNode | undefined;
  containerStyle?: CSSProperties | undefined;
}

export const BasicTag = ({
  stateDot = true,
  color,
  line,
  styleClass,
  className,
  children,
  containerStyle,
}: BasicTagProps): JSX.Element => {
  return (
    <div
      className={`${styles['basic-tag']} ${line} ${color} ${styleClass} ${
        className ?? ''
      }`}
      style={containerStyle}
    >
      <div className={`${styles.frame}`}>
        {stateDot && <div className={`${styles.ellipse}`} />}

        <div className={`${styles.label}`}>{children}</div>
      </div>
    </div>
  );
};

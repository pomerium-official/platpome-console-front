import React, { FC } from 'react';
import { LayoutColorModeType } from '@/libs/baseCommon/providers/ThemeProvider';

interface AppFooterProps {
  layoutColorMode?: LayoutColorModeType;
}

export const AppFooter: FC<AppFooterProps> = (props) => {
  return (
    <div className="layout-footer">
      <img
        src={
          props.layoutColorMode === 'light'
            ? '/assets/layout/images/Default/logo-dark.svg'
            : '/assets/layout/images/Default/logo-white.svg'
        }
        alt="Logo"
        height="20"
        className="mr-2"
      />
      by
      <span className="font-medium ml-2">PrimeReact</span>
    </div>
  );
};

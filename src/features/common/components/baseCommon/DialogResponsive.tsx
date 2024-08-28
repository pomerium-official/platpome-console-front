import React, { forwardRef, ReactNode, useEffect, useMemo } from 'react';
import { Dialog, DialogProps, DialogBreakpoints } from 'primereact/dialog';

interface DialogResponsiveBreakpoints {
  [key: string]: { width: string; height: string };
}

export interface DialogResponsiveProps
  extends Omit<DialogProps, 'breakpoints'> {
  breakpoints?: DialogResponsiveBreakpoints;
  children?: ReactNode | undefined;
}

const DialogResponsive = forwardRef<Dialog, DialogResponsiveProps>(
  (props, ref) => {
    const { breakpoints, className, ...restProps } = props;

    // width 뿐만아니라 height도 전체화면으로 줄 수 있어야함.
    useEffect(() => {
      const styleElement = document.createElement('style');
      document.head.appendChild(styleElement);

      let innerHTML = '';
      for (const breakpoint in props.breakpoints) {
        innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .dialog{
                            height:${props.breakpoints[breakpoint].height};
                            max-height:100%;
                        }
                    }
                `;
      }
      styleElement.innerHTML = innerHTML;

      return () => {
        document.head.removeChild(styleElement);
      };
    }, [props.breakpoints]);

    const newBreakpoints = useMemo(() => {
      const newBreakPoints: DialogBreakpoints = {};
      if (breakpoints) {
        for (const key in breakpoints) {
          newBreakPoints[key] = breakpoints[key].width;
        }
      }
      return newBreakPoints;
    }, [breakpoints]);

    // dialog에서 breakpoints에 가로사이즈만 받고있으므로 가로사이즈만 넣게 변환

    return (
      <Dialog
        ref={ref}
        {...restProps}
        breakpoints={newBreakpoints}
        className={`dialog ${className ? className : ''}`}
      />
    );
  }
);

DialogResponsive.displayName = 'DialogRersponsive';

export default DialogResponsive;

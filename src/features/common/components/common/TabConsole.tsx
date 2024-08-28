import React, { useEffect, useState } from 'react';
import styles from './TabConsole.module.scss';

interface TabConsoleModelType {
  content?: React.ReactNode;
  onClick?: () => void;
  current?: boolean;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

interface TabConsoleProps {
  style?: React.CSSProperties;
  className?: string;
  model?: TabConsoleModelType[];
  onTabChange?: (e: { index: number }) => void;
}

const TabConsole = ({
  style,
  className,
  model,
  onTabChange,
}: TabConsoleProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (model && model.findIndex((f) => f.current) > -1) {
      setCurrentIdx(model!.findIndex((f) => f.current));
    }
  }, [model]);

  useEffect(() => {
    onTabChange && onTabChange({ index: currentIdx });
  }, [currentIdx]);

  return (
    <div
      className={`${styles.tabConsole} tabConsole${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      <ul>
        {model?.map((v, i) => {
          return (
            <li key={'tabConsole' + new Date() + i}>
              <button
                onClick={() => {
                  v.onClick && v.onClick();
                  setCurrentIdx(i);
                  model?.map((w) => {
                    if (v.content === w.content) {
                      return { ...w, current: true };
                    } else {
                      return { ...w, current: false };
                    }
                  });
                }}
                onMouseEnter={() => v.onMouseEnter && v.onMouseEnter()}
                onMouseLeave={() => v.onMouseLeave && v.onMouseLeave()}
                disabled={v.disabled}
                className={`${v.className ? `${v.className} ` : ''}${
                  currentIdx === i || v.current ? 'current' : ''
                }`}
              >
                {v.content}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabConsole;

import React, { useEffect, useRef, useState } from 'react';
import styles from './ModeSelector.module.scss';

interface ModeSelectorProps {
  selectedValue?: React.ReactNode;
  optionContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  optionState?: (e: boolean) => void;
}

const ModeSelector = ({
  selectedValue,
  optionContent,
  className,
  style,
  arrow = true,
  optionState,
}: ModeSelectorProps) => {
  const [showOption, setShowOption] = useState(false);

  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const optionDelete = (e: any) => {
      if (!selectorRef.current?.contains(e.target)) {
        setShowOption(false);
      }
    };
    window.addEventListener('click', optionDelete);
    return () => window.removeEventListener('click', optionDelete);
  }, []);

  useEffect(() => {
    optionState && optionState(showOption);
  }, [showOption]);

  return (
    <div
      ref={selectorRef}
      className={`${styles.modeSelector} modeSelector${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      <button
        onClick={() => setShowOption(!showOption)}
        className={`selectedValue${arrow ? ' arrow' : ''}`}
      >
        {selectedValue}
      </button>
      {showOption && <div className="options">{optionContent}</div>}
    </div>
  );
};

export default ModeSelector;

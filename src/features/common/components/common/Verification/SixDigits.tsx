import React, { useEffect, useState } from 'react';
import styles from './SixDigits.module.scss';
import Input from '../Input/Input';

interface SixDigitsProps {
  onChange?: (e: string) => void;
  autoInput?: string;
  result?: 'error' | 'success';
  style?: React.CSSProperties;
  boxStyle?: React.CSSProperties;
  className?: string;
}

const SixDigits = ({
  onChange,
  autoInput,
  result,
  style,
  boxStyle,
  className,
}: SixDigitsProps) => {
  const [inputData, setInputData] = useState([
    { num: '' },
    { num: '' },
    { num: '' },
    { num: '' },
    { num: '' },
    { num: '' },
  ]);
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(() => {
      return inputData
        .map((v) => {
          return v.num;
        })
        .reduce((a, b) => a + b);
    });
  }, [inputData]);

  useEffect(() => {
    onChange && onChange(code);
  }, [code]);

  useEffect(() => {
    autoInput &&
      setInputData(
        inputData.map((_v, i) => {
          return { num: autoInput.substring(i, i + 1) };
        })
      );
  }, [autoInput]);

  return (
    <div
      className={`sixDigitsWrap ${styles.sixDigitsWrap}${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={`sixDigits`}
        onClick={(e: any) => {
          const parent = e.target.closest('.sixDigits') as HTMLDivElement;
          const input = (i: number) =>
            parent.childNodes[i].childNodes[0]
              .childNodes[0] as HTMLInputElement;
          if (code.length === 6) {
            input(code.length - 1).focus();
          } else {
            input(code.length).focus();
          }
        }}
      >
        {inputData.map((v, i) => {
          return (
            <Input
              value={v.num}
              onChange={(e) => {
                if (e.target.value.length === 1 && i < inputData.length - 1) {
                  const nextInput = e.target.closest('.inputWrap')?.nextSibling
                    ?.childNodes[0].childNodes[0] as HTMLInputElement;
                  nextInput.focus();
                }
                setInputData((prev) => {
                  return prev.map((w, j) => {
                    if (i === j) {
                      return { ...w, num: e.target.value };
                    } else {
                      return { ...w };
                    }
                  });
                });
              }}
              onKeyDown={(e: any) => {
                if (e.keyCode === 8) {
                  if (e.target.value.length < 1 && i > 0) {
                    const prevInput = e.target.closest('.inputWrap')
                      ?.previousSibling?.childNodes[0]
                      .childNodes[0] as HTMLInputElement;
                    prevInput.focus();
                  }
                }
              }}
              maxLength={1}
              style={boxStyle}
              key={`six-digits${i}`}
            />
          );
        })}
      </div>
      {result && <p className={`resultText ${result}`}>{result}</p>}
    </div>
  );
};

export default SixDigits;

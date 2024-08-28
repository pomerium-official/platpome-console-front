import React, { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  text?: string;
  /**
   * minute
   */
  time?: number;
  expired?: (e: 'expired') => void;
}

const Timer = ({ text = 'Valid time ', time = 2, expired }: TimerProps) => {
  const [minute, setMinute] = useState(time - 1);
  const [second, setSecond] = useState(59);
  const [count, setCount] = useState(time * 60 - 1);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let interval;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!interval) {
      interval = setInterval(() => {
        setSecond((prev) => {
          if (prev === 0) {
            if (minute === 0) {
              return 0;
            } else {
              setMinute((minute) => minute - 1);
              return 59;
            }
          } else {
            return prev - 1;
          }
        });
        if (count > 0) setCount((prev) => prev - 1);
      }, 1000);

      if (count === 0) {
        expired && expired('expired');
        clearInterval(interval);
        interval = undefined;
      }
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };
  }, [count]);

  const renderTime = () => {
    return `${minute < 10 ? `0${minute}` : minute} : ${
      second < 10 ? `0${second}` : second
    }`;
  };
  return (
    <div className={`timer ${styles.timer}`}>
      {text && <p className="text">{text}</p>}
      <strong className="time">{renderTime()}</strong>
    </div>
  );
};

export default Timer;

import React, { CSSProperties, FC, useEffect, useState } from 'react';

/**
 * 타이머 Props
 */
export interface TimerProps {
  /**
   * 변경 될 때 마다 타이머 새로 시작
   */
  flag?: boolean;

  /**
   * 타이머 초
   */
  remainSeconds?: number;

  /**
   * 레이블
   * default : "남은 시간 :"
   */
  label?: string;

  /**
   * 레이블 span className
   */
  labelClassName?: string;

  /**
   * 레이블 span style
   */
  labelStyle?: CSSProperties;

  /**
   * 시간 text span ClassName
   */
  textClassName?: string;

  /**
   * 시간 text span ClassName
   */
  textStyle?: CSSProperties;

  /**
   * 시간초과 메시지
   * default : "시간 초과"
   */
  timeoutMessage?: string;
}

/**
 * 타이머 컴포넌트.
 * @param flag 새로고침 toggleFlag
 * @param remainSeconds 남은 초
 * @param label "남은 시간 : " 레이블
 * @param labelClassName 레이블 클래스
 * @param labelStyle 레이블 스타일
 * @param timeoutMessage 시간초과 메시지
 * @param textClassName 시간초과메시지, 시간표시("00:00") 클래스
 * @param textStyle 시간초과메시지, 시간표시("00:00") 스타일
 * @constructor
 */
const Timer: FC<TimerProps> = ({
  flag,
  remainSeconds = 180,
  label = '남은 시간 :',
  labelClassName = '',
  labelStyle,
  timeoutMessage = '시간 초과',

  textClassName = '',
  textStyle,
}) => {
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(true);

  const [endMessage, setEndMessage] = useState<string>('');

  useEffect(() => {
    if (flag === undefined) return;

    setVisible(true);
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setEndMessage('');
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setEndMessage(timeoutMessage);
          clearInterval(countdown);
        } else {
          setEndMessage('');
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [
    minutes,
    seconds,
    flag,
    setEndMessage,
    setMinutes,
    setSeconds,
    timeoutMessage,
  ]);

  useEffect(() => {
    if (flag === undefined) return;

    const minutes = remainSeconds / 60; //.toFixed(0);
    setMinutes(remainSeconds / 60);

    const seconds = remainSeconds - minutes * 60;
    setSeconds(seconds);
  }, [flag, remainSeconds]);

  if (!visible) return null;

  if (endMessage) {
    return (
      <span className={textClassName} style={textStyle}>
        {endMessage}
      </span>
    );
  }

  return (
    <>
      <span className={labelClassName} style={labelStyle}>
        {label}
      </span>
      <span className={textClassName} style={textStyle}>
        {' '}
        {`0${minutes}`} : {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </>
  );
};

export default Timer;

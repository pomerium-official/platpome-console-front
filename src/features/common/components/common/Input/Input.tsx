// platpome-console-front, platpome-keycloak-theme 와 동일한 컴포넌트 사용 중
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './Input.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { Password } from 'primereact/password';
import { LineButton } from '../Button/LineButton';
import { RefCallBack } from 'react-hook-form/dist/types/form';
import InputMessage from '../InputMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
  className?: string;
  label?: React.ReactNode;
  password?: boolean;
  result?: 'success' | 'error';
  date?: boolean;
  minDetail?: 'century' | 'decade' | 'year' | 'month';
  integral?: boolean;
  onChange?: (e: any) => void;
  errorText?: string;
  file?: boolean;
  defaultFileSrc?: string;
  inputStyle?: React.CSSProperties;
  fileInfoText?: React.ReactNode;
  price?: { blockchainId: string; iconSrc: string };
  clear?: () => void;
  disallowTextTransform?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null> | RefCallBack;
  visibleResult?: boolean;
}

const Input = (props: InputProps) => {
  const newProps = { ...props };
  delete newProps.inputRef;
  delete newProps.type;
  delete newProps.style;
  delete newProps.className;
  delete newProps.label;
  delete newProps.password;
  delete newProps.result;
  delete newProps.date;
  delete newProps.minDetail;
  delete newProps.integral;
  delete newProps.onChange;
  delete newProps.errorText;
  delete newProps.file;
  delete newProps.inputStyle;
  delete newProps.price;
  delete newProps.defaultFileSrc;
  delete newProps.fileInfoText;
  delete newProps.clear;
  delete newProps.disallowTextTransform;
  delete newProps.visibleResult;

  props.integral && delete newProps.placeholder;

  const { inputRef: inputRefProps, visibleResult = true } = props;

  const [dateFocus, setDateFocus] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>();

  const [inputFocus, setInputFocus] = useState(false);

  const inputRef = useRef<any | null>(null); // because IDE version or react-dom version

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [bottom, setBottom] = useState(false);

  const timer = useRef<NodeJS.Timer>();
  const layerTimeout = () => {
    if (props.date) {
      timer.current && clearTimeout(timer.current!);
      timer.current = setTimeout(() => {
        setDateFocus(false);
        setInputFocus(false);
      }, 300);
    }
  };

  useEffect(() => {
    const closeCalendar = (e: any) => {
      // outside click close calendar
      if (
        dateFocus &&
        (!e.target.closest('.inputWrap') || !e.target.closest('.date'))
      ) {
        setDateFocus(false);
      }
    };
    props.date && document.addEventListener('click', closeCalendar);
    return () => document.removeEventListener('click', closeCalendar);
  }, [props.date]);

  useEffect(() => {
    const calendarPos = () => {
      const wHeight = document.body.clientHeight;
      const inputOffset =
        inputRef.current &&
        inputRef.current.closest('.inputWrap')!.getBoundingClientRect().top +
          window.scrollY;
      if (inputOffset && inputOffset > wHeight - 350) {
        setBottom(true);
      }
    };
    props.date &&
      inputRef.current
        ?.closest('.inputWrap')
        ?.addEventListener('mouseenter', calendarPos);
    return () =>
      inputRef.current
        ?.closest('.inputWrap')
        ?.removeEventListener('mouseenter', calendarPos);
  }, []);

  const renderInput = () => {
    if (props.file) {
      return (
        <div className="fileDiv">
          <input
            type="file"
            ref={(ref) => {
              inputFileRef.current = ref;
              if (inputRefProps) {
                if (typeof inputRefProps === 'function') {
                  inputRefProps(ref);
                } else {
                  inputRefProps.current = ref;
                }
              }
            }}
            accept=".jpg,.png"
            onChange={(e) => props.onChange && props.onChange(e)}
          />
          <div
            className="imgDiv"
            style={
              props.defaultFileSrc
                ? {
                    background: `url(${props.defaultFileSrc}) no-repeat center center / cover `,
                  }
                : {}
            }
          />
          <div className="rightDiv">
            {inputFileRef.current && (
              <LineButton
                styleType="neutral"
                size="small"
                label="Upload file"
                onClick={() => inputFileRef.current!.click()}
              />
            )}
            <p>
              {props.fileInfoText ? (
                props.fileInfoText
              ) : (
                <>
                  JPG, PNG <br />
                  128x128 (1:1) Recommended, 3MB Maximum
                </>
              )}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <input
          {...newProps}
          ref={(ref: HTMLInputElement | null) => {
            inputRef.current = ref;
            if (inputRefProps) {
              if (typeof inputRefProps === 'function') {
                inputRefProps(ref);
              } else {
                inputRefProps.current = ref;
              }
            }
          }}
          value={newProps.value}
          onChange={(e) => props.onChange && props.onChange(e)}
          onClick={() => props.date && setInputFocus(true)}
          onFocus={(e) => {
            if (props.date) {
              setDateFocus(true);
            }
            setInputFocus(true);
            newProps.onFocus && newProps.onFocus(e);
          }}
          onBlur={(e) => {
            props.integral
              ? setTimeout(() => {
                  setInputFocus(false);
                }, 150)
              : setInputFocus(false);
            newProps.onBlur && newProps.onBlur(e);
          }}
          style={props.inputStyle}
          onMouseEnter={() =>
            props.date && timer.current && clearTimeout(timer.current!)
          }
          onMouseLeave={() => props.date && layerTimeout()}
        />
      );
    }
  };

  function isDateString(str?: string) {
    if (str) {
      // yyyy-mm-dd 형식의 간단한 정규 표현식 예제
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(str);
    }

    return undefined;
  }

  return (
    <div
      className={`inputWrap ${styles.inputWrap}${
        props.className ? ` ${props.className}` : ''
      }${props.result ? ` ${props.result}` : ''}${props.date ? ` date` : ''}${
        props.integral ? ` integral` : ''
      }${
        props.integral &&
        (selectedDate || inputFocus || inputRef.current?.value || props.result)
          ? ' active'
          : ''
      }${bottom ? ' bottom' : ''}${inputFocus ? ' focus' : ''}${
        inputRef.current?.value ? ' hasValue' : ''
      }${props.price ? ' price' : ''}`}
      style={props.style}
    >
      <label style={props.file ? { width: 'fit-content' } : {}}>
        {props.label && <span className={'label'}>{props.label}</span>}
        {props.password ? (
          <Password
            {...newProps}
            inputRef={(ref: HTMLInputElement | null) => {
              inputRef.current = ref;
              if (inputRefProps) {
                if (typeof inputRefProps === 'function') {
                  inputRefProps(ref);
                } else {
                  inputRefProps.current = ref;
                }
              }
            }}
            onFocus={() => {
              setInputFocus(true);
            }}
            onBlur={(e) => {
              props.integral
                ? setTimeout(() => {
                    setInputFocus(false);
                  }, 150)
                : setInputFocus(false);

              newProps.onBlur && newProps.onBlur(e);
            }}
            feedback={false}
            style={props.inputStyle}
            toggleMask
            onChange={props.onChange}
          />
        ) : (
          <div className="inputDiv">
            {renderInput()}
            {props.clear && (newProps.value as string)?.length > 0 && (
              <button
                onClick={() => props.clear && props.clear()}
                className="clear"
              />
            )}
          </div>
        )}
      </label>
      {visibleResult && props.result && (
        <InputMessage
          status={props.result}
          text={props.errorText ? props.errorText : props.result}
          disallowTextTransform={props.disallowTextTransform}
        />
      )}
      {dateFocus && (
        <div
          className="calendarWrap"
          onMouseEnter={() => timer.current && clearTimeout(timer.current!)}
          onMouseLeave={() => layerTimeout()}
        >
          <Calendar
            onChange={(e: Date | null | [Date | null, Date | null]) => {
              props.date &&
                props.onChange &&
                props.onChange(dayjs(e as Date).format('YYYY-MM-DD'));
              setSelectedDate(dayjs(e as Date).format('YYYY-MM-DD'));
              setDateFocus(false);
            }}
            value={
              isDateString(newProps.value as string)
                ? (newProps.value as string)
                : undefined
            }
            formatMonthYear={(_locale, date) => dayjs(date).format('MMMM YYYY')}
            formatDay={(_locale, date) => dayjs(date).format('D')}
            formatShortWeekday={(_locale, date) => dayjs(date).format('ddd')}
            minDetail={props.minDetail ?? 'month'}
            calendarType="gregory"
          />
        </div>
      )}
      {props.price && (
        <div className="unit">
          <i
            className="symbol"
            style={{ backgroundImage: `url("${props.price.iconSrc}")` }}
          />
          {props.price.blockchainId}
        </div>
      )}
    </div>
  );
};

export default Input;

import React, { FC, useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import dayjs from 'dayjs';
import { ToggleButton } from 'primereact/togglebutton';
import styles from './DateRangePicker.module.css';

/**
 * DateRangePicker Change 이벤트 타입
 */
export interface DateRangePickerChangeEventType {
  /**
   * 시작 날짜. YYYY-MM-DD
   */
  startDate?: string;
  /**
   * 종료 날짜. YYYY-MM-DD
   */
  endDate?: string;
}

/**
 * DateRangePickerProps
 */
export interface DateRangePickerProps {
  /**
   * 시작일
   */
  startDate?: string;
  /**
   * 기본 시작일
   */
  defaultStartDate?: string;
  /**
   * 종료일
   */
  endDate?: string;

  /**
   * 기본 종료일
   */
  defaultEndDate?: string;
  /**
   * 값 변경 이벤트
   * @param e
   */
  onChange: (e: DateRangePickerChangeEventType) => void;

  /**
   * container className
   */
  className?: string;

  /**
   * 버튼 초기화 토글. 토글값 변경시 선택된 버튼 초기화
   */
  resetButtonToggle?: boolean;

  /**
   * 기본 단축 버튼 ID. default 0
   */
  defaultShortcutId?: number;

  /**
   * 우측 버튼 목록. 기본값
   { id: 0, amount: 7, type: 'day', labelName: '7일' },
   { id: 1, amount: 1, type: 'month', labelName: '1개월' },
   { id: 2, amount: 3, type: 'month', labelName: '3개월' },
   { id: 3, amount: 6, type: 'month', labelName: '6개월' },
   { id: 4, amount: 1, type: 'year', labelName: '1년' },
   */
  shortcuts?: Shortcut[];

  /**
   * 기준. 단축 버튼 눌렀을 때 기준. startDate기준 이면 단축버튼 누르면 시작일 기준으로 shortcut만큼 더해줌. 기본값 endDate
   */
  standard?: 'startDate' | 'endDate';

  /**
   * 기준 값. undefined 인 경우, 선택된 값을 유지. ex standard endDate일때, enddate 변경후 enddate 기준으로 시작날짜 변경.
   */
  standardValue?: string;

  /**
   * empty 허용 기본값 true
   */
  allowEmpty?: boolean;
}

/**
 * 기간 설정 단축 버튼
 */
export interface Shortcut {
  id: number;
  amount: number;
  type: 'day' | 'month' | 'year';
  labelName: string;
}

const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * DateRangePicker 컴포넌트
 * @param startDate
 * @param endDate
 * @param onChange
 * @param resetButtonToggle
 * @param className
 * @param shortcuts
 * @constructor
 */
const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  defaultStartDate,
  endDate,
  defaultEndDate,
  onChange,
  standard = 'endDate',
  standardValue,
  className = '',
  defaultShortcutId = 0,
  allowEmpty = true,
  shortcuts = [
    { id: 0, amount: -1, type: 'day', labelName: '전체' },
    { id: 1, amount: 7, type: 'day', labelName: '7일' },
    { id: 2, amount: 1, type: 'month', labelName: '1개월' },
    { id: 3, amount: 3, type: 'month', labelName: '3개월' },
    { id: 4, amount: 6, type: 'month', labelName: '6개월' },
    { id: 5, amount: 1, type: 'year', labelName: '1년' },
  ],
}) => {
  /**
   * 시작 날짜
   */
  const [startDateState, setStartDateState] = useState<string | undefined>(
    defaultStartDate
  );
  /**
   * 종료 날짜
   */
  const [endDateState, setEndDateState] = useState<string | undefined>(
    defaultEndDate
  );
  /**
   * 선택된 기간 버튼 ID
   */
  const [selectedShortcut, setSelectedShortcut] = useState<number | undefined>(
    defaultShortcutId
  );

  // 선택된 기간 버튼 설정
  useEffect(() => {
    if (startDateState === undefined && endDateState === undefined) {
      // 전체
      setSelectedShortcut(0);
      return;
    }
    if (startDateState !== undefined && endDateState !== undefined) {
      const startDayJs = dayjs(startDateState);
      const endDayJs = dayjs(endDateState);
      let hasSelectedShortcut = false;
      for (let i = shortcuts.length - 1; i >= 0; i--) {
        const currentItem = shortcuts[i];
        const diffValue = endDayJs.diff(startDayJs, currentItem.type, true);
        if (diffValue === currentItem.amount) {
          setSelectedShortcut(currentItem.id);
          hasSelectedShortcut = true;
          break;
        }
      }
      if (!hasSelectedShortcut) {
        setSelectedShortcut(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateState, endDateState]);

  // 값 변경 이벤트
  useEffect(() => {
    if (onChange) {
      onChange({ startDate: startDateState, endDate: endDateState });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateState, endDateState]);

  /**
   * 시작 날짜 값이 빈값일때 vaild 처리 상태값
   */
  const [isNotValidStartDate, setIsNotValidStartDate] = useState<boolean>(
    false
  );

  /**
   * 종료 날짜 값이 빈값일때 vaild 처리 상태값
   */
  const [isNotValidEndDate, setIsNotValidEndDate] = useState<boolean>(false);

  // 상위컴포넌트에서 props 전달시 날짜 셋팅
  useEffect(() => {
    if (startDate && endDate) {
      setStartDateState(startDate);
      setEndDateState(endDate);
    }
  }, [startDate, endDate]);

  // startDate 값이 빈값일때 vaild 경고
  useEffect(() => {
    if (allowEmpty) return;
    const emStart = document.createElement('em');
    const targetStart = document.getElementsByClassName('p-calendar')[0];
    emStart.textContent = '시작일을 입력해주세요';

    if (isNotValidStartDate) {
      targetStart.appendChild(emStart);
    }

    return () => {
      emStart.remove();
    };
  }, [allowEmpty, isNotValidStartDate]);

  // endDate 값이 빈값일때 vaild 경고
  useEffect(() => {
    if (allowEmpty) return;
    const emEnd = document.createElement('em');
    const targetEnd = document.getElementsByClassName('p-calendar')[1];
    emEnd.textContent = '종료일을 입력해주세요';

    if (isNotValidEndDate) {
      targetEnd.appendChild(emEnd);
    }

    return () => {
      emEnd.remove();
    };
  }, [allowEmpty, isNotValidEndDate]);

  return (
    <div className={`${className} ${styles.container}`}>
      <Calendar
        dateFormat="yy-mm-dd"
        value={
          startDateState === undefined
            ? undefined
            : dayjs(startDateState).toDate()
        }
        showIcon
        onChange={(e) => {
          if (e.value === null || e.value === undefined) {
            setStartDateState(undefined);
            setIsNotValidStartDate(true);
          } else {
            setIsNotValidStartDate(false);
            setStartDateState(dayjs(e.value as Date).format(DATE_FORMAT));
          }
        }}
        maxDate={endDateState ? dayjs(endDateState).toDate() : undefined}
        className={isNotValidStartDate ? styles.wrong : ''}
        placeholder={'-'}
        // showButtonBar
      />
      <i className={styles.wave}>~</i>
      <Calendar
        dateFormat="yy-mm-dd"
        value={
          endDateState === undefined ? undefined : dayjs(endDateState).toDate()
        }
        showIcon
        minDate={startDateState ? dayjs(startDateState).toDate() : undefined}
        onChange={(e) => {
          if (e.value === undefined || e.value === null) {
            setIsNotValidEndDate(true);
            setEndDateState(undefined);
          } else {
            setIsNotValidEndDate(false);
            setEndDateState(dayjs(e.value as Date).format(DATE_FORMAT));
          }
        }}
        className={isNotValidEndDate ? styles.wrong : ''}
        placeholder={'-'}
        // showButtonBar
      />
      {/*/!*기간 선택 버튼. 7일, 1개월 ...*!/*/}
      {shortcuts.map((v) => (
        <ToggleButton
          key={v.id}
          checked={v.id === selectedShortcut}
          offLabel={v.labelName}
          onLabel={v.labelName}
          onChange={() => {
            setIsNotValidStartDate(false);
            setIsNotValidEndDate(false);

            // 전체 기간
            if (v.amount === -1) {
              setStartDateState(undefined);
              setEndDateState(undefined);
              return;
            }

            // 종료일 기준일 경우 종료일에서 빼준다.
            if (standard === 'endDate') {
              let _endDateState;
              if (standardValue) {
                _endDateState = dayjs();
              } else {
                _endDateState = endDateState ? dayjs(endDateState) : dayjs();
              }
              const newStartDate = _endDateState.subtract(v.amount, v.type);
              setStartDateState(newStartDate.format(DATE_FORMAT));
              setEndDateState(_endDateState.format(DATE_FORMAT));
            } else {
              let _startDateState;

              if (standardValue) {
                _startDateState = dayjs();
              } else {
                _startDateState = startDateState
                  ? dayjs(startDateState)
                  : dayjs();
              }

              const newEndDate = _startDateState.add(v.amount, v.type);
              setStartDateState(_startDateState.format(DATE_FORMAT));
              setEndDateState(newEndDate.format(DATE_FORMAT));
            }
          }}
        />
      ))}
    </div>
  );
};

export default DateRangePicker;

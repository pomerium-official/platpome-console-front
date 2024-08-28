import React, { useEffect, useState } from 'react';
import styles from './FilterDateRange.module.scss';
import dayjs, { ManipulateType } from 'dayjs';
import Input from '@/features/common/components/common/Input/Input';
import { DateConditionType } from './Filter';

export interface DateRangeType {
  field: 'date';
  condition: DateConditionType;
}

interface FilterDateRangeProps {
  selected?: (e: DateRangeType) => void;
  reset?: boolean;
  currentRange?: string;
}

const calcRange = (range: number, unit?: ManipulateType) => {
  if (range === 0) return dayjs(new Date()).format('YYYY.MM.DD');
  return dayjs(new Date()).add(range, unit).format('YYYY.MM.DD');
};

const FilterDateRange = ({
  selected,
  reset,
  currentRange = 'a',
}: FilterDateRangeProps) => {
  const [range, setRange] = useState<{
    id: string;
    label: string;
    value: string;
    checked?: boolean;
  }>();

  const [showCustom, setShowCustom] = useState(false);

  const [customRange, setCustomRange] = useState({ from: '', to: '' });

  const [rangeData, setRangeData] = useState<
    {
      id: string;
      label: string;
      value: string;
      checked: boolean;
    }[]
  >();

  useEffect(() => {
    currentRange === 'a' &&
      rangeData &&
      setRange(rangeData.find((f) => f.id === currentRange));
    setRangeData([
      { id: 'a', label: 'All', value: 'all', checked: currentRange === 'a' },
      {
        id: 't',
        label: 'Today',
        value: calcRange(0),
        checked: currentRange === 't',
      },
      {
        id: '1w',
        label: 'Last 1 week',
        value: calcRange(-1, 'w'),
        checked: currentRange === '1w',
      },
      {
        id: '1M',
        label: 'Last 1 month',
        value: calcRange(-1, 'M'),
        checked: currentRange === '1M',
      },
      {
        id: '3M',
        label: 'Last 3 months',
        value: calcRange(-3, 'M'),
        checked: currentRange === '3M',
      },
      {
        id: 'c',
        label: 'Custom',
        value: 'custom',
        checked: currentRange === 'c',
      },
    ]);
  }, [reset, currentRange]);

  useEffect(() => {
    if (range?.value || customRange.from) {
      if (selected) {
        if (range?.id === 'c') {
          selected({
            field: 'date',
            condition: { from: customRange.from, to: customRange.to, id: 'c' },
          });
        } else {
          selected({
            field: 'date',
            condition: {
              id: range?.id ?? '',
              from: range?.value ?? '',
              to: dayjs(new Date()).format('YYYY-MM-DD'),
            },
          });
        }
      }
    }
  }, [range, customRange, rangeData]);

  return (
    <div className={`filterDateRange ${styles.filterDateRange}`}>
      <div className="buttons">
        {rangeData?.map((v, i) => {
          return (
            <button
              onClick={() => {
                setRange(v);
                if (v.value !== 'custom') {
                  setShowCustom(false);
                } else {
                  setShowCustom(true);
                }
                setRangeData((prev) => {
                  return prev?.map((w, j) => {
                    if (i === j) {
                      return { ...w, checked: true };
                    } else {
                      return { ...w, checked: false };
                    }
                  });
                });
              }}
              className={v.checked ? 'checked' : ''}
              key={`${v.label}${i}`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
      {showCustom && (
        <div className="customSet">
          <Input
            value={customRange.from}
            onChange={(e) =>
              setCustomRange((prev) => {
                return { ...prev, from: e };
              })
            }
            date
            placeholder={calcRange(0)}
          />
          <i className="dash">-</i>
          <Input
            value={customRange.to}
            onChange={(e) => {
              setCustomRange((prev) => {
                return { ...prev, to: e };
              });
            }}
            date
            placeholder={calcRange(0)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterDateRange;

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

export interface NavigatorCalendarType {
  value?: Date | Date[];
  onChange?: (e: CalendarChangeParams) => void;
  yearRange?: string;
  placeholder?: string;
  dateFormat?: string;
}

const NavigatorCalendar: FC<NavigatorCalendarType> = observer(
  ({
    value,
    onChange,
    yearRange = '1920:2040',
    placeholder = '-',
    dateFormat = 'yy-mm-dd',
  }) => {
    // any prime react 가이드
    const monthNavigatorTemplate = (e: any) => {
      return (
        <Dropdown
          value={e.value}
          options={e.options}
          onChange={(event) => {
            e.onChange(event.originalEvent, event.value);
          }}
          style={{ lineHeight: 1 }}
        />
      );
    };

    const yearNavigatorTemplate = (e: any) => {
      return (
        <Dropdown
          value={e.value}
          options={e.options}
          onChange={(event) => {
            e.onChange(event.originalEvent, event.value);
          }}
          className="p-ml-2"
          style={{ lineHeight: 1 }}
        />
      );
    };

    return (
      <Calendar
        value={value}
        onChange={(e: CalendarChangeParams) => {
          if (onChange) {
            onChange(e);
          }
        }}
        monthNavigator
        yearNavigator
        yearRange={yearRange}
        monthNavigatorTemplate={monthNavigatorTemplate}
        yearNavigatorTemplate={yearNavigatorTemplate}
        placeholder={placeholder}
        dateFormat={dateFormat}
      />
    );
  }
);

export default NavigatorCalendar;

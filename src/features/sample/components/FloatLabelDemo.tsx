import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Chips, ChipsChangeParams } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import {
  CountryData,
  CountryService,
} from '@/apis/sample/service/CountryService';

const FloatLabelDemo = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState<number | null>(null);
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState<Date | Date[] | undefined>();
  const [value8, setValue8] = useState('');
  const [value9, setValue9] = useState<any[]>([]);
  const [value10, setValue10] = useState(null);

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  useEffect(() => {
    const countryService = new CountryService();
    countryService.getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const searchCountry = (event: AutoCompleteCompleteMethodParams) => {
    // in a real application, make a request to a remote url with the query and
    // return filtered results, for demo we filter at client side
    const filtered: CountryData[] = [];
    const query = event.query;
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    setFilteredCountries(filtered);
  };

  return (
    <div className="card">
      <h5>Float Label</h5>
      <div className="grid p-fluid mt-3">
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText
              type="text"
              id="inputtext"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
            <label htmlFor="inputtext">InputText</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <AutoComplete
              id="autocomplete"
              value={value6}
              onChange={(e) => setValue6(e.value)}
              suggestions={filteredCountries}
              completeMethod={searchCountry}
              field="name"
            />
            <label htmlFor="autocomplete">AutoComplete</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <Calendar
              inputId="calendar"
              value={value7}
              onChange={(e) => setValue7(e.value)}
            />
            <label htmlFor="calendar">Calendar</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <Chips
              inputId="chips"
              value={value9}
              onChange={(e: ChipsChangeParams) => setValue9(e.value)}
            />
            <label htmlFor="chips">Chips</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputMask
              id="inputmask"
              mask="99/99/9999"
              value={value2}
              onChange={(e) => setValue2(e.value)}
            />
            <label htmlFor="inputmask">InputMask</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputNumber
              id="inputnumber"
              value={value3}
              onValueChange={(e) => setValue3(e.target.value)}
            />
            <label htmlFor="inputnumber">InputNumber</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <span className="p-float-label">
              <InputText
                type="text"
                id="inputgroup"
                value={value4}
                onChange={(e) => setValue4(e.target.value)}
              />
              <label htmlFor="inputgroup">InputGroup</label>
            </span>
          </div>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <Dropdown
              id="dropdown"
              options={cities}
              value={value8}
              onChange={(e) => setValue8(e.value)}
              optionLabel="name"
            />
            <label htmlFor="dropdown">Dropdown</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <MultiSelect
              id="multiselect"
              options={cities}
              value={value10}
              onChange={(e) => setValue10(e.value)}
              optionLabel="name"
            />
            <label htmlFor="multiselect">MultiSelect</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputTextarea
              id="textarea"
              rows={3}
              cols={30}
              value={value5}
              onChange={(e) => setValue5(e.target.value)}
            />
            <label htmlFor="textarea">Textarea</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatLabelDemo;

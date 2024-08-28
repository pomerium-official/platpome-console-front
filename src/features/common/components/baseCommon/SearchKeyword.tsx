import { SearchControlItem } from './SearchPanel';
import React, { FC } from 'react';
import styles from './SearchKeyword.module.css';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';

/**
 * 검색어 컴포넌트. 드롭다운 + 검색인풋 박스로 구성
 */
export interface SearchKeywordProps {
  /**
   * 드롭다운 선택된 값 (key)
   **/
  dropdownValue?: string;

  /**
   * 드롭다운 옵션
   */
  dropdownOptions?: SearchControlItem[];

  /**
   * 드롭다운 선택 값 변경 이벤트
   * @param e
   */
  onDropdownChange?: (e: DropdownChangeParams) => void;

  /**
   * 검색어 입력 값
   */
  inputValue?: string;

  /**
   * 검색어 변경 이벤트
   * @param e
   */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * check Values
   **/
  checkValues?: string[];

  /**
   * check 옵션
   */
  checkOptions?: SearchControlItem[];

  /**
   * check 선택 값 변경 이벤트
   * @param e
   */
  onCheckChange?: (e: CheckboxChangeParams) => void;
}

/**
 * 검색 키워드 컴포넌트
 * @constructor
 */
export const SearchKeyword: FC<SearchKeywordProps> = (props) => {
  const {
    dropdownValue,
    inputValue,
    onInputChange,
    onDropdownChange,
    dropdownOptions,
    checkOptions,
    onCheckChange,
    checkValues,
  } = props;
  return (
    <>
      <Dropdown
        optionLabel="name"
        optionValue="key"
        value={dropdownValue}
        options={dropdownOptions}
        onChange={onDropdownChange}
      />
      <InputText
        className={styles.input}
        value={inputValue}
        onChange={onInputChange}
      />
      {checkOptions?.map((item) => {
        return (
          <div
            key={item.name}
            className={`${styles.radio} p-field-radiobutton`}
          >
            <Checkbox
              inputId={item.name}
              value={item.key}
              onChange={onCheckChange}
              checked={checkValues!.includes(item.key)}
              name={item.name}
            />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        );
      })}
    </>
  );
};

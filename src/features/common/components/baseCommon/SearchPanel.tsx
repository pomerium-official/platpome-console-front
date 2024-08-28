import React, { FC, ReactNode, useEffect, useState } from 'react';
import GridTable from './GridTable';
import GridTableItem from './GridTableItem';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import DateRangePicker from './DateRangePicker';
import styles from './SearchPanel.module.css';
import { Checkbox } from 'primereact/checkbox';
import { SearchKeyword } from './SearchKeyword';
import { v4 } from 'uuid';

type SearchControlType =
  | 'radio'
  | 'dropdown'
  | 'input'
  | 'dateRangePicker'
  | 'checkbox'
  | 'searchKeyword'
  | 'inputAndCheckbox'
  | 'email'
  | 'dropdownDateRangePicker'
  | React.ReactNode;

export interface SearchControlItem {
  name: string;
  key: string;
}

export interface SearchControl {
  /**
   * 검색 컨트롤 레이블
   */
  label: string;
  /**
   * 검색 컨트롤 id. 검색 결과에 들어가는 값도 id에 매칭됩니다.
   */
  id: string;
  /**
   * 컨트롤 종류
   */
  control: SearchControlType;
  /**
   * 컨트롤 Props. 각 컨트롤 종류에 맞게 props를 자유롭게 줄 수 있습니다.
   */
  controlProps?: any;
  /**
   * GridTableItem className
   */
  className: string;
  /**
   * control이 radio나 dropdown인 경우 옵션 목록
   */
  items?: SearchControlItem[];

  /**
   * control이 input인 경우 값.
   */
  value?: string;

  /**
   * 검색어 컨트롤(searchKeyword)에 checkboxItem이 있을 경우 옵션 목록
   */
  checkItems?: SearchControlItem[];
}

/**
 * 검색패널 커스텀 컨트롤 프롭스
 */
export interface SearchCustomControlProps<T> {
  value?: T;
  onChange?: (changedData: any) => void;
}

/**
 * 검색 패널 props
 */
export interface SearchPanelProps {
  /**
   * 패널 제목. 기본값 검색
   */
  panelTitle?: string;
  /**
   * 기본 검색 조건. 초기화시 기본 검색조건으로 돌아감
   */
  defaultSearchCondition: any;
  /**
   * 검색 버튼 눌렀을 때 이벤트.
   * @param searchCondition 검색조건
   */
  onSearchClick: (searchCondition: any) => void;
  /**
   * 초기화 완료 이벤트.
   */
  onReset?: () => void;

  /**
   * 검색 컨트롤 컴포넌트 배열. control의 id와 defaultSearchCondition, searchCondition에 object 값으로 매칭됩니다.
   */
  controls: SearchControl[];

  /**
   * 검색 조건
   */
  searchCondition?: any;
  /**
   * 검색 변경 이벤트. 각 컨트롤러의 값이 변경될 때 발생
   * @param searchCondition
   */
  onChange?: (searchCondition: any) => void;

  /**
   * 검색 안내 메시지
   */
  infoMessage?: ReactNode;
}

/**
 * 검색 패널. 초기화를 누르면 defaultSearchCondition으로 돌아옵니다.
 * @param defaultSearchCondition
 * @param infoMessage
 * @param controls
 * @param onSearchClick
 * @param onReset
 * @param searchConditionProp
 * @param onChange
 * @constructor
 */
export const SearchPanel: FC<SearchPanelProps> = ({
  panelTitle = '검색',
  defaultSearchCondition,
  infoMessage = '',
  controls,
  onSearchClick,
  onReset,
  searchCondition: searchConditionProp,
  onChange,
}) => {
  const [searchCondition, setSearchCondition] = useState<any>(
    _.cloneDeep(defaultSearchCondition)
  );

  useEffect(() => {
    if (searchConditionProp === undefined) return;

    setSearchCondition((prevState: any) => {
      if (_.isEqual(searchConditionProp, prevState)) {
        return prevState;
      } else {
        return searchConditionProp;
      }
    });
  }, [searchConditionProp]);

  useEffect(() => {
    onChange && onChange(searchCondition);
    // eslint-disable-next-line
  }, [searchCondition]);

  if (searchCondition === undefined) return null;

  const renderControl = (searchControl: SearchControl) => {
    const { control, items, id, controlProps } = searchControl;
    if (typeof control === 'function') {
      const Control = control;

      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Control
          value={searchCondition[id]}
          onChange={(changedData: any) => {
            setSearchCondition((prevState: any) => {
              const newState = {
                ...prevState,
              };
              newState[id] = changedData;
              return newState;
            });
          }}
        />
      );
    }

    switch (control) {
      case 'dateRangePicker': {
        return (
          <DateRangePicker
            startDate={searchCondition[id]?.startDate}
            endDate={searchCondition[id]?.endDate}
            onChange={(e) => {
              const { startDate, endDate } = e;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                newState[id] = {
                  startDate,
                  endDate,
                };

                if (_.isEqual(prevState, newState)) {
                  return prevState;
                } else {
                  return newState;
                }
              });
            }}
            {...controlProps}
          />
        );
      }
      case 'radio': {
        return items?.map((item) => {
          return (
            <div className={`${styles.radio} p-field-radiobutton`} key={v4()}>
              <RadioButton
                inputId={item.name}
                value={item.key}
                onChange={(e) => {
                  const value = e.value;
                  setSearchCondition((prevState: any) => {
                    const newState = {
                      ...prevState,
                    };
                    newState[id] = value;
                    // onChange && onChange(id, newState);
                    return newState;
                  });
                }}
                checked={searchCondition[id] === item.key}
                // disabled={item.key === 'R'}
                name={item.name}
                {...controlProps}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        });
      }
      case 'dropdown': {
        return (
          <Dropdown
            optionLabel="name"
            optionValue="key"
            value={searchCondition[id]}
            options={items}
            onChange={(e: DropdownChangeParams) => {
              const value = e.value;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                newState[id] = value;
                // onChange && onChange(id, newState);
                return newState;
              });
              // onChange && onChange(id, searchCondition);
            }}
            {...controlProps}
          />
        );
      }
      case 'checkbox': {
        return items?.map((item) => {
          return (
            <div key={v4()} className={`${styles.radio} p-field-radiobutton`}>
              <Checkbox
                inputId={item.name}
                value={item.key}
                onChange={(e) => {
                  const { value, checked } = e;
                  setSearchCondition((prevState: any) => {
                    const newState = {
                      ...prevState,
                    };
                    if (checked) {
                      newState[id].push(value);
                    } else {
                      newState[id].splice(newState[id].indexOf(value), 1);
                    }

                    // onChange && onChange(id, newState);
                    return newState;
                  });
                }}
                checked={searchCondition[id].includes(item.key)}
                // disabled={item.key === 'R'}
                name={item.name}
                {...controlProps}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        });
      }
      case 'input': {
        return (
          <InputText
            id={id}
            value={searchCondition[id]}
            onChange={(e) => {
              const value = e.target.value;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                newState[id] = value;
                return newState;
              });
            }}
            {...controlProps}
          />
        );
      }
      case 'searchKeyword': {
        return (
          <SearchKeyword
            dropdownOptions={items}
            dropdownValue={searchCondition[id]?.dropdownValue}
            inputValue={searchCondition[id]?.inputValue}
            onInputChange={(e) => {
              const value = e.target.value;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                newState[id].inputValue = value;
                return newState;
              });
            }}
            onDropdownChange={(e) => {
              const value = e.value;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                newState[id].dropdownValue = value;
                return newState;
              });
            }}
            checkOptions={searchControl.checkItems}
            checkValues={searchCondition[id]?.checkValues}
            onCheckChange={(e) => {
              const { value, checked } = e;
              setSearchCondition((prevState: any) => {
                const newState = {
                  ...prevState,
                };
                if (checked) {
                  newState[id].checkValues.push(value);
                } else {
                  newState[id].checkValues.splice(
                    newState[id].checkValues.indexOf(value),
                    1
                  );
                }

                return newState;
              });
            }}
            {...controlProps}
          />
        );
      }
      case 'inputAndCheckbox': {
        return (
          <>
            <InputText
              id={id}
              value={searchCondition[id].inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchCondition((prevState: any) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[id].inputValue = value;
                  return newState;
                });
              }}
              {...controlProps}
            />
            {items?.map((item) => {
              return (
                <div
                  key={item.name}
                  className={`${styles.radio} p-field-radiobutton`}
                >
                  <Checkbox
                    inputId={item.name}
                    value={item.key}
                    onChange={(e) => {
                      const { value, checked } = e;
                      setSearchCondition((prevState: any) => {
                        const newState = {
                          ...prevState,
                        };
                        if (checked) {
                          newState[id].checkValues.push(value);
                        } else {
                          newState[id].checkValues.splice(
                            newState[id].checkValues.indexOf(value),
                            1
                          );
                        }

                        // onChange && onChange(id, newState);
                        return newState;
                      });
                    }}
                    checked={searchCondition[id].checkValues?.includes(
                      item.key
                    )}
                    // disabled={item.key === 'R'}
                    name={item.name}
                    {...controlProps}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              );
            })}
          </>
        );
      }
      case 'email': {
        return (
          <>
            <InputText
              className={styles.emailPart1}
              value={searchCondition[id].part1}
              onChange={(e) => {
                const value = e.target.value;
                setSearchCondition((prevState: any) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[id].part1 = value;
                  return newState;
                });
              }}
              {...controlProps}
            />
            @
            <InputText
              className={styles.emailPart2}
              value={searchCondition[id].part2}
              onChange={(e) => {
                const value = e.target.value;
                setSearchCondition((prevState: any) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[id].part2 = value;
                  return newState;
                });
              }}
              {...controlProps}
            />
          </>
        );
      }
      case 'dropdownDateRangePicker': {
        return (
          <>
            <Dropdown
              optionLabel="name"
              optionValue="key"
              value={searchCondition[id].dropdown}
              options={items}
              onChange={(e: DropdownChangeParams) => {
                const value = e.value;
                setSearchCondition((prevState: any) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[id].dropdown = value;
                  return newState;
                });
              }}
              {...controlProps}
            />
            <DateRangePicker
              className={styles.dropdownDateRangePickerPicker}
              startDate={searchCondition[id]?.range?.startDate}
              endDate={searchCondition[id]?.range?.endDate}
              onChange={(e) => {
                const { startDate, endDate } = e;
                setSearchCondition((prevState: any) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[id].range = {
                    startDate,
                    endDate,
                  };
                  return newState;
                });
              }}
              {...controlProps}
            />
          </>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div>
      <strong className={`contTitle ${styles.title}`}>{panelTitle}</strong>
      {infoMessage && <em className={styles.infoMessage}>{infoMessage}</em>}
      <GridTable className={styles.table}>
        {controls.map((searchControl) => {
          const { id, label, className } = searchControl;
          return (
            <GridTableItem key={id} title={label} className={className}>
              {renderControl(searchControl)}
            </GridTableItem>
          );
        })}
      </GridTable>
      <div className={`${styles.buttons} p-d-flex p-jc-center`}>
        <div className="p-formgroup-inline">
          <div className="p-field">
            <Button
              label="검색"
              onClick={() => onSearchClick && onSearchClick(searchCondition)}
            />
          </div>
          <div className="p-field">
            <Button
              label="초기화"
              onClick={() => {
                setSearchCondition(_.cloneDeep(defaultSearchCondition));
                onReset && onReset();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

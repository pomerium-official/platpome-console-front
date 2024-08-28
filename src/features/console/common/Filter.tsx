import React, { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { DateRangeType } from './FilterDateRange';
import { NFTFilterColumnConditionType } from '@/features/console/nft/components/nft-list/NftList';

interface FilterProps {
  style?: React.CSSProperties;
  onApply?: (e?: ConditionType[]) => void;
  body?: React.ReactNode;
  selectedConditions?: React.ReactNode;
  onClose?: (e: string) => void;
  onReset?: () => void;
  onChangeFilterStatus?: (flag: boolean) => void;
}

export interface DateConditionType {
  from: string;
  to: string;
  id: string;
}

export interface ColumnConditionType {
  name?: string;
  value?: string;
  checked?: boolean;
}

export type FilterConditionType =
  | ColumnConditionType[]
  | NFTFilterColumnConditionType[]
  | DateConditionType;

export type SelectedConditionsType = ConditionType | DateRangeType;

export interface ConditionType {
  field: string;
  condition: FilterConditionType;
}

const Filter = ({
  style,
  onApply,
  body,
  selectedConditions,
  onClose,
  onReset,
  onChangeFilterStatus,
}: FilterProps) => {
  const [showFilter, setShowFilter] = useState(false);

  const [closeHow, setCloseHow] = useState('');

  useEffect(() => {
    if (!showFilter) {
      onClose && onClose(closeHow);
      onChangeFilterStatus && onChangeFilterStatus(false);
    }
  }, [showFilter]);

  return (
    <div className={`filterWrap ${styles.filterWrap}`} style={style}>
      <div className="selectedConditionsWrap">{selectedConditions}</div>
      <button
        onClick={() => {
          onChangeFilterStatus && onChangeFilterStatus(true);
          setShowFilter(true);
        }}
        className="btnFilter"
        style={{
          background: showFilter ? '#934ff7' : '',
        }}
      />
      {showFilter && (
        <div className="filterLayer">
          <div className="filterLayerHeader">Data filter</div>
          <div className="filterLayerContent">
            {body}
            {/* <Accordion items={newItems} /> */}
          </div>
          <div className="filterLayerFooter">
            <LineButton
              onClick={() => {
                setCloseHow('reset');
                setShowFilter(false);
                onReset && onReset();
              }}
              size="xsmall"
              styleType="neutral"
              label="Reset all"
            />
            <SolidButton
              onClick={() => {
                setCloseHow('apply');
                onApply && onApply();
                setShowFilter(false);
              }}
              size="xsmall"
              styleType="color"
              label="Apply"
            />
          </div>
          <button
            onClick={() => {
              setCloseHow('close');
              setShowFilter(false);
            }}
            className="filterLayerClose"
          />
        </div>
      )}
    </div>
  );
};

export default Filter;

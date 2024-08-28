import React, { FC } from 'react';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DropdownTypeLabelValue } from '@/types/common';

/**
 * 관리자 테이블 헤더 Props
 */
export interface AdminTableHeaderProps {
  /**
   * 열 수. 5,10,20,50. default 10
   */
  rowCount?: number;
  /**
   * 열 수 변경 이벤트
   * @param e
   */
  onChangeRowCount?: (e: DropdownChangeParams) => void;
  /**
   * 엑셀 파일 url. url이 없으면 excel버튼이 사라집니다.
   */
  excelUrl?: string;

  /**
   * 열 선택 드롭다운 보임 여부. default: true
   */
  visibleRowDropDown?: boolean;

  /**
   * 정렬 옵션 목록
   */
  sortOptions?: DropdownTypeLabelValue[];

  /**
   * 정렬
   */
  sort?: string;
  /**
   * 정렬 변경
   * @param e
   */
  onChangeSort?: (e: DropdownChangeParams) => void;

  rowPerPage?: DropdownTypeLabelValue[];
}

/**
 * 관리자 테이블 헤더
 * @constructor
 */
export const AdminDataTableHeader: FC<AdminTableHeaderProps> = ({
  rowCount = 10,
  onChangeRowCount,
  excelUrl,
  visibleRowDropDown = true,
  sortOptions,
  sort,
  onChangeSort,
  rowPerPage = [
    { label: '5개씩 보기', value: 5 },
    { label: '10개씩 보기', value: 10 },
    { label: '20개씩 보기', value: 20 },
    { label: '50개씩 보기', value: 50 },
  ],
}) => {
  // - Dropdown으로 row 개수 설정 ⎿ 요소 : 5개, 10개, 20개, 50개 ⎿ Default : 10개씩 보기

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          visibleRowDropDown || sortOptions ? 'space-between' : 'flex-end',
      }}
    >
      <div>
        {visibleRowDropDown && (
          <Dropdown
            options={rowPerPage}
            value={rowCount}
            placeholder="10개씩 보기"
            onChange={onChangeRowCount}
          />
        )}

        {sortOptions && (
          <Dropdown
            style={{ marginLeft: visibleRowDropDown ? 10 : 0 }}
            options={sortOptions}
            value={sort}
            placeholder="정렬"
            onChange={onChangeSort}
          />
        )}
      </div>

      {excelUrl && (
        <a href={excelUrl}>
          <Button
            label="엑셀로 보내기"
            className="p-button-outlined p-button-secondary"
            icon={'pi pi-file-excel'}
            // onClick={onClickExportToExcel}
          />
        </a>
      )}
    </div>
  );
};

import React, { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface TableHeaderProps {
  dataTableRef: React.RefObject<DataTable>;
  excel?: boolean;
  rows?: number;
  onRowPerPageChange?: (e: DropdownChangeParams) => void;
}

/**
 * 게시판 Header, 페이지당 글 수, 엑셀 내보내기
 */
const TableHeader: FC<TableHeaderProps> = ({
  dataTableRef,
  excel,
  rows,
  onRowPerPageChange, //(e: DropdownChangeParams): void?
}) => {
  const exportCSV = () => {
    dataTableRef.current?.exportCSV({ selectionOnly: false });
  };

  const rowPerPage = [
    { label: '10개씩 보기', value: 10 },
    { label: '20개씩 보기', value: 20 },
    { label: '30개씩 보기', value: 30 },
    { label: '50개씩 보기', value: 50 },
    { label: '100개씩 보기', value: 100 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Dropdown
        options={rowPerPage}
        value={rows}
        optionLabel="label"
        placeholder="10개씩 보기"
        onChange={onRowPerPageChange}
      />
      {excel && (
        <Button
          label="엑셀로 보내기"
          className="p-button-outlined p-button-secondary"
          icon={'pi pi-file-excel'}
          onClick={exportCSV}
        />
      )}
    </div>
  );
};

export default TableHeader;

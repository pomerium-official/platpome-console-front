import React, { FC, useRef, useState } from 'react';
import {
  DataTable,
  DataTablePageParams,
  DataTableProps,
} from 'primereact/datatable';
import { AdminDataTableHeader } from './AdminDataTableHeader';
import { Column, ColumnProps } from 'primereact/column';
import { Button } from 'primereact/button';

import styles from './AdminDataTable.module.css';
import { DropdownTypeLabelValue } from '@/types/common';

export interface PageInfoType {
  /**
   * 한 페이지에 보여주는 아이템 열 수
   */
  rows: number;
  /**
   * page. 1부터 시작
   */
  page: number;

  /**
   * 정렬
   */
  sort?: string;
}

export interface AdminDataTableProps extends DataTableProps {
  /**
   * 전체 열 수
   */
  totalRecords?: number;

  /**
   * 페이지, 열 수 변경 이벤트.
   * @param pageInfo
   */
  onPageInfoChange?: (pageInfo: PageInfoType) => void;
  /**
   * 엑셀 url. undefined 인 경우 excel 아이콘 안보임
   */
  excelUrl?: string;

  /**
   * 컬럼 목록
   */
  columns?: ColumnProps[];

  /**
   * 상세 보여주기 여부. default: false
   */
  visibleDetail?: boolean;
  /**
   * 상세 클릭 이벤트
   * @param item
   */
  onDetailClick?: (item: any) => void;

  /**
   * 페이지 보임 여부. default: true
   */
  visiblePage?: boolean;

  /**
   * 검색결과, 검색건수 보임 여부. default: true
   */
  visibleSearchResult?: boolean;

  /**
   * 페이지 관련 정보. onPageInfoChange 와 함께 사용해주세요.
   * default:{ rows: 10, page: 1 }
   */
  pageInfo?: PageInfoType;

  /**
   * 정렬 옵션 목록. undefined인 경우 정렬 옵션 안보임
   */
  sortOptions?: DropdownTypeLabelValue[];

  rowPerPage?: DropdownTypeLabelValue[];

  /**
   * emptyMessage
   */
  emptyMessage?: any;
}

/**
 * 관리자 공통 게시판 목록 테이블
 * @constructor
 */
export const AdminDataTable: FC<AdminDataTableProps> = (props) => {
  const {
    totalRecords,
    // rows = 10,
    onPageInfoChange,
    excelUrl,
    columns,
    visibleDetail = false,
    onDetailClick,
    visiblePage = true,
    visibleSearchResult = true,
    pageInfo = {
      rows: 10,
      page: 1,
    },
    lazy = true,
    sortOptions,
    scrollable = true,
    rowPerPage,
    emptyMessage = '검색 결과가 없습니다.',
  } = props;
  const [pageInfoState, setPageInfo] = useState<PageInfoType>(pageInfo);
  // console.log('-> pageInfo', pageInfo);

  // onPageInfoChange가 있을 경우 pageInfo와 함께 지정하여 controlled 방식으로 동작.
  const pageInfoInnerState = onPageInfoChange ? pageInfo : pageInfoState;
  // console.log('-> pageInfoInnerState', pageInfoInnerState);

  const dataTableRef = useRef<DataTable>(null);
  // useEffect(() => {
  //   if (dataTableRef.current) {
  //     const dataTable = dataTableRef.current!.container!;
  //     const foot = dataTable.querySelector('.p-datatable-footer');
  //     if (foot) {
  //       const parent = foot.parentNode;
  //       const footPrev = parent!.querySelector('.p-paginator');
  //       parent!.insertBefore(foot, footPrev);
  //     }
  //   }
  // }, []);

  const first = (pageInfoInnerState.page - 1) * pageInfoInnerState.rows;

  const newProps = { ...props };
  delete newProps.scrollable;

  return (
    <>
      {visibleSearchResult && (
        <>
          <strong className="contTitle">총 검색 결과 : {totalRecords}개</strong>
          {/*<strong className="smallTitle">검색 건수: {totalRecords}건</strong>*/}
        </>
      )}

      <DataTable
        {...newProps}
        className={`${scrollable ? styles.horizontalScroll : ''} ${
          props.className
        }`}
        ref={dataTableRef}
        header={
          <AdminDataTableHeader
            rowPerPage={rowPerPage}
            rowCount={pageInfoInnerState.rows}
            visibleRowDropDown={visiblePage}
            sortOptions={sortOptions}
            sort={pageInfoInnerState.sort}
            onChangeSort={(e) =>
              setPageInfo((prevState) => {
                const newState = {
                  ...prevState,
                  page: 1,
                  first: 0,
                  sort: e.target.value,
                };
                onPageInfoChange && onPageInfoChange(newState);
                return newState;
              })
            }
            onChangeRowCount={(e) => {
              setPageInfo((prevState) => {
                const newState = {
                  ...prevState,
                  page: 1,
                  first: 0,
                  rows: e.target.value,
                };
                onPageInfoChange && onPageInfoChange(newState);
                return newState;
              });
            }}
            excelUrl={excelUrl}
          />
        }
        lazy={lazy} // 비동기로 데이터를 가져옴
        paginator={visiblePage} // 페이지 사용
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" // 페이지에 표시될 템플릿
        rows={visiblePage ? pageInfoInnerState.rows : undefined} // 보여줄 열 수
        totalRecords={visiblePage ? totalRecords : undefined} // 전체 열 수
        first={first} // 페이지의 첫번째 index
        onPage={(e: DataTablePageParams) => {
          let page;
          if (e.page !== undefined) {
            page = e.page + 1;
          } else {
            page = 0;
          }

          e.page = page;

          onPageInfoChange &&
            onPageInfoChange({ ...e, page, sort: pageInfoInnerState.sort });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPageInfo(e);
        }}
        rowHover={true}
        emptyMessage={emptyMessage}
      >
        {columns
          ?.filter((c) => c.field !== 'detail')
          ?.map((column) => (
            <Column key={column.field} {...column} />
          ))}
        {visibleDetail && (
          <Column
            field={'detail'}
            body={(item: any) => (
              <Button
                label="상세보기"
                onClick={() => {
                  onDetailClick && onDetailClick(item);
                }}
                className="p-button-outlined"
              />
            )}
            header=""
            {...columns?.find((column) => column.field === 'detail')}
          />
        )}
      </DataTable>
    </>
  );
};

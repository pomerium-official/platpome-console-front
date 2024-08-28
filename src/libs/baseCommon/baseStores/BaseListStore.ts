import Router from 'next/router';
import {
  DataTableMultiSortMetaType,
  DataTablePageParams,
  DataTableSelectionChangeParams,
  DataTableSortOrderType,
  DataTableSortParams,
} from 'primereact/datatable';
import { observable } from 'mobx';
import { DropdownChangeParams } from 'primereact/dropdown';
import React, { ChangeEvent } from 'react';
import { BaseStore, IBaseStore } from './BaseStore';
import { alert } from '@/features/common/components/baseCommon/Dialog/Alert';

export interface IBaseSearchParamCommon {
  /**
   * 검색 필드
   */
  searchField?: string;
  /**
   * 검색어
   */
  keyword?: string;

  /**
   * 정렬 필드. deprecated
   */
  sortField?: string;
}

/**
 * 검색 파라미터
 */
export interface IBaseSearchParams extends IBaseSearchParamCommon {
  /**
   * 노출 열 수
   */
  rows?: number;
  /**
   * offset
   */
  first?: number;
  /**
   * deprecated. 정렬 값
   */
  sortOrder?: DataTableSortOrderType;

  /**
   * 정렬.
   */
  sorts?: DataTableMultiSortMetaType;
}

/**
 * 검색 파라미터. query Parameter
 */
export interface IBaseSearchQueryParams extends IBaseSearchParamCommon {
  /**
   * 노출 열 수
   */
  rows?: string;
  /**
   * offset
   */
  first?: string;
  /**
   * 정렬 값. 1이면 asc, -1이면 desc
   */
  sortOrder?: '1' | '0' | '-1';

  /**
   * 정렬. "fieldName1 asc,fieldName2 desc"
   */
  sorts?: string;
}

/**
 * 목록 페이지 스토어 인터페이스
 */
export interface IBaseListStore extends IBaseStore {
  /**
   * 기본 검색 파라미터
   */
  defaultSearchParams: IBaseSearchParams;
  /**
   * 검색 파라미터
   */
  searchParams: IBaseSearchParams;
  /**
   * 목록 불러오기
   */
  load: (params?: any) => void;

  /**
   * 페이지 변경 이벤트 처리기
   * @param e
   */
  handlePageChange: (e: DataTablePageParams) => void;

  /**
   * 검색 필드(제목, 내용 등등 ) 드롭다운 이벤트 변경 처리
   * @param e
   */
  handleSearchFieldChange?: (e: DropdownChangeParams) => void;

  /**
   * 검색 필드 키 다운 이벤트 처리. 엔터시 검색해 주세요
   * @param e
   */
  handleKeywordKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * 검색 필드 값 변경 이벤트 처리
   * @param event
   */
  handleKeywordChange?: (event: ChangeEvent<HTMLInputElement> & string) => void;

  /**
   * 노출 열 수 드롭다운 변경 이벤트 처리
   * @param e
   */
  handleRowPerPageChange?: (e: DropdownChangeParams) => void;

  /**
   * 수정 버튼 클릭 이벤트 처리
   */
  handleEditClick?: () => void;

  /**
   * 삭제 버튼 클릭 이벤트 처리
   */
  handleDeleteClick?: () => void;

  /**
   * 테이블 열 선택 변경 이벤트 처리
   */
  handleSelectionChange?: (e: DataTableSelectionChangeParams) => void;

  /**
   * 검색 버튼 클릭 이벤트 처리
   */
  handleSearchClick: () => void;

  /**
   * 초기화 버튼 클릭 이벤트 처리
   */
  handleSearchClear: () => void;

  /**
   * 정렬 조건 변경 이벤트 처리. DataTable (상단 헤더 정렬 클릭)
   * @param e
   */
  handleSort?: (e: DataTableSortParams) => void;
}

/**
 * 목록 페이지 베이스 스토어
 */
export class BaseListStore<T> extends BaseStore {
  @observable
  data?: T;

  /**
   * url 쿼리 파라미터를 업데이트합니다.
   * @param query
   * @param append false인 경우 기존 query를 교체합니다.
   * @param shallow
   */
  reloadUrlParameter = <T>({
    query,
    append = true,
    shallow = true,
  }: {
    query?: T;
    append?: boolean;
    shallow?: boolean;
  }) => {
    Router.push(
      {
        pathname: Router.pathname,
        query: append ? { ...Router.query, ...query } : { ...query },
      },
      undefined,
      { shallow }
    ).then();
  };

  clearUrlParameter = () => {
    Router.push(
      {
        pathname: Router.pathname,
        query: undefined,
      },
      undefined,
      { shallow: true }
    ).then();
  };

  convertToSortOrder = (sortOrder?: string | null) => {
    let _sortOrder: DataTableSortOrderType;
    if (sortOrder === '1') {
      _sortOrder = 1;
    } else if (sortOrder === '-1') {
      _sortOrder = -1;
    } else if (sortOrder === '0') {
      _sortOrder = 0;
    } else {
      _sortOrder = null;
    }
    return _sortOrder;
  };

  errorAlert = (message: string) => {
    alert(message).then();
  };

  /**
   * 쿼리파라미터의 멀티 정렬을 DataTableMultiSortMeta 파라미터로 변환해줍니다.
   * @param sortQueryString
   */
  convertSortStringToDataTableMultiSortMeta = (sortQueryString?: string) => {
    return sortQueryString?.split(',').map((sqs) => {
      const fv = sqs.split(' ');
      let order: DataTableSortOrderType;
      switch (fv[1]) {
        case 'asc': {
          order = 1;
          break;
        }
        case 'desc': {
          order = -1;
          break;
        }
      }
      return { field: fv[0], order };
    });
  };

  /**
   * 멀티정렬 객체를 쿼리 파라미터로 변경 [{field:"field1", sort:1},{field:"field2", sort:-1}] => "field1 asc,field2 desc"
   * @param multiSortMeta
   */
  convertDataTableMultiSortDataToSortString = (
    multiSortMeta: DataTableMultiSortMetaType
  ) => {
    return multiSortMeta
      ?.map((s) => `${s.field} ${s.order === 1 ? 'asc' : 'desc'}`)
      .join(',');
  };
}

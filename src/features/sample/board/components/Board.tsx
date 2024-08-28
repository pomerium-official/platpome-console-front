import React, { useCallback, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';

import dayjs from 'dayjs';
import { DetailDialog } from './DetailDialog';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Board } from '@/generated/api/api-service';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';

const BoardBiz = observer(() => {
  const { boardBizStore: store } = useStore();

  // // const [selectedItems, setSelectedItems] = useState<Board[] | null>(null);
  // const [globalFilter, setGlobalFilter] = useState<DataTableGlobalFilterType>(
  //   null
  // );

  useUserInfo({ needLogin: true });

  // useEffect(() => {
  //   // private api를 호출하여, refresh 실패시 인증화면으로 넘어갑니다.
  //   // 예외처리를 하고싶으시면, .env에 NEXT_PUBLIC_PUBLIC_PATHS에 넣어주세요.
  //   api.user.me({});
  // }, []);

  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable>(null);

  useEffect(() => {
    store.load();
  }, [store]);

  // const exportCSV = () => {
  //   dt.current?.exportCSV();
  // };

  const leftToolbarTemplate = useCallback(() => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={store.openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={store.confirmDeleteSelected}
            disabled={!store.selectedItems || !store.selectedItems.length}
          />
        </div>
      </React.Fragment>
    );
  }, [store.openNew, store.selectedItems]);

  const rightToolbarTemplate = useCallback(() => {
    return (
      <React.Fragment>
        {/*<FileUpload*/}
        {/*  mode="basic"*/}
        {/*  accept="image/*"*/}
        {/*  maxFileSize={1000000}*/}
        {/*  // label="Import"*/}
        {/*  chooseLabel="Import"*/}
        {/*  className="mr-2 inline-block"*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  label="Export"*/}
        {/*  icon="pi pi-upload"*/}
        {/*  className="p-button-help"*/}
        {/*  onClick={exportCSV}*/}
        {/*/>*/}
      </React.Fragment>
    );
  }, []);

  const idBodyTemplate = useCallback((rowData: Board) => {
    return <>{rowData.id}</>;
  }, []);

  const titleBodyTemplate = useCallback((rowData: Board) => {
    return <>{rowData.title}</>;
  }, []);

  const createdAtBodyTemplate = useCallback((rowData: Board) => {
    return (
      <>{rowData.createdAt && dayjs(rowData.createdAt).format('YYYY-MM-DD')}</>
    );
  }, []);

  const updatedAtBodyTemplate = useCallback((rowData: Board) => {
    return <>{rowData.updatedAt}</>;
  }, []);

  const writerIdBodyTemplate = useCallback(() => {
    return <>{'a'}</>;
  }, []);

  const actionBodyTemplate = useCallback(
    (rowData: Board) => {
      return (
        <div className="actions">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => store.openEdit(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning mt-2"
            onClick={() => store.confirmDeleteItem(rowData)}
          />
        </div>
      );
    },
    [store]
  );

  const header = useCallback(
    () => (
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">Manage Items</h5>
        {/*<span className="block mt-2 md:mt-0 p-input-icon-left">*/}
        {/*  <i className="pi pi-search" />*/}
        {/*  <InputText*/}
        {/*    type="search"*/}
        {/*    onInput={(e) => setGlobalFilter(e.currentTarget.value)}*/}
        {/*    placeholder="Search..."*/}
        {/*  />*/}
        {/*</span>*/}
      </div>
    ),
    []
  );

  return (
    <div className="grid crud-demo">
      <Card title={'인증 필요 페이지 안내'} className={'mb-3'}>
        <Message
          severity="info"
          text="개발로 단계에서 전체 인증을 무시 하시려면, .env에 NEXT_PUBLIC_LOGIN_FREE를 true로 해주세요"
        />
        <br />
        <Message
          severity="info"
          text="개별 인증예외 페이지는, .env에 NEXT_PUBLIC_PUBLIC_PATHS에 추가해주세요."
        />
      </Card>
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          <DataTable
            ref={dt}
            value={store.items}
            selection={store.selectedItems}
            onSelectionChange={store.handleSelectionChange}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
            // globalFilter={globalFilter}
            emptyMessage="No items found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            <Column
              field="id"
              header="ID"
              // sortable
              body={idBodyTemplate}
              headerStyle={{ width: '14%', minWidth: '10rem' }}
            />
            <Column
              field="title"
              header="Title"
              // sortable
              body={titleBodyTemplate}
              headerStyle={{ width: '14%', minWidth: '10rem' }}
            />
            <Column
              field="createdAt"
              header="CreatedAt"
              // sortable
              body={createdAtBodyTemplate}
              headerStyle={{ width: '14%', minWidth: '10rem' }}
            />
            <Column
              field="updatedAt"
              header="UpdatedAt"
              // sortable
              body={updatedAtBodyTemplate}
              headerStyle={{ width: '14%', minWidth: '10rem' }}
            />
            <Column
              field="writerId"
              header="WriterId"
              // sortable
              body={writerIdBodyTemplate}
              headerStyle={{ width: '14%', minWidth: '10rem' }}
            />
            <Column body={actionBodyTemplate} />
          </DataTable>

          <DetailDialog store={store} />
        </div>
      </div>
    </div>
  );
});

export default BoardBiz;

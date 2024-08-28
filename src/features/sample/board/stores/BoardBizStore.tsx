import RootStore from '../../../../RootStore';
import { action, makeObservable, observable } from 'mobx';
import { BaseStore, IBaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { Board } from '@/generated/api/api-service';

import { alertUser, confirmUser } from '@/libs/utils/common';
import { DataTableSelectionChangeParams } from 'primereact/datatable';
import { BaseFormStore } from '@/libs/baseCommon/baseStores/BaseFormStore';
import React from 'react';
import { BoardFormModel } from '../formModels/BoardFormModel';

export default class BoardBizStore extends BaseStore implements IBaseStore {
  @observable
  items?: Board[] = [];

  formStore = new BaseFormStore<BoardFormModel>(new BoardFormModel());

  @observable
  selectedItems: Board[] = [];

  @observable
  submitted = false;

  @observable
  visibleDetail = false;

  @observable
  visibleDeleteItems = false;

  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @action
  init = () => {
    this.items = [];
    this.formStore.init();
  };

  /**
   * 데이터 불러오기
   */
  @action // store에 있는 상태값을 세팅하는 함수에 붙여주세요.
  load = async () => {
    this.rootStore?.showLoading(true);
    // const response = await api.board.getItems();
    this.items = [];
    // this.items = response?.data?.data;
    this.rootStore?.showLoading(false);
  };

  /**
   * 저장. 새로 만들기 및 수정 저장
   */
  @action
  save = async () => {
    this.submitted = true;
    try {
      await this.formStore.validate();
      if (this.formStore.validErrors.size > 0) {
        const message = [...this.formStore.validErrors.values()].join('\r\n');
        await alertUser(message);
        this.formStore.focusFirstInvalidElement();
        return;
      }

      const { content, title, id } = this.formStore.item;
      if (id === -1) {
        // TODO 수정 api 호출
        console.log(content, title);
        // await api.board.saveItem({ content, title });
        await alertUser('저장 성공');
      } else {
        // await api.board.editItem(id, { content, title });
        await alertUser('수정 성공');
      }

      this.formStore.init();
      this.load();
      this.visibleDetail = false;
    } catch (e) {
      alertUser('저장 실패').then();
      console.log(e);
    }
  };

  /**
   * 새로만들기 팝업 열기
   */
  @action
  openNew = () => {
    this.formStore.init();
    this.submitted = false;
    this.visibleDetail = true;
  };

  /**
   * 선택 항목 여러개 삭제
   */
  @action
  confirmDeleteSelected = async () => {
    try {
      const confirmResult = await confirmUser(
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          <span>
            Are you sure you want to delete the selected items? Count:{' '}
            {this.selectedItems.length}
          </span>
        </div>,
        undefined,
        { okButtonLabel: 'Yes', noButtonLabel: 'No' }
      );
      if (confirmResult === 'OK') {
        // TODO delete api호출
        // const res = await api.board.deleteItems(
        //   this.selectedItems.map((b) => b.id)
        // );

        // if (res.data.error.code === '00') {
        alertUser('삭제 성공').then();
        //   this.selectedItems = [];
        // } else {
        //   alertUser(res.data.error.message).then();
        // }
        this.load().then();
      }
    } catch (e) {
      alertUser('삭제 실패').then();
      console.log(e);
    }
  };

  @action
  confirmDeleteItem = async (item: Board) => {
    try {
      const { updatedAt, createdAt, creatorId, content, id, title } = item;

      this.formStore.init();
      this.formStore.item.content = content;
      this.formStore.item.id = id;
      this.formStore.item.title = title ?? '';
      this.formStore.item.creatorId = creatorId;
      this.formStore.item.createdAt = createdAt;
      this.formStore.item.updatedAt = updatedAt;

      const result = await confirmUser(
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {this.formStore.item && (
            <span>
              Are you sure you want to delete <b>{this.formStore.item.title}</b>
              ?
            </span>
          )}
        </div>,
        undefined,
        { okButtonLabel: 'Yes', noButtonLabel: 'No' }
      );
      if (result === 'OK') {
        // const res = await api.board.deleteItems([this.formStore.item.id]);
        // if (res.data.error.code === '00') {
        alertUser('삭제 성공').then();
        //   this.selectedItems = this.selectedItems.filter(
        //     (s) => s.id !== this.formStore.item.id
        //   );
        // } else {
        //   alertUser(res.data.error.message).then();
        // }

        this.load().then();
        this.formStore.init();
      }
    } catch (e) {
      alertUser('삭제 실패').then();
      console.log(e);
    }
  };

  @action
  hideDeleteItemsDialog = () => {
    this.visibleDeleteItems = false;
  };

  @action
  hideEdit = () => {
    this.submitted = false;
    this.visibleDetail = false;
  };

  @action
  openEdit = (item: Board) => {
    const { updatedAt, createdAt, creatorId, content, id, title } = item;

    this.formStore.init();
    this.formStore.item.content = content;
    this.formStore.item.id = id;
    this.formStore.item.title = title ?? '';
    this.formStore.item.creatorId = creatorId;
    this.formStore.item.createdAt = createdAt;
    this.formStore.item.updatedAt = updatedAt;
    this.visibleDetail = true;
  };

  @action
  handleSelectionChange = (e: DataTableSelectionChangeParams) => {
    this.selectedItems = e.value;
  };
}

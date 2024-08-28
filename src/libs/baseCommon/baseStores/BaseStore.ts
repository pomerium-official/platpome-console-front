import RootStore from '@/RootStore';
import { action, observable } from 'mobx';

export interface IBaseStore {
  /**
   * 초기화
   */
  init: () => void;
  /**
   * true: 로딩중. false:로딩 끝. undefined: 초기
   */
  loading?: boolean;
}

export class BaseStore {
  rootStore?: RootStore;

  @observable
  loading?: boolean;

  @action
  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore;
  }
}

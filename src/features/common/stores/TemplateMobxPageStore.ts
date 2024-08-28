import RootStore from '../../../RootStore';
import { action, makeObservable, observable } from 'mobx';
import { BaseStore, IBaseStore } from '@/libs/baseCommon/baseStores/BaseStore';

/**
 * Mobx Template 1. 아래 소스를 복사합니다.
 */
export default class TemplateMobxPageStore
  extends BaseStore
  implements IBaseStore {
  /**
   * !!! TODO 타입은 api generte 후 알맞게 넣어주세요.
   */
  @observable
  items: any = [];

  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @action
  init = () => {
    this.items = [];
  };

  /**
   * 데이터 불러오기
   */
  @action // store에 있는 상태값을 세팅하는 함수에 붙여주세요.
  load = async () => {
    this.rootStore?.showLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    this.items = await response.json();
    this.rootStore?.showLoading(false);
  };
}

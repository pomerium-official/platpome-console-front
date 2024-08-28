import RootStore from '../../../RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
// import type { UserInfo } from '@/types/common';
import { privateApi } from '@/apis';
import Router from 'next/router';
import type { ConsoleMember } from '@/generated/api/api-service';
import { SupportChainId } from '@/generated/api/api-service';

import * as apiService from '@/generated/api/api-service';
import { DEFAULT_CHAIN_ID } from '@/libs/constants';

// type UserInfoType<T extends ManagerMe | UserMe> = T extends ManagerMe
//   ? ManagerMe
//   : UserMe;

/**
 * 공통 스토어
 */
export default class CommonStore {
  constructor(rootStore?: RootStore) {
    // rootStore를 제외하고 observable로 만듭니다.
    makeObservable(this);
    this.rootStore = rootStore;
  }

  // 다른 스토어로 접근 할 수 있도록, 생성시 주입해준 rootStore 객체입니다.
  rootStore?: RootStore;

  defaultExternalWallet = { address: '', balance: '' };

  @observable
  userInfo?: ConsoleMember;

  @observable
  showLoading = false;

  @action
  setShowLoading = (flag: boolean) => {
    this.showLoading = flag;
  };

  @observable
  currentNetwork?: number = undefined;

  @observable
  externalWallet = this.defaultExternalWallet;

  @observable
  consoleWallet?: apiService.FindWalletByAppIdQueryResponse = undefined;

  @observable
  /**
   * string 'console' | 'metamask' ...
   */
  currentWallet = 'console';

  @action
  setCurrentWallet = (wallet: string) => {
    this.currentWallet = wallet;
  };

  @action
  setConsoleWallet = (wallet: apiService.FindWalletByAppIdQueryResponse) => {
    this.consoleWallet = wallet;
  };

  @action
  initConsoleWallet = () => {
    this.consoleWallet = undefined;
  };

  @action
  initExternalWallet = () => {
    this.externalWallet = this.defaultExternalWallet;
    this.currentWallet = 'console';
  };

  @computed
  get currentChainId(): SupportChainId {
    if (!this.currentNetwork) {
      if (typeof window !== 'undefined') {
        const chainId = localStorage.getItem('currentChainId');
        if (chainId) {
          return Number(chainId);
        }
      }
    } else {
      return this.currentNetwork;
    }
    return DEFAULT_CHAIN_ID;
  }

  @action
  disConnectExternalWallet = () => {
    this.externalWallet = this.defaultExternalWallet;
  };

  @action
  setExternalWallet = (address: string, balance?: string) => {
    // if (!this.externalWallet.address) {
    this.externalWallet.address = address;
    // }
    if (balance) {
      this.externalWallet.balance = balance;
    }
  };

  @action
  setNetwork = (network: number) => {
    localStorage.setItem('currentChainId', network.toString());
    this.currentNetwork = network;
  };

  @action
  setUserInfo = (userInfo?: ConsoleMember) => {
    this.userInfo = userInfo;
  };

  @action
  getMe = async (redirectCreateDeveloper: boolean) => {
    const { data: response } = await privateApi.members.findMe();
    if (response && response.data) {
      this.setUserInfo(response.data);
    } else if (redirectCreateDeveloper) {
      await Router.push('/console/create-developer');
    }
  };
}

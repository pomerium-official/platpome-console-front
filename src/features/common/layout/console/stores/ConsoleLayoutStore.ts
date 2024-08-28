import RootStore from '@/RootStore';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, makeObservable, observable } from 'mobx';
import * as apiService from '@/generated/api/api-service';
import { privateApi } from '@/apis';

export default class ConsoleLayoutStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @observable
  theme: 'dark' | 'light' = 'dark';

  @observable
  asideCollapse = false;

  @observable
  apps?: apiService.FindManyAppsQueryResponse[];

  @observable
  currentApp?: apiService.FindManyAppsQueryResponse = undefined;

  @action
  setCurrentApp = (appId: number) => {
    if (this.apps) {
      this.currentApp = this.apps.find((app) => appId === app.appId);
    }
  };

  @action
  handleAsideCollapse = () => {
    this.asideCollapse = !this.asideCollapse;
  };

  @action
  loadApps = async (appId: string, force?: boolean) => {
    if (!this.apps || force) {
      const { data: response } = await privateApi.apps.findManyApps({});
      if (response.error.code === '00' && response.data) {
        this.setApps(response.data);
        this.setCurrentApp(Number(appId));
        await this.rootStore?.createNFTStore.getConsoleWallet(Number(appId));
      }
    }
  };

  @action
  setApps = (apps?: apiService.FindManyAppsQueryResponse[]) => {
    this.apps = apps;
  };
}

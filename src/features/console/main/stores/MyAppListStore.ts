import RootStore from '@/RootStore';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { nameSearch } from '@/libs/utils/nameSearch';
import { privateApi } from '@/apis';
import * as apiService from '@/generated/api/api-service';
import { alertConsole } from '@/libs/hooks/dialogConsole';

interface CreateAppInputType {
  appName: string;
  blockchainId: string;
}

export default class MyAppListStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  defaultCreateAppInputs = {
    appName: '',
    blockchainId: 'BNB',
  };

  defaultChainOptions = [
    {
      symbolImageUrl: '/assets/images/symbols/symbol-bnb.png',
      blockchainId: 'BNB',
      name: 'BNB Smart Chain',
    },
  ];

  @observable
  appList: apiService.FindManyAppsQueryResponse[] = [];

  @observable
  total = 0;

  @observable
  createAppInputs: CreateAppInputType = this.defaultCreateAppInputs;

  @observable
  imgFile?: apiService.AttachFile = undefined;

  @observable
  allowModal = false;

  @observable
  chainOptions: apiService.BlockChainResponseType[] = this.defaultChainOptions;

  @observable
  keyword = '';

  @observable
  filteredApps: apiService.FindManyAppsQueryResponse[] = [];

  @action
  init = () => {
    this.allowModal = false;
    this.initCreateAppInfo();
    this.appList = [];
    this.total = 0;
    this.keyword = '';
    this.filteredApps = [];
    this.chainOptions = this.defaultChainOptions;
  };

  @action
  load = async () => {
    const { data: response } = await privateApi.apps.findManyApps({});
    if (response.error.code === '00' && response.data && response.total) {
      this.appList = response.data;
      this.total = response.total;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  initCreateAppInfo = () => {
    this.createAppInputs = this.defaultCreateAppInputs;
    this.imgFile = undefined;
  };

  @computed
  get disableSubmit() {
    if (
      this.createAppInputs.appName &&
      this.createAppInputs.blockchainId &&
      this.imgFile
    ) {
      return (
        this.inputErrors.name === 'appName' &&
        !this.inputErrors.isError &&
        this.imgFile &&
        this.createAppInputs.blockchainId.length > 0
      );
    } else {
      return false;
    }
  }

  @computed
  get inputErrors() {
    return {
      name: 'appName',
      isError:
        this.createAppInputs.appName?.length &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.createAppInputs.appName?.length > 50,
      errorText: 'App name must be 1~50 characters.',
    };
  }

  @action
  openModal = async () => {
    this.allowModal = true;
    const { data: response } = await privateApi.common.findManyBlockChains();
    if (response.error.code === '00' && response.data) {
      this.chainOptions = response.data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  closeModal = () => {
    this.allowModal = false;
    this.initCreateAppInfo();
  };

  @action
  onChangeInput = (key: keyof CreateAppInputType, value: string) => {
    this.createAppInputs[key] = value;
  };

  @action
  onFileChange = async (file: File) => {
    const response = await privateApi.common.createAttachFile({
      file,
    });
    if (response.data.error.code === '00' && response.data.data) {
      this.imgFile = response.data.data;
    } else {
      return alertConsole(
        'Image upload failed',
        'Unable to upload image. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  onKeywordChange = (keyword: string) => {
    this.keyword = keyword;
    const searchedAppNames = nameSearch(keyword, this.appList, 'name');
    this.filteredApps = this.appList.filter((f) =>
      searchedAppNames.find((sa: { name: string }) => sa.name === f.name)
    );
  };

  @action
  submitCreateApp = async () => {
    if (this.imgFile && this.imgFile.fileUrl) {
      const { data: response } = await privateApi.apps.createApp({
        name: this.createAppInputs.appName,
        iconUrl: this.imgFile.fileUrl,
        blockChainId: this.createAppInputs.blockchainId,
      });
      if (response.error.code === '00') {
        await this.load();
        this.rootStore?.consoleLayoutStore.setApps(undefined);
        this.closeModal();
      } else {
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };
}

import RootStore from '@/RootStore';
import { privateApi } from '@/apis';
import type {
  AppDetailResponseType,
  ApplyReleaseRequest,
  CommonResponseFindManyReleaseHistoryResponseArray,
  LanguageOptions,
} from '@/generated/api/api-service';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { alertConsole } from '@/libs/hooks/dialogConsole';

const defaultCheckData = {
  appId: -1,
  promotionalText: '',
  bannerUrl: '',
  cardUrl: '',
  screenUrls: [],
  detailDescription: '',
  siteUrl: '',
  platformUrls: [],
  selectedLanguages: [],
};

export default class ReleaseStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @observable
  appData?: AppDetailResponseType;

  @action
  init = () => {
    this.appData = undefined;
    this.checkData = defaultCheckData;
  };

  @action
  load = async (appId: number) => {
    this.setLoading(true);
    const { data } = await privateApi.apps.findApp(appId);
    if (data.error.code === '00') {
      this.appData = data.data as AppDetailResponseType;
      this.checkData.appId = this.appData?.appId ?? -1;
      this.checkData.promotionalText = data.data?.promotionalText ?? '';
      this.checkData.bannerUrl = data.data?.bannerUrl ?? '';
      this.checkData.cardUrl = data.data?.cardUrl ?? '';
      this.checkData.screenUrls = data.data?.screenUrls ?? [];
      this.checkData.detailDescription = data.data?.detailDescription ?? '';
      this.checkData.siteUrl = data.data?.siteUrl ?? '';
      this.checkData.platformUrls = data.data?.platformUrls ?? [];
      this.checkData.selectedLanguages =
        (data.data?.languages as LanguageOptions[]) ?? [];
      this.stdCheckData = this.checkData;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
    this.setLoading(false);
  };

  @action
  imgUpload = async (file: File) => {
    const { data } = await privateApi.common.createAttachFile({ file });
    if (data.error.code === '00') {
      return data.data?.fileUrl;
    } else {
      await alertConsole(
        'Image upload failed',
        'Unable to upload image. Please try it again.',
        { icon: 'caution' }
      );
      return false;
    }
  };

  stdCheckData?: ApplyReleaseRequest;

  @observable
  checkData: ApplyReleaseRequest = defaultCheckData;

  @action
  handleReleaseInput = (
    key:
      | 'cardUrl'
      | 'promotionalText'
      | 'bannerUrl'
      | 'detailDescription'
      | 'siteUrl',
    e: string
  ) => {
    this.checkData[key] = e;
    // console.log('this.checkData', this.checkData);
  };

  @action
  handleSubmit = async () => {
    const { data } = await privateApi.release.applyRelease(this.checkData);
    if (data.error.code === '00') {
      this.load(this.checkData.appId).then();
      this.loadHistory(this.checkData.appId).then();
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @observable
  releaseHistoryData?: CommonResponseFindManyReleaseHistoryResponseArray;

  @computed
  get readyToSubmit() {
    return (
      !!this.checkData.cardUrl &&
      !!this.checkData.promotionalText &&
      !!this.checkData.bannerUrl &&
      this.checkData.screenUrls.length > 0 &&
      !!this.checkData.detailDescription &&
      !!this.checkData.siteUrl &&
      this.checkData.platformUrls.length > 0 &&
      this.checkData.selectedLanguages.length > 0
    );
  }

  @computed
  get validateOnExit() {
    return !!(
      this.checkData.cardUrl ||
      this.checkData.promotionalText ||
      this.checkData.bannerUrl ||
      this.checkData.screenUrls.length > 0 ||
      this.checkData.detailDescription ||
      this.checkData.siteUrl ||
      this.checkData.platformUrls.length > 0 ||
      this.checkData.selectedLanguages.length > 0
    );
  }

  defaultPageData = { pageSize: 10, pageNo: 1 };

  @observable
  pageData = this.defaultPageData;

  @action
  loadHistory = async (appId: number) => {
    const { data } = await privateApi.release.getReleaseHistories({
      appId,
      pageSize: this.pageData.pageSize,
      pageNo: this.pageData.pageNo,
    });
    if (data.error.code === '00') {
      this.releaseHistoryData = data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  handleCancel = async () => {
    const { data } = await privateApi.release.cancelApplyRelease(
      this.checkData.appId
    );
    if (data.error.code === '00') {
      this.load(this.checkData.appId).then();
      this.loadHistory(this.checkData.appId).then();
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };
}

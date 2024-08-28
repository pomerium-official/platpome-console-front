import RootStore from '@/RootStore';
import { privateApi } from '@/apis';
import type {
  AppWebhookLog,
  CommonResponseAppWebhookLogsQueryResponseArray,
} from '@/generated/api/api-service';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, makeObservable, observable } from 'mobx';
import { alertConsole } from '@/libs/hooks/dialogConsole';

const defaultPageData = { pageNo: 1, pageSize: 10 };

const defaultFilterData = {
  from: undefined,
  to: undefined,
  profile: undefined,
  webhookKindCd: undefined,
  logStatus: undefined,
};

export type ProfileType = 'DEV' | 'PRD';

export type WebhookKineCodeType =
  | 'SWAP'
  | 'TOKEN_IN'
  | 'NFT_MINT'
  | 'REVIEW_RESULT';

export interface FilterDataType {
  from?: string;
  to?: string;
  profile?: WebhookKineCodeType;
  webhookKindCd?: ProfileType;
  logStatus?: string;
}

export default class WebhookLogStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @observable
  currentAppId = -1;

  @observable
  pageData = defaultPageData;

  @observable
  listData?: CommonResponseAppWebhookLogsQueryResponseArray;

  @observable
  filterData?: {
    from?: string;
    to?: string;
    webhookKindCd?: string;
    logStatus?: 'Success' | 'Fail';
  } = defaultFilterData;

  @action
  init = () => {
    this.filterData = defaultFilterData;
  };

  @action
  load = async (appId: number) => {
    this.currentAppId = appId;
    const { data } = await privateApi.webhooks.findManyAppWebhookLogs({
      appId,
      pageNo: this.pageData.pageNo,
      pageSize: this.pageData.pageSize,
      from: this.filterData?.from,
      to: this.filterData?.to,
      profile:
        this.rootStore?.commonStore.currentChainId === 56 ? 'PRD' : 'DEV',
      logStatus: this.filterData?.logStatus,
    });
    if (data.error.code === '00') {
      this.listData = data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  resendAppWebhook = async (no: number, processDt: string) => {
    const { data } = await privateApi.webhooks.resendAppWebhook({
      no,
      processDt,
    });
    if (data.error.code === '00') {
      console.log('');
    } else {
      return alertConsole(
        'Resend failed',
        'Webhook resend failed. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @observable
  detailData?: AppWebhookLog;

  @action
  loadDetail = async (appId: number, no: number) => {
    const { data } = await privateApi.webhooks.findAppWebhookLog(appId, no);
    console.log('data', data);
    if (data.error.code === '00') {
      this.detailData = data.data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };
}

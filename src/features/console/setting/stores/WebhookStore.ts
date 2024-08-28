import RootStore from '@/RootStore';
import { privateApi } from '@/apis';
import type {
  CommonResponseAppWebhookArray,
  CreateAppWebhookRequest,
  Webhook,
} from '@/generated/api/api-service';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { alertConsole, confirmConsole } from '@/libs/hooks/dialogConsole';
import { action, computed, makeObservable, observable } from 'mobx';

const defaultPageData = { pageNo: 1, pageSize: 10 };

const defaultCreateWebhookData = {
  appId: -1,
  profile: '',
  name: '',
  /** 구간암호화 여부 Y/N */
  encryptionYn: '',
  endpointUrl: '',
  webhookId: -1,
};

export default class WebhookStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @observable
  showCreateWebhook = false;

  @observable
  isEdit = false;

  @observable
  createWebhookData: CreateAppWebhookRequest = defaultCreateWebhookData;

  @observable
  pageData = defaultPageData;

  @observable
  webhookTypeOptions?: Webhook[];

  @observable
  webhookListData?: CommonResponseAppWebhookArray;

  @observable
  currentAppId = -1;

  @action
  init = () => {
    this.createWebhookData = defaultCreateWebhookData;
  };

  @computed
  get editDisabled() {
    const std = this.webhookListData?.data?.find(
      (f) =>
        f.webhookId === this.createWebhookData?.webhookId &&
        f.appId === this.createWebhookData.appId &&
        f.profile === this.createWebhookData.profile
    );
    return (
      this.createWebhookData.appId === std?.appId &&
      this.createWebhookData.endpointUrl === std.endpointUrl &&
      this.createWebhookData.name === std.name
    );
  }

  @computed
  get createDisabled() {
    return (
      this.createWebhookData.webhookId < 0 ||
      this.createWebhookData.name.length < 1 ||
      this.createWebhookData.endpointUrl.length < 1
    );
  }

  @action
  loadWebhookList = async (appId: number) => {
    this.currentAppId = appId;
    const { data } = await privateApi.webhooks.findManyAppWebhooks({
      appId,
      profile:
        this.rootStore?.commonStore.currentChainId === 56 ? 'PRD' : 'DEV',
      pageNo: this.pageData.pageNo,
      pageSize: this.pageData.pageSize,
    });
    if (data.error.code === '00') {
      this.webhookListData = data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  loadWebhooks = async () => {
    const { data } = await privateApi.webhooks.findManyWebhooks({});
    if (data.error.code === '00') {
      this.webhookTypeOptions = data.data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  handleWebhookData = (
    key: 'profile' | 'webhookId' | 'name' | 'endpointUrl',
    e: string | number
  ) => {
    if (key === 'webhookId') {
      this.createWebhookData[key] = e as number;
    } else {
      this.createWebhookData[key] = e as string;
    }
  };

  @action
  closeCreateWebhookModal = () => {
    this.isEdit = false;
    this.showCreateWebhook = false;
  };

  @action
  createWebhook = async () => {
    const { data } = await privateApi.webhooks.createAppWebhook({
      ...this.createWebhookData,
      profile:
        this.rootStore?.commonStore.currentChainId === 56 ? 'PRD' : 'DEV',
    });
    if (data.error.code === '00') {
      await alertConsole('Webhook created.', 'Successfully webhook created.', {
        okText: 'Okay',
        icon: 'confirm',
      });
      this.loadWebhookList(this.currentAppId).then();
      this.closeCreateWebhookModal();
    } else {
      return alertConsole(
        'Webhook create failed',
        'Creating webhook failed. Please try it again',
        { icon: 'caution' }
      );
    }
  };

  @action
  editWebhook = async () => {
    const { data } = await privateApi.webhooks.updateAppWebhook({
      appId: this.createWebhookData.appId,
      profile: this.createWebhookData.profile,
      name: this.createWebhookData.name,
      encryptionYn: this.createWebhookData.encryptionYn,
      endpointUrl: this.createWebhookData.endpointUrl,
      webhookId: this.createWebhookData.webhookId,
    });
    if (data.error.code === '00') {
      await alertConsole('Webhook edited', 'Successfully edited.', {
        okText: 'Okay',
        icon: 'confirm',
      });
      this.loadWebhookList(this.currentAppId);
      this.closeCreateWebhookModal();
    } else {
      return alertConsole(
        'Webhook update failed',
        'Updating webhook failed. Please try it again',
        { icon: 'caution' }
      );
    }
  };

  @action
  deleteWebhook = async (target: {
    webhookId: number;
    appId: number;
    profile: 'PRD' | 'DEV';
  }) => {
    const confirm = await confirmConsole(
      'Deleting webhook',
      'Are you sure to delete this webhook?',
      {
        okText: 'Delete',
        icon: 'delete',
      }
    );
    if (confirm === 'ok') {
      const { data } = await privateApi.webhooks.deleteAppWebhook(target);
      if (data.error.code === '00') {
        this.loadWebhookList(this.currentAppId).then();
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

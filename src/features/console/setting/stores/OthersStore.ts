import RootStore from '@/RootStore';
import { privateApi } from '@/apis';
import type {
  App,
  CommonResponseAppApiKeyArray,
} from '@/generated/api/api-service';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import { action, makeObservable, observable } from 'mobx';

export interface UpdateDataType {
  name: string;
  iconUrl: string;
}

export default class OthersStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @observable
  data?: App;

  @action
  loadSetting = async (appId: number) => {
    const { data } = await privateApi.apps.findApp(appId);
    if (data?.data) {
      this.data = (data.data as unknown) as App;
    } else {
      await alertConsole(
        'Image upload failed',
        'Unable to upload image. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  imgUpload = async (file: File) => {
    const { data } = await privateApi.common.createAttachFile({ file });
    if (data.data) {
      return data.data?.fileUrl;
    } else {
      await alertConsole(
        'Image upload failed',
        'Unable to upload image. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  updateApp = async (updateData: UpdateDataType) => {
    const { data } = await privateApi.apps.updateApp(Number(this.data?.appId), {
      name: updateData.name,
      iconUrl: updateData.iconUrl,
    });
    if (data.error.code === '00') {
      this.loadSetting(Number(this.data?.appId)).then();
      this.rootStore?.consoleLayoutStore.loadApps(
        this.data!.appId.toString(),
        true
      );
    } else if (data.error.code === '409') {
      await alertConsole(
        'Failed to update app.',
        'This app is currently in review.',
        {
          icon: 'caution',
          okText: 'ok',
        }
      );
    }
  };

  @observable
  apiKeyData?: CommonResponseAppApiKeyArray;

  @action
  loadApiKeys = async (appId: number) => {
    const { data } = await privateApi.apps.findManyAppApiKeys(appId);
    if (data.error.code === '00') {
      this.apiKeyData = data;
    } else {
      await alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  createApiKey = async (appId: number, name: string) => {
    const { data } = await privateApi.apps.createAppApiKeys({
      appId,
      name,
      apiKeyKindCode: 'REST_API',
    });
    if (data.error.code === '00') {
      this.loadApiKeys(Number(this.data?.appId)).then();
      await alertConsole('API key created.', 'Successfully API key created.', {
        okText: 'Okay',
        icon: 'confirm',
      });
    } else {
      await alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  deleteApiKey = async (apiKeyId: number) => {
    const { data } = await privateApi.apps.deleteAppApiKey(apiKeyId);
    if (data.error.code === '00') {
      this.loadApiKeys(Number(this.data?.appId)).then();
    } else {
      await alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };
}

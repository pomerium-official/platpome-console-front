import RootStore from '@/RootStore';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { privateApi } from '@/apis';
import * as apiService from '@/generated/api/api-service';
import { alertConsole } from '@/libs/hooks/dialogConsole';

interface CreateNFTInputDataType {
  description?: string;
  nftFile?: File;
  imageUrl: string;
  nftName: string;
  nftInfo: string;
  number: string;
  price: string;
  unit: number;
  burnable: boolean;
  listing: boolean;
  allowMint?: boolean;
}

export type NFTType = 'single' | 'duplicate' | 'multiple';

export interface NftItemDataType {
  id?: number;
  imgSrc?: string;
  appName?: string;
  nftName?: string;
  sales?: boolean;
  price?: number;
  symbol?: string;
  total?: number;
  rest?: number;
  type?: string;
}

type CreateNFTStringInputs = Pick<
  CreateNFTInputDataType,
  'description' | 'imageUrl' | 'nftInfo' | 'nftName' | 'price' | 'number'
>;

type CreateNftNumericInputs = Pick<CreateNFTInputDataType, 'number'>;

type CreateNFTBooleanInputs = Pick<
  CreateNFTInputDataType,
  'burnable' | 'listing' | 'allowMint'
>;

export interface NFTAttributeType {
  type?: string;
  value?: string;
}

export interface SelectedNFTInputType {
  tokenId: '';
  price: '';
  total: '';
}

export interface NFTFilterDataType {
  status?: string;
  type?: string;
}

export interface SelectedFilterType {
  status?: string;
  type?: string;
}

export const TRANSACTION_GAS_FEE = 0.000386;
export const DISCOUNT_FEE = 0.000386;
export default class CreateNFTStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  defaultInputData: CreateNFTInputDataType = {
    description: '',
    imageUrl: '',
    nftFile: undefined,
    nftName: '',
    number: '1',
    nftInfo: '',
    price: '',
    unit: 0,
    burnable: false,
    listing: false,
    allowMint: undefined,
  };

  defaultSelectedNFT = {
    tokenId: '',
    price: '',
    total: '',
  };

  @observable
  wallet?: apiService.FindWalletByAppIdQueryResponse;

  @observable
  selectedWallet?: {
    walletAddress: string;
    type: 'console' | 'external';
    balance?: string;
  } = undefined;

  @observable
  nftType: NFTType = 'single';

  @observable
  app?: { id: number; name: string };

  @observable
  inputData: CreateNFTInputDataType = this.defaultInputData;

  @observable
  attributes?: { type?: string; value?: string }[];

  @observable
  nftList?: apiService.NftItemDataType[] = undefined;

  @observable
  selectedNFT = this.defaultSelectedNFT;

  @observable
  createdNFT?: any = undefined;

  @observable
  modalType = '';

  @observable
  selectedFilter?: { status?: string; type?: string };

  @computed
  get validated() {
    return (
      this.inputData.nftName.length > 0 &&
      this.inputData.nftFile &&
      this.nftType &&
      this.inputData.number &&
      this.selectedWallet?.balance &&
      Number(this.selectedWallet.balance) >= TRANSACTION_GAS_FEE - DISCOUNT_FEE
    );
  }

  @computed
  get validatedForBack() {
    return !!(
      this.inputData.nftName.length > 0 ||
      this.inputData.nftFile ||
      (this.inputData.description && this.inputData.description.length > 0) ||
      this.inputData.listing ||
      this.inputData.burnable ||
      (this.attributes && this.attributes.length > 0)
    );
  }

  @action
  setModalType = (value: string) => {
    this.modalType = value;
  };

  @action
  initSelectedNFT = () => {
    this.selectedNFT = this.defaultSelectedNFT;
  };

  @action
  init = () => {
    this.nftList = undefined;
    this.modalType = '';
    this.initWallets();
    this.initInputs();
    this.createdNFT = undefined;
  };

  @action
  initInputs = () => {
    this.wallet = undefined;
    this.nftType = 'single';
    this.inputData = this.defaultInputData;
    this.attributes = [];
  };

  @action
  initWallets = () => {
    this.selectedWallet = undefined;
    this.wallet = undefined;
  };

  @action
  setNFTList = (nftList?: apiService.NftItemDataType[]) => {
    this.nftList = nftList;
  };

  @action
  load = async (force?: boolean) => {
    this.setModalType('');
    if (this.nftList) {
      this.setNFTList(undefined);
    }
    if (
      (force || !this.loading) &&
      this.rootStore?.commonStore.consoleWallet?.address
    ) {
      this.setLoading(true);
      const { data: response } = await privateApi.chains.getOwnedNfTs(
        this.rootStore.commonStore.currentChainId,
        this.rootStore.commonStore.consoleWallet.address
      );
      if (response.error.code === '00' && response.data) {
        this.setNFTList(response.data);
      } else {
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }

    const currentApp = this.rootStore?.consoleLayoutStore.currentApp;
    if (!this.app?.id && currentApp) {
      this.app = { id: currentApp.appId, name: currentApp.name };
    }
    this.setLoading(false);
  };

  @action
  onCloseConfirm = (nftId?: number) => {
    if (nftId) this.createdNFT = { id: nftId };
  };

  @action
  getAppInfo = async (appId: number) => {
    if (!this.app) {
      const { data: response } = await privateApi.apps.findApp(appId);
      if (response.data && response.error.code === '00') {
        const { appId: id, name } = response.data;
        this.app = { id, name };
      } else {
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };

  @action
  setSelectedWallet = (
    walletAddress: string,
    type: 'console' | 'external',
    balance?: string
  ) => {
    this.selectedWallet = { walletAddress, type, balance };
  };

  @action
  setFile = (file: File | undefined) => {
    this.inputData.nftFile = file;
  };

  @action
  setMintInputValue = (key: keyof SelectedNFTInputType, value: string) => {
    this.selectedNFT[key] = value;
  };

  @action
  handleStringInputs = (key: keyof CreateNFTStringInputs, value: string) => {
    this.inputData[key] = value;
  };

  @action
  handleNumericInputs = (key: keyof CreateNftNumericInputs, value: string) => {
    if (Number(value)) {
      this.inputData[key] = value;
    } else {
      this.inputData[key] = '';
    }
  };

  @action
  handleBooleanInputs = (key: keyof CreateNFTBooleanInputs, value: boolean) => {
    this.inputData[key] = value;
  };

  @action
  setSelectedFilter = (key: 'status' | 'type', value: string) => {
    this.selectedFilter = { ...this.selectedFilter, [key]: value };
  };

  @action
  handleProperties = (attributes: NFTAttributeType[]) => {
    this.attributes = attributes;
  };

  @action
  onCancelUpload = () => {
    this.handleStringInputs('imageUrl', '');
    this.setFile(undefined);
  };

  @action
  getConsoleWallet = async (appId: number) => {
    if (this.rootStore?.commonStore.currentChainId) {
      const { data: response } = await privateApi.wallets.findWalletByAppId(
        appId,
        this.rootStore.commonStore.currentChainId
      );

      if (response.error.code === '00' && response.data) {
        this.setConsoleWallet(response.data);
        this.rootStore.commonStore.setConsoleWallet(response.data);
      } else {
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };

  @action
  onResetFilter = () => {
    this.selectedFilter = undefined;
  };

  @action
  setConsoleWallet = (wallet: apiService.FindWalletByAppIdQueryResponse) => {
    this.wallet = wallet;
  };

  @action
  createListing = async () => {
    this.setLoading(true);
    if (
      this.selectedNFT.price &&
      this.selectedNFT.tokenId &&
      this.app &&
      this.app.id &&
      this.rootStore
    ) {
      const { data: response } = await privateApi.chains.createDirectListing(
        {
          chainId: this.rootStore.commonStore.currentChainId,
          appId: this.app.id,
        },
        {
          tokenId: this.selectedNFT.tokenId,
          pricePerToken: this.selectedNFT.price,
          quantity: this.selectedNFT.total,
        }
      );
      if (response.error.code === '00' && response.data) {
        this.initSelectedNFT();
        this.setLoading(false);
        await this.load();
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
    this.setLoading(false);
    return false;
  };

  @action
  removeFromListing = async () => {
    this.setLoading(true);
    if (this.selectedNFT.tokenId && this.app && this.rootStore) {
      const { data: response } = await privateApi.chains.removeFromListing(
        this.rootStore.commonStore.currentChainId,
        {
          appId: this.app.id,
          tokenId: this.selectedNFT.tokenId,
        }
      );
      if (response.error.code === '00' && response.data) {
        this.setLoading(false);
        await this.load();
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
    this.setLoading(false);
    return false;
  };

  @action
  changePrice = async () => {
    this.setLoading(true);
    if (
      this.selectedNFT.tokenId &&
      this.selectedNFT.price &&
      this.app?.id &&
      this.rootStore
    ) {
      const { data: response } = await privateApi.chains.changePriceFromListing(
        this.rootStore.commonStore.currentChainId,
        {
          price: this.selectedNFT.price,
          tokenId: this.selectedNFT.tokenId,
          appId: this.app.id,
        }
      );
      if (response.error.code === '00') {
        this.setLoading(false);
        await this.load();
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
    this.setLoading(false);
    return false;
  };

  @action
  createNFT = async () => {
    if (!this.loading) {
      this.setLoading(true);
      if (
        this.wallet &&
        this.inputData.nftFile &&
        this.rootStore &&
        this.selectedWallet?.walletAddress
      ) {
        const { data: ipfsUploadResponse } = await privateApi.chains.ipfsUpload(
          this.rootStore.commonStore.currentChainId,
          {
            title: this.inputData.nftName,
            description: this.inputData.description ?? '',
            file: this.inputData.nftFile,
          }
        );

        if (
          ipfsUploadResponse.error.code === '00' &&
          ipfsUploadResponse.data?.imageUrl &&
          ipfsUploadResponse.data?.ipfsUrl
        ) {
          const attributes = this.attributes?.map((attribute) => {
            return {
              trait_type: attribute.type ?? '',
              value: attribute.value ?? '',
              display_type: 'string',
            };
          });

          const currentApp = this.rootStore?.consoleLayoutStore.currentApp;

          const { data: response } = await privateApi.chains.mintBatchTo(
            this.rootStore.commonStore.currentChainId,
            this.selectedWallet.walletAddress,
            {
              appId: this.app?.id || currentApp?.appId,
              listing: this.inputData.listing,
              price: this.inputData.price,
              metadatas: [
                {
                  supply: this.inputData.number.toString() || '1',
                  metadata: {
                    name: this.inputData.nftName,
                    description: this.inputData.description,
                    image: ipfsUploadResponse.data.ipfsUrl,
                    properties: attributes,
                  },
                  imageUrl: ipfsUploadResponse.data?.imageUrl,
                },
              ],
            }
          );
          if (response && response.error.code === '00') {
            this.setLoading(false);
            return parseInt(response.data?.[0].id.hex, 16) ?? undefined;
          } else {
            this.setLoading(false);
            return undefined;
          }
        } else {
          await alertConsole(
            'Error',
            'Unknown error occurred. Please try it again.',
            { icon: 'caution' }
          );
        }
      }
    }
    this.setLoading(false);
    return undefined;
  };
}

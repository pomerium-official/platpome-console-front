import RootStore from '@/RootStore';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { privateApi } from '@/apis';
import { SelectedNFTInputType } from '@/features/console/nft/stores/CreateNFTStore';
import * as apiService from '@/generated/api/api-service';
import React from 'react';
import { TransactionDataType } from '@/features/common/components/common/DataTable/Transactions';
import { HoldersDataType } from '@/features/common/components/common/DataTable/TokenHolders';
import { TransactionPageParamsType } from '@/features/console/wallet/stores/WalletDetailStore';
import {
  NFTOwnersResponseType,
  NFTTransactionResponseType,
} from '@/generated/api/api-service';
import { PrebuiltContractType } from '@thirdweb-dev/sdk';
import { supportDApppContractList } from '@/libs/constants';
import { alertConsole } from '@/libs/hooks/dialogConsole';

interface TabItemType {
  id: string;
  label: string;
  activated: boolean;
  icon?: React.ReactNode;
}

export type NFTDetailTargetType = 'holders' | 'activity' | 'transactions';

export default class NFTDetailStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  defaultTabItems = [
    { id: '0', label: 'Overview', activated: true },
    { id: '1', label: 'Properties', activated: false },
    { id: '2', label: 'Holders', activated: false },
    { id: '3', label: 'Activity', activated: false },
    { id: '4', label: 'Transactions', activated: false },
  ];

  defaultTransactionPageParams: TransactionPageParamsType = {
    cursor: undefined,
    pageSize: 100,
    pageNo: 0,
    hasNext: false,
  };

  @action
  initPageParams = () => {
    this.transactionPageParams = this.defaultTransactionPageParams;
  };

  @observable
  transactionPageParams = this.defaultTransactionPageParams;

  @observable
  nftItem?: apiService.NftItemDetailDataType;

  @observable
  price?: string;

  @observable
  modalType = '';

  @observable
  transactionData?: TransactionDataType[] = undefined;

  @observable
  holdersData?: HoldersDataType[] = undefined;

  @observable
  tabItems: TabItemType[] = this.defaultTabItems;

  @observable
  appInfo?: apiService.FindManyAppsQueryResponse;

  @action
  loadAppInfo = () => {
    this.appInfo = this.rootStore?.consoleLayoutStore.currentApp;
  };

  @action
  init = () => {
    this.modalType = '';
    this.nftItem = undefined;
    this.price = undefined;
    this.tabItems = this.defaultTabItems;
    this.transactionData = undefined;
    this.holdersData = undefined;
  };

  @action
  load = async (tokenId: number) => {
    this.setModalType('');
    await this.getNFTDetail(tokenId);
  };

  @action
  onClickPage = async (target: NFTDetailTargetType, type: 'prev' | 'next') => {
    const value = type === 'prev' ? -1 : 1;
    this.transactionPageParams = {
      ...this.transactionPageParams,
      pageNo: this.transactionPageParams.pageNo + value,
    };
    switch (target) {
      case 'holders':
        await this.loadHolders();
        break;
      case 'transactions':
        await this.loadTransactions();
        break;
      case 'activity':
        await this.loadActivities();
    }
  };

  @action
  loadActivities = async () => {
    return;
  };

  @action
  loadTransactions = async () => {
    const currentChainId = this.rootStore?.commonStore.currentChainId;
    const contractAddress =
      currentChainId === 97
        ? process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_TESTNET!
        : process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_MAINNET!;

    if (this.nftItem?.id && this.rootStore?.commonStore.currentChainId) {
      const {
        data: response,
      } = await privateApi.chains.getNftTransactionsByTokenId({
        chainId: this.rootStore!.commonStore.currentChainId,
        contractAddress: contractAddress,
        tokenId: this.nftItem.id.toString(),
        pageCursor: this.transactionPageParams.cursor ?? '',
        pageSize: this.transactionPageParams.pageSize,
      });
      if (response.data && response.error.code === '00') {
        const { cursor, hasNext } = response.data;
        this.setPageParams(cursor, hasNext);
        this.setTransactionData(response.data);
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
  setPageParams = (cursor: string | null, hasNext?: boolean) => {
    this.transactionPageParams = {
      ...this.transactionPageParams,
      cursor,
      hasNext,
    };
  };

  @action
  setTransactionData = (data: NFTTransactionResponseType) => {
    this.transactionData = data.result.map((r) => {
      return {
        txnHash: r.txId,
        from: r.fromAddress,
        to: r.toAddress,
        block: r.blockNumber,
        quantity: r.amount,
        date: new Date(r.blockTimeStamp).getTime(),
        status: 'success',
      };
    });
  };

  @action
  loadHolders = async () => {
    const currentChainId = this.rootStore?.commonStore.currentChainId;
    const contractAddress =
      currentChainId === 97
        ? process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_TESTNET!
        : process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_MAINNET!;
    if (this.nftItem?.id && currentChainId && contractAddress) {
      const { data: response } = await privateApi.chains.getNftOwnersByTokenId({
        chainId: currentChainId,
        contractAddress,
        tokenId: this.nftItem.id.toString(),
        pageCursor: this.transactionPageParams.cursor ?? '',
        pageSize: this.transactionPageParams.pageSize,
      });
      if (response.data && response.error.code === '00') {
        const { cursor, hasNext } = response.data;
        this.setPageParams(cursor, hasNext);
        this.setHoldersData(response.data);
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
  setHoldersData = (data: NFTOwnersResponseType) => {
    this.holdersData = data.result.map((r, index) => {
      return {
        rank: index + 1,
        address: r.ownerAddress,
        amountOfTokensHeld: r.amount,
      };
    });
  };

  @computed
  get currentTabItem() {
    const currentTabItem = this.tabItems.find((f) => f.activated);
    if (currentTabItem) {
      return currentTabItem.label;
    } else {
      return '';
    }
  }

  @action
  setModalType = (modalType: string) => {
    this.modalType = modalType;
  };

  @action
  setTabItems = (tabItems: TabItemType[]) => {
    this.tabItems = tabItems;
  };

  @action
  activateTab = (tabId: string) => {
    this.initPageParams();
    this.tabItems = this.tabItems.map((item) => {
      if (item.id === tabId) {
        return { ...item, activated: true };
      } else {
        return { ...item, activated: false };
      }
    });
  };

  @action
  getNFTDetail = async (tokenId: number) => {
    if (this.rootStore?.commonStore.currentChainId) {
      const { data: response } = await privateApi.chains.getNft(
        this.rootStore.commonStore.currentChainId,
        tokenId
      );

      if (response.error.code === '00' && response.data) {
        this.nftItem = response.data;
        if (!this.nftItem?.properties)
          this.tabItems = this.tabItems.filter((f) => f.label !== 'Properties');
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
  setInputValue = (key: keyof SelectedNFTInputType, value: string) => {
    if (key === 'price') {
      this.price = value;
    }
  };

  @action
  removeFromListing = async () => {
    this.setLoading(true);
    if (this.nftItem?.id && this.rootStore?.commonStore.consoleWallet?.appId) {
      const { data: response } = await privateApi.chains.removeFromListing(
        this.rootStore.commonStore.currentChainId,
        {
          appId: this.rootStore.commonStore.consoleWallet.appId,
          tokenId: this.nftItem.id.toString(),
        }
      );
      if (response.error.code === '00' && response.data) {
        await this.load(this.nftItem.id);
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
        return false;
      }
    }
    this.setLoading(false);
    return false;
  };

  @action
  createListing = async () => {
    this.setLoading(true);
    if (
      this.price &&
      this.nftItem?.id &&
      this.nftItem.total &&
      this.rootStore?.commonStore.consoleWallet?.appId
    ) {
      const { data: response } = await privateApi.chains.createDirectListing(
        {
          chainId: this.rootStore.commonStore.currentChainId,
          appId: this.rootStore.commonStore.consoleWallet.appId,
        },
        {
          tokenId: this.nftItem.id.toString(),
          pricePerToken: this.price,
          quantity: this.nftItem.total,
        }
      );
      if (response.error.code === '00' && response.data) {
        await this.load(this.nftItem.id);
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
        return false;
      }
    }
    this.setLoading(false);
    return false;
  };

  @action
  changePrice = async () => {
    this.setLoading(true);
    if (
      this.nftItem?.id &&
      this.price &&
      this.rootStore?.commonStore.consoleWallet?.appId
    ) {
      const { data: response } = await privateApi.chains.changePriceFromListing(
        this.rootStore.commonStore.currentChainId,
        {
          price: this.price,
          tokenId: this.nftItem.id.toString(),
          appId: this.rootStore.commonStore.consoleWallet.appId,
        }
      );
      if (response.error.code === '00') {
        await this.load(this.nftItem.id);
        return true;
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
        return false;
      }
    }
    this.setLoading(false);
    return false;
  };

  /**
   * NFT 컨트랙트 주소를 가져온다.
   * @param chainId
   * @param prebuiltContract
   */
  getNFTContractAddress = (
    chainId: number,
    prebuiltContract: PrebuiltContractType
  ) => {
    return this.getNFTContractListByChainId(chainId).reduce((acc, item) => {
      if (item.type === prebuiltContract) {
        return item.contractAddress;
      }
      return acc;
    }, '');
  };

  /**
   * NFT 관련 컨트랙트 목록을 가져온다.
   * @param chainId
   */
  getNFTContractListByChainId = (value: number) => {
    return supportDApppContractList.filter((item) => {
      const chainIdNumber: number = item.chainId;
      return chainIdNumber === value;
    });
  };
}

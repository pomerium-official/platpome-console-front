import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import RootStore from '@/RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { privateApi } from '@/apis';
import { WalletActivityType } from '@/features/console/wallet/component/Activities';
import * as apiService from '@/generated/api/api-service';
import {
  AppWalletBalance,
  WalletTransactionsResponseType,
} from '@/generated/api/api-service';
import type { SimulateTxResponse } from '@/generated/api/api-service';
import { TRANSACTION_GAS_FEE } from '@/features/console/nft/stores/CreateNFTStore';
import { alertConsole } from '@/libs/hooks/dialogConsole';

export interface SendTokenInputType {
  address: string;
  amount: string;
  symbol: string;
}
export interface TransactionPageParamsType {
  cursor?: string | null;
  pageNo: number;
  pageSize: number;
  hasNext?: boolean;
}

export default class WalletDetailStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  defaultSearchCondition = {
    rangeId: 'a',
    dateRange: { fromDate: '', toDate: '' },
    condition: '',
  };

  defaultTransactionPageParams: TransactionPageParamsType = {
    cursor: undefined,
    pageSize: 100,
    pageNo: 0,
    hasNext: false,
  };

  defaultSendTokenInput: SendTokenInputType = {
    address: '',
    amount: '',
    symbol: '',
  };

  defaultInputErrors = {
    address: { init: true, error: false },
    amount: { init: false, error: false },
  };

  @observable
  selectedToken?: Omit<AppWalletBalance, 'value'>;

  @observable
  consoleWallet?: apiService.FindWalletByAppIdQueryResponse = undefined;

  @observable
  walletActivities: WalletActivityType[] = [];

  @observable
  appWalletBalances: AppWalletBalance[] = [];

  @observable
  inputErrors = this.defaultInputErrors;

  @observable
  sendTokenInput: SendTokenInputType = this.defaultSendTokenInput;

  @observable
  simulateResponse?: SimulateTxResponse;

  @observable
  searchCondition: {
    rangeId: string;
    dateRange?: { fromDate: string; toDate: string };
    condition?: string;
  } = this.defaultSearchCondition;

  @observable
  transactionPageParams: TransactionPageParamsType = this
    .defaultTransactionPageParams;

  @observable
  errorState = '';

  @action
  setErrorState = (value: string) => {
    this.errorState = value;
  };

  @computed
  get rangeId() {
    return this.searchCondition.rangeId;
  }

  @computed
  get disabled() {
    let result = false;
    if (this.loading) return true;
    for (const [, value] of Object.entries(this.inputErrors)) {
      if (value.init) {
        result = true;
      } else {
        if (value.error) {
          result = true;
        }
      }
    }
    return result;
  }

  @computed
  get notEnoughGas() {
    const walletGasBalance = this.appWalletBalances.find(
      (f) => f.symbol === 'FPMG'
    )?.displayValue;
    if (walletGasBalance && this.selectedToken && this.sendTokenInput.amount) {
      if (Number(walletGasBalance) < TRANSACTION_GAS_FEE) {
        return true;
      }
    }
    return false;
  }

  @action
  init = () => {
    this.errorState = '';
    this.searchCondition = this.defaultSearchCondition;
    this.consoleWallet = undefined;
    this.walletActivities = [];
    this.appWalletBalances = [];
    this.initSendTokenInputs();
    this.initSearchParams();
  };

  @action
  setSelectedToken = (symbol: string) => {
    const token =
      this.appWalletBalances?.find((f) => f.symbol === symbol) ?? undefined;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { value, ...rest } = token;
      this.selectedToken = { ...rest };
      this.setSendTokenInput('symbol', symbol);
    }
  };

  @action
  onClickNext = (key: 'address' | 'amount', errorFlag: boolean) => {
    if (!this.selectedToken || !this.sendTokenInput.amount) {
      this.inputErrors[key] = { init: true, error: errorFlag };
    }
  };

  @action
  initInputErrors = () => {
    this.inputErrors = this.defaultInputErrors;
  };

  @action
  initSendTokenInputs = () => {
    this.inputErrors = this.defaultInputErrors;
    this.sendTokenInput = this.defaultSendTokenInput;
    this.selectedToken = undefined;
  };

  @action
  backToStep0 = () => {
    this.inputErrors = {
      ...this.inputErrors,
      amount: { init: false, error: false },
    };
  };

  @action
  setSendTokenInput = (key: keyof SendTokenInputType, value: string) => {
    this.sendTokenInput[key] = value;
    if (key === 'address' && value) {
      this.inputErrors['address'] = {
        init: false,
        error: !value.startsWith('0x') || value.length !== 42,
      };
    }
    if (key === 'amount') {
      if (value) {
        this.inputErrors['amount'] = {
          init: false,
          error: Number(this.selectedToken?.displayValue) < Number(value),
        };
      } else {
        this.inputErrors['amount'] = { init: false, error: true };
      }
    }
  };

  @action
  initSearchCondition = () => {
    this.searchCondition = this.defaultSearchCondition;
  };

  @action
  onApplySearchCondition = async () => {
    await this.loadWalletActivities();
  };

  @action
  initSearchParams = () => {
    this.initPageParams();
    this.initSearchCondition();
    this.loadWalletActivities().then();
  };

  @action
  onClickPage = async (type: 'prev' | 'next') => {
    const value = type === 'prev' ? -1 : 1;
    this.transactionPageParams = {
      ...this.transactionPageParams,
      pageNo: this.transactionPageParams.pageNo + value,
    };
    await this.loadWalletActivities();
  };

  @action
  onSelectDateRange = (rangeId: string, fromDate: string, toDate: string) => {
    this.initPageParams();
    this.searchCondition.rangeId = rangeId;
    this.searchCondition.dateRange =
      rangeId === 'a' ? undefined : { fromDate, toDate };
  };

  @action
  initPageParams = () => {
    this.transactionPageParams = this.defaultTransactionPageParams;
  };

  @action
  onSelectStatus = (status: string) => {
    this.searchCondition.condition = status;
  };

  @action
  loadAppWalletBalance = async (appId: number) => {
    const { data: response } = await privateApi.apps.getAppWalletBalance(
      this.rootStore!.commonStore.currentChainId,
      appId
    );
    if (response.error.code === '00' && response.data) {
      this.setAppWalletBalances(response.data);
    }
  };

  @action
  setAppWalletBalances = (balances: AppWalletBalance[]) => {
    this.appWalletBalances = balances;
  };

  @action
  loadWalletDetail = async (appId: number) => {
    const { data: response } = await privateApi.wallets.findWalletDetailByAppId(
      appId,
      this.rootStore!.commonStore.currentChainId
    );
    if (response.data) {
      if (response.error.code === '00') {
        this.setWallet(response.data);
        return true;
      } else if (response.error.code === '401') {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
        return false;
      }
    }
  };

  @action
  setWallet = (wallet: apiService.FindWalletByAppIdQueryResponse) => {
    this.consoleWallet = wallet;
  };

  @action
  toggleAutoSign = async () => {
    const appId = this.rootStore?.consoleLayoutStore.currentApp?.appId;
    if (appId && this.consoleWallet?.walletId) {
      const { data: response } = await privateApi.wallets.toggleAutoSign(
        appId,
        Number(this.consoleWallet.walletId)
      );
      if (response.error.code === '00') {
        this.loadWalletDetail(appId).then();
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };

  @action
  toggleAccessMember = async () => {
    const appId = this.rootStore?.consoleLayoutStore.currentApp?.appId;
    if (appId && this.consoleWallet?.walletId) {
      const { data: response } = await privateApi.wallets.toggleMemberAccess(
        appId,
        Number(this.consoleWallet.walletId)
      );
      if (response.error.code === '00') {
        this.loadWalletDetail(appId).then();
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };

  @action
  loadWalletActivities = async () => {
    if (this.consoleWallet?.address) {
      const { data: response } = await privateApi.wallets.getTransactions({
        pageCursor: this.transactionPageParams.cursor ?? undefined,
        chainId: this.rootStore!.commonStore.currentChainId,
        walletAddress: this.consoleWallet.address,
        pageSize: this.transactionPageParams.pageSize,
        fromDate: this.searchCondition.dateRange?.fromDate,
        toDate: this.searchCondition.dateRange?.toDate,
      });
      if (response.data && response.error.code === '00') {
        const { cursor, hasNext } = response.data;
        this.setPageParams(cursor, hasNext);
        this.setWalletActivities(response.data);
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
  setWalletActivities = (data: WalletTransactionsResponseType) => {
    this.walletActivities = data.result.map((r) => {
      return {
        txnHash: r.txId,
        block: r.blockNumber,
        date: new Date(r.blockTimestamp).getTime(),
        from: r.fromAddress,
        to: r.toAddress,
        quantity: `${(Number(r.value) / 10 ** 18).toLocaleString('ko-kr', {
          maximumFractionDigits: 5,
        })} BSC`,
        status: 'success',
      };
    });
  };

  @action
  sendToken = async () => {
    this.setLoading(true);
    if (
      this.rootStore?.commonStore.currentChainId &&
      this.consoleWallet?.walletId
    ) {
      const { data: response } = await privateApi.tokens.transferToken({
        appId: this.rootStore?.consoleLayoutStore.currentApp?.appId,
        chainId: this.rootStore.commonStore.currentChainId,
        amount: Number(this.sendTokenInput.amount),
        toAddress: this.sendTokenInput.address,
        symbol: this.sendTokenInput.symbol,
        walletId: Number(this.consoleWallet.walletId),
      });
      this.setLoading(false);
      return response.error.code === '00';
    } else {
      await alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
    this.setLoading(true);
  };

  @action
  simulateSendToken = async () => {
    if (
      this.rootStore?.commonStore.currentChainId &&
      this.consoleWallet?.walletId
    ) {
      const { data: response } = await privateApi.tokens.simulatesTransferToken(
        {
          appId: this.rootStore?.consoleLayoutStore.currentApp?.appId,
          chainId: this.rootStore.commonStore.currentChainId,
          amount: Number(this.sendTokenInput.amount),
          toAddress: this.sendTokenInput.address,
          symbol: this.sendTokenInput.symbol,
          walletId: Number(this.consoleWallet.walletId),
        }
      );
      if (response.error.code === '00') {
        this.simulateResponse = response.data;
      } else {
        // 오류 시 기본 값 ( BNB, TBNB ERC20 으로 조회 안됨)
        this.simulateResponse = {
          gasCost: {
            ether: TRANSACTION_GAS_FEE.toString(),
            wei: {
              type: 'BigNumber',
              hex: '0x253f5e952500',
            },
          },
          gasLimit: {
            type: 'BigNumber',
            hex: '0x916f',
          },
        };
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
  };
}

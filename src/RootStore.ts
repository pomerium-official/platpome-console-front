import { action, isObservableMap, isObservableSet } from 'mobx';

import CommonStore from '@/features/common/stores/CommonStore';
// import AuthStore from '@/features/auth/stores/AuthStore';
import BoardBizStore from '@/features/sample/board/stores/BoardBizStore';
// import type { DropdownTypeLabelValue } from '@/types/common';
import ConsoleLayoutStore from './features/common/layout/console/stores/ConsoleLayoutStore';
import MyAppListStore from './features/console/main/stores/MyAppListStore';
import { CreateDeveloperStore } from '@/features/console/create-developer/stores/CreateDeveloperStore';
import CreateNFTStore from './features/console/nft/stores/CreateNFTStore';
import NFTDetailStore from './features/console/nft/stores/NFTDetailStore';
import WebhookStore from './features/console/setting/stores/WebhookStore';
import OthersStore from './features/console/setting/stores/OthersStore';
import ReleaseStore from './features/console/release/stores/ReleaseStore';
import TeamMembersStore from './features/console/setting/stores/TeamMembersStore';
import WebhookLogStore from './features/console/setting/stores/WebhookLogStore';
import WalletDetailStore from './features/console/wallet/stores/WalletDetailStore';

// import TemplateMobxPageStore from 'stores/TemplateMobxPageStore';

/**
 * Mobx Root Store. 모든 스토어는 rootStore를 통해 서로 참조할 수 있습니다.
 */
export default class RootStore {
  // 공통 스토어
  commonStore: CommonStore;
  // authStore: AuthStore;

  // 샘플 스토어
  boardBizStore: BoardBizStore;

  //layout store
  consoleLayoutStore: ConsoleLayoutStore;

  //my app list store
  myAppListStore: MyAppListStore;

  //create developer store
  createDeveloperStore: CreateDeveloperStore;

  //create nft store
  createNFTStore: CreateNFTStore;

  //nftDetailStore
  nftDetailStore: NFTDetailStore;

  //setting > webhookStore
  webhookStore: WebhookStore;

  //setting > othersStore
  othersStore: OthersStore;

  //releaseStore
  releaseStore: ReleaseStore;

  //setting > teamMembersStore
  teamMembersStore: TeamMembersStore;

  //setting > webhookLogStore
  webhookLogStore: WebhookLogStore;

  // walletDetailStore
  walletDetailStore: WalletDetailStore;

  constructor() {
    // 공통 스토어
    this.commonStore = new CommonStore(this);
    // this.authStore = new AuthStore(this);

    // 샘플 스토어
    this.boardBizStore = new BoardBizStore(this);

    //layout store
    this.consoleLayoutStore = new ConsoleLayoutStore(this);

    //my app list store
    this.myAppListStore = new MyAppListStore(this);

    //create nft store
    this.createNFTStore = new CreateNFTStore(this);

    //nftDetailStore
    this.nftDetailStore = new NFTDetailStore(this);

    //create developer store
    this.createDeveloperStore = new CreateDeveloperStore(this);

    //setting > webhookStore
    this.webhookStore = new WebhookStore(this);

    //setting > othersStore
    this.othersStore = new OthersStore(this);

    //releaseStore
    this.releaseStore = new ReleaseStore(this);

    //setting > teamMembersStore
    this.teamMembersStore = new TeamMembersStore(this);

    //setting > webhookLogStore
    this.webhookLogStore = new WebhookLogStore(this);

    //walletDetailSTore
    this.walletDetailStore = new WalletDetailStore(this);
  }

  @action
  showLoading = (visible: boolean) => {
    this.commonStore.showLoading = visible;
  };

  /**
   * getServerSideProps(SSR), getStaticProps(SSG) 에서 주입한 store를 화면에 녹여준다
   * @param initialStore
   */
  @action hydrate = (initialStore: RootStore) => {
    if (!initialStore) return;
    // 각 스토어 별로 대입
    Object.keys(initialStore).forEach((key: string) => {
      const newStore = (initialStore as any)[key];
      const prevStore = (this as any)[key];

      if (prevStore === undefined) {
        throw `RootStore에 ${key}가 없습니다.`;
      }

      // 스토어의 각 항목에 대입
      Object.keys(newStore).forEach((propertyKey: string) => {
        // Map, Set의 경우 JSON.stringify를 통해 Array로 변환된다.
        // 이 항목들을 다시 Map, Set으로 변환해준다.
        if (
          isObservableMap(prevStore[propertyKey]) ||
          prevStore[propertyKey] instanceof Map
        ) {
          prevStore[propertyKey] = new Map(newStore[propertyKey]);
        } else if (
          isObservableSet(prevStore[propertyKey]) ||
          prevStore[propertyKey] instanceof Set
        ) {
          prevStore[propertyKey] = new Set(newStore[propertyKey]);
        } else {
          prevStore[propertyKey] = newStore[propertyKey];
        }
      });
    });
  };
}

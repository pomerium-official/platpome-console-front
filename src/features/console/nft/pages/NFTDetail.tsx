import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useCallback, useEffect } from 'react';
import styles from './NFTDetail.module.scss';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import NFTDetailTop from '../components/detail/NFTDetailTop';
import Tabs from '@/features/common/components/common/Tabs';
import Overview from '../components/detail/Overview';
import BreadCrumb from '../../common/BreadCrumb';
import PropertiesContent from '../components/detail/PropertiesContent';
import { Transactions } from '@/features/common/components/common/DataTable/Transactions';
import { Activity } from '@/features/common/components/common/DataTable/Activity';
import { TokenHolders } from '@/features/common/components/common/DataTable/TokenHolders';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';
import ChainPaginator from '@/features/console/common/ChainPaginator';
import { NFTDetailTargetType } from '@/features/console/nft/stores/NFTDetailStore';

const NFTDetail = observer(() => {
  const { nftDetailStore: store } = useStore();
  const router = useRouter();

  const paginator = useCallback((target: NFTDetailTargetType) => {
    return (
      <ChainPaginator
        next={{
          disabled: !store.transactionPageParams.hasNext,
          onClick: () => store.onClickPage(target, 'next'),
        }}
        prev={{
          disabled: store.transactionPageParams.pageNo === 0,
          onClick: () => store.onClickPage(target, 'prev'),
        }}
      />
    );
  }, []);

  useEffect(() => {
    if (store && router.isReady) {
      store.init();
      store.load(Number(router.query.nftId)).then();
    }
  }, [store, router.isReady]);

  const parseTabItems = useCallback(() => {
    if (store.nftItem?.properties) {
      return store.tabItems.map((tabItem) => {
        if (tabItem.label === 'Properties' && !tabItem.icon) {
          return {
            ...tabItem,
            icon: (
              <strong className="figure">
                {store.nftItem?.properties?.length}
              </strong>
            ),
          };
        } else {
          return { ...tabItem };
        }
      });
    } else {
      return store.tabItems.filter((f) => f.label !== 'Properties');
    }
  }, []);

  useEffect(() => {
    if (store.nftItem) {
      store.setTabItems(parseTabItems());
    }
  }, [store.nftItem?.properties]);

  useEffect(() => {
    if (store.currentTabItem === 'Transactions') {
      store.loadTransactions().then();
    }
    if (store.currentTabItem === 'Holders') {
      store.loadHolders().then();
    }
  }, [store.currentTabItem]);

  useStoreInitUnmount(store);

  return (
    <ConsoleLayout>
      {store.nftItem && (
        <>
          <div className={`nftDetailWrap ${styles.nftDetailWrap}`}>
            {store.nftItem?.nftName && (
              <BreadCrumb currentPage={store.nftItem.nftName} />
            )}
            <NFTDetailTop />
            <Tabs
              type={'underline'}
              model={store.tabItems}
              size={18}
              activeIndex={store.tabItems.findIndex(
                (f) => f.label === store.currentTabItem
              )}
              onTabChange={(e) => store.activateTab(e.value.id!)}
            />
            {store.currentTabItem === 'Overview' && store.nftItem && (
              <Overview
                nftItem={store.nftItem}
                chainId={store.rootStore?.commonStore.currentChainId}
              />
            )}
            {store.currentTabItem === 'Properties' &&
              store.nftItem?.properties && (
                <PropertiesContent properties={store.nftItem?.properties} />
              )}
            {store.currentTabItem === 'Holders' && store.holdersData && (
              <TokenHolders
                data={store.holdersData}
                transactionPaginator={paginator('holders')}
              />
            )}
            {store.currentTabItem === 'Activity' && (
              <Activity transactionPaginator={paginator('activity')} />
            )}
            {store.currentTabItem === 'Transactions' &&
              store.transactionData && (
                <Transactions
                  data={store.transactionData}
                  transactionPaginator={paginator('transactions')}
                />
              )}
          </div>
        </>
      )}
    </ConsoleLayout>
  );
});

export default NFTDetail;

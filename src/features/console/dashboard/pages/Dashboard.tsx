import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useCallback, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import Summary from '../components/Summary';
import NftList from '../../nft/components/nft-list/NftList';
// import WalletList from '../../wallet/component/WalletList';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';

const Home = observer(() => {
  const { createNFTStore: store } = useStore();
  const router = useRouter();

  const load = useCallback(async (appId: number) => {
    await store.load(true);
    await store.getAppInfo(appId);
  }, []);

  useEffect(() => {
    if (
      store &&
      router.isReady &&
      router.query.appId &&
      store.rootStore?.commonStore.consoleWallet?.address
    ) {
      load(Number(router.query.appId)).then();
    }
  }, [router, store.rootStore?.commonStore.consoleWallet?.address]);

  useStoreInitUnmount(store);
  return (
    <ConsoleLayout>
      <div className={`dashboardWrap ${styles.dashboardWrap}`}>
        <h1 className="pageTitle">Dashboard</h1>
        <Summary />
        {/* <WalletList title={<h2 className="sectionTitle">My wallet</h2>} /> */}
        {store.nftList && store.nftList.length > 0 ? (
          <NftList
            title={<h2 className="sectionTitle">Created NFT</h2>}
            nftList={store.nftList.slice(0, 4)}
            appName={store.app?.name}
            skeletonItemCount={4}
          />
        ) : (
          <NftList
            title={<h2 className="sectionTitle">Created NFT</h2>}
            skeleton={!store.nftList || store.loading}
            skeletonItemCount={4}
          />
        )}
      </div>
    </ConsoleLayout>
  );
});

export default Home;

import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import NftList from '../components/nft-list/NftList';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';

const NFT = observer(() => {
  useUserInfo({ needLogin: true });
  const router = useRouter();
  const { baseUrl, currentMenu } = useBaseUrl();
  const { createNFTStore: store, commonStore } = useStore();

  const { consoleWallet, currentNetwork } = commonStore;

  useEffect(() => {
    if (
      store &&
      router.isReady &&
      store.rootStore?.commonStore.consoleWallet?.address
    ) {
      store.init();
      store.getAppInfo(Number(router.query.appId as string)).then();
      store.load(true).then();
    }
  }, [store, router, consoleWallet?.address, currentNetwork]);

  useStoreInitUnmount(store);

  return (
    <ConsoleLayout>
      <div className="pageTitle">
        <div className="left">
          <h1>NFT</h1>
          <p>You can manage your App's NFT items.</p>
        </div>
        <div className="right">
          <SolidButton
            onClick={() => {
              store.setSelectedWallet(
                commonStore.currentWallet === 'console'
                  ? commonStore.consoleWallet!.address
                  : commonStore.externalWallet.address,
                commonStore.currentWallet as 'console' | 'external',
                commonStore.currentWallet === 'console'
                  ? commonStore.consoleWallet?.PMG_balance
                  : commonStore.externalWallet.balance
              );
              router.push(`${baseUrl}/${currentMenu}/createnft`);
            }}
            size="xlarge"
            styleType="color"
            label="Create NFT"
            icon={
              <i
                style={{
                  display: 'block',
                  width: 14,
                  height: 14,
                  background: 'var(--color-262626)',
                  WebkitMask:
                    'url(/assets/images/icons/icon-cross.svg) no-repeat center center',
                  WebkitMaskSize: 'cover',
                }}
              />
            }
          />
        </div>
      </div>
      {store.nftList && store.nftList.length > 0 ? (
        <NftList
          nftList={store.nftList}
          appName={store.app?.name}
          onResetFilter={store.onResetFilter}
          selectedFilters={
            store.selectedFilter
              ? Object.entries(store.selectedFilter).map(([key, value]) => {
                  return { key, value };
                })
              : []
          }
          setSelectedFilter={(key, value) =>
            store.setSelectedFilter(key, value)
          }
        />
      ) : (
        <NftList
          skeleton={!store.nftList || store.loading}
          selectedFilters={[]}
        />
      )}
    </ConsoleLayout>
  );
});

export default NFT;

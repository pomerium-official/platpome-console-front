import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useEffect, useState } from 'react';
import styles from './WalletDetail.module.scss';
import CopySet from '../component/CopySet';
import WalletInformation from '../component/WalletInformation';
import Tokens from '../component/Tokens';
import Activities from '../component/Activities';
import WalletSetting from '../component/WalletSetting';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import Skeleton from '@/features/console/common/Skeleton';
import TabConsole from '@/features/common/components/common/TabConsole';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';

const WalletDetail = observer(() => {
  const {
    consoleLayoutStore,
    walletDetailStore: store,
    commonStore,
  } = useStore();
  const router = useRouter();
  const { baseUrl } = useBaseUrl();
  const [tabIndex, setTabIndex] = useState(0);

  // const { data: userInfo } = useUserInfo({ needLogin: true });

  useEffect(() => {
    const load = async () => {
      if (router.query.appId) {
        const appId = Number(router.query.appId as string);
        if (!store.consoleWallet) {
          store.init();
          const res = await store.loadWalletDetail(appId);
          if (!res) {
            store.setErrorState('unAuthorized');
            const check = await alertConsole(
              'Access denied',
              'You do not have authority to access.',
              { icon: 'caution', okText: 'ok' }
            );
            if (check === 'ok' || check === 'close') {
              store.setErrorState('');
              await router.push(`/console/${router.query.appId}/dashboard`);
            }
          }
        }
        if (tabIndex === 1 && store.errorState === '') {
          store.initPageParams();
          store.loadAppWalletBalance(appId).then();
        }
        if (tabIndex === 2 && store.errorState === '') {
          store.initPageParams();
          store.loadWalletActivities().then();
        }
      }
    };
    load().then();
  }, [tabIndex, router.query, store.rootStore?.commonStore.currentNetwork]);

  useEffect(() => {
    const walletIdChange = async () => {
      if (
        baseUrl &&
        router.isReady &&
        commonStore.currentWallet === 'console' &&
        router.query.walletId === 'metamask'
      ) {
        await router.replace(
          `${baseUrl}/wallet/${commonStore.currentWallet}`,
          undefined,
          {
            shallow: true,
          }
        );
      }
    };
    walletIdChange().then();
  }, [commonStore.currentWallet, router.isReady, baseUrl]);

  useStoreInitUnmount(store);

  return (
    <ConsoleLayout>
      <div className={`walletDetailWrap ${styles.walletDetailWrap}`}>
        <div className="pageTitle">
          <div>
            <h1>Wallet</h1>
            <p>
              You can check specific information about selected wallet and
              manage it.
            </p>
          </div>
        </div>
        {store.consoleWallet ? (
          <CopySet
            address={
              router.query.walletId === 'console'
                ? store.consoleWallet?.address
                : commonStore.externalWallet.address
            }
            ellipsis={false}
          />
        ) : (
          <Skeleton style={{ width: 357, height: 30, marginBottom: 56 }} />
        )}

        <TabConsole
          model={[
            { content: 'Wallet information', current: tabIndex === 0 },
            { content: 'Tokens', current: tabIndex === 1 },
            { content: 'Activities', current: tabIndex === 2 },
            {
              content: (
                <>
                  Settings
                  <span className={'noAccess'}>
                    Settings are not available in external wallet.
                  </span>
                </>
              ),
              className: 'setting',
              disabled: commonStore.currentWallet !== 'console',
              current: tabIndex === 3,
            },
          ]}
          onTabChange={(e) => setTabIndex(e.index)}
          style={{ marginBottom: 40 }}
        />

        {tabIndex === 0 && (
          <WalletInformation
            appName={consoleLayoutStore.currentApp?.name ?? ''}
            createdAt={
              store.consoleWallet
                ? `${new Date(store.consoleWallet.createdAt)}`
                : ''
            }
            autoSign={store.consoleWallet?.autoSignYn === 'Y'}
          />
        )}
        {tabIndex === 1 && <Tokens />}
        {tabIndex === 2 && <Activities />}
        {tabIndex === 3 && store.consoleWallet && (
          <WalletSetting
            autoSign={store.consoleWallet.autoSignYn === 'Y'}
            onToggleAutoSign={store.toggleAutoSign}
            accessMember={store.consoleWallet.memberAccessYn === 'Y'}
            onToggleAccessMember={store.toggleAccessMember}
            setTabIndex={(e) => setTabIndex(e)}
          />
        )}
      </div>
      {store.errorState === 'unAuthorized' && <>{}</>}
    </ConsoleLayout>
  );
});

export default WalletDetail;

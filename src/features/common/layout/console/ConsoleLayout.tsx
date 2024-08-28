import { useMinHeight } from '@/libs/hooks/useMinHeight';
import React, { useEffect, useState } from 'react';
import ConsoleHeader from './ConsoleHeader';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import Aside from '@/features/common/layout/console/components/Aside';
// import LoadingFullLayer from '@/features/common/layout/console/components/LoadingFullLayer';

interface ConsoleLayoutProps {
  children?: React.ReactNode;
  aside?: boolean;
  createDeveloper?: boolean;
  main?: boolean;
}

const ConsoleLayout = observer(
  ({
    children,
    aside = true,
    createDeveloper = false,
    main,
  }: ConsoleLayoutProps) => {
    const { consoleLayoutStore: store, commonStore } = useStore();
    const router = useRouter();

    const [testnet, setTestnet] = useState(false);

    useMinHeight('.pageContent', testnet);

    useEffect(() => {
      setTestnet(commonStore.currentChainId === 97);
    }, [commonStore.currentChainId]);

    useEffect(() => {
      const appId = router.query.appId;
      if (appId && store.apps) {
        if (!store.apps?.find((app) => app.appId === Number(appId))) {
          alert('Access Denied.');
          router.replace('/console').then();
        }
      }
    }, [router.query.appId, store.apps]);

    useEffect(() => {
      const html = document.querySelector('html');
      html?.setAttribute('data-theme', store.theme);
    }, []);

    return (
      <>
        <div
          id="consoleLayout"
          className={
            testnet && router.pathname !== '/console' ? 'testnet' : undefined
          }
        >
          <ConsoleHeader createDeveloper={createDeveloper} testnet={testnet} />
          <div className="container">
            {aside && !createDeveloper && <Aside />}
            <div
              className={`pageContent${
                aside && !createDeveloper ? '' : ' full'
              }${createDeveloper ? ' createAccount' : ''}${
                testnet ? ' testnet' : ''
              }`}
            >
              {main ? children : <div className="subContent">{children}</div>}
            </div>
          </div>
        </div>
        {/*{commonStore.showLoading && <LoadingFullLayer />}*/}
      </>
    );
  }
);

export default ConsoleLayout;

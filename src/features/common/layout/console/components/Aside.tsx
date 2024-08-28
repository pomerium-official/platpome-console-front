import React, { useEffect } from 'react';
import AppDropdown from './AppDropdown';
import AsideGnb from './AsideGnb';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import ModeModule from './ModeModule';
const ModeModule = dynamic(() => import('./ModeModule'), { ssr: false });

const Aside = observer(() => {
  const { consoleLayoutStore: store } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && store) {
      store.loadApps(router.query.appId as string).then();
    }
  }, [store, router]);

  return (
    <div className={`aside${store.asideCollapse ? ' collapse' : ''}`}>
      <div className="top">
        <ModeModule />
        {store.apps && (
          <AppDropdown
            options={store.apps.map((app) => {
              return {
                name: app.name,
                value: app.appId,
                current: Number(router.query.appId) === app.appId,
                iconUrl: app.iconUrl ?? '',
              };
            })}
            setCurrentApp={store.setCurrentApp}
          />
        )}
      </div>
      <div className="gnb">
        <AsideGnb />
      </div>
      <div className="bottom">
        <button
          onClick={() => store.handleAsideCollapse()}
          className="collapseAside"
        >
          <span>Collapsing sidebar</span>
        </button>
      </div>
    </div>
  );
});

export default Aside;

import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useEffect, useState } from 'react';
import MainAppState from '../components/MainAppState';
import style from './Release.module.scss';
import ReleaseCheckList from '../components/release-check-list/ReleaseCheckList';
import ReleaseHistory from '../components/ReleaseHistory';
import { Checkbox } from '@/features/common/components/common/Checkbox';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';
import Tabs from '@/features/common/components/common/Tabs';

const renderSubmitText = (status?: string) => {
  switch (status) {
    case 'RELEASED': {
      return 'Save changes';
    }
    case 'REQUESTED': {
      return 'Cancel submission';
    }
    default: {
      return 'Complete submission';
    }
  }
};

const Release = observer(() => {
  const { releaseStore: store } = useStore();
  const router = useRouter();

  const [rulesAgree, setRulesAgree] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (router.isReady) {
      store.load(Number(router.query.appId)).then(() => {
        if (store.appData?.status === 'RELEASED') {
          setRulesAgree(true);
        }
      });
    }
  }, [store, router.isReady]);

  useStoreInitUnmount(store);

  // useBackObserver(`${router.query.redirect}`, true);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      history.pushState(null, '', location.href);
      // 페이지 변경이 시작될 때의 동작을 여기에 추가
      // 예를 들어, 사용자에게 확인 메시지를 표시하거나 다른 로직을 수행할 수 있음
      const userConfirmed = window.confirm(
        'Are you sure you want to leave? Change may not be saved.'
      );
      if (!userConfirmed) {
        router.events.emit('routeChangeError'); // 페이지 이동을 막는 방법
        throw "please don't go";
        // 또는 다른 동작을 수행할 수 있음
      }
    };

    const refreshObserver = (e: any) => {
      e.preventDefault();
    };

    if (
      store.validateOnExit &&
      store.appData &&
      ['Preparation', 'RELEASED'].includes(store.appData.status)
    ) {
      // routeChangeStart 이벤트 리스너 등록
      router.events.on('routeChangeStart', handleRouteChangeStart);
      window.addEventListener('beforeunload', refreshObserver);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('beforeunload', refreshObserver);
    };
  }, [router.events, store.validateOnExit]);

  return (
    <ConsoleLayout>
      <div className={`releaseWrap ${style.releaseWrap}`}>
        <div className="pageTitle">
          <div>
            <h1>Release</h1>
            <p>
              Your App will be released with these information below. <br />
              Some functions will not be able to change after release approval.
            </p>
          </div>
        </div>
        <MainAppState />
        <Tabs
          type="underline"
          model={[
            { label: 'Release check list' },
            { label: 'Release history' },
          ]}
          activeIndex={tabIndex}
          onTabChange={(e) => setTabIndex(e.index)}
          style={{ margin: '56px 0 24px' }}
        />
        {tabIndex === 0 && (
          <>
            <ReleaseCheckList />{' '}
            {store.appData?.status !== 'RELEASED' && (
              <div className="rulesAgree">
                <Checkbox
                  onChange={(e) => setRulesAgree(e.target.checked)}
                  checked={
                    store.appData?.status !== 'Preparation' || rulesAgree
                  }
                  sizeClass={'twenty-px'}
                />
                I have read and agreed to
                <button style={{ marginRight: 4 }}>Terms of Service</button> and
                <button>Private policy</button>.
              </div>
            )}
            <SolidButton
              onClick={() => {
                if (store.appData?.status) {
                  if (
                    ['Preparation', 'RELEASED'].includes(store.appData.status)
                  ) {
                    store.handleSubmit();
                  }
                  if (
                    ['REQUESTED', 'IN_REVIEW'].includes(store.appData.status!)
                  ) {
                    store.handleCancel();
                  }
                }
              }}
              disabled={
                (!rulesAgree || !store.readyToSubmit) &&
                store.appData?.status !== 'REQUESTED'
              }
              size="xlarge"
              styleType={
                store.appData?.status === 'REQUESTED' ? 'neutral' : 'color'
              }
              label={renderSubmitText(store.appData?.status)}
            />
          </>
        )}
        {tabIndex === 1 && <ReleaseHistory />}
      </div>
    </ConsoleLayout>
  );
});

export default Release;

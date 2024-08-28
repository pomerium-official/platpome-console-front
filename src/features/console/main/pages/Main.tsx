import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React from 'react';
import styles from './Main.module.scss';
import MyAppList from '../components/MyAppList';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';

const Main = observer(() => {
  const { commonStore: store } = useStore();
  return (
    <ConsoleLayout aside={false} main>
      <div className={`mainWrap ${styles.mainWrap}`}>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <h1 className="pageTitle">Welcome 🙌 {store.userInfo?.nickname}!</h1>
        <div className="tutorialsDiv">
          <img
            src="/assets/images/console/text-lets-start-pomeriumx.png"
            alt="let's start platform 2.0"
          />
          <a
            href={`${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/tutorial/the-quickest-start-guide`}
            target={'_blank'}
            rel="noreferrer"
          >
            <LineButton
              styleType="neutral"
              size="large"
              label="Tutorials"
              // href={`${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/tutorial/the-quickest-start-guide`}
            />
          </a>
        </div>
        <MyAppList />
      </div>
    </ConsoleLayout>
  );
});

export default Main;

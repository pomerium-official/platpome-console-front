import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useEffect } from 'react';
import styles from './CreateDeveloper.module.scss';
import LeftSite from '../conponents/LeftSite';
import RightSite from '../conponents/RightSite';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';

const CreateDeveloper = () => {
  const { createDeveloperStore: store } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (store && router.isReady) {
      store.init();
      store.checkIsMember().then();
    }
  }, [store]);

  useStoreInitUnmount(store);
  return (
    <ConsoleLayout createDeveloper>
      <div
        className={`createDeveloperContent ${styles.createDeveloperContent}`}
      >
        <LeftSite />
        <RightSite />
      </div>
    </ConsoleLayout>
  );
};

export default CreateDeveloper;

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UtilButtons from '@/features/common/layout/console/components/UtilButtons';
import AccountInfo from '@/features/common/layout/console/components/AccountInfo';
import LoadingRouter from '@/features/common/layout/console/components/LoadingRouter';
import TestnetAlert from '@/features/common/layout/console/components/TestnetAlert';

interface ConsoleHeaderProps {
  createDeveloper?: boolean;
  testnet?: boolean;
}

const ConsoleHeader = ({ createDeveloper, testnet }: ConsoleHeaderProps) => {
  const router = useRouter();
  const [pageChange, setPageChange] = useState(false);
  const [routerComplete, setRouterComplete] = useState(false);
  useEffect(() => {
    router.events.on('routeChangeStart', () => setPageChange(true));
    // router.events.on('routeChangeComplete', () => setPageChange(false));
    setTimeout(() => {
      setRouterComplete(true);
      setTimeout(() => {
        setPageChange(false);
      }, 200);
    }, 400);
  }, [router]);

  return (
    <div className="header">
      <h1>
        <Link href={createDeveloper ? '/' : '/console'}>
          <img
            src="/assets/images/console/logo.svg"
            alt="platpome console"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </h1>
      {!createDeveloper ? (
        <div className="utils">
          <UtilButtons />
          <AccountInfo />
        </div>
      ) : (
        ''
      )}
      {testnet && router.query.appId && (
        <TestnetAlert style={{ position: 'absolute', top: 64, left: 0 }} />
      )}
      {pageChange && (
        <LoadingRouter
          complete={routerComplete}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
      )}
    </div>
  );
};

export default ConsoleHeader;

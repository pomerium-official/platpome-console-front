import TestnetAlert from '@/features/common/layout/console/components/TestnetAlert';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import React, { useEffect, useState } from 'react';

interface FullPopupLayoutProps {
  onCloseLink?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const FullPopupLayout = ({
  onCloseLink,
  title,
  children,
}: FullPopupLayoutProps) => {
  const { consoleLayoutStore: store, commonStore } = useStore();

  const [testnet, setTestNet] = useState(false);

  useEffect(() => {
    setTestNet(commonStore.currentChainId === 97);
  }, [commonStore.currentChainId]);

  useEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', store.theme);
  }, []);

  return (
    <div className={`fullPopupLayout${testnet ? ` testnet` : ''}`}>
      <div className={`fullPopupLayoutHeader`}>
        {title && <h1 className="title">{title}</h1>}
        <button
          onClick={() => {
            onCloseLink && onCloseLink();
          }}
          className="close"
        />
        {testnet && (
          <TestnetAlert style={{ position: 'absolute', top: 64, left: 0 }} />
        )}
      </div>
      <div className="fullPopupLayoutContainer">{children}</div>
    </div>
  );
};

export default FullPopupLayout;

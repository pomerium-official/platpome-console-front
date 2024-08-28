import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import React, { useState } from 'react';
import TokenList from './TokenList';
import SendToken from './SendToken';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';

const Tokens = observer(() => {
  const { walletDetailStore: store } = useStore();
  const [showSend, setShowSend] = useState(false);

  return (
    <div className="tokens">
      <div className="top">
        <h2 className="sectionTitle">Tokens</h2>
        <SolidButton
          onClick={() => setShowSend(true)}
          size="small"
          styleType="color"
          label="Send token"
        />
      </div>
      <TokenList data={store.appWalletBalances} />
      {showSend && (
        <SendToken
          onClose={() => setShowSend(false)}
          selectedWalletData={{
            id: 'console',
            name: 'Console Wallet',
            address: store.consoleWallet?.address ?? '',
          }}
        />
      )}
    </div>
  );
});

export default Tokens;

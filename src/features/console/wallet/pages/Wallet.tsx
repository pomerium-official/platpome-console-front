import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React from 'react';
import WalletList from '../component/WalletList';

const Wallet = () => {
  return (
    <ConsoleLayout>
      <div className="pageTitle">
        <div>
          <h1>Wallet</h1>
          <p>
            You can use your PomeriumX's exclusive console wallet and external
            wallet such as Metamask.
          </p>
        </div>
      </div>
      <WalletList />
    </ConsoleLayout>
  );
};

export default Wallet;

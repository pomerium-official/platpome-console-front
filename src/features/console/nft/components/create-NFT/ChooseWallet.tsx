import React from 'react';
import CreateNFTWrap from './CreateNFTWrap';
import WalletList from '@/features/console/wallet/component/WalletList';

interface ChooseWalletProps {
  goBack: () => void;
}

const ChooseWallet = ({ goBack }: ChooseWalletProps) => {
  return (
    <CreateNFTWrap goBack={() => goBack()}>
      <div className={`chooseWallet`} style={{ width: 1100 }}>
        <div className="pageTitle">
          <div>
            <h1>Choose Wallet</h1>
            <p>Choose the most suitable wallet for your needs.</p>
          </div>
        </div>
        <WalletList />
      </div>
    </CreateNFTWrap>
  );
};

export default ChooseWallet;

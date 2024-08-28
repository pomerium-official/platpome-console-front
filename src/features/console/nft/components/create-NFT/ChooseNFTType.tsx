import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React from 'react';

const ChooseNFTType = observer(() => {
  const { createNFTStore: store } = useStore();
  return (
    <>
      <h2 className="sectionTitle">Choose NFT Type</h2>
      <div className="chooseNftType">
        <button
          onClick={() => {
            store.nftType = 'single';
          }}
          className={store.nftType === 'single' ? 'current' : ''}
        >
          <img src="/assets/images/console/img_card_single.svg" alt="" />
          <dl>
            <dt>Single</dt>
            <dd>If you want to make only one NFT item</dd>
          </dl>
        </button>
        <button
          onClick={() => {
            store.nftType = 'duplicate';
          }}
          className={store.nftType === 'duplicate' ? 'current' : ''}
        >
          <img src="/assets/images/console/img_card_dupl.svg" alt="" />
          <dl>
            <dt>Duplicate</dt>
            <dd>If you want to make a copy of one NFT</dd>
          </dl>
        </button>
        <button className="multi" disabled>
          <img src="/assets/images/console/img_card_multi.svg" alt="" />
          <dl>
            <dt>Multiple</dt>
            <dd>Coming soon</dd>
          </dl>
        </button>
      </div>
    </>
  );
});

export default ChooseNFTType;

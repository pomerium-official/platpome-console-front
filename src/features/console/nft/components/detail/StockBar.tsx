import { useStore } from '@/libs/baseCommon/hooks/useStore';
import React from 'react';

const StockBar = () => {
  const { nftDetailStore: store } = useStore();
  return (
    <div className="stockBar">
      <div className="text">
        <span className="rest">{store.nftItem?.rest} in stock</span>
        <span className="total">Total {store.nftItem?.total}</span>
      </div>
      <div className="barWrap">
        <div
          className="bar"
          style={{
            width: `${
              (Number(store.nftItem?.rest) / Number(store.nftItem?.total)) * 100
            }%`,
          }}
        />
      </div>
    </div>
  );
};

export default StockBar;

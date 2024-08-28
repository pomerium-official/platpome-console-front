import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './NFTPreview.module.scss';

interface NFTPreviewProps {
  style?: React.CSSProperties;
}

const NFTPreview = observer(({ style }: NFTPreviewProps) => {
  const { createNFTStore: store } = useStore();

  return (
    <div
      className={`nftPreviewWrap ${styles.nftPreviewWrap}${
        store.nftType === 'duplicate' ? ' multi' : ''
      }`}
      style={style}
    >
      <div className="nftPreview">
        <div
          className={`imgDiv${store.inputData?.imageUrl ? '' : ' noImg'}`}
          style={
            store.inputData.imageUrl
              ? {
                  background: `var(--color-e6e6e6) url(${store.inputData.imageUrl}) no-repeat center center / cover `,
                }
              : {}
          }
        />
        <div className="infoDiv">
          <strong className="appName">{store.app?.name}</strong>
          <p className={`nftName${store.inputData?.nftName ? '' : ' noName'}`}>
            {store.inputData?.nftName}
          </p>
          <div className="state">
            <strong
              className={`price${store.inputData?.price ? '' : ' noPrice'}`}
            >
              {store.inputData.listing
                ? `${store.inputData?.price || '-'} PMG`
                : 'Not for sale'}
            </strong>
            <div className="buyNow">Buy now</div>
          </div>
          <div
            className={`restInfo${
              store.nftType === 'duplicate' ? ' multi' : ''
            }${
              store.nftType === 'duplicate' &&
              store.inputData.number.toString().length < 1
                ? ' noNumber'
                : ''
            }`}
          >
            {store.nftType === 'single' ? '1 of 1' : ''}
            {store.nftType !== 'single' &&
            store.inputData.number.toString().length > 0
              ? `${store.inputData.number} of ${store.inputData.number}`
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
});

export default NFTPreview;

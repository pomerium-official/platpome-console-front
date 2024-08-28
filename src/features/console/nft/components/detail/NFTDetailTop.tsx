import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import NFTUtilsDropdown from '../nft-list/NFTUtilsDropdown';
import StockBar from './StockBar';
import { NFTType } from '@/features/console/nft/stores/CreateNFTStore';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';

const NFTDetailTop = observer(() => {
  const { nftDetailStore: store } = useStore();

  useEffect(() => {
    if (store.rootStore?.consoleLayoutStore.currentApp) {
      store.loadAppInfo();
    }
  }, [store.rootStore?.consoleLayoutStore.currentApp]);

  useStoreInitUnmount(store);

  return (
    <>
      {store.nftItem && (
        <div className="detailTop">
          <div className="nftImgDiv">
            <div className="frame">
              <img src={store.nftItem?.imgSrc ?? ''} alt="" />
              <button className="fnBtn" />
            </div>
          </div>
          <div className="nftSummary">
            <div className="appName">
              <i
                className="appImg"
                style={{
                  backgroundImage: `url("${store.appInfo?.iconUrl ?? ''}")`,
                }}
              />
              {store.appInfo?.name}
              {store.nftItem && (
                <NFTUtilsDropdown
                  tokenId={store.nftItem.id ?? ''}
                  total={store.nftItem.total ?? 0}
                  onSale={store.nftItem.sales}
                  modalType={store.modalType}
                  setModalType={store.setModalType}
                  allowModal={!!store.nftItem}
                  allowBurn={false}
                  allowMint={false}
                  type={store.nftItem?.type as NFTType}
                  setInputValue={(key, value) =>
                    store.setInputValue(key, value.toString())
                  }
                  price={store.price}
                  fetchListing={store.createListing}
                  removeFromListing={store.removeFromListing}
                  changePrice={store.changePrice}
                />
              )}
            </div>
            <strong className="nftName">{store.nftItem?.nftName}</strong>
            <div className="state">
              <dl>
                <dt>Price</dt>
                <dd>
                  {store.nftItem?.sales ? (
                    <strong style={{ color: 'var(--color-934ff7)' }}>
                      {store.nftItem?.price} PMG
                    </strong>
                  ) : (
                    <strong style={{ color: 'var(--color-666)' }}>
                      Not for sale
                    </strong>
                  )}
                </dd>
              </dl>
              {store.nftItem?.type !== 's' ||
                (!store.nftItem?.sales && <StockBar />)}
              <SolidButton
                size="large"
                styleType={store.nftItem?.sales ? 'neutral' : 'color'}
                label={
                  store.nftItem?.sales ? 'Remove from sale' : 'Put on sale'
                }
                onClick={() => {
                  if (store.nftItem) {
                    if (store.nftItem.sales) {
                      store.setModalType('remove');
                    } else {
                      store.setModalType('listing');
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default NFTDetailTop;

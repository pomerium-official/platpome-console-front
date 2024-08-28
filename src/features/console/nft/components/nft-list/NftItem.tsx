import React from 'react';
import { useRouter } from 'next/router';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import { NFTType } from '@/features/console/nft/stores/CreateNFTStore';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import NFTUtilsDropdown from '@/features/console/nft/components/nft-list/NFTUtilsDropdown';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import * as apiService from '@/generated/api/api-service';
// import { MediaRenderer } from '@thirdweb-dev/react';

interface NftItemProps {
  nftItem: apiService.NftItemDataType;
  isNftPage?: boolean;
  appName?: string;
  markFigures?: boolean;
}

const NftItem = observer(
  ({ nftItem, isNftPage, appName, markFigures }: NftItemProps) => {
    const router = useRouter();
    const { baseUrl } = useBaseUrl();

    const { createNFTStore: store } = useStore();

    return (
      <>
        {nftItem && (
          <div className="nftCard">
            <div
              className="imgDiv"
              style={{ backgroundImage: `url("${nftItem.imgSrc}")` }}
            >
              {/* <MediaRenderer src={nftItem?.imgSrc} /> */}
              {/*{nftItem?.sales && nftItem.rest && nftItem.rest > 0 && (*/}
              {/*  <div className="figures">{nftItem?.total}</div>*/}
              {/*)}*/}
              {markFigures && <div className="figures">{nftItem.total}</div>}
              {isNftPage && (
                <button
                  onClick={() => router.push(`${baseUrl}/nft/${nftItem.id}`)}
                  className="detail"
                >
                  View detail
                </button>
              )}
            </div>
            <div className="infoDiv">
              <strong className="appName">{appName ?? ''}</strong>
              <p className="nftName">{nftItem.nftName}</p>
              {isNftPage && (
                <NFTUtilsDropdown
                  onSale={nftItem.sales}
                  allowBurn={false}
                  allowMint={false}
                  isLoading={store.loading}
                  allowModal={
                    (store.modalType &&
                      store.selectedNFT.tokenId === nftItem.id.toString()) ||
                    false
                  }
                  modalType={store.modalType}
                  setModalType={store.setModalType}
                  type={nftItem.type as NFTType}
                  setInputValue={(key, value) =>
                    store.setMintInputValue(key, value.toString())
                  }
                  price={store.selectedNFT.price}
                  tokenId={nftItem.id ?? ''}
                  fetchListing={store.createListing}
                  total={nftItem.total ?? ''}
                  removeFromListing={store.removeFromListing}
                  changePrice={store.changePrice}
                />
              )}
              <div className="state">
                {Number(nftItem.rest) === 0 && nftItem.sales ? (
                  <strong className="soldOut">Sold out</strong>
                ) : (
                  <strong>
                    {nftItem.sales ? (
                      <>
                        {nftItem.price}
                        {nftItem.symbol}
                      </>
                    ) : (
                      'Not for sale'
                    )}
                  </strong>
                )}
                {!nftItem.sales && Number(nftItem.rest) !== 0 ? (
                  <SolidButton
                    size="xsmall"
                    styleType="neutral"
                    label="Put on sale"
                    onClick={() => {
                      store.setModalType('listing');
                      store.setMintInputValue('tokenId', nftItem.id.toString());
                      if (nftItem?.total) {
                        store.setMintInputValue('total', nftItem.total);
                      }
                    }}
                  />
                ) : (
                  ''
                )}
                <div className="restInfo">
                  {`${nftItem.sales ? nftItem.rest : 0}`} of {nftItem.total}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default NftItem;

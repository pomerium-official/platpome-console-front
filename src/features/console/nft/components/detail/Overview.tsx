import React from 'react';
import * as apiService from '@/generated/api/api-service';
import { SupportChainId } from '@/generated/api/api-service';
import dayjs from 'dayjs';
import { copyClipboard } from '@/features/console/wallet/component/WalletList';
import { renderText } from '@/libs/utils/common';

interface OverViewProps {
  nftItem: apiService.NftItemDetailDataType;
  chainId?: SupportChainId;
}

const Overview = ({ nftItem, chainId }: OverViewProps) => {
  return (
    <div className={`overview`}>
      <h2 className="sectionTitle">Description</h2>
      <p className="description">
        {renderText(nftItem.description ?? '', `${nftItem.id}_description`)}
      </p>
      <h2 className="sectionTitle">NFT Information</h2>
      <div className="nftInformation">
        <dl>
          <dt>Contract Address</dt>
          <dd>
            <button
              className="contractAddress"
              style={{ cursor: 'pointer' }}
              onClick={() => copyClipboard(nftItem.contractAddress)}
            >
              {nftItem.contractAddress}
            </button>
          </dd>
        </dl>
        <dl>
          <dt>Token ID</dt>
          <dd>{nftItem.id}</dd>
        </dl>
        <dl>
          <dt>Token Standard</dt>
          <dd>ERC - 1155</dd>
        </dl>
        <dl>
          <dt>Chain</dt>
          <dd>{'BNB Chain Native Token'}</dd>
        </dl>
        <dl>
          <dt>Total quantity</dt>
          <dd>{nftItem.total}</dd>
        </dl>
        {nftItem.createdAt && (
          <dl>
            <dt>Creation date</dt>
            <dd>
              {dayjs(nftItem.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </dd>
          </dl>
        )}
      </div>
      <button
        className="goBsc"
        onClick={() => {
          window.open(
            `https://${chainId === 97 ? 'testnet.' : ''}bscscan.com/address/${
              nftItem.contractAddress
            }`,
            '_blank'
          );
        }}
      >
        View on Bscscan
      </button>
    </div>
  );
};

export default Overview;

import React from 'react';
import { AppWalletBalance } from '@/generated/api/api-service';
import Skeleton from '@/features/console/common/Skeleton';

const renderTokenSkeleton = () => {
  const skeleton = [];
  for (let i = 0; i < 4; i++) {
    skeleton.push(
      <li key={`tokenSkeleton${i}`}>
        <div className="tokenItem">
          <div className="tokenName">
            <Skeleton className="tokenIcon" style={{ borderRadius: '999px' }} />
            <dl>
              <dt>
                <Skeleton style={{ width: 100 }} />
              </dt>
              <dd>
                <Skeleton style={{ width: 200, height: 15, marginTop: 5 }} />
              </dd>
            </dl>
          </div>
          <div className="amount">
            <strong>
              <Skeleton style={{ width: 100 }} />
            </strong>
            <span className="price">
              <Skeleton style={{ width: 200, height: 15 }} />
            </span>
          </div>
          <div className="contract">
            <Skeleton style={{ width: 65, height: 15 }} />
          </div>
        </div>
      </li>
    );
  }
  return skeleton;
};

const TokenList = (props: { data?: AppWalletBalance[] }) => {
  return (
    <div className="tokenList">
      <ul>
        {props.data && props.data.length > 0 ? (
          props.data?.map((walletBalance, index) => {
            return (
              <li key={`${walletBalance.contractAddress}-${index}`}>
                <div className="tokenItem">
                  <div className="tokenName">
                    <div
                      className="tokenIcon"
                      style={{
                        background: `url(${walletBalance.iconUrl}) no-repeat center center / contain`,
                      }}
                    />
                    <dl>
                      <dt>{walletBalance.symbol}</dt>
                      <dd>{walletBalance.name}</dd>
                    </dl>
                  </div>
                  <div className="amount">
                    <strong>
                      {Number(walletBalance.displayValue) > 0
                        ? Number(walletBalance.displayValue).toLocaleString(
                            'ko-kr',
                            {
                              maximumFractionDigits: 10,
                            }
                          )
                        : '0.000'}
                    </strong>
                    <span className="price">
                      {walletBalance.symbol === 'BNB' ? `$${'0.000'}` : '-'}
                    </span>
                  </div>
                  <div className="contract">
                    <a
                      href={`https://bscscan.com/address/${walletBalance.contractAddress}`}
                      target="_blank"
                      rel={'noreferrer'}
                      className="goContract"
                    >
                      Contract
                    </a>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <>{renderTokenSkeleton()}</>
        )}
      </ul>
    </div>
  );
};

export default TokenList;

import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Skeleton from '@/features/console/common/Skeleton';

const WalletInformation = (props: {
  appName?: string;
  createdAt?: string;
  autoSign: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="walletInfo">
      <h2 className="sectionTitle">Wallet information</h2>
      <table className="rowTable">
        <colgroup>
          <col style={{ width: 150 }} />
        </colgroup>
        <tbody>
          {router.query.walletId === 'console' ? (
            <>
              <tr>
                <th>Wallet Name</th>
                <td>
                  {props.createdAt ? (
                    <>{props.appName ?? ''} Console wallet</>
                  ) : (
                    <Skeleton style={{ width: 200 }} />
                  )}
                </td>
              </tr>
              <tr>
                <th>Created at</th>
                <td>
                  {props.createdAt ? (
                    dayjs(props.createdAt ?? new Date()).format(
                      'YYYY-MM-DD hh:mm:ss'
                    )
                  ) : (
                    <Skeleton style={{ width: 200 }} />
                  )}
                </td>
              </tr>

              {/*<tr>*/}
              {/*  <th>Tokens</th>*/}
              {/*  <td>3</td>*/}
              {/*</tr>*/}

              <tr>
                <th>Auto sign</th>
                <td>
                  {props.createdAt ? (
                    <>{props.autoSign ? 'ON' : 'OFF'}</>
                  ) : (
                    <Skeleton style={{ width: 50 }} />
                  )}
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <th>External wallet type</th>
              <td>Metamask</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletInformation;

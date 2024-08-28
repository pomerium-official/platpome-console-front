import { useStore } from '@/libs/baseCommon/hooks/useStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ChainPaginator from '../../common/ChainPaginator';

const renderText = (status?: string) => {
  switch (status) {
    case 'RELEASED': {
      return { status: 'Released', content: 'Your App is now released.' };
    }
    case 'REQUESTED': {
      return {
        status: 'Submitted',
        content:
          'Submission completed. Administrator will review it shortly, It may take 3~5 days to approval.',
      };
    }
    case 'IN_REVIEW': {
      return {
        status: 'Submitted',
        content: 'Submission completed. It may take 3~5 days to approval.',
      };
    }
    case 'REJECTED': {
      return {
        status: 'Rejected',
        content: 'Your app has been rejected because of {XXX}.',
      };
    }
    case 'CANCELED': {
      return {
        status: 'Canceled',
        content: '',
      };
    }
    default: {
      return { content: '' };
    }
  }
};

const ReleaseHistory = observer(() => {
  const { releaseStore: store } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      store.loadHistory(Number(router.query.appId)).then();
    }
  }, [store, router.isReady]);
  return (
    <div className="releaseHistoryTable">
      {/* <h2 className="sectionTitle border">Release history</h2> */}
      <table className="rowTable">
        <colgroup>
          <col style={{ width: 115 }} />
          <col />
          <col style={{ width: 200 }} />
        </colgroup>
        <tbody>
          {store.releaseHistoryData?.data?.map((v) => {
            return (
              <tr key={v.createdAt + v.id}>
                <td style={{ textAlign: 'center' }}>
                  {renderText(v.statusCd).status}
                </td>
                <td>{renderText(v.statusCd).content}</td>
                <td>{dayjs(v.createdAt).format('YYYY.MM.DD HH:mm:ss')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {store.releaseHistoryData?.total &&
      store.releaseHistoryData?.total > 10 ? (
        <ChainPaginator
          prev={{
            onClick: () => {
              store.pageData.pageNo = store.pageData.pageNo - 1;
              store.loadHistory(Number(router.query.appId)).then();
            },
            disabled: store.pageData.pageNo === 1,
          }}
          next={{
            onClick: () => {
              store.pageData.pageNo = store.pageData.pageNo + 1;
              store.loadHistory(Number(router.query.appId)).then();
            },
            disabled:
              store.pageData.pageSize * store.pageData.pageNo >
              store.releaseHistoryData.total,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            padding: '64px 0',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--color-808080)',
          }}
        >
          No record yet.
        </div>
      )}
    </div>
  );
});

export default ReleaseHistory;

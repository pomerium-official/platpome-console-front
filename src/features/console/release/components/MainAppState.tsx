import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React from 'react';
import Skeleton from '@/features/console/common/Skeleton';

const renderStatus = (status?: string) => {
  const statusObj = () => {
    switch (status) {
      case 'IN_REVIEW': {
        return { text: 'Submitted' };
      }
      case 'REJECTED': {
        return { text: 'Rejected', color: '#f53b00' };
      }
      case 'REQUESTED': {
        return { text: 'Submitted' };
      }
      case 'RELEASED': {
        return { text: 'Released', color: '#4ef500' };
      }
      case 'CANCELED': {
        return { text: 'Canceled' };
      }
      default: {
        return { text: status };
      }
    }
  };
  return (
    <div
      className="state"
      style={statusObj().color ? { color: statusObj().color } : {}}
    >
      {statusObj().text}
    </div>
  );
};

const MainAppState = observer(() => {
  const { releaseStore: store } = useStore();
  return (
    <>
      <h2 className="sectionTitle">Main App state</h2>
      <div className="mainAppState">
        <div className="appSumm">
          <div
            className="appIcon"
            style={{
              background: `url(${store.appData?.iconUrl}) no-repeat center center / cover`,
            }}
          >
            {!store.appData?.iconUrl && (
              <Skeleton style={{ width: 64, height: 64 }} />
            )}
          </div>
          <div className="summ">
            <strong>
              {store.appData?.name ? (
                store.appData?.name
              ) : (
                <Skeleton style={{ width: 200, height: 24 }} />
              )}
            </strong>
            {store.appData?.appId ? (
              <span>App ID : {store.appData?.appId}</span>
            ) : (
              <Skeleton style={{ width: 50, height: 26, marginTop: 4 }} />
            )}
          </div>
        </div>
        {renderStatus(store.appData?.status)}
      </div>
    </>
  );
});

export default MainAppState;

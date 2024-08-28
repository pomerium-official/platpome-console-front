import React, { useEffect, useState } from 'react';
import styles from './MyAppList.module.scss';
import SearchOnList from './SearchOnList';
import Modal from '../../common/Modal';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Input from '@/features/common/components/common/Input/Input';
import Select from '@/features/common/components/common/Select/Select';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { DropdownProps } from 'primereact/dropdown';
import { useRouter } from 'next/router';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import * as apiService from '@/generated/api/api-service';
import { alertConsole } from '@/libs/hooks/dialogConsole';

export interface BlockChainOptionsType {
  name: string;
  blockchainId: string;
  symbolImageUrl: string;
}

const chainOptionTemplate = (option: BlockChainOptionsType) => {
  return (
    <div className="chainItem">
      <i
        className="symbolIcon"
        style={{ backgroundImage: `url("${option.symbolImageUrl}")` }}
      />
      <div className="chainName">{option.name}</div>
    </div>
  );
};

const selectedChainTemplate = (
  option: BlockChainOptionsType,
  props: DropdownProps
) => {
  if (option) {
    return (
      <div className="chainItem chainItemValue">
        <i
          className="symbolIcon"
          style={{ backgroundImage: `url("${option.symbolImageUrl}")` }}
        />
        <div className="chainName">{option.name}</div>
      </div>
    );
  }

  return <span>{props.placeholder}</span>;
};

const AppRow = (props: {
  onClick: () => void;
  app: apiService.FindManyAppsQueryResponse;
}) => {
  return (
    <li>
      <button onClick={props.onClick}>
        <i
          className="appIcon"
          style={{
            background: `url(${props.app.iconUrl}) no-repeat center center / cover`,
          }}
        />
        <strong className="appName">{props.app.name}</strong>
      </button>
    </li>
  );
};

const value_3_MB = 3 * 1024 * 1024;
const MyAppList = observer(() => {
  useUserInfo({ needLogin: true });
  const router = useRouter();
  const { myAppListStore: store } = useStore();
  const [invalidImage, setInvalidImage] = useState(false);

  useEffect(() => {
    if (router.isReady && store) {
      store.init();
      store.load().then();
    }
  }, [store, router]);

  useStoreInitUnmount(store);
  return (
    <>
      <div className={`myAppList ${styles.myAppList}`}>
        <div className="top">
          <h2 className="sectionTitle">My App list ({store.total})</h2>
          <SearchOnList
            style={{ marginLeft: 'auto' }}
            setKeyword={(keyword) =>
              store.appList && store.onKeywordChange(keyword)
            }
          />
        </div>
        <ul className="appList">
          <li>
            <button className="createApp" onClick={() => store.openModal()}>
              <i className="appIcon" />
              <strong className="appName">Create App</strong>
            </button>
          </li>
          {store.appList && store.appList.length > 0 && (
            <>
              {store.keyword ? (
                <>
                  {store.filteredApps.map((app, i) => {
                    return (
                      <AppRow
                        key={`${app.name}_${i}`}
                        onClick={() =>
                          router.push(`/console/${app.appId}/dashboard`)
                        }
                        app={app}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {store.appList?.map((app, i) => {
                    return (
                      <AppRow
                        key={`${app.name}_${i}`}
                        onClick={() =>
                          router.push(`/console/${app.appId}/dashboard`)
                        }
                        app={app}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </ul>
      </div>
      {store.allowModal && (
        <Modal
          onClose={() => store.closeModal()}
          header={'Create App'}
          content={
            <>
              <Input
                label={'App icon'}
                file
                defaultFileSrc={store.imgFile?.fileUrl}
                errorText={'Invalid image'}
                result={invalidImage ? 'error' : undefined}
                onChange={async (e) => {
                  const file = e.target?.files[0] as File;
                  if (file) {
                    const result = ['jpeg', 'jpg', 'png'].some(
                      (f) => file.type.split('/')?.[1].toLocaleLowerCase() === f
                    );
                    if (value_3_MB < file.size || !result) {
                      await alertConsole(
                        'Image upload failed',
                        'Image file’s maximum size is 3mb.',
                        { icon: 'caution' }
                      );
                      setInvalidImage(true);
                    } else {
                      setInvalidImage(false);
                      await store.onFileChange(file);
                    }
                  }
                }}
              />
              <Input
                label={'App Name'}
                placeholder={'Enter your App name.'}
                style={{ marginTop: 24 }}
                onChange={(e) => {
                  store.onChangeInput('appName', e.target.value);
                }}
                result={
                  store.inputErrors.name === 'appName' &&
                  store.inputErrors.isError
                    ? 'error'
                    : undefined
                }
                errorText={
                  store.inputErrors.name === 'appName' &&
                  store.inputErrors.isError
                    ? store.inputErrors.errorText
                    : undefined
                }
              />
              <Select
                options={store.chainOptions}
                label={'Chain'}
                style={{ marginTop: 24 }}
                value={
                  store.chainOptions.find(
                    (f) => f.blockchainId === store.createAppInputs.blockchainId
                  ) ?? store.chainOptions[0]
                }
                onChange={(e) =>
                  store.onChangeInput(
                    'blockchainId',
                    e.target.value.blockchainId
                  )
                }
                itemTemplate={chainOptionTemplate}
                valueTemplate={selectedChainTemplate}
                filterBy="name"
                optionLabel="name"
              />
            </>
          }
          footer={
            <>
              <LineButton
                onClick={() => store.closeModal()}
                size="small"
                styleType="neutral"
                label="Cancel"
              />
              <SolidButton
                disabled={!store.disableSubmit}
                size="small"
                styleType="color"
                label="Next"
                onClick={() => store.submitCreateApp()}
              />
            </>
          }
        />
      )}
    </>
  );
});

export default MyAppList;

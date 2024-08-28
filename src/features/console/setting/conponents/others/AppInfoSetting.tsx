import React, { useEffect, useState } from 'react';
import CardSection from '../CardSection';
import { observer } from 'mobx-react';
import Input from '@/features/common/components/common/Input/Input';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import { UpdateDataType } from '../../stores/OthersStore';

const AppInfoSetting = observer(() => {
  const { othersStore: store } = useStore();
  const router = useRouter();

  const [modify, setModify] = useState(false);
  const [updateData, setUpdateData] = useState<{
    name: string;
    iconUrl: string;
  }>();

  useEffect(() => {
    if (router.isReady) {
      store.loadSetting(Number(router.query.appId)).then();
    }
  }, [store, router.isReady]);

  useEffect(() => {
    setUpdateData({
      name: store.data?.name ?? '',
      iconUrl: store.data?.iconUrl ?? '',
    });
  }, [modify]);

  return (
    <CardSection
      title={'App information setting'}
      headerRight={
        !modify && (
          <button
            onClick={() => setModify(!modify)}
            className="iconBtn pencil"
          />
        )
      }
      body={
        modify ? (
          <>
            <Input
              label="App Icon"
              file
              defaultFileSrc={
                updateData?.iconUrl
                  ? updateData.iconUrl
                  : store.data?.iconUrl ?? ''
              }
              onChange={async (e) => {
                if (e.target.files[0].size > 250000) {
                  return alertConsole(
                    'Image upload failed',
                    'Image file’s maximum size is 250kb',
                    { icon: 'caution' }
                  );
                } else {
                  const uploadImgUrl = await store.imgUpload(e.target.files[0]);
                  if (uploadImgUrl) {
                    setUpdateData((prev) => {
                      return {
                        name: prev?.name ?? store.data?.name ?? '',
                        iconUrl: uploadImgUrl ?? store.data?.iconUrl,
                      };
                    });
                  }
                }
              }}
            />
            <Input
              onChange={(e) =>
                setUpdateData((prev) => {
                  return {
                    iconUrl: prev?.iconUrl ?? store.data?.iconUrl ?? '',
                    name: e.target.value ? e.target.value : store.data?.name,
                  };
                })
              }
              placeholder={store.data?.name ?? ''}
              label="App Name"
              style={{ marginTop: 24 }}
            />
          </>
        ) : (
          <>
            <table className="rowTable">
              <colgroup>
                <col style={{ width: 150 }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>App Name</th>
                  <td>{store.data?.name}</td>
                </tr>
                <tr>
                  <th>App Icon</th>
                  <td>
                    <div
                      style={{
                        display: 'block',
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                        background: `url(${store.data?.iconUrl}) no-repeat center center / cover`,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>App ID</th>
                  <td>{store.data?.appId}</td>
                </tr>
              </tbody>
            </table>
          </>
        )
      }
      footer={
        modify && (
          <>
            <LineButton
              onClick={() => {
                setModify(false);
                setUpdateData(undefined);
              }}
              size="xsmall"
              styleType="neutral"
              label="cancel"
            />
            <SolidButton
              onClick={async () => {
                updateData &&
                  // updateData !== defaultUpdateData &&
                  (await store.updateApp(updateData as UpdateDataType));
                setModify(false);
              }}
              size="xsmall"
              styleType="color"
              label="Save"
              disabled={
                updateData?.name === store.data?.name &&
                updateData?.iconUrl === store.data?.iconUrl
              }
            />
          </>
        )
      }
    />
  );
});

export default AppInfoSetting;

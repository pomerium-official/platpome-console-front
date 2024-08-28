import React, { useEffect, useState } from 'react';
import CardSection from '../CardSection';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import KeyMaskSet from '../KeyMaskSet';
import { observer } from 'mobx-react';
import Modal from '@/features/console/common/Modal';
import Input from '@/features/common/components/common/Input/Input';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { confirmConsole } from '@/libs/hooks/dialogConsole';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';

const ApiKeys = observer(() => {
  const { othersStore: store } = useStore();
  const router = useRouter();

  const [createApi, setCreateApi] = useState(false);
  const [newApiName, setNewApiName] = useState();

  useEffect(() => {
    if (router.isReady) {
      store.loadApiKeys(Number(router.query.appId)).then();
    }
  }, [store, router.isReady]);

  return (
    <>
      <CardSection
        title={'API keys'}
        headerRight={
          <LineButton
            onClick={() => setCreateApi(true)}
            styleType="neutral"
            size="xsmall"
            label={'Add'}
            icon={
              <i
                className="iconBtn cross"
                style={{ width: 10, height: 10, WebkitMaskSize: '100%' }}
              />
            }
          />
        }
        body={
          <table className="rowTable line">
            <colgroup>
              <col style={{ width: 150 }} />
              <col />
              <col style={{ width: 40 }} />
            </colgroup>
            <tbody>
              {store.apiKeyData?.data?.map((v, i) => {
                return (
                  <tr key={`${v.key}${i}`}>
                    <th>{v.name}</th>
                    <td>
                      <KeyMaskSet keyString={v.key} />
                    </td>
                    {i > 1 ? (
                      <td style={{ borderLeft: 0 }}>
                        <button
                          onClick={async () => {
                            const confirm = await confirmConsole(
                              'Deleting API key',
                              'Are you sure to delete this API key?',
                              { okText: 'Delete', icon: 'delete' }
                            );
                            if (confirm === 'ok') {
                              store.deleteApiKey(v.apiKeyId).then();
                            }
                          }}
                          className="iconBtn trash"
                          style={{
                            width: 14,
                            height: 14,
                            WebkitMaskSize: '100%',
                          }}
                        />
                      </td>
                    ) : (
                      <td style={{ borderLeft: 0 }}></td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
        style={{ marginTop: 24 }}
      />
      {createApi && (
        <Modal
          onClose={() => setCreateApi(false)}
          header={'Create API key'}
          content={
            <Input
              onChange={(e) => setNewApiName(e.target.value)}
              label="API key name"
              placeholder="Enter your API key name"
            />
          }
          footer={
            <SolidButton
              onClick={() => {
                store
                  .createApiKey(Number(router.query.appId), newApiName ?? '')
                  .then();
                setCreateApi(false);
              }}
              size="xsmall"
              styleType="color"
              label="Add"
              disabled={!newApiName}
            />
          }
        />
      )}
    </>
  );
});

export default ApiKeys;

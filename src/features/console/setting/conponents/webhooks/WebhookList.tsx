import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import CreateWebhook from './CreateWebhook';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export const WebhookList = observer(() => {
  const { webhookStore: store, commonStore } = useStore();
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<{
    webhookId: number;
    appId: number;
    profile: 'PRD' | 'DEV';
  }>();

  useEffect(() => {
    store.loadWebhookList(Number(router.query.appId)).then();
    store.loadWebhooks().then();
  }, [store, commonStore.currentChainId]);

  return (
    <>
      <TableWrapperCard style={{ width: '100%' }}>
        <DataTable
          value={store.webhookListData?.data}
          paginator={
            store.webhookListData &&
            store.webhookListData.data &&
            store.webhookListData.data.length > store.pageData.pageSize
          }
          onPage={(e) => {
            store.pageData.pageNo = e.page! + 1 ?? 0;
            setTimeout(() =>
              store.loadWebhookList(Number(router.query.appId)).then()
            );
          }}
          totalRecords={store.webhookListData?.total}
          first={(store.pageData.pageNo - 1) * store.pageData.pageSize}
          rows={store.pageData.pageSize}
          header={
            <div className={'flex flex-row justify-center align-items-center'}>
              <span>Webhook list</span>
              <BasicTag
                color={'l-gray'}
                line={'on'}
                styleClass={'round'}
                stateDot={false}
                containerStyle={{ marginLeft: '0.5rem' }}
              >
                Total {store.webhookListData?.data?.length}
              </BasicTag>
              <SolidButton
                onClick={() => (store.showCreateWebhook = true)}
                size="small"
                styleType="color"
                label="Create"
                icon={
                  <i
                    style={{
                      display: 'block',
                      width: 14,
                      height: 14,
                      background: 'var(--color-262626)',
                      WebkitMask:
                        'url(/assets/images/icons/icon-cross.svg) no-repeat center center',
                      WebkitMaskSize: 'cover',
                    }}
                  />
                }
                style={{ marginLeft: 'auto' }}
              />
            </div>
          }
        >
          <Column
            field="webhookId"
            header="Webhook type"
            body={(row) => {
              return store.webhookTypeOptions?.find(
                (f) => f.webhookId === row.webhookId
              )?.name;
            }}
            style={{ width: 150 }}
          />
          <Column field="name" header="Webhook name" style={{ width: 150 }} />
          <Column field="endpointUrl" header="URL" />
          <Column
            field="createdAt"
            header="Date"
            body={(row) => {
              return dayjs(row.createdAt).format('YYYY.MM.DD HH:mm:ss');
            }}
            style={{ width: 160 }}
          />
          <Column
            body={(row) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="iconBtn pencil"
                    onClick={() => {
                      setSelectedIds({
                        webhookId: row.webhookId,
                        appId: row.appId,
                        profile: row.profile,
                      });
                      store.isEdit = true;
                      store.showCreateWebhook = true;
                    }}
                  />
                  <button
                    onClick={() => {
                      store.deleteWebhook({
                        webhookId: row.webhookId,
                        appId: row.appId,
                        profile: row.profile,
                      });
                    }}
                    className="iconBtn trash"
                    style={{ marginLeft: 26 }}
                  />
                </div>
              );
            }}
            style={{ width: 120 }}
          />
        </DataTable>
      </TableWrapperCard>
      {store.showCreateWebhook && <CreateWebhook ids={selectedIds} />}
    </>
  );
});

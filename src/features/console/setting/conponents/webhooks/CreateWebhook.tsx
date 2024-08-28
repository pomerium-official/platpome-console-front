import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Input from '@/features/common/components/common/Input/Input';
import Select from '@/features/common/components/common/Select/Select';
import Modal from '@/features/console/common/Modal';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface CreateWebhookProps {
  ids?: { webhookId: number; appId: number; profile: string };
}

const CreateWebhook = observer(({ ids }: CreateWebhookProps) => {
  const { webhookStore: store } = useStore();
  const router = useRouter();

  const [webhookTypeOptions, setWebhookTypeOptions] = useState<
    { label: string; value: number }[]
  >();

  useEffect(() => {
    if (router.isReady) {
      store.createWebhookData.appId = Number(router.query.appId);
    }
    if (store.isEdit) {
      store.createWebhookData = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        ...store.webhookListData?.data?.find(
          (f) =>
            f.webhookId === ids?.webhookId &&
            f.appId === ids.appId &&
            f.profile === ids.profile
        )!,
      };
    }
    return () => store.init();
  }, [router.isReady, store.isEdit]);

  useEffect(() => {
    if (store.webhookTypeOptions) {
      setWebhookTypeOptions(
        store.webhookTypeOptions.map((v) => {
          return { label: v.name, value: v.webhookId };
        })
      );
    }
  }, [store.webhookTypeOptions]);

  return (
    <Modal
      onClose={() => store.closeCreateWebhookModal()}
      header={store.isEdit ? 'Edit a webhook' : 'Create webhook'}
      content={
        <>
          <Select
            options={webhookTypeOptions}
            onChange={(e) =>
              store.handleWebhookData('webhookId', e.target.value)
            }
            value={store.createWebhookData.webhookId}
            label="Webhook type"
            placeholder="Select webhook type"
            style={{ marginBottom: 24 }}
          />
          <Input
            onChange={(e) => store.handleWebhookData('name', e.target.value)}
            value={store.createWebhookData.name}
            label="Webhook name"
            placeholder="Enter webhook name"
            style={{ marginBottom: 24 }}
          />
          <Input
            onChange={(e) =>
              store.handleWebhookData('endpointUrl', e.target.value)
            }
            value={store.createWebhookData.endpointUrl}
            label="URL"
            placeholder="Input URL"
          />
        </>
      }
      footer={
        <>
          <LineButton
            onClick={() => store.closeCreateWebhookModal()}
            size="xsmall"
            styleType="neutral"
            label="Cancel"
          />
          <SolidButton
            onClick={() =>
              store.isEdit ? store.editWebhook() : store.createWebhook()
            }
            size="xsmall"
            styleType="color"
            label={store.isEdit ? 'Save' : 'Create'}
            disabled={
              (store.isEdit && store.editDisabled) ||
              (!store.isEdit && store.createDisabled)
            }
          />
        </>
      }
    />
  );
});

export default CreateWebhook;

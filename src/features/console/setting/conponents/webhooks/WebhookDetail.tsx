import Textarea from '@/features/common/components/common/Input/Textarea';
import Modal from '@/features/console/common/Modal';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { prettyJson } from '@/libs/common';
import dayjs from 'dayjs';

interface WebhookDetailProps {
  setShowDetail: () => void;
  selectedNo: string;
}

const WebhookDetail = observer(
  ({ setShowDetail, selectedNo }: WebhookDetailProps) => {
    const { webhookLogStore: store } = useStore();
    const router = useRouter();

    useEffect(() => {
      if (router.isReady && selectedNo) {
        store.loadDetail(Number(router.query.appId), Number(selectedNo)).then();
      }
    }, [selectedNo, router.isReady]);

    return (
      <Modal
        onClose={() => setShowDetail()}
        header={'View detail'}
        content={
          <div>
            <table className="rowTable" style={{ marginBottom: 16 }}>
              <colgroup>
                <col style={{ width: 150 }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>Profile</th>
                  <td>{store.detailData?.profile}</td>
                </tr>
                <tr>
                  <th>Webhook type</th>
                  <td>{store.detailData?.webhookKindCd}</td>
                </tr>
                <tr>
                  <th>Webhook name</th>
                  <td>{store.detailData?.webhookKindNm}</td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>{store.detailData?.url}</td>
                </tr>
                <tr>
                  <th>Sent date</th>
                  <td>
                    {dayjs(store.detailData?.createdAt).format(
                      'YYYY.MM.DD HH:mm:ss'
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Sent status</th>
                  <td style={{ textTransform: 'capitalize' }}>
                    {store.detailData?.status.toLowerCase()}
                  </td>
                </tr>
              </tbody>
            </table>

            <Textarea
              label="Webhook request"
              value={prettyJson(store.detailData?.requestBody, 2)}
              readOnly
            />
            <Textarea
              label="Webhook response"
              value={prettyJson(store.detailData?.responseBody, 2)}
              readOnly
              style={{ marginTop: 16 }}
            />
          </div>
        }
      />
    );
  }
);

export default WebhookDetail;

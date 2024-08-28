import React from 'react';
import { WebhookList } from './WebhookList';
import { WebhookLog } from './WebhookLog';

const Webhooks = () => {
  return (
    <div>
      <WebhookList />
      <WebhookLog />
    </div>
  );
};

export default Webhooks;

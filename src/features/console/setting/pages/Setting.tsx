import Tabs from '@/features/common/components/common/Tabs';
import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React, { useState } from 'react';
import styles from './Setting.module.scss';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import Webhooks from '@/features/console/setting/conponents/webhooks/Webhooks';
import Others from '@/features/console/setting/conponents/others/Others';
import { TeamMembers } from '@/features/console/setting/conponents/team-members/TeamMembers';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import WalletList from '../conponents/WalletList';
import { observer } from 'mobx-react';

const Setting = observer(() => {
  const { commonStore } = useStore();
  const [tabIndex, setTabIndex] = useState(0);
  const tabItems = [
    { label: 'Members' },
    { label: 'Webhook' },
    { label: 'Activity log' },
    {
      label: 'Wallet list',
      icon: (
        <strong className="figure">
          {commonStore.externalWallet.address.length > 0 ? 2 : 1}
        </strong>
      ),
    },
    { label: 'Others' },
  ];
  return (
    <ConsoleLayout>
      <div className={`settingWrap ${styles.settingWrap}`}>
        <div className="pageTitle noLine">
          <div>
            <h1>Setting</h1>
            <p>You can set your app's various preferences.</p>
          </div>
        </div>
        <Tabs
          type={'underline'}
          model={tabItems}
          size={18}
          activeIndex={tabIndex}
          onTabChange={(e) => {
            if (e.index === 2) {
              return alertConsole(
                'Work in process',
                'We are preparing to provide better service.',
                { icon: 'caution' }
              );
            }
            setTabIndex(e.index);
          }}
        />
        {tabIndex === 0 && <TeamMembers />}
        {tabIndex === 1 && <Webhooks />}
        {tabIndex === 3 && <WalletList />}
        {tabIndex === 4 && <Others />}
      </div>
    </ConsoleLayout>
  );
});

export default Setting;

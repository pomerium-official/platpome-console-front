import React from 'react';

import { Card } from 'primereact/card';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import { GnbDocIcon } from '@/features/common/components/layout/PomeV2Layout/Gnb/GnbDocIcon';
import Gnb from '@/features/common/components/layout/PomeV2Layout/Gnb';

const Page: PageComponent = () => {
  return (
    <Card title={'GNB'}>
      <Card title={'Icons'}>
        <GnbDocIcon />
      </Card>
      <Card title={'Gnb'}>
        <Gnb className="GNB-instance" page="landing-page" state="default" />;
        <Gnb
          // GNBLandingProfileIcon={
          //   <GnbProfileAsset className="icon-instance-node" />
          // }
          className="GNB-instance"
          page="landing-page"
          state="login"
        />
        <Gnb
          className="page-common-login"
          page="common-login-page"
          state="default"
        />
        <Gnb
          className="page-console-login"
          page="console-login-page"
          state="default"
        />
        <Gnb
          className="page-web-console"
          page="web-console-page"
          state="default"
        />
        <Gnb
          className="page-web-console"
          page="web-console-page"
          state="search-open"
        />
      </Card>
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

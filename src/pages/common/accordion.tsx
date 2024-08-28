import React from 'react';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { Card } from 'primereact/card';
import Accordion from '@/features/common/components/common/Accordion/Accordion';

const temp = [
  {
    title: 'hi!',
    content: 'hello',
    open: true,
  },
  {
    title: 'hi!',
    content: 'hello',
  },
  {
    title: 'hi!',
    content: 'hello',
  },
];

const Page: PageComponent = () => {
  return (
    <Card>
      <Accordion items={temp} />
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

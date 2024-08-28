import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import TimelineDemo from '@/features/sample/pages/TimelineDemo';

const Page: PageComponent = TimelineDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

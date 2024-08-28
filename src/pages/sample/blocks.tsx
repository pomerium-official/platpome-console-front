import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import BlocksDemo from '@/features/sample/components/BlocksDemo';

const Page: PageComponent = BlocksDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

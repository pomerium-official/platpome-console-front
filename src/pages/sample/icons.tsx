import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import IconsDemo from '@/features/sample/components/IconsDemo';

const Page: PageComponent = IconsDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

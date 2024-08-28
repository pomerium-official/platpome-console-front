import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import EmptyPage from '@/features/sample/pages/EmptyPage';

const Page: PageComponent = EmptyPage;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

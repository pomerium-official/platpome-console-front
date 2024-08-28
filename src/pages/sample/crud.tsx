import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import Crud from '@/features/sample/pages/Crud';

const Page: PageComponent = Crud;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

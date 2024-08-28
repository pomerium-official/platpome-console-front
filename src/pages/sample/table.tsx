import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import TableDemo from '@/features/sample/components/TableDemo';

const Page: PageComponent = TableDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

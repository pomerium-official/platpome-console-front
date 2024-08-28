import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import ListDemo from '@/features/sample/components/ListDemo';

const Page: PageComponent = ListDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

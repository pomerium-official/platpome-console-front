import Layout from '@/features/common/components/layout';
import Dashboard from '@/features/sample/components/Dashboard';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

const Page: PageComponent = Dashboard;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

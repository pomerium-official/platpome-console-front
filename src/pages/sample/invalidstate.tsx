import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import InvalidStateDemo from '@/features/sample/components/InvalidStateDemo';

const Page: PageComponent = InvalidStateDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

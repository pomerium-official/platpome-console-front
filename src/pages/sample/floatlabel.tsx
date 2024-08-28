import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import FloatLabelDemo from '@/features/sample/components/FloatLabelDemo';

const Page: PageComponent = FloatLabelDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

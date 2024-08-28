import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import ButtonDemo from '@/features/sample/components/ButtonDemo';

const Page: PageComponent = ButtonDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

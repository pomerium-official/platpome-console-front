import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import FormLayoutDemo from '@/features/sample/components/FormLayoutDemo';

const Page: PageComponent = FormLayoutDemo;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

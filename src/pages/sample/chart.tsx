import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

import ChartDemo from '@/features/sample/components/ChartDemo';
import useTheme from '@/libs/baseCommon/hooks/useTheme';

const Page: PageComponent = () => {
  const { colorMode } = useTheme();
  return <ChartDemo colorMode={colorMode} />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

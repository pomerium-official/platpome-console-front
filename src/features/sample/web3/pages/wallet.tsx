import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import WalletBiz from '../components/Wallet';

const Page: PageComponent = WalletBiz;

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// // 서버사이드 props
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const boardBizStore = new BoardBizStore();
//   boardBizStore.loading = false;
//   return { props: { initialStore: JSON.stringify({ boardBizStore }) } };
// };

export default Page;

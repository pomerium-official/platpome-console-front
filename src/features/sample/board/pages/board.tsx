import Layout from '@/features/common/components/layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import BoardBiz from '../components/Board';

// import { GetServerSideProps } from 'next';
// import BoardBizStore from 'features/sample/board/stores/BoardBizStore';

const Page: PageComponent = BoardBiz;

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

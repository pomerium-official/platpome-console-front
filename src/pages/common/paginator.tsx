import { Card } from 'primereact/card';
import Paginator from '@/features/common/components/common/Paginator';
import { Paginator as PrimePaginator } from 'primereact/paginator';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import Layout from '@/features/common/components/layout/PomeV2Layout';

const Page: PageComponent = () => {
  return (
    <Card title={'Paginator'}>
      <Paginator
        totalRecords={120}
        first={1}
        rows={10}
        onPageChange={(e) => {
          console.log(e);
        }}
      />
      <PrimePaginator
        totalRecords={120}
        first={1}
        rows={10}
        onPageChange={(e) => {
          console.log(e);
        }}
      />
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

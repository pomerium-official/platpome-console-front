import { Card } from 'primereact/card';
import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { WalletList } from '@/features/common/components/common/DataTable/WalletList';
import { Transactions } from '@/features/common/components/common/DataTable/Transactions';
import { TokenHolders } from '@/features/common/components/common/DataTable/TokenHolders';
import { TeamMembers } from '@/features/common/components/common/DataTable/TeamMembers';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import Layout from '@/features/common/components/layout/PomeV2Layout';

const Page: PageComponent = () => {
  return (
    <Card title={'DataTable'}>
      <Card title={'common'}>
        <Card title={'TableAddressUi'}>
          <TableAddressUi
            className="type-wallet-state"
            type="wallet"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
          <TableAddressUi
            className="type-wallet-state"
            disabled
            type="wallet"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
          <TableAddressUi
            className="type-contract-state"
            type="contract"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
          <TableAddressUi
            className="type-contract-state"
            disabled
            type="contract"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
          <TableAddressUi
            className="type-txn-hash-state"
            type="txn-hash"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
          <TableAddressUi
            className="table-address-UI-instance"
            type="wallet-copy"
            text={'0x88E9c9f878341BF72AdADc071aFc47335A25AA8a'}
          />
        </Card>
      </Card>
      <WalletList />
      <Transactions />
      <TokenHolders />
      <TeamMembers />
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

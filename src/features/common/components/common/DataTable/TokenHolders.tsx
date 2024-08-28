import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
// import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { MyIcons } from '@/features/common/components/common/MyIcons';

import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { OnlyIconButton } from '@/features/common/components/common/Button/OnlyIconButton';

export interface HoldersDataType {
  rank: number;
  // account: string;
  // name: string;
  address: string;
  amountOfTokensHeld: string;
}
const sampleData = Array.from({ length: 100 }, () => ({
  ...{
    rank: 1,
    account: 'xx@pomerium.space',
    name: '지갑명',
    address: '0x88E9c9f878341BF72AdADc071aFasfasfcasfasf473',
    amountOfTokensHeld: '0.00324321 VIC',
  },
}));

export const TokenHolders = (props: {
  data?: HoldersDataType[];
  transactionPaginator?: React.ReactNode;
}) => {
  return (
    <TableWrapperCard style={{ width: '100%' }}>
      <DataTable
        value={props.data ?? sampleData}
        paginator={!props.transactionPaginator}
        rows={10}
        header={
          <div className={'flex flex-row justify-center align-items-center'}>
            <span>Token holders</span>
            {/*<BasicTag*/}
            {/*  color={'VL'}*/}
            {/*  line={'on'}*/}
            {/*  styleClass={'round'}*/}
            {/*  stateDot={false}*/}
            {/*  containerStyle={{ marginLeft: '0.5rem' }}*/}
            {/*>*/}
            {/*  100 holders*/}
            {/*</BasicTag>*/}
            <OnlyIconButton className={'ml-auto'}>
              <MyIcons.SearchIcon width={20} height={20} />
            </OnlyIconButton>
            <OnlyIconButton>
              <MyIcons.SettingIcon width={20} height={20} />
            </OnlyIconButton>
          </div>
        }
      >
        {/*<Column field={'rank'} header={'Rank'} style={{ width: 75 }} />*/}
        {/*<Column*/}
        {/*  field={'account'}*/}
        {/*  header={'Account'}*/}
        {/*  style={{ width: '15.625rem' }}*/}
        {/*/>*/}
        {/*<Column field={'name'} header={'Name'} style={{ width: '9.375rem' }} />*/}
        <Column
          field={'address'}
          header={'Address'}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '20.25rem' }}
                className="table-address-UI-instance"
                type="wallet"
                text={row.address}
              />
            );
          }}
        />
        <Column
          field={'amountOfTokensHeld'}
          header={'Amount of tokens held'}
          style={{ width: '10.5rem' }}
        />
      </DataTable>
      {props.transactionPaginator && props.transactionPaginator}
    </TableWrapperCard>
  );
};

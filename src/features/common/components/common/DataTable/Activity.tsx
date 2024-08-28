import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { MyIcons } from '@/features/common/components/common/MyIcons';

import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { OnlyIconButton } from '@/features/common/components/common/Button/OnlyIconButton';
import { faker } from '@faker-js/faker';

const data = Array.from({ length: 100 }, () => ({
  ...{
    type: faker.helpers.arrayElement(['transfer', 'sale', 'list', 'mint']),
    price: 1.5,
    from: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
    to: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
    date: '23.06.27 13:44:52',
  },
}));

export const Activity = (props: { transactionPaginator?: React.ReactNode }) => {
  return (
    <TableWrapperCard style={{ width: '100%' }}>
      <DataTable
        value={data}
        paginator={!props.transactionPaginator}
        rows={100}
        header={
          <div className={'flex flex-row justify-center align-items-center'}>
            <span>Activity</span>
            <OnlyIconButton className={'ml-auto'}>
              <MyIcons.SearchIcon width={20} height={20} />
            </OnlyIconButton>
            <OnlyIconButton>
              <MyIcons.SettingIcon width={20} height={20} />
            </OnlyIconButton>
          </div>
        }
      >
        <Column
          field={'type'}
          header={'Type'}
          style={{ width: 75 }}
          body={(row) => {
            return (
              <span
                className={`__tag ${row.type}`}
                style={{ margin: '0 auto' }}
              >
                {row.type}
              </span>
            );
          }}
        />
        <Column
          field={'price'}
          header={'Price'}
          body={(row) => {
            return `${row.price} PMG`;
          }}
          style={{ width: 200 }}
        />
        <Column
          field={'from'}
          header={'From'}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '20.25rem' }}
                className="table-address-UI-instance"
                type="wallet"
                text={row.from}
              />
            );
          }}
        />
        <Column
          header={
            <img
              src={'/assets/images/icons/icon-larr.svg'}
              alt=""
              style={{ transform: 'rotate(180deg)' }}
            />
          }
          body={() => {
            return (
              <img
                src={'/assets/images/icons/icon-larr.svg'}
                alt=""
                style={{ transform: 'rotate(180deg)' }}
              />
            );
          }}
        />
        <Column
          field={'to'}
          header={'To'}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '20.25rem' }}
                className="table-address-UI-instance"
                type="wallet"
                text={row.to}
              />
            );
          }}
        />
        <Column field={'date'} header={'Date'} style={{ width: '10.5rem' }} />
      </DataTable>
      {props.transactionPaginator && props.transactionPaginator}
    </TableWrapperCard>
  );
};

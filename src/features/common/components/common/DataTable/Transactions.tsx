import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
// import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { MyIcons } from '@/features/common/components/common/MyIcons';
import styles from './Transactions.module.scss';
import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { OnlyIconButton } from '@/features/common/components/common/Button/OnlyIconButton';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { StatusTag } from '@/features/common/components/common/Tag/StatusTag';

export interface TransactionDataType {
  txnHash: string;
  block: string;
  date: number;
  from: string;
  to: string;
  quantity: string;
  status: 'fail' | 'success' | 'pending';
}
const sampleData = Array.from({ length: 100 }, () => ({
  ...{
    txnHash: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
    block: '29340983',
    date: 1688999695000,
    from: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
    to: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
    quantity: '0.00324321 VIC',
    status: faker.helpers.arrayElement(['fail', 'success', 'pending']),
  },
}));

export const Transactions = (props: {
  data?: TransactionDataType[];
  transactionPaginator?: React.ReactNode;
}) => {
  return (
    <TableWrapperCard style={{ width: '79.75rem' }}>
      <DataTable
        value={props.data ?? sampleData}
        paginator={!props.transactionPaginator}
        rows={100}
        header={
          <div className={'flex flex-row justify-center align-items-center'}>
            <span>Transactions</span>
            {/*<BasicTag*/}
            {/*  color={'l-gray'}*/}
            {/*  line={'on'}*/}
            {/*  styleClass={'round'}*/}
            {/*  stateDot={false}*/}
            {/*  containerStyle={{ marginLeft: '0.5rem' }}*/}
            {/*>*/}
            {/*  100 Wallets*/}
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
        <Column
          field={'txnHash'}
          header={'Txn Hash'}
          style={{ width: '14rem' }}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '12.5rem' }}
                type="txn-hash"
                text={row.txnHash}
              />
            );
          }}
        />
        <Column
          field={'block'}
          header={'Block #'}
          style={{ width: '7.5rem' }}
        />
        <Column
          field={'date'}
          header={'Date'}
          style={{ width: '10rem' }}
          body={(row) => {
            // 23.06.27 13:44:52
            return dayjs(row.date).format('YY.MM.DD HH:mm:ss');
          }}
        />
        {/*TODO FROM TO*/}
        <Column
          field={'from'}
          header={'From'}
          className={styles.from}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '12.5rem' }}
                type="wallet"
                text={row.from}
                disabled
              />
            );
          }}
        />
        <Column
          field={'to'}
          header={
            <div className={'flex flex-row align-items-center'}>
              <MyIcons.ArrowRightIcon width={'0.875rem'} height={'0.875rem'} />
              <span style={{ marginLeft: '0.5rem' }}>To</span>
            </div>
          }
          className={styles.to}
          body={(row) => {
            return (
              <div className={'flex flex-row align-items-center'}>
                <MyIcons.ArrowRightIcon
                  width={'0.875rem'}
                  height={'0.875rem'}
                />
                <TableAddressUi
                  type="wallet"
                  text={row.to}
                  wrapperStyle={{ width: '12.5rem', marginLeft: '0.5rem' }}
                />
              </div>
            );
          }}
        />
        <Column
          field={'quantity'}
          header={'Quantity'}
          style={{ width: '8.0625rem' }}
        />
        <Column
          field={'status'}
          header={'Status'}
          alignHeader={'center'}
          style={{ width: '7.8125rem' }}
          body={(row) => {
            return (
              <div className={'flex justify-content-center'}>
                <StatusTag state={row.status} />
              </div>
            );
          }}
        />
      </DataTable>
      {props.transactionPaginator && props.transactionPaginator}
    </TableWrapperCard>
  );
};

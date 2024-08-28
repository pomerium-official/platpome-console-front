import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { MyIcons } from '@/features/common/components/common/MyIcons';
import dayjs from 'dayjs';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import styles from '@/features/common/components/common/DataTable/Transactions.module.scss';
import { StatusTag } from '@/features/common/components/common/Tag/StatusTag';
import { faker } from '@faker-js/faker';
import Filter from '../../common/Filter';
import FilterDateRange from '../../common/FilterDateRange';
// import FilterConditions from '../../common/FilterConditions';
import Accordion from '@/features/common/components/common/Accordion/Accordion';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import ChainPaginator from '../../common/ChainPaginator';

export interface WalletActivityType {
  txnHash: string;
  block: string;
  date: number;
  from: string;
  to: string;
  quantity?: string;
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

const Activities = observer(() => {
  const { walletDetailStore: store } = useStore();
  const router = useRouter();

  return (
    <div>
      <TableWrapperCard style={{ width: '79.75rem' }}>
        <DataTable
          value={store.walletActivities ?? sampleData}
          // paginator
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
              <Filter
                onApply={store.onApplySearchCondition}
                onReset={store.initSearchParams}
                selectedConditions={
                  <>
                    {store.searchCondition.dateRange?.fromDate && (
                      <span>
                        {store.searchCondition.dateRange.fromDate} ~{' '}
                        {store.searchCondition.dateRange.toDate}
                        <button
                          onClick={() =>
                            (store.searchCondition.dateRange = undefined)
                          }
                        />
                      </span>
                    )}
                    {store.searchCondition.condition && (
                      <span>
                        {store.searchCondition.condition}
                        <button
                          onClick={() =>
                            (store.searchCondition.condition = undefined)
                          }
                        />
                      </span>
                    )}
                  </>
                }
                body={
                  <Accordion
                    items={[
                      {
                        title: 'Date range (within the last 1 years)',
                        content: (
                          <FilterDateRange
                            currentRange={store.rangeId}
                            selected={(e) =>
                              store.onSelectDateRange(
                                e.condition.id,
                                e.condition.from,
                                e.condition.to
                              )
                            }
                          />
                        ),
                        open: true,
                      },
                      // {
                      //   title: 'Status',
                      //   content: (
                      //     <FilterConditions
                      //       conditions={{
                      //         field: 'status',
                      //         condition: [
                      //           { name: 'All', value: '' },
                      //           { name: 'Success', value: 'success' },
                      //           { name: 'Pending', value: 'Pending' },
                      //           { name: 'Fail', value: 'Fail' },
                      //         ],
                      //       }}
                      //       selected={(e) => {
                      //         if (e.condition[0].value) {
                      //           store.onSelectStatus(e.condition[0].value);
                      //         }
                      //       }}
                      //     />
                      //   ),
                      // },
                    ]}
                  />
                }
                style={{ marginLeft: 'auto' }}
              />
            </div>
          }
        >
          <Column
            field={'txnHash'}
            header={'Txn Hash'}
            style={{ width: '14rem' }}
            body={(row) => {
              return (
                <button
                  onClick={() =>
                    router.push(`https://testnet.bscscan.com/tx/${row.txnHash}`)
                  }
                >
                  <TableAddressUi
                    wrapperStyle={{ width: '12.5rem' }}
                    type="txn-hash"
                    text={row.txnHash}
                  />
                </button>
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
                <MyIcons.ArrowRightIcon
                  width={'0.875rem'}
                  height={'0.875rem'}
                />
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
        <ChainPaginator
          next={{
            disabled: !store.transactionPageParams.hasNext,
            onClick: () => store.onClickPage('next'),
          }}
          prev={{
            disabled: store.transactionPageParams.pageNo === 0,
            onClick: () => store.onClickPage('prev'),
          }}
        />
      </TableWrapperCard>
    </div>
  );
});

export default Activities;

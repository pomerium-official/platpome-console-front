import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { MyIcons } from '@/features/common/components/common/MyIcons';

import styles from './WalletList.module.scss';
import { TableAddressUi } from '@/features/common/components/common/DataTable/TableAddressUi';
import { SignTag } from '@/features/common/components/common/Tag/SignTag';

const data = Array.from({ length: 100 }, () => ({
  ...{
    name: '지갑명',
    desc:
      '지갑 설명이 들어갑니다. 지갑 설명이 들어갑니다. 지갑 설명 asf최대 2줄입니다.',
    address: '0x88E9c9f878341BF72AdADc071aFasfasfcasfasf473',
    holdingToken: 1,
    signMethod: 'auto',
  },
}));

export const WalletList = () => {
  return (
    <TableWrapperCard style={{ width: '66.8125rem' }}>
      <DataTable
        value={data}
        paginator
        rows={10}
        header={
          <div className={'flex flex-row justify-center align-items-center'}>
            <span>Wallet List</span>
            <BasicTag
              color={'VL'}
              line={'on'}
              styleClass={'round'}
              stateDot={false}
              containerStyle={{ marginLeft: '0.5rem' }}
            >
              100 Wallets
            </BasicTag>
            <SolidButton
              styleType={'color'}
              size={'medium'}
              className={'ml-auto'}
            >
              <MyIcons.PlusIcon width={'0.875rem'} color={'#262626'} />
              Create wallet
            </SolidButton>
          </div>
        }
      >
        <Column field={'name'} header={'Name'} style={{ width: '9.375rem' }} />
        <Column
          field={'desc'}
          header={'Description'}
          style={{ width: '16.8125rem' }}
          body={(row) => {
            return <div className={styles.twoLine}>{row.desc}</div>;
          }}
        />
        <Column
          field={'address'}
          header={'Address'}
          style={{ width: '21.8rem' }}
          body={(row) => {
            return (
              <TableAddressUi
                wrapperStyle={{ width: '20.3rem' }}
                className="table-address-UI-instance"
                type="wallet"
                text={row.address}
              />
            );
          }}
        />
        <Column
          field={'holdingToken'}
          header={'Holding token'}
          style={{ width: '7.0625rem' }}
        />
        <Column
          field={'signMethod'}
          header={'Sign method'}
          alignHeader={'center'}
          style={{ width: '7.8125rem' }}
          body={(row) => {
            return (
              <div className={'flex justify-content-center'}>
                <SignTag state={row.signMethod} />
              </div>
            );
          }}
        />
      </DataTable>
    </TableWrapperCard>
  );
};

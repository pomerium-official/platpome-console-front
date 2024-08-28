import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';

import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { faker } from '@faker-js/faker';
import { AuthorityTag } from '@/features/common/components/common/Tag/AuthorityTag';

const data = Array.from({ length: 100 }, () => ({
  ...{
    developerName: 'Nickname',
    account: 'xx@pomerium.space',
    authority: faker.helpers.arrayElement(['OWNER', 'ADMIN', 'DEVELOPER']),
  },
}));

export const TeamMembers = () => {
  return (
    <TableWrapperCard style={{ width: '43.0625rem' }}>
      <DataTable
        value={data}
        paginator
        rows={10}
        header={
          <div className={'flex flex-row justify-center align-items-center'}>
            <span>Team members</span>
            <BasicTag
              color={'VL'}
              line={'on'}
              styleClass={'round'}
              stateDot={false}
              containerStyle={{ marginLeft: '0.5rem' }}
            >
              100 members
            </BasicTag>
            <LineButton size="medium" styleType="neutral" className={'ml-auto'}>
              Delete
            </LineButton>
            <SolidButton
              size="medium"
              styleType="color"
              style={{ marginLeft: '0.5rem' }}
            >
              Add
            </SolidButton>
          </div>
        }
      >
        <Column
          field={'developerName'}
          header={'Developer name'}
          style={{ width: '15.625rem' }}
        />
        <Column
          field={'account'}
          header={'Account'}
          style={{ width: '15.625rem' }}
        />

        <Column
          field={'authority'}
          header={'Authority'}
          style={{ width: '10.5rem' }}
          alignHeader={'center'}
          body={(row) => {
            return (
              <div className={'flex justify-content-center'}>
                <AuthorityTag state={row.authority} />
              </div>
            );
          }}
        />
      </DataTable>
    </TableWrapperCard>
  );
};

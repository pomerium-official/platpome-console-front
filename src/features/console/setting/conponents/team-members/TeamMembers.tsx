import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { TableWrapperCard } from '@/features/common/components/common/DataTable/TableWrapperCard';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import InviteMember from './InviteMember';
import { CommonResponseFindManyWorkspaceMembersResponseArray } from '@/generated/api/api-service';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';

const defaultPageData = { pageSize: 10, pageNo: 1 };

export const TeamMembers = observer(() => {
  const { teamMembersStore: store } = useStore();
  const router = useRouter();

  const [pageData, setPageData] = useState(defaultPageData);
  const [showInvite, setShowInvite] = useState(false);
  const [
    memberListData,
    setMemberListData,
  ] = useState<CommonResponseFindManyWorkspaceMembersResponseArray>();

  useEffect(() => {
    if (router.isReady) {
      store
        .load(Number(router.query.appId), pageData.pageSize, pageData.pageNo)
        .then();
    }
  }, [store, router.isReady, pageData]);

  useEffect(() => {
    setMemberListData(store.memberListData);
  }, [store.memberListData]);

  useStoreInitUnmount(store);

  return (
    <>
      <TableWrapperCard style={{ width: '100%' }}>
        <DataTable
          value={memberListData?.data}
          paginator
          onPage={(e) =>
            setPageData((prev) => {
              return { ...prev, pageNo: e.page! + 1 ?? 0 };
            })
          }
          totalRecords={store.memberListData?.total}
          first={(pageData.pageNo - 1) * pageData.pageSize}
          rows={pageData.pageSize}
          header={
            <div className={'flex flex-row justify-center align-items-center'}>
              <span>Team Members</span>
              <SolidButton
                onClick={() => setShowInvite(true)}
                size="small"
                styleType="color"
                label="Invite"
                icon={
                  <i
                    style={{
                      display: 'block',
                      width: 14,
                      height: 14,
                      background: 'var(--color-262626)',
                      WebkitMask:
                        'url(/assets/images/icons/icon-cross.svg) no-repeat center center',
                      WebkitMaskSize: 'cover',
                    }}
                  />
                }
                style={{ marginLeft: 'auto' }}
              />
            </div>
          }
        >
          <Column
            field={'nickName'}
            header={'Developer name'}
            style={{ width: 250 }}
          />
          <Column field={'loginId'} header={'Account'} />
          <Column
            field={'authorityCode'}
            header={'Authority'}
            style={{ width: 125 }}
            body={(row) => {
              return (
                <span
                  className={`__tag auth ${
                    row.authorityCode === 'MASTER' ? 'owner' : 'member'
                  }`}
                  style={{ margin: '0 auto' }}
                >
                  {row.authorityCode === 'MASTER' ? 'OWNER' : 'MEMBER'}
                </span>
              );
            }}
            align={'center'}
          />
          <Column
            body={(row) => {
              const isSelf =
                store.rootStore?.commonStore.userInfo?.memberId ===
                row.consoleMemberId;

              const isMaster =
                memberListData?.data &&
                memberListData?.data.length > 0 &&
                store.rootStore?.commonStore.userInfo?.memberId ===
                  memberListData?.data.find((f) => f.authorityCode === 'MASTER')
                    ?.consoleMemberId;

              if (row.authorityCode !== 'MASTER' && (isMaster || isSelf)) {
                return (
                  <button
                    className="iconBtn trash"
                    style={{ margin: '0 auto' }}
                    onClick={async () => {
                      const deleted = await store.deleteMember(
                        Number(router.query.appId),
                        row.consoleMemberId
                      );
                      if (deleted && isSelf) {
                        router.push('/console').then();
                      }
                    }}
                  />
                );
              }
            }}
            style={{ width: 120 }}
          />
        </DataTable>
      </TableWrapperCard>
      {showInvite && (
        <InviteMember setShowInvite={() => setShowInvite(false)} />
      )}
    </>
  );
});

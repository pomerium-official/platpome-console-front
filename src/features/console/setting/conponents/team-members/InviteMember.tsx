import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Input from '@/features/common/components/common/Input/Input';
import Modal from '@/features/console/common/Modal';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface InviteMemberProps {
  setShowInvite: () => void;
}

const InviteMember = observer(({ setShowInvite }: InviteMemberProps) => {
  const { teamMembersStore: store } = useStore();
  const router = useRouter();

  const [invalidEmail, setInvalidEmail] = useState<'error'>();
  const [inviteReady, setInviteReady] = useState(true);
  const [accountYet, setAccountYet] = useState(false);

  useEffect(() => {
    return () => (store.inviteEmail = undefined);
  }, []);

  return (
    <Modal
      onClose={() => setShowInvite()}
      header={'Invite a team member'}
      content={
        <div className="inviteContent">
          <Input
            value={store.inviteEmail ?? ''}
            onChange={(e) => {
              if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value)) {
                setInvalidEmail('error');
                setInviteReady(true);
              } else {
                setInvalidEmail(undefined);
                setInviteReady(false);
              }
              store.onChangeEmail(e.target.value);
              setAccountYet(false);
            }}
            label="Email address"
            placeholder="Enter Email address"
            result={store.alreadyInvited || accountYet ? 'error' : invalidEmail}
            errorText={
              store.alreadyInvited
                ? 'Already invited member'
                : `${
                    accountYet
                      ? 'This email does not have a developer account yet.'
                      : 'Invalid Email'
                  }`
            }
          />
          <Input
            label="Authority"
            placeholder="Member"
            style={{ marginTop: 24 }}
            readOnly
          />
        </div>
      }
      footer={
        <>
          <LineButton
            size="xsmall"
            styleType="neutral"
            label="Cancel"
            onClick={() => setShowInvite()}
          />
          <SolidButton
            onClick={async () => {
              const check = await store.handleInvite(
                Number(router.query.appId)
              );
              if (check === '00') {
                setShowInvite();
              } else {
                setAccountYet(true);
              }
            }}
            size="xsmall"
            styleType="color"
            label="Invite"
            disabled={store.alreadyInvited || inviteReady || accountYet}
          />
        </>
      }
    />
  );
});

export default InviteMember;

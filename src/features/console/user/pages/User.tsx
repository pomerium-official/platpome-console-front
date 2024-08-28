import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import React from 'react';

const User = () => {
  return (
    <ConsoleLayout>
      <h1 className="pageTitle">User</h1>
      <div className="userWrap">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 40px',
          }}
        >
          <img src="/assets/images/console/img-rocket-user.png" alt="" />
          <dl style={{ marginTop: 24, textAlign: 'center' }}>
            <dt
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-f2f2f2)',
              }}
            >
              Preparing for service
            </dt>
            <dd
              style={{
                marginTop: 4,
                fontSize: 16,
                fontWeight: 400,
                color: 'var(--color-ccc)',
              }}
            >
              We are preparing to provide better service. Please wait a minute.
            </dd>
          </dl>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default User;

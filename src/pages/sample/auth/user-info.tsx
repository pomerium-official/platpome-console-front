import React from 'react';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { logout } from '@/features/auth/libs/client/actions';
import { Button } from 'primereact/button';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import { usePrivatePing } from '@/pages/sample/auth/private-data';

const UserInfo: PageComponent = () => {
  const { data, loading } = useUserInfo({ needLogin: true });
  useUserInfo({ needLogin: false });
  useUserInfo({ needLogin: false });
  useUserInfo({ needLogin: false });
  useUserInfo({ needLogin: false });
  useUserInfo({ needLogin: false });

  usePrivatePing(5);
  if (loading) {
    return <div>로딩</div>;
  }

  return (
    <div>
      <h1>Private Page, 사용자 정보가 없으면 로그인으로 이동하는 페이지</h1>
      <pre
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
      />
      <br />
      <br />
      {data && <Button onClick={() => logout()}>로그아웃</Button>}
    </div>
  );
};
UserInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default UserInfo;

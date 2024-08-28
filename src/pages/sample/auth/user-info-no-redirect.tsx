import React from 'react';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { Button } from 'primereact/button';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { logout } from '@/features/auth/libs/client/actions';
import { usePrivatePing } from '@/pages/sample/auth/private-data';

const UserInfoNoRedirect: PageComponent = () => {
  usePrivatePing(5);
  const { data, loading } = useUserInfo({ needLogin: false });
  if (loading) {
    return <div>로딩</div>;
  }

  return (
    <div>
      <h1>Private Page, 사용자 정보 없어도 로그인으로 이동안하는 페이지</h1>
      <pre
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
      />
      {/*{data?JSON.stringify(data,null,2):"사용자 정보 없음"}*/}
      <br />
      <br />
      {data && <Button onClick={() => logout()}>로그아웃</Button>}
    </div>
  );
};

UserInfoNoRedirect.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UserInfoNoRedirect;

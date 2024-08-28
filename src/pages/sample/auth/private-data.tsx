import React, { useEffect, useState } from 'react';
import { logout } from '@/features/auth/libs/client/actions';
import { Button } from 'primereact/button';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import { api } from '@/apis';

/**
 * Ping 호출.
 * @param thread 동시호출 테스트
 */
export const usePrivatePing = (thread = 1) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.all(
          Array.from({ length: thread }).map(() => {
            return api.ping.getMessage();
            // return api.ping.getMessageSecurity();
          })
        );
        const res = results[0];
        setData(res.data);
      } catch (e) {
        setError(JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [thread]);

  return { loading, error, data };
};

const PrivateData: PageComponent = () => {
  const { loading, data, error } = usePrivatePing(5);

  if (loading) {
    return <div>로딩</div>;
  }

  return (
    <div>
      <h1>데이터 조회는 401일때, 로그인 페이지로 이동하고 이런거 안함.</h1>
      <pre
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
      />
      {error}
      <br />
      <br />
      {data && <Button onClick={() => logout()}>로그아웃</Button>}
    </div>
  );
};
PrivateData.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default PrivateData;

import { useEffect } from 'react';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { useRouter } from 'next/router';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * GTM(GoogleTagManager) hooks
 * env에 GTM_ID가 없을 경우 작동하지 않습니다.
 */
export const useGtm = () => {
  const router = useRouter();

  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    if (router.isReady) {
      window.dataLayer?.push({
        event: 'setUser',
        userId: userInfo?.sub,
      });
    }
  }, [router.isReady, userInfo]);
};

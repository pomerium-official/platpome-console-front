import { useEffect, useState } from 'react';
import { refreshTokenProcess } from '@/features/auth/libs/client/refresh-token';
import { UserInfo } from '@/features/auth/libs/client/model';
import {
  getIdToken,
  login,
  saveIdToken,
  saveIdTokenOtherSite,
  verifyIdToken,
} from '@/features/auth/libs/client/actions';
import { JwtError, JwtErrorCode } from '@/features/auth/libs/shared/jwt-error';

export type UseUserInfoParams = {
  needLogin?: boolean;
};

/**
 * 사용자 정보를 가져온다.
 * idToken에서 조회해온다.
 */
export const useUserInfo = (params?: UseUserInfoParams) => {
  const { needLogin } = params ?? { needLogin: false };
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const _needLogin = needLogin && process.env.NEXT_PUBLIC_LOGIN_FREE !== 'true';

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const idToken = getIdToken();

        if (idToken === null) {
          if (_needLogin) {
            login();
          } else {
            setLoading(false);
          }
          return;
        }

        const user = await verifyIdToken(idToken);
        if (user) {
          setUserInfo(user);
        }
        setLoading(false);
      } catch (err) {
        if (err instanceof JwtError) {
          if (err.code === JwtErrorCode.TokenExpired) {
            try {
              const idToken = await refreshTokenProcess();
              if (idToken) {
                saveIdToken(idToken);
                saveIdTokenOtherSite(idToken);
                // refresh해온 토큰이 상했을 수 있나? -> 있긴한데, 확률이 극악함. 무시
                const user = await verifyIdToken(idToken);
                if (user) {
                  setUserInfo(user);
                }
              }
            } catch (e) {
              if (e instanceof JwtError) {
                setLoading(false);
                return;
              }

              if (_needLogin) {
                login();
              }
            }
          }

          setLoading(false);
          return;
        }

        setLoading(false);
      }
    };
    load();
  }, []);

  return { loading, data: userInfo };
};

import axios from 'axios';
import {
  createLoginUrl,
  logoutUrl,
} from '@/features/auth/libs/shared/oidc-urls';
import {
  clientId,
  redirectUrl,
} from '@/features/auth/libs/shared/shared-config';
import { verifyJwt } from '@/features/auth/libs/client/verify-jwt';
import { ActionSaveIdTokenOther } from '@/features/auth/libs/shared/shared-config';
import jwtDecode from 'jwt-decode';
import { UserInfo } from '@/features/auth/libs/client/model';

export type LogoutOptions = {
  redirectUri?: string;
};

export const logout = async ({
  redirectUri = location.href,
}: LogoutOptions = {}) => {
  const idToken = getIdToken();
  // saveIdTokenOther clear other
  saveIdToken('');

  await Promise.allSettled([
    saveIdTokenOtherSite(''),
    axios.post('/api/auth/logout'),
  ]);

  // idToken 기반 로그아웃 처리
  if (idToken) {
    const idInfo = jwtDecode<UserInfo>(idToken);

    const logoutAction =
      logoutUrl +
      '?client_id=' +
      encodeURIComponent(idInfo.aud) +
      '&post_logout_redirect_uri=' +
      encodeURIComponent(redirectUri) +
      '&id_token_hint=' +
      encodeURIComponent(idToken);

    window.location.replace(logoutAction);
  } else {
    window.location.replace('/');
  }
};

export const login = async () => {
  const res = await axios.get<{ nonce: string; state: string }>(
    '/api/auth/generate'
  );
  const { nonce, state } = res.data;

  // 현재 url 저장. 추후 다시 이곳으로 돌아옴
  localStorage.setItem('redirectUrl', window.location.href);
  // 통합인증 로그인 페이지로 이동
  // callback url 은 /pages/auth/login-callback
  window.location.assign(
    createLoginUrl({
      clientId,
      redirectUri: redirectUrl,
      responseType: 'code',
      nonce,
      state,
    })
  );
};

export const saveIdToken = (idToken: string) => {
  if (idToken === '') {
    localStorage.removeItem('idToken');
  } else {
    localStorage.setItem('idToken', idToken);
  }
};

/**
 * 다른 사이트에 idToken 설정. idToken이 비어있으면 localstorageClear.
 * 다른 사이트 URL은 idtoken-other-site?idToken= 을 구현해야합니다.
 * src/pages/auth/idtoken-other-site.tsx 참고
 * @param idToken
 */
export const saveIdTokenOtherSite = (idToken: string) => {
  return new Promise((resolve) => {
    try {
      //NEXT_PUBLIC_OTHER_SITE_URL
      if (process.env.NEXT_PUBLIC_OTHER_SITE_URL) {
        // iframe 생성
        // iframe 요소 생성
        const iframe: HTMLIFrameElement = document.createElement('iframe');
        // url로 열어서 idToken 전달
        // iframe의 속성 설정
        iframe.src = `${process.env.NEXT_PUBLIC_OTHER_SITE_URL}/auth/idtoken-other-site`;
        iframe.width = '0px'; // 원하는 너비 설정
        iframe.height = '0px'; // 원하는 높이 설정

        const targetOrigin = process.env.NEXT_PUBLIC_OTHER_SITE_URL; // iframe의 origin을 설정하세요

        let done = false;

        // // iframe이 로드되었는지 확인하는 함수
        // const checkIframeLoaded = () => {
        //   return new Promise((resolve) => {
        //     if (iframe.contentWindow && iframe.contentWindow.postMessage) {
        //       resolve(true);
        //     } else {
        //       // iframe이 로드되지 않았을 경우 재시도
        //       setTimeout(checkIframeLoaded, 100);
        //     }
        //   });
        // };

        const handleError = async () => {
          window.removeEventListener('message', responseHandler);
          iframe.remove();
          resolve(false);
        };

        // timeout을 건다.
        const timeout = setTimeout(() => {
          if (!done) {
            handleError().then();
          }

          clearTimeout(timeout);
        }, 3000);

        // iframe의 load 이벤트를 감지하여 로드 상태를 확인
        iframe.addEventListener('load', async () => {
          iframe.contentWindow!.postMessage(
            { action: ActionSaveIdTokenOther, idToken },
            targetOrigin
          );
        });

        iframe.onerror = handleError;

        const responseHandler = (event: MessageEvent<any>) => {
          const { action, status } = event.data;

          if (action === ActionSaveIdTokenOther) {
            if (event.origin !== process.env.NEXT_PUBLIC_OTHER_SITE_URL) {
              done = true;
              return;
            }

            // 이벤트 제거
            window.removeEventListener('message', responseHandler);
            if (status === 'failed') {
              console.log(
                `${process.env.NEXT_PUBLIC_OTHER_SITE_URL}에 로그인 실패`
              );
            }

            iframe.remove();
            done = true;
            resolve(true);
          }
        };

        window.addEventListener('message', responseHandler);

        // body에 iframe 추가
        document.body.appendChild(iframe);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.warn('failed saveIdTokenOtherSite', e);
      resolve(false);
    }
  });
};

export const getIdToken = () => {
  return localStorage.getItem('idToken');
};

export const verifyIdToken = async (idToken: string) => {
  return await verifyJwt(idToken);
};

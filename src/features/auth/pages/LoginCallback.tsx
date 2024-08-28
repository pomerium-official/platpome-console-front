import { useEffect } from 'react';

import {
  saveIdToken,
  saveIdTokenOtherSite,
} from '@/features/auth/libs/client/actions';

import { GetServerSideProps } from 'next';
import {
  clientId,
  redirectUrl,
} from '@/features/auth/libs/shared/shared-config';
import { clientSecret } from '@/features/auth/libs/server/server-config';
import axios from 'axios';
import { loginUrl } from '@/features/auth/libs/shared/oidc-urls';
import { setAuthCookies } from '@/features/auth/libs/server/auth-cookies';
import HttpOnlyCookies from '@/features/auth/libs/server/http-only-cookies';
import jwtDecode from 'jwt-decode';
import { UserInfo } from '@/features/auth/libs/client/model';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // 통합인증 콜백으로 넘겨준 code로 /pages/api/auth/login 호출

    const { code, state: callbackState } = context.query;
    // const res = await axios.get("/api/auth/login",{params:{code}})
    const cookies = new HttpOnlyCookies(context.req, context.res);

    const state = cookies.get('bs-state');
    const nonce = cookies.get('bs-nonce');

    // remove state, nonce from cookie
    cookies.remove('bs-state');
    cookies.remove('bs-nonce');

    if (callbackState !== state) {
      return { props: { error: 'Cross Site Request Forgery(CSRF) detected.' } };
    }

    // httpOnlyCookie read

    if (!code || typeof code !== 'string') {
      // res.status(400).json({error: 'Missing or invalid code'});
      return { props: { error: 'Missing or invalid code' } };
    }

    const { req, res } = context;

    // Exchange the authorization code for tokens
    const params = new URLSearchParams();
    params.append('code', encodeURIComponent(code));
    params.append('grant_type', 'authorization_code');
    // private client이므로 Authorization Header로 넘긴다
    // params.append('client_id', encodeURIComponent(clientId));
    // redirect_uri가 로그인 호출할때랑 똑같아야함.
    params.append('redirect_uri', redirectUrl);

    const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

    const response = await axios.post(loginUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
      withCredentials: true,
    });

    // Redirect back to the original page
    // const originalPage = req.headers.referer || '/';
    // res.redirect(originalPage);
    const idToken = response.data.id_token;

    const idInfo = jwtDecode<UserInfo>(idToken);

    if (idInfo.nonce !== nonce) {
      return { props: { error: 'Missing or invalid code' } };
    }

    setAuthCookies(
      response.data.access_token,
      response.data.refresh_token,
      req,
      res
    );

    return { props: { idToken } };
  } catch (error) {
    console.error('Error during token exchange:', error);
    return {
      props: { error: 'Error during token exchange. see the server log.' },
    };
  }
};

export const Page = ({
  idToken,
  error,
}: {
  idToken: string;
  error?: string;
}) => {
  useEffect(() => {
    const process = async () => {
      if (idToken) {
        // idToken 저장
        saveIdToken(idToken);
        await saveIdTokenOtherSite(idToken);
        // 로그인 요청한 페이지로 다시 이동
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl && redirectUrl.indexOf(window.location.hostname) > -1) {
          window.location.replace(redirectUrl);
        }
      }
    };
    process();
  }, [idToken]);
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      {error}
    </div>
  );
};

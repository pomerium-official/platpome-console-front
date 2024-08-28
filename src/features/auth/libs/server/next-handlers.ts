import { NextApiRequest, NextApiResponse } from 'next';

import { uuid } from 'uuidv4';

import {
  clearAuthCookies,
  setAuthCookies,
} from '@/features/auth/libs/server/auth-cookies';
import { decrypt } from '@/features/auth/libs/server/crypto';

import axios from 'axios';
import { refreshUrl } from '@/features/auth/libs/shared/oidc-urls';
import { clientId } from '@/features/auth/libs/shared/shared-config';
import { clientSecret } from '@/features/auth/libs/server/server-config';
import HttpOnlyCookies from '@/features/auth/libs/server/http-only-cookies';

/**
 * /api/auth/logout route handler. 로그아웃. httpOnlyCookie 제거
 * @author 전구현
 * @param req
 * @param res
 */
export async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    clearAuthCookies(req, res);
    res.status(201).end();
  } catch (err) {
    console.error('Error during token exchange:', err);
    res.status(500).json({ message: 'An error occurred.' });
  }
}

/**
 * /api/auth/refresh-token route handler. 토큰 리프레시
 * @param req
 * @param res
 */
export async function refreshHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // httpOnlyCookie에서 encrypedRefreshToken 조회
    const encryptedRefreshToken = req.cookies.r;
    // decrypt encryptedRefreshToken
    const refreshToken = encryptedRefreshToken
      ? decrypt(encryptedRefreshToken)
      : undefined;

    if (refreshToken) {
      const response = await axios.post(
        refreshUrl,
        new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: clientId!,
          client_secret: clientSecret!,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setAuthCookies(
        response.data.access_token,
        response.data.refresh_token,
        req,
        res
      );

      const idToken = response.data.id_token;
      res.status(201).json(idToken);
    } else {
      res.status(401).end(); //.json({message:""})
    }
  } catch (err) {
    res.status(401).end(); //.json({message:""})
  }
}

/**
 * api/auth/generate 로 라우팅 처리기.
 * @param req
 * @param res
 */
export async function generateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nonce = uuid();
  const state = uuid();

  const cookies = new HttpOnlyCookies(req, res);
  cookies.set('bs-nonce', nonce, {
    domain: process.env.COOKIE_DOMAIN,
  });
  cookies.set('bs-state', state, {
    domain: process.env.COOKIE_DOMAIN,
  });

  res.status(200).json({ nonce, state });
}

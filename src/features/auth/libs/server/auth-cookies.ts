import { IncomingMessage, ServerResponse } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { encrypt } from '@/features/auth/libs/server/crypto';
import HttpOnlyCookies from '@/features/auth/libs/server/http-only-cookies';

export function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  req: IncomingMessage,
  res: ServerResponse
) {
  // const newRefreshToken = response.data.refresh_token;
  const decodedRefreshToken: JwtPayload = jwt.decode(
    refreshToken
  ) as JwtPayload;
  const refreshTokenExpiration = new Date(decodedRefreshToken!.exp! * 1000); // 만료 시간 (밀리초 단위)

  // encrypt refreshToken
  const encryptedNewRefreshToken = encrypt(refreshToken);

  const cookies = new HttpOnlyCookies(req, res);
  cookies.set('accessToken', accessToken, {
    domain: process.env.COOKIE_DOMAIN,
  });
  cookies.set('r', encryptedNewRefreshToken, {
    domain: process.env.COOKIE_DOMAIN,
    expires: refreshTokenExpiration,
  });
}

export function clearAuthCookies(req: IncomingMessage, res: ServerResponse) {
  const cookies = new HttpOnlyCookies(req, res);
  cookies.remove('accessToken');
  cookies.remove('r');
}

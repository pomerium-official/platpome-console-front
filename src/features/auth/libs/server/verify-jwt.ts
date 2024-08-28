// JWK Set URL 설정
import { fetchJWKs } from '@/features/auth/libs/shared/public-key';
import { JwtError, JwtErrorCode } from '@/features/auth/libs/shared/jwt-error';
import { certUrl } from '@/features/auth/libs/shared/oidc-urls';
import jwt from 'jsonwebtoken';

type VerifyJwtOption = {
  /**
   * issuer 제한
   */
  issuer: string;
  /**
   * audience 제한
   */
  audience: string;
};

/**
 * JWT 검증 함수
 * @param token
 * @param option
 */
export async function verifyJwt(token: string, option?: VerifyJwtOption) {
  const jwtParts = token.split('.');

  if (jwtParts.length !== 3) {
    throw new JwtError(JwtErrorCode.MalformedToken);
  }

  const jwks = await fetchJWKs(certUrl, true);
  if (jwks === null) {
    throw new JwtError(JwtErrorCode.KeyNotFound);
  }

  const header = jsonParse(atob(jwtParts[0]));

  const key = jwks.find((jwk: { kid: string }) => jwk.kid === header.kid);

  if (!key) {
    throw new JwtError(JwtErrorCode.KeyNotFound);
  }

  return jwt.verify(token, key, option);
}

function jsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    throw new JwtError(JwtErrorCode.MalformedToken);
  }
}

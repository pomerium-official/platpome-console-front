// JWK Set URL 설정
import { fetchJWKs } from '@/features/auth/libs/shared/public-key';
import { JwtError, JwtErrorCode } from '@/features/auth/libs/shared/jwt-error';
import { certUrl } from '@/features/auth/libs/shared/oidc-urls';

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

  const issuer = option?.issuer;
  const audience = option?.audience;

  if (jwtParts.length !== 3) {
    throw new JwtError(JwtErrorCode.MalformedToken);
  }

  const payload = jsonParse(atob(jwtParts[1]));
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp < currentTime) {
    throw new JwtError(JwtErrorCode.TokenExpired);
  }

  if (payload.nbf && payload.nbf > currentTime) {
    throw new JwtError(JwtErrorCode.TokenNotYetValid);
  }

  if (issuer && payload.iss !== issuer) {
    throw new JwtError(JwtErrorCode.InvalidIssuer);
  }

  if (audience && payload.aud !== audience) {
    throw new JwtError(JwtErrorCode.InvalidAudience);
  }

  const jwks = await fetchJWKs(certUrl);
  if (jwks === null) {
    throw new JwtError(JwtErrorCode.KeyNotFound);
  }

  const header = jsonParse(atob(jwtParts[0]));

  const key = jwks.find((jwk: { kid: string }) => jwk.kid === header.kid);

  if (!key) {
    throw new JwtError(JwtErrorCode.KeyNotFound);
  }

  // TODO 서명 알고리즘 별 처리 및 InvalidSignatureAlgorithm 예외 발생하기
  const publicKey = await crypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' },
    },
    true,
    ['verify']
  );

  const encoder = new TextEncoder();
  const data = encoder.encode(jwtParts[0] + '.' + jwtParts[1]);

  // // signature 위조 테스트
  // jwtParts[2]=jwtParts[2]+"aa";
  const signature = base64urlDecodeSignature(jwtParts[2]);

  const isVerify = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    publicKey,
    signature,
    data
  );

  if (!isVerify) {
    throw new JwtError(JwtErrorCode.SignatureVerificationFailed);
  }

  return payload;
}

function jsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    throw new JwtError(JwtErrorCode.MalformedToken);
  }
}

/**
 * 서명값 base64 decode
 * @param str
 */
function base64urlDecodeSignature(str: string) {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = str.length % 4;
    if (padding) {
      str += '='.repeat(4 - padding);
    }
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  } catch {
    throw new JwtError(JwtErrorCode.InvalidSignatureFormat);
  }
}

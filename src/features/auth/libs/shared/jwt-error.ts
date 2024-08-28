export enum JwtErrorCode {
  /**
   * JWT의 서명이 올바르지 않거나, JWK 공개 키가 틀린 경우 발생할 수 있습니다.
   */
  SignatureVerificationFailed = 'SIGNATURE_VERIFICATION_FAILED',

  /**
   *  JWT에 지정된 유효 기간(expiration)이 지났을 때 발생합니다
   */

  TokenExpired = 'TOKEN_EXPIRED',
  /**
   * JWT의 유효 시작 시간(iat)보다 앞서 검증 시도했을 때 발생합니다.
   */

  TokenNotYetValid = 'TOKEN_NOT_YET_VALID',

  /**
   *  JWT의 발급자(iss)가 예상과 다를 때 발생합니다.
   */
  InvalidIssuer = 'INVALID_ISSUER',

  /**
   * JWT의 대상(aud)이 예상과 다를 때 발생합니다.
   */
  InvalidAudience = 'INVALID_AUDIENCE',

  /**
   * JWT의 헤더에 지정된 알고리즘이 지원되지 않을 때 발생합니다.
   */
  InvalidSignatureAlgorithm = 'INVALID_SIGNATURE_ALGORITHM',

  /**
   * JWK Set에서 서명 검증에 필요한 공개 키를 찾지 못했을 때 발생합니다.
   */
  KeyNotFound = 'KEY_NOT_FOUND',

  /**
   * JWT의 형식이 맞지 않거나 기대하는 형식과 다를 때 발생합니다.
   */
  MalformedToken = 'MALFORMED_TOKEN',

  /**
   * JWT 서명 부분이 base64url 인코딩 형식이 아닐 때 발생합니다.
   */
  InvalidSignatureFormat = 'INVALID_SIGNATURE_FORMAT',
}

export class JwtError extends Error {
  code: JwtErrorCode;
  message: string;

  constructor(code: JwtErrorCode, message?: string) {
    super(message);
    this.code = code;
    this.message = message ?? code;
  }
}

import { authServerUrl, realm } from './shared-config';

const realmUrl = `${authServerUrl}/realms/${realm}`;
export const certUrl = `${realmUrl}/protocol/openid-connect/certs`;
export const refreshUrl = `${realmUrl}/protocol/openid-connect/token`;
export const loginUrl = `${realmUrl}/protocol/openid-connect/token`;
export const logoutUrl = `${realmUrl}/protocol/openid-connect/logout`;
export const authorizeUrl = `${realmUrl}/protocol/openid-connect/auth`;

/**
 * OIDC login options
 */
interface OIDCLoginOptions {
  clientId: string;
  redirectUri: string;

  /**
   * 요청할 스코프(권한 범위)를 나타내는 문자열입니다. comma separated values
   * 가능한 스코프 값은 다음과 같습니다:
   * - 'openid': OpenID Connect 사용 시, 사용자를 식별하기 위한 ID 토큰을 요청합니다.
   * - 'profile': 사용자의 프로필 정보를 요청합니다.
   * - 'email': 사용자의 이메일 주소를 요청합니다.
   * - 'address': 사용자의 주소 정보를 요청합니다.
   * - 'phone': 사용자의 전화번호 정보를 요청합니다.
   * - 'offline_access': 오프라인 액세스 권한을 요청하며, 리프레시 토큰 발급을 가능하게 합니다.
   * - 사용자 정의 스코프: 특정 시스템에서 정의한 사용자 정의 스코프를 요청할 수 있습니다.
   */
  scope?: string;
  /**
   * 요청할 응답 유형을 나타내는 문자열입니다.
   * flow 에 따라 추천하는 값은 아래와 같습니다.
   * - standard : 'code'
   * - implicit : 'id_token token';
   * - hybrid : 'code id_token token';
   * 가능한 responseType 값은 다음과 같습니다:
   * - 'code': 인증 코드를 요청하며, 클라이언트 측에서 이 코드를 교환하여 액세스 토큰 및 ID 토큰을 받습니다.
   * - 'token': 액세스 토큰을 직접 요청하며, 인증 코드 교환 단계를 거치지 않습니다.
   * - 'id_token': ID 토큰만을 요청하며, 일반적으로 클라이언트 측에서 사용자를 식별하는 데 사용됩니다.
   * - 'code token': 인증 코드 및 액세스 토큰을 요청하며, 클라이언트 측 및 리소스 서버로의 접근 권한을 얻습니다.
   * - 'code id_token': 인증 코드 및 ID 토큰을 요청하며, 사용자 인증과 동시에 사용자 정보를 획득합니다.
   */
  responseType: string;

  /**
   * state는 세션 및 상태 추적. prevent CSRF
   */
  state: string;
  /**
   * idToken의 무결성을 검증
   */
  nonce: string;
  clientSecret?: string;
  /**
   * 로그인 프롬프 옵션.
   * - "none": 이 옵션을 사용하면, 사용자 에이전트(브라우저)에 사용자 상호작용 없이 인증 및 동의 프로세스를 진행하라고 요청합니다. 그러나 사용자 에이전트가 사용자 상호작용을 요구하는 경우, 요청은 실패하게 됩니다.
   * - "login": 이 옵션은 사용자를 로그인하도록 요청합니다. 사용자가 이미 로그인한 경우에도 사용자 에이전트에게 로그인 화면을 표시하도록 요청합니다.
   * - "consent": 이 옵션은 사용자에게 동의 페이지를 표시하도록 요청합니다. 사용자가 이미 동의했더라도 동의 페이지를 다시 표시하도록 요청합니다.
   * - "select_account": 이 옵션은 사용자가 로그인한 계정을 선택하도록 요청합니다. 일반적으로 다중 계정이 있는 경우 사용자가 특정 계정을 선택할 수 있도록 요청하는 데 사용됩니다.
   * - "login consent": "login" 및 "consent" 값을 함께 사용하여 사용자를 로그인하고 동의 페이지를 표시하도록 요청합니다.
   */
  prompt?: 'none' | 'login' | 'consent' | 'select_account' | 'login consent';
  // /**
  //  * 사용자 로그인의 유효성을 제한하고 지정된 시간 이상 경과한 경우 사용자에게 다시 인증을 요청하는 데 사용됩니다.
  //  * 초 단위
  //  */
  // maxAge?: number;
  /**
   * ACR to Level of Authentication (LoA) Mapping. comma separated value
   * - https://www.keycloak.org/docs/latest/server_admin/#_mapping-acr-to-loa-client
   * - https://www.keycloak.org/docs/latest/server_admin/#_mapping-acr-to-loa-realm
   */
  acrValues?: string;
  claims?: string;
  uiLocales?: string;

  /**
   * Keycloak에서 제공하는 응답 모드 옵션입니다.
   * 표준으로는 'form_post' 모드도 있지만 현재 이 옵션은 미포함되어 있습니다. 향후 추가 여부를 주시하십시오.
   * - 기본값 : flow 마다 다릅니다.
   *   - 'code flow'에서는 'query'로 설정됩니다.
   *   - 'Implicit flow'에서는 'fragment'로 설정됩니다.
   *
   * 'query' 옵션은 URL 일부로 노출되며 브라우저 히스토리에 기록될 수 있습니다. 보안을 강화하기 위해 TLS(SSL)를 사용하는 것이 중요합니다.
   * 'fragment' 옵션은 URL의 프래그먼트 부분에만 노출되며 이 부분은 서버로 전송되지 않습니다. 따라서 정보는 브라우저에서만 사용되며 브라우저 히스토리에는 기록되지 않습니다.
   */
  responseMode?: 'query' | 'fragment';
}

/**
 * password grant제외한 OIDC LOGIN URL.
 * PASSWORD GRANT는 loginUrl 을 사용하세요
 * @param options
 */
export const createLoginUrl = function (options: OIDCLoginOptions) {
  const {
    clientId,
    redirectUri,
    responseType,
    state,
    nonce,
    clientSecret,
    prompt,
    // maxAge,
    acrValues,
    claims,
    uiLocales,
    responseMode,
    // 다른 옵션들을 필요에 따라 여기에 추가
  } = options;

  let { scope = 'openid' } = options;
  // const state = v4(); //createUUID();
  // const nonce = v4(); // createUUID();

  // const redirectUri = redirectUrl; //adapter.redirectUri(options);

  // const callbackState = {
  //   state: state,
  //   nonce: nonce,
  //   redirectUri: encodeURIComponent(redirectUri),
  // };

  const baseUrl = authorizeUrl;

  if (scope.indexOf('openid') === -1) {
    // if openid scope is missing, prefix the given scopes with it
    scope = 'openid' + scope;
  }

  // let url =
  //   baseUrl +
  //   '?client_id=' +
  //   encodeURIComponent(clientId) +
  //   '&redirect_uri=' +
  //   encodeURIComponent(redirectUri) +
  //   // +'&state=' +
  //   // encodeURIComponent(state) +
  //   '&response_mode=' +
  //   encodeURIComponent('query') +
  //   '&response_type=' +
  //   encodeURIComponent('code') +
  //   '&scope=' +
  //   encodeURIComponent(scope);

  let url =
    `${baseUrl}?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=${responseType}&` +
    `state=${state}&` +
    `nonce=${nonce}`;

  // 옵셔널한 파라미터들을 추가
  if (clientSecret) {
    url += `&client_secret=${clientSecret}`;
  }

  if (prompt) {
    url += `&prompt=${prompt}`;
  }

  // if (maxAge) {
  //   url += `&max_age=${maxAge}`;
  // }

  if (acrValues) {
    url += `&acr_values=${acrValues}`;
  }

  if (claims) {
    url += `&claims=${claims}`;
  }

  if (uiLocales) {
    url += `&ui_locales=${uiLocales}`;
  }

  if (responseMode) {
    url += `&response_mode=${responseMode}`;
  }

  // if (options && options.loginHint) {
  //     url += '&login_hint=' + encodeURIComponent(options.loginHint);
  // }
  //
  // if (options && options.idpHint) {
  //     url += '&kc_idp_hint=' + encodeURIComponent(options.idpHint);
  // }

  return url;
};

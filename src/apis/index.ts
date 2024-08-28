import { Api } from '@/generated/api/api-service';
// import { Api as UserApi } from '@/generated/api/api-user';
import commonAxiosInstance from '@/libs/common-axios-instance';

/**
 * 인증이 꼭 되지 않아도 동작하는 api
 */
const api = new Api({ withCredentials: true });
api.instance = commonAxiosInstance({ needLogin: false });

/**
 * 인증이 꼭 되어야하는 api. 인증 만료시 로그인 화면으로 이동 합니다.
 */
const privateApi = new Api({ withCredentials: true });
privateApi.instance = commonAxiosInstance({ needLogin: true });

export { api, privateApi };

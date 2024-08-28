import axios, { AxiosRequestConfig } from 'axios';
import { login } from '@/features/auth/libs/client/actions';

export interface CallbackParameter {
  idToken?: string;
  error?: unknown;
}

/**
 * refreshToken 한 번 만 호출하도록 하는 flag
 */
let isTokenRefreshing = false;
/**
 * refreshToken이 필요한 요청 목록. refreshToken이 완료된 후 요청 실행
 */
let callbackQueue: ((callbackParameter: CallbackParameter) => void)[] = [];

/**
 * refreshToken 완료 이벤트 처리
 * @param callbackParameter
 */
const onTokenRefreshed = (callbackParameter: CallbackParameter) => {
  // dequeue 후 완료된 항목 삭제 대신 전체 완료후 삭제
  // queue 에 있는 요청 실행
  callbackQueue.forEach((callback) => callback(callbackParameter));

  // 초기화
  callbackQueue = [];
  isTokenRefreshing = false;
};
/**
 * refreshToken 처리중에 들어온 호출을 refreshSubscribers에 추가
 * @param callback
 */
const enqueue = (callback: (session: CallbackParameter) => void) => {
  callbackQueue.push(callback);
};

/**
 * 토큰 재발급
 */
export const refreshTokenProcess = async (): Promise<string | undefined> => {
  // 토큰 refresh 중이 아니면
  if (!isTokenRefreshing) {
    // 토큰 refresh를 진행합니다.
    // 중복으로 refresh 하지 않도록 flag를 수정합니다.
    isTokenRefreshing = true;
    let data;

    try {
      // 토큰 refresh 호출. pages/api/auth 참고
      const res = await axios.post('/api/auth/refresh-token');
      data = res.data;

      if (data === undefined) {
        throw 'invalidAuth';
      }

      // 새로운 토큰으로 지연되었던 요청 진행
      onTokenRefreshed({ idToken: data });

      return data;
    } catch (e) {
      onTokenRefreshed({ error: e });
      isTokenRefreshing = false;
      throw e;
    }
  } else {
    // token이 재발급 되는 동안의 요청은 queue에 저장
    return await new Promise((resolve, reject) => {
      enqueue(({ idToken, error }: CallbackParameter) => {
        if (error) {
          reject(error);
        } else {
          resolve(idToken);
        }
      });
    });
  }
};
/**
 * 토큰 재발급
 * @param originalRequest
 * @param needLogin
 */
export const refreshTokenProcessForAxios = async (
  originalRequest: AxiosRequestConfig,
  needLogin = false
) => {
  try {
    await refreshTokenProcess();
  } catch (e) {
    if (needLogin) {
      login();
    }

    throw e;
  }
  return axios(originalRequest);
  //
  // // 토큰 refresh 중이 아니면
  // if (!isTokenRefreshing) {
  //     // 토큰 refresh를 진행합니다.
  //     // 중복으로 refresh 하지 않도록 flag를 수정합니다.
  //     isTokenRefreshing = true;
  //     let data;
  //     try {
  //         // 토큰 refresh 호출
  //         const res = await axios.post('/auth/refresh');
  //         data = res.data;
  //
  //         if (data.data?.accessToken === undefined) {
  //             throw 'invalidAuth';
  //         }
  //
  //         // 새로운 토큰 저장
  //         CommonAxiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
  //         originalRequest.headers!.Authorization = `Bearer ${data.data.accessToken}`;
  //
  //         const userInfo = jwt_decode<UserInfo>(data.data.accessToken);
  //         // store에 userInfo 주입
  //         store.commonStore.setUserInfo(userInfo);
  //         // 새로운 토큰으로 지연되었던 요청 진행
  //         onTokenRefreshed(data.data);
  //
  //         return axios(originalRequest);
  //     } catch (e) {
  //         isTokenRefreshing = false;
  //         store.commonStore.setUserInfo(undefined);
  //         redirectToLogin();
  //         return;
  //     }
  // } else {
  //     // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
  //     return new Promise((resolve) => {
  //         enqueue((session: CallbackParameter) => {
  //             originalRequest.headers![
  //                 'Authorization'
  //                 ] = `Bearer ${session.accessToken}`;
  //             if (originalRequest.headers!['Content-Type'] === 'application/json') {
  //                 if (
  //                     typeof originalRequest.data === 'string' &&
  //                     originalRequest.data.length > 1
  //                 ) {
  //                     originalRequest.data = JSON.parse(originalRequest.data);
  //                 }
  //             }
  //             resolve(axios(originalRequest));
  //         });
  //     });
  // }
};
// ////////////////////////////////////// 공통 함수들 시작 ////////////////////////////////////////
// /**
//  * 로그인페이지로 이동
//  */
// export const redirectToLogin = () => {
//     localStorage.clear();
//     const pathName = window.location.pathname;
//     if (isLoginFreePath(pathName)) {
//         return;
//     }
//
//     if (window && window.location.pathname !== '/login') {
//         window.location.assign(
//             `/login?returnUrl=${encodeURIComponent(
//                 window.location.pathname + window.location.search
//             )}`
//         );
//     }
// };
// /**
//  * 응답 interceptor
//  * @param response
//  */
// export const responseHandler = async (response: AxiosResponse) => {
//     // graphql error auth 처리
//     // graphql은 200에 내부에 에러발생시킴. 그래야 graphql studio에서 볼 수 있음.
//     if (response && response.config.url === '/graphql' && response.data) {
//         // Access denied!
//         const textDecoder = new TextDecoder('utf-8');
//         const responseData = JSON.parse(textDecoder.decode(response.data));
//         const hasAuthError = responseData.errors?.some(
//             (e: { message: string }) => e.message.indexOf('Access denied!') > -1
//         );
//         if (hasAuthError) {
//             const originalRequest = response.config;
//             originalRequest.data = JSON.parse(originalRequest.data);
//             return refreshProcess(originalRequest);
//         }
//     }
//     return response;
// };
// /**
//  * error 처리 공통
//  * @param error
//  */
// export const errorHandler = async (error: Error) => {
//     const {config, response} = error as AxiosError;
//
//     if (error.message.indexOf('timeout') === 0) {
//         await showError();
//     }
//
//     // Response error 처리
//     if (response) {
//         if (response.status === 401 && config && config.url !== '/auth/login') {
//             if (config.url === '/auth/refresh') {
//                 return redirectToLogin();
//             } else {
//                 return refreshProcess(config);
//             }
//         }
//     }
//
//     throw error;
// };

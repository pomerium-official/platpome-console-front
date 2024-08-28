import axios, { AxiosError, AxiosResponse } from 'axios';
import { refreshTokenProcessForAxios } from '@/features/auth/libs/client/refresh-token';

export interface GetCommonAxiosInstanceOptions {
  needLogin?: boolean;
}
const getCommonAxiosInstance = ({
  needLogin,
}: GetCommonAxiosInstanceOptions) => {
  /**
   * Axios Private. localstorage를 이용한 호출. react native에서도 동일 방식으로 사용 가능.
   */
  const MAxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  ////////////////////////////////////// 공통 함수들 끝 ////////////////////////////////////////

  ////////////////////////////////////// Axios interceptor 시작 ////////////////////////////////////////

  /**
   * 응답 interceptor
   * @param response
   */
  const responseHandler = async (response: AxiosResponse) => {
    // graphql error auth 처리
    // graphql은 200에 내부에 에러발생시킴. 그래야 graphql studio에서 볼 수 있음.
    if (response && response.config.url === '/graphql' && response.data) {
      // {"errors":[{"message":"Access denied! You need to be authorized to perform this action!","locations":[{"line":2,"column":3}],"path":["memberStationChargeHistories"],"extensions":{"code":"INTERNAL_SERVER_ERROR","exception":{"stacktrace":["Error: Access denied! You need to be authorized to perform this action!","    at C:\\Users\\guhyeon\\blocksmith\\projects\\instant-energy-user\\node_modules\\type-graphql\\dist\\helpers\\auth-middleware.js:13:44","    at async dispatchHandler (C:\\Users\\guhyeon\\blocksmith\\projects\\instant-energy-user\\node_modules\\type-graphql\\dist\\resolvers\\helpers.js:82:24)"]}}}],"data":null}
      // Access denied!
      const textDecoder = new TextDecoder('utf-8');
      const responseData = JSON.parse(textDecoder.decode(response.data));
      const hasAuthError = responseData.errors?.some(
        (e: { message: string }) => e.message.indexOf('Access denied!') > -1
      );
      if (hasAuthError) {
        const originalRequest = response.config;
        originalRequest.data = JSON.parse(originalRequest.data);
        return refreshTokenProcessForAxios(originalRequest);
      }
    }
    return response;
  };

  /**
   * error 처리 공통
   * @param error
   */
  const errorHandler = async (error: Error) => {
    const { config, response } = error as AxiosError;

    // if (error.message.indexOf('timeout') === 0) {
    //   await showError();
    // }

    // Response error 처리
    if (response) {
      if (response.status === 401 && config && config.url !== '/auth/login') {
        // if (config.url === '/auth/refresh') {
        //   // return redirectToLogin();
        // } else {

        if (config.url !== '/auth/refresh') {
          return refreshTokenProcessForAxios(config, needLogin);
        }
      }
    }

    throw error;
  };
  //
  //
  // MAxiosInstance.interceptors.request.use(
  //     (config) => {
  //         if (config.baseURL===process.env.NEXT_PUBLIC_API_URL) {
  //             config.baseURL="/api/proxy"
  //         }
  //
  //         return config;
  //     },
  //     (error) => errorHandler(error)
  // );

  MAxiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );

  return MAxiosInstance;
};

export default getCommonAxiosInstance;

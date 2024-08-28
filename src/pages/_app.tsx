import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { useRootStore } from '@/libs/baseCommon/providers/RootStoreProivder';
import AppProvider from '@/libs/providers/AppProvider';
import { useGtm } from '@/libs/baseCommon/utils/gtag';

// 공통 CSS
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../config/global.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ initialStore?: string }> & {
  Component: NextPageWithLayout;
};

// Do not know how to serialize a BigInt
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { initialStore, ...restPageProps } = pageProps;
  const rootStore = useRootStore(initialStore);
  useGtm();

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_IS_HTTPS === 'false') return;
  //
  //   const firebaseConfig = {
  //     apiKey: 'AIzaSyAeOS_DuuTl3Ae1xK46TuX_FEEhZycsC4o',
  //     authDomain: 'base-template-46ac0.firebaseapp.com',
  //     projectId: 'base-template-46ac0',
  //     storageBucket: 'base-template-46ac0.appspot.com',
  //     messagingSenderId: '198558585141',
  //     appId: '1:198558585141:web:e75a5724148a9564c93c7c',
  //     measurementId: 'G-862BPQZWR0',
  //   };
  //
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   }
  //
  //   const messaging = firebase.messaging();
  //
  //   //사용자에게 허가를 받아 토큰을 가져옵니다.
  //   Notification.requestPermission()
  //     .then(function () {
  //       return messaging.getToken();
  //     })
  //     .then(function (token) {
  //       console.log(token);
  //     })
  //     .catch(function (err) {
  //       console.log('fcm error : ', err);
  //     });
  //
  //   messaging.onMessage((payload) => {
  //     const title = payload.data.title;
  //     const options = {
  //       body: payload.data.body,
  //     };
  //     const foreGroundNotification = new Notification(title, options);
  //
  //     foreGroundNotification.onclick = function () {
  //       window.open(payload.data.click_action, '_black');
  //     };
  //   });
  // }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppProvider
      rootStore={rootStore}
      defaultTheme={'platpome-v2'}
      defaultColorMode={'light'}
    >
      <title>pomeriumX Console</title>
      {getLayout(<Component {...restPageProps} />)}
    </AppProvider>
  );
}
//
// // Only uncomment this method if you have blocking data requirements for
// // every single page in your application. This disables the ability to
// // perform automatic static optimization, causing every page in your app to
// // be server-side rendered.
// //
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   // console.log('-> appContext', appContext);
//   // console.log('-> appProps', appProps);
//   console.log('1 getInitialProps');
//   const {
//     ctx: { req, res },
//   } = appContext;
//   // console.log('-> req', req);
//   //
//   // if (req === undefined) {
//   //   console.log('-> ASFsafasf');
//   // }
//
//   // ssr인 경우 로그인 체크
//   if (isServer) {
//     console.log('2 getInitialProps isServer');
//     if (req && res && req.url !== '/auth/login') {
//       try {
//         if (req.url?.indexOf('/api/') === -1) {
//           console.log('-> req.url', req.url);
//         }
//
//         // rootStore.commonStore.userInfo = response.data;
//
//         const accessToken = await getOrRefreshAccessToken(
//             req!,
//             res!,
//             'adminSession'
//         );
//         console.log('-> accessToken', accessToken);
//
//         const response = await PrivateAdminApi.wewill.managerMeUsingGet({
//           headers: { Authorization: 'Bearer ' + accessToken },
//         });
//
//         const commonStore = new CommonStore();
//
//         commonStore.userInfo = response.data;
//
//         appProps.pageProps.initialStore = JSON.stringify({ commonStore });
//       } catch {
//         // TODO redirect login
//         // On the server, we'll use an HTTP response to
//         // redirect with the status code of our choice.
//         // 307 is for temporary redirects.
//         res.writeHead(307, { Location: '/auth/login' });
//         res.end();
//       }
//     }
//   } else {
//     console.log('3 getInitialProps client');
//     // Router.pathname
//     console.log('-> Router.pathname', Router.pathname);
//
//     console.log('-> appProps', appProps);
//     // return {};
//   }
//
//   return { ...appProps };
// };

export default MyApp;

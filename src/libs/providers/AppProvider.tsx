import React, { FC, ReactNode } from 'react';
import {
  LayoutColorModeType,
  ThemeProvider,
} from '../baseCommon/providers/ThemeProvider';
import { RootStoreProvider } from '../baseCommon/providers/RootStoreProivder';
import RootStore from '../../RootStore';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ChainId, metamaskWallet, ThirdwebProvider } from '@thirdweb-dev/react';
import { Polygon, Binance, Mumbai, BinanceTestnet } from '@thirdweb-dev/chains';

interface AppProviderProps {
  rootStore: RootStore;
  defaultTheme: string;
  defaultColorMode: LayoutColorModeType;
  children: ReactNode;
}

/**
 * RootWrapper. AppProvider. 앱에 제공하는 프로바이더들을 모아 제공.
 * @param rootStore
 * @param defaultTheme
 * @param defaultColorMode
 * @param children
 * @constructor
 */
const AppProvider: FC<AppProviderProps> = ({
  rootStore,
  defaultTheme,
  defaultColorMode,
  children,
}) => {
  return (
    <ThirdWebProviderWrapper>
      {/* <GoogleReCaptchaProviderWrapper> */}
      <RootStoreProvider rootStore={rootStore}>
        <ThemeProvider
          defaultTheme={defaultTheme}
          defaultColorMode={defaultColorMode}
        >
          {children}
        </ThemeProvider>
      </RootStoreProvider>
      {/* </GoogleReCaptchaProviderWrapper> */}
    </ThirdWebProviderWrapper>
  );
};

interface ThirdWebProviderWrapperProps {
  children: ReactNode;
}

const ThirdWebProviderWrapper: FC<ThirdWebProviderWrapperProps> = ({
  children,
}) => {
  const THIRDWEB_CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

  if (THIRDWEB_CLIENT_ID) {
    return (
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            projectId: 'console',
          }),
        ]}
        autoConnect={false}
        activeChain={ChainId.BinanceSmartChainTestnet}
        supportedChains={[Polygon, Binance, Mumbai, BinanceTestnet]}
        clientId={THIRDWEB_CLIENT_ID}
      >
        {children}
      </ThirdwebProvider>
    );
  } else {
    return <>{children}</>;
  }
};

// interface GoogleReCaptchaProviderWrapperProps {
//   children: ReactNode;
// }

// const GoogleReCaptchaProviderWrapper: FC<GoogleReCaptchaProviderWrapperProps> = ({
//   children,
// }) => {
//   const RECAPTCHA_API_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
//   const RECAPTCHA_LANG = process.env.NEXT_PUBLIC_RECAPTCHA_LANG || 'kr';

//   if (RECAPTCHA_API_KEY) {
//     return (
//       <GoogleReCaptchaProvider
//         reCaptchaKey={RECAPTCHA_API_KEY}
//         language={RECAPTCHA_LANG}
//       >
//         {children}
//       </GoogleReCaptchaProvider>
//     );
//   } else {
//     return <>{children}</>;
//   }
// };

export default AppProvider;

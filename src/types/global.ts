declare global {
  interface Window {
    IMP: any;
    ReactNativeWebView: any;
    /**
     * GTM
     */
    dataLayer: Record<string, any>[];
  }
}
export {};

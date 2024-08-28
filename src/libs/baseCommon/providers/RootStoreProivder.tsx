import { enableStaticRendering } from 'mobx-react';
import React, { createContext, ReactNode, useMemo } from 'react';
import RootStore from '../../../RootStore';

export let store: RootStore;

// mobx 렌더링 세팅
enableStaticRendering(typeof window === 'undefined');

export const RootStoreContext = createContext<RootStore | undefined>(undefined);

/**
 * RootStore Provider. 최상단에 위치하며, mobx store 컨텍스트를 설정합니다. useStore와 세트로 작동.
 * @param rootStore
 * @param children
 * @constructor
 */
export function RootStoreProvider({
  rootStore,
  children,
}: {
  rootStore?: RootStore;
  children: ReactNode;
}) {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}

/**
 * Store 초기화
 * @param initialStore. 초기화할 스토어, getServerSideProps(SSR), getStaticProps(SSG)에서 정의.
 */
function initializeStore(initialStore?: string) {
  const _store = store ?? new RootStore();

  // 초기화 스토어가 있으면, 녹여준다. (SSR, SSG 인 경우)
  if (initialStore) {
    _store.hydrate(JSON.parse(initialStore));
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

/**
 * RootStore 초기화 및 반환.
 * @param initialStore. 초기화할 스토어, getServerSideProps(SSR), getStaticProps(SSG)에서 정의.
 */
export function useRootStore(initialStore?: string) {
  return useMemo(() => initializeStore(initialStore), [initialStore]);
}

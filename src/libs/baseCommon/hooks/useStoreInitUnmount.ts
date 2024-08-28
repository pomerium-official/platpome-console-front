import { useEffect } from 'react';
import { IBaseStore } from '../baseStores/BaseStore';

/**
 * 스토어 초기화
 * @param store
 */
const useStoreInitUnmount = (store: IBaseStore) => {
  useEffect(() => {
    return () => {
      store.init();
    };
  }, [store]);
};
export default useStoreInitUnmount;

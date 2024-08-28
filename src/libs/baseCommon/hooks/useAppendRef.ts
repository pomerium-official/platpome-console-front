import { useEffect } from 'react';
import useRefCallback from './useRefCallback';
import isEmpty from 'lodash/isEmpty';
import { runInAction } from 'mobx';

/**
 * refs에 key값으로 ref를 추가해줍니다.
 * - const [refSetter] = useAppendRef(originRef, key);
 * - <input ref={refSetter}/>
 * @param refs
 * @param key
 * @return refSetter
 */
const useAppendRef = <T>(refs: Map<string, any>, key: string) => {
  const [ref, onChangeRef] = useRefCallback<T>();

  useEffect(() => {
    if (refs === undefined || refs === null) {
      console.error('refs cannot be null or undefined');
      return;
    }

    if (isEmpty(key)) {
      console.error('key cannot be empty');
      return;
    }

    if (ref) {
      runInAction(() => {
        refs.set(key, ref);
      });
    }
    return () => {
      if (refs.has(key)) {
        runInAction(() => {
          refs.delete(key);
        });
      }
    };
  }, [key, ref, refs]);

  return [onChangeRef];
};

export default useAppendRef;

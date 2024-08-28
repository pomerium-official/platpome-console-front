import { useCallback, useState } from 'react';

/**
 * ref 변경내용을 감지할 수 있게해줍니다.
 * - lazy 로딩으로 불러온 컴포넌트의 ref를 참조할 때,
 * - useEffect에서 ref.current를 deps에 넣어야할 때 사용합니다.
 */
function useRefCallback<T>(): [T | null, (node: T) => void] {
  const [ref, setRef] = useState<T | null>(null);
  const onChangeRef = useCallback((node: T) => {
    setRef(node);
  }, []);

  return [ref, onChangeRef];
}
export default useRefCallback;

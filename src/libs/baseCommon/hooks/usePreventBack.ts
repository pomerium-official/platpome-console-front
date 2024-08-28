import { useEffect } from 'react';

/**
 * 뒤로가기 막기
 */
const usePreventBack = () => {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, '', location.href);
    };

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);
};
export default usePreventBack;

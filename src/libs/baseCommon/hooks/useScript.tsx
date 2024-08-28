import { useEffect } from 'react';

/**
 * 외부 라이브러리 스크립트를 head에 추가한다.
 * @param src 주소
 * @param async script async
 * @param pathname 스크립트를 로드할 페이지. router pathname
 */
export const useScript = ({
  src,
  async = false,
  pathname,
}: {
  src: string;
  async?: boolean;
  pathname?: string;
}) => {
  useEffect(() => {
    // const legacy = document.querySelector(`script[src="${src}"]`);
    // if (legacy) {
    //   //console.log(888);
    //   legacy.remove();
    // }
    const script01 = document.createElement('script');
    script01.async = async;
    script01.src = src;
    document.body.appendChild(script01);
    return () => {
      document.body.removeChild(script01);
    };
  }, [src, async, pathname]);
};

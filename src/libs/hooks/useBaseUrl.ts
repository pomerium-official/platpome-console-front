import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useBaseUrl = () => {
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState('');
  const [currentMenu, setCurrentMenu] = useState('');
  useEffect(() => {
    if (router.isReady && router.query) {
      setBaseUrl(
        `${router.asPath.split(`${router.query.appId}`)?.[0]}${
          router.query.appId
        }`
      );
      setCurrentMenu(`${router.asPath.split('?')[0].split('/')[3]}`);
    }
  }, [router, router.isReady, router.query]);
  return { baseUrl, currentMenu };
};

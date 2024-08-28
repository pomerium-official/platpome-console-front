import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useMinHeight = (target: string, testnet?: boolean) => {
  const router = useRouter();
  useEffect(() => {
    const minHeight = () => {
      const height = window.innerHeight;
      const element = document.querySelector(target) as HTMLElement | null;
      const headerHeight = testnet && router.pathname !== '/console' ? 114 : 64;
      if (element !== null) {
        if (target === '.pageContent') {
          element.style.height = height - headerHeight + 'px';
        } else {
          element.style.minHeight = height + 'px';
        }
      }
    };
    minHeight();
    window.addEventListener('load', minHeight);
    window.addEventListener('resize', minHeight);
    return () => {
      window.removeEventListener('load', minHeight);
      window.addEventListener('resize', minHeight);
    };
  }, [target, testnet, router.isReady]);
};

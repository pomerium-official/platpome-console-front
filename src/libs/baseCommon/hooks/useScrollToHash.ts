import { useEffect } from 'react';

export interface useScrollToHashParams {
  /**
   * 스크롤 상단 여백. 기본값 -30
   */
  topOffset?: number;
  /**
   * 지연 시간 ms. 기본값 200
   */
  delay?: number;
  /**
   * 스크롤 액션. 기본값 smooth
   */
  behavior?: ScrollBehavior;
}

/**
 * Next Link에서 hash
 * @param topOffset
 * @param behavior
 * @param delay
 */
const useScrollToHash = ({
  topOffset = -30,
  behavior = 'smooth',
  delay = 200,
}: useScrollToHashParams) => {
  useEffect(() => {
    const path = window.location.hash;

    if (path && path.includes('#')) {
      const timeout = setTimeout(() => {
        const id = path.replace('#', '');
        const el = window.document.getElementById(id);
        const r = el?.getBoundingClientRect();
        if (r) {
          window?.top?.scroll({
            top: window.scrollY + r.top + topOffset,

            behavior: behavior,
          });
        }
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [topOffset, behavior, delay]);
};

export default useScrollToHash;

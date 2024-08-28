import { useEffect } from 'react';

/**
 * 스타일 태그 추가. head의 link에 href를 넣어줍니다.
 * id가 있는 경우 해당 id의 태그를 수정해줍니다.
 * @param href stylesheet 경로
 */
const useStylesheet = (href?: string, id?: string) => {
  useEffect(() => {
    if (href) {
      let linkTag: HTMLLinkElement;
      if (id) {
        linkTag = document.getElementById(id) as HTMLLinkElement;
      } else {
        linkTag = document.createElement('link');
      }

      if (linkTag === null || linkTag === undefined) {
        linkTag = document.createElement('link');
      }

      if (id) {
        linkTag.setAttribute('id', id);
      }
      linkTag.setAttribute('rel', 'stylesheet');
      linkTag.setAttribute('href', href);

      document.getElementsByTagName('head')[0].appendChild(linkTag);

      return () => {
        linkTag.remove();
      };
    }
  }, [href, id]);
};

export default useStylesheet;

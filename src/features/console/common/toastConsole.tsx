import React from 'react';
import Toast from './Toast';
import { createRoot } from 'react-dom/client';

export const toastConsole = (content: React.ReactNode, life?: number) => {
  const toastWrap = document.querySelector('.toastWrap') as HTMLElement;

  if (toastWrap) {
    toastWrap.remove();
  }

  const body = document.querySelector('#__next') as HTMLElement;
  const toastAnchor = document.createElement('div');
  toastAnchor.classList.add('toastWrap');
  body?.appendChild(toastAnchor);
  const rootInstance = createRoot(toastAnchor);

  if (rootInstance) {
    rootInstance.render(<Toast content={content} life={life} />);
  }
};

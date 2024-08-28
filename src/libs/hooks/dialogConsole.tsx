import Dialog from '@/features/console/common/Dialog';
import { createRoot } from 'react-dom/client';

export const createDialog = (content: React.ReactNode) => {
  const body = document.querySelector('#__next') as HTMLElement;
  const dialogAnchor = document.createElement('div');
  body?.appendChild(dialogAnchor);
  const root = createRoot(dialogAnchor);
  root.render(content);
};

/**
 *
 * @returns 'ok' | 'close'
 * @param title
 * @param content
 * @param option
 * @param buttonActions
 */
export const alertConsole = (
  title?: React.ReactNode,
  content?: React.ReactNode,
  option?: {
    okText?: string;
    noText?: string;
    icon?: 'confirm' | 'caution' | 'delete';
  },
  buttonActions?: {
    handleClose?: () => void;
    handleOk?: () => void;
  }
) => {
  return new Promise((resolve) => {
    createDialog(
      <Dialog
        header={title}
        content={content}
        option={option}
        type="alert"
        handleClose={() => {
          buttonActions?.handleClose && buttonActions?.handleClose();
          resolve('close');
        }}
        handleOk={() => {
          buttonActions?.handleOk && buttonActions?.handleOk();
          resolve('ok');
        }}
      />
    );
  });
};

/**
 *
 * @returns 'ok' | 'no' | 'close'
 * @param title
 * @param content
 * @param option
 * @param buttonActions
 */
export const confirmConsole = (
  title?: React.ReactNode,
  content?: React.ReactNode,
  option?: {
    okText?: string;
    noText?: string;
    icon?: 'confirm' | 'caution' | 'delete';
  },
  buttonActions?: {
    handleClose?: () => void;
    handleNo?: () => void;
    handleOk?: () => void;
  }
) => {
  return new Promise((resolve) => {
    createDialog(
      <Dialog
        header={title}
        content={content}
        option={option}
        type="confirm"
        handleClose={() => {
          buttonActions?.handleClose && buttonActions?.handleClose();
          resolve('close');
        }}
        handleNo={() => {
          buttonActions?.handleNo && buttonActions?.handleNo();
          resolve('no');
        }}
        handleOk={() => {
          buttonActions?.handleOk && buttonActions?.handleOk();
          resolve('ok');
        }}
      />
    );
  });
};

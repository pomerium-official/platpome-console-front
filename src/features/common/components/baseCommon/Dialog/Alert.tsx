// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export interface AlertOptions {
  buttonLabel?: string;
  buttonStyle?: React.CSSProperties;
  width?: string;
  closable?: boolean;
}

export interface AlertProps extends AlertOptions {
  title: ReactNode;
  visible: boolean;
  content: ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  onOk?: () => void;
}

export const Alert: FC<AlertProps> = ({
  title,
  visible = false,
  content,
  onVisibleChange,
  onOk,
  buttonLabel = '확인',
  buttonStyle,
  width = '25vw',
  closable,
}) => {
  const visibleRef = useRef(false);
  const [visibleState, setVisibleState] = useState(false);

  useEffect(() => {
    setVisibleState(visible);
  }, [visible]);

  useEffect(() => {
    // visibleState 값이 변경되었을 때만 이벤트 발생
    if (visibleRef.current !== visibleState) {
      visibleRef.current = visibleState;
      onVisibleChange && onVisibleChange(visibleState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onVisibleChange, visibleState]);

  const handleOkClick = () => {
    onOk && onOk();
    setVisibleState(false);
  };

  const handleHide = () => {
    setVisibleState(false);
  };

  const footer = (
    <div className={'flex'}>
      <Button
        label={buttonLabel}
        style={buttonStyle}
        icon="pi pi-check"
        onClick={handleOkClick}
        className={'p-confirm-ok'}
      />
    </div>
  );

  return (
    <Dialog
      closable={closable}
      className={'p-alert'}
      header={title}
      footer={footer}
      visible={visibleState}
      style={{ width }}
      modal
      onHide={handleHide}
    >
      {content}
    </Dialog>
  );
};

/**
 * Alert, Programatically.
 * @param content
 * @param title 제목. string | element
 * @param options
 * @returns {Promise<"OK"|"CANCEL">}
 */
export const alert = (
  content: ReactNode,
  title?: string,
  options?: AlertOptions
) => {
  return new Promise((resolve) => {
    const id = 'smith-ui-alert-container';

    let alertContainer = document.getElementById(id);
    if (alertContainer === null) {
      alertContainer = document.createElement('div');
      alertContainer.id = id;
      document.getElementsByTagName('body')[0].appendChild(alertContainer);
    }

    const { children } = alertContainer;
    // 마지막 차일드 번호에 고유 dom(이 돔은 클래스명 있어야함) 붙인 후에 거기에 alert렌더링 하고, alert닫힐 때 돔도 제거해준다.
    let latestIndex = -1;
    if (children.length > 0) {
      const index = children[children.length - 1].getAttribute('index');
      if (index) {
        latestIndex = Number(index);
      }
    }

    const alertItem = document.createElement('div');
    alertItem.setAttribute('id', `smith-ui-alert-${latestIndex + 1}`);
    alertItem.setAttribute('index', (latestIndex + 1).toString());
    alertItem.className = 'smith-ui-alert-item';
    alertContainer.appendChild(alertItem);

    let reason = '';
    const root = createRoot(alertItem);

    root.render(
      <Alert
        content={content}
        title={title}
        visible={true}
        onVisibleChange={(visible) => {
          if (visible === false) {
            alertItem.remove();
            if (reason === '') {
              resolve('CANCEL');
            } else {
              resolve(reason);
            }
          }
        }}
        {...options}
        onOk={() => {
          reason = 'OK';
        }}
      />
    );
  });
};

export default Alert;

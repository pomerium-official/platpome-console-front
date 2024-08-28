import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { createRoot } from 'react-dom/client';

export interface ConfirmOptions {
  okButtonLabel?: string;
  okButtonStyle?: React.CSSProperties;
  noButtonLabel?: string;
  noButtonStyle?: React.CSSProperties;
  width?: string;
  closable?: boolean;
}

export interface ConfirmProps extends ConfirmOptions {
  visible: boolean;
  content: ReactNode;
  title: ReactNode;
  onVisibleChange: (visible: boolean) => void;
  onOk: () => void;
  onNo: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
  visible,
  content,
  title,
  onVisibleChange,
  onOk,
  onNo,
  okButtonLabel = '확인',
  noButtonLabel = '취소',
  width = '25vw',
  closable,
  okButtonStyle,
  noButtonStyle,
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

  const handleNoClick = () => {
    onNo && onNo();
    setVisibleState(false);
  };

  const handleHide = () => {
    setVisibleState(false);
  };

  const footer = (
    <div className={'flex'}>
      <Button
        label={noButtonLabel}
        icon="pi pi-times"
        onClick={handleNoClick}
        className="p-button-text p-confirm-no"
        style={noButtonStyle}
      />
      <Button
        label={okButtonLabel}
        icon="pi pi-check"
        onClick={handleOkClick}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className={'p-confirm-ok'}
        style={okButtonStyle}
      />
    </div>
  );

  return (
    <Dialog
      closable={closable}
      className={'p-confirm'}
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
 * Confirm, Programatically.
 * @param content
 * @param title 제목. string | element
 * @param options
 * @returns {Promise<"OK"|"NO"|"CANCEL">}
 */
export const confirm = (
  content: ReactNode,
  title: string,
  options?: ConfirmOptions
): Promise<'OK' | 'NO' | 'CANCEL'> => {
  return new Promise((resolve) => {
    const id = 'smith-ui-confirm-container';

    let confirmContainer = document.getElementById(id);
    if (confirmContainer === null) {
      confirmContainer = document.createElement('div');
      confirmContainer.id = id;
      document.getElementsByTagName('body')[0].appendChild(confirmContainer);
    }

    const { children } = confirmContainer;
    // 마지막 차일드 번호에 고유 dom(이 돔은 클래스명 있어야함) 붙인 후에 거기에 confirm렌더링 하고, confirm닫힐 때 돔도 제거해준다.
    let latestIndex = -1;
    if (children.length > 0) {
      const index = children[children.length - 1].getAttribute('index');
      if (index) {
        latestIndex = Number(index);
      }
    }

    const confirmItem = document.createElement('div');
    confirmItem.setAttribute('id', `smith-ui-confirm-${latestIndex + 1}`);
    confirmItem.setAttribute('index', (latestIndex + 1).toString());
    confirmItem.className = 'smith-ui-confirm-item';
    confirmContainer.appendChild(confirmItem);

    let reason = '';
    const root = createRoot(confirmItem);

    root.render(
      <Confirm
        content={content}
        visible={true}
        title={title}
        onVisibleChange={(visible) => {
          if (visible === false) {
            confirmItem.remove();
            if (reason === '') {
              resolve('CANCEL');
            } else {
              resolve(reason as never);
            }
          }
        }}
        {...options}
        onOk={() => {
          reason = 'OK';
        }}
        onNo={() => {
          reason = 'NO';
        }}
      />
    );
  });
};

export default Confirm;

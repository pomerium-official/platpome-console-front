import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { Checkbox } from '@/features/common/components/common/Checkbox';

export interface ModalProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  isAgain?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  exportModal?: boolean;
  hideClose?: boolean;
}

export const closeExportModal = (e: any) => {
  const target = e.target.closest('.modalWrap');
  target.remove();
};

const Modal = ({
  header,
  content,
  footer,
  isAgain,
  className,
  style,
  onClose,
  exportModal,
  hideClose,
}: ModalProps) => {
  const modalAnchorRef = useRef<HTMLDivElement | null>(null);
  const modalWrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (exportModal) {
      const root = document.querySelector('#__next');
      if (modalWrapRef.current) {
        root?.appendChild(modalWrapRef.current);
      }
    }
    return () => {
      if (modalWrapRef.current) {
        modalWrapRef.current.remove();
      }
      if (modalAnchorRef.current) {
        modalAnchorRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="modalAnchor" ref={modalAnchorRef}>
      <div className={`modalWrap ${styles.modalWrap}`} ref={modalWrapRef}>
        <div
          className={`modal${className ? ` ${className}` : ''}`}
          style={style}
        >
          <div className="modalHeader">{header}</div>
          <div className="modalContainer">{content}</div>
          <div className="modalFooter">
            {isAgain && (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <Checkbox sizeClass="sixteen-px" />
                Don't show again
              </label>
            )}
            <div className="buttonDiv">{footer}</div>
          </div>
          {!hideClose && (
            <button
              className="modalClose"
              onClick={() => {
                if (modalWrapRef.current?.appendChild) {
                  modalAnchorRef.current!.appendChild(modalWrapRef.current);
                }
                onClose && onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import { ModalProps } from './Modal';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import styles from './Modal.module.scss';
import { Checkbox } from '@/features/common/components/common/Checkbox';

interface DialogProps extends Omit<ModalProps, 'onClose'> {
  type: 'alert' | 'confirm';
  handleClose?: () => void;
  handleNo?: () => void;
  handleOk?: () => void;
  option?: {
    okText?: string;
    noText?: string;
    icon?: 'confirm' | 'caution' | 'delete';
  };
}

const Dialog = (props: DialogProps) => {
  const onClose = (e: any) => {
    const target = e.target.closest('.modalWrap').parentElement;
    target?.remove();
  };

  return (
    <>
      <div className={`modalWrap ${styles.modalWrap}`}>
        <div className={`modal dialog`} style={props.style}>
          <div className="modalHeader">
            {props.option?.icon && (
              <i
                className="headerIcon"
                style={{
                  backgroundImage: `url("/assets/images/icons/icon-${props.option?.icon}.svg")`,
                }}
              />
            )}
            {props.header ? props.header : props.type}
          </div>
          <div className="modalContainer">{props.content}</div>
          <div className="modalFooter">
            {props.isAgain && (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <Checkbox sizeClass="sixteen-px" />
                Don't show again
              </label>
            )}
            <div className="buttonDiv">
              {props.type === 'alert' ? (
                <SolidButton
                  styleType="neutral"
                  size="small"
                  label={
                    props.option?.okText ? props.option?.okText : 'Confirm'
                  }
                  onClick={(e) => {
                    props.handleOk && props.handleOk();
                    onClose(e);
                  }}
                />
              ) : (
                <>
                  <LineButton
                    styleType="neutral"
                    size="small"
                    label={
                      props.option?.noText ? props.option?.noText : 'Cancel'
                    }
                    onClick={(e) => {
                      props.handleNo && props.handleNo();
                      onClose(e);
                    }}
                  />
                  <SolidButton
                    styleType="neutral"
                    size="small"
                    label={
                      props.option?.okText ? props.option?.okText : 'Confirm'
                    }
                    onClick={(e) => {
                      props.handleOk && props.handleOk();
                      onClose(e);
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <button
            className="modalClose"
            onClick={(e) => {
              props.handleClose && props.handleClose();
              onClose(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dialog;

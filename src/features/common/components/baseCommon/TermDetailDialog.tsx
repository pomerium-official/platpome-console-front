import { v4 } from 'uuid';
import React, { FC } from 'react';

import DialogResponsive from './DialogResponsive';
import styles from './TermDetailDialog.module.css';
import { Button } from 'primereact/button';

export interface TermDetailProps {
  title: string;
  titleStyle?: React.CSSProperties;
  content: string;
  contentStyle?: React.CSSProperties;
  visible?: boolean;
  onHide: () => void;
}

const TermDetailDialog: FC<TermDetailProps> = ({
  title,
  content,
  visible = false,
  onHide,
  titleStyle,
  contentStyle,
}) => {
  return (
    <DialogResponsive
      breakpoints={{ '960px': { width: '100%', height: '100%' } }}
      draggable={false}
      resizable={false}
      header={
        <Button
          className="p-button-rounded p-button-text"
          icon="pi pi-chevron-left"
          onClick={onHide}
        />
      }
      style={{ width: '720px' }}
      visible={visible}
      onHide={onHide}
      className={'joinTerms'}
    >
      <strong
        key={v4()}
        className="text-3xl"
        style={{
          display: 'block',
          // fontSize: '5.333333vw',
          color: '#222',
          ...titleStyle,
        }}
      >
        {title}
      </strong>
      <pre
        key={v4()}
        className={`${styles.content} text-base`}
        style={contentStyle}
      >
        {content}
      </pre>
    </DialogResponsive>
  );
};

export default TermDetailDialog;

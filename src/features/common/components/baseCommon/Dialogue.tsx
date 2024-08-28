import React, { FC, useState } from 'react';
import styles from './Dialogue.module.scss';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export interface dialogueProps {
  /**
   * textarea default : true
   */
  visibleTextarea?: boolean;
  /**
   * 확인 시 할 일
   * @param inputValue
   */
  onOk?: (inputValue: string) => void;
  /**
   * 취소 시 할 일
   */
  onCancel?: () => void;
  /**
   * 다이얼로그 제목. 기본 : 사유 입력
   */
  title?: string;
  /**
   * 다이얼로그 설명. 기본 : 사유를 입력해 주세요.
   */
  info?: string;
  /**
   * 확인 버튼 글. 기본 : 확인
   */
  okButtonLabel?: string;
  /**
   * 사용할 땐 반드시 스타일 지우고 사용.
   */
  style?: React.CSSProperties;
  /**
   * 클래스
   */
  className?: string;
}

const Dialogue: FC<dialogueProps> = ({
  visibleTextarea = true,
  onOk,
  onCancel,
  title = '사유 입력',
  info = '사유를 입력해 주세요.',
  okButtonLabel = '확인',
  style,
  className,
}) => {
  const [dialogueTextarea, setDialogueTextarea] = useState<string>();
  return (
    <div className={`${styles.dialogueWrap} ${className}`} style={style}>
      <div className={styles.dialogue}>
        <h1>{title}</h1>
        <p>{info}</p>
        {visibleTextarea && (
          <InputTextarea
            maxLength={1000}
            value={dialogueTextarea}
            onChange={(e) => {
              setDialogueTextarea(e.target.value);
            }}
          />
        )}
        <div className={styles.botBtns}>
          <Button label={'취소'} onClick={onCancel} />
          <Button
            label={okButtonLabel}
            onClick={() => onOk!(dialogueTextarea!)}
          />
        </div>
        <Button
          className={`p-button-rounded p-button-text p-button-plain p-button-icon-only ${styles.close}`}
          icon={'pi pi-times'}
        />
      </div>
    </div>
  );
};

export default Dialogue;

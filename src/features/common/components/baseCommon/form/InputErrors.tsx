import React, { FC, ReactNode } from 'react';
import { InputExplains } from './InputExplains';

export interface InputErrorsProps {
  errorMessages?: ReactNode[];
  wrapperStyle?: React.CSSProperties;
}

/**
 * 인풋 하단 에러 문구 컴포넌트
 * @param errorMessages 에러메시지
 * @param wrapperStyle wrapper스타일
 * @constructor
 */
const InputErrors: FC<InputErrorsProps> = ({ errorMessages, wrapperStyle }) => {
  return (
    <InputExplains
      messages={errorMessages}
      wrapperStyle={wrapperStyle}
      messageStyle={{ color: 'var(--red-500)' }}
    />
  );
};

export default InputErrors;

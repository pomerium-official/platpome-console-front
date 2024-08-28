import React, { FC, ReactNode } from 'react';

export interface InputExplainProps {
  messages?: ReactNode[];
  wrapperStyle?: React.CSSProperties;
  messageClass?: string;
  messageStyle?: React.CSSProperties;
}

/**
 * input 하단 메시지
 * @param messages
 * @param wrapperStyle
 * @param messageClass
 * @param messageStyle
 * @constructor
 */
export const InputExplains: FC<InputExplainProps> = ({
  messages,
  wrapperStyle,
  messageClass,
  messageStyle,
}) => {
  return (
    <div className={'flex flex-column ml-1 mt-1 mb-1'} style={wrapperStyle}>
      {messages?.map((message: ReactNode) => {
        if (typeof message === 'string') {
          return (
            <small key={message} className={messageClass} style={messageStyle}>
              {message}
            </small>
          );
        } else {
          return message;
        }
      })}
    </div>
  );
};

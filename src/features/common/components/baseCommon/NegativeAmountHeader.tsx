import React, { FC, ReactNode } from 'react';

interface NegativeAmountHeaderProps {
  title: ReactNode;
}

/**
 * 테이블 헤더 (-)값 붙은 컴포넌트.  (-) 제목
 * @param title
 * @constructor
 */
const NegativeAmountHeader: FC<NegativeAmountHeaderProps> = ({ title }) => {
  return (
    <>
      <span style={{ color: 'red' }}>(-)</span>
      {title}
    </>
  );
};

export default NegativeAmountHeader;

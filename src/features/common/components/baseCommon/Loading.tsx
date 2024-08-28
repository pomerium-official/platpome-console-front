import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

/**
 * 로딩 컴포넌트. 전체화면. dim
 * @constructor
 */
const Loading = () => {
  return (
    <div className="smithDim">
      <ProgressSpinner />
    </div>
  );
};
export default Loading;

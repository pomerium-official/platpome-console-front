import React from 'react';
// import Search from './Search';

const UtilButtons = () => {
  return (
    <div className="utilButtons">
      {/* <Search />
      <button className="alram badge"></button> */}
      <a
        href={process.env.NEXT_PUBLIC_DOCUMENT_API_URL}
        target={'_blank'}
        rel={'noreferrer'}
      >
        <button className="doc" />
      </a>
    </div>
  );
};

export default UtilButtons;

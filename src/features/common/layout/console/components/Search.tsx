import React, { useEffect, useState } from 'react';

const Search = () => {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const searchEnd = (e: any) => {
      if (!e.target.closest('.searchWrap')) {
        setIsClick(false);
      }
    };
    window.addEventListener('click', searchEnd);
    return () => window.removeEventListener('click', searchEnd);
  }, []);

  return (
    <div className={`searchWrap ${isClick ? 'current' : ''}`}>
      <input type="text" placeholder="Search" />
      <button
        className="search"
        onClick={() => !isClick && setIsClick(true)}
      ></button>
    </div>
  );
};

export default Search;

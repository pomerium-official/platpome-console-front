import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchOnList.module.scss';

interface SearchOnListProps {
  style?: React.CSSProperties;
  className?: string;
  setKeyword?: (e: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SearchOnList = ({
  style,
  className,
  setKeyword,
  onMouseEnter,
  onMouseLeave,
}: SearchOnListProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current!.focus();
    }
  }, []);
  return (
    <div
      className={`searchOnList ${styles.searchOnList}${
        className ? ` ${className}` : ''
      }`}
      style={style}
      onMouseEnter={() => onMouseEnter && onMouseEnter()}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      <input
        ref={inputRef}
        className={'searchInput'}
        type="text"
        placeholder="Search NFT"
        value={value}
        onChange={(e) => {
          setKeyword && setKeyword(e.target.value);
          setValue(e.target.value);
        }}
      />
      <button className="btnSearch" />
      {value && (
        <button
          className={'clear'}
          onClick={() => {
            setKeyword && setKeyword('');
            setValue('');
          }}
        />
      )}
    </div>
  );
};

export default SearchOnList;

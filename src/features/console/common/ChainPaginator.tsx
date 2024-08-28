import React from 'react';
import styles from './ChainPaginator.module.scss';

interface ChainPaginatorButtonType {
  buttonText?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface ChainPaginatorProps {
  prev?: ChainPaginatorButtonType;
  next?: ChainPaginatorButtonType;
}

const ChainPaginator = ({ prev, next }: ChainPaginatorProps) => {
  return (
    <div className={`chainPaginator ${styles.chainPaginator}`}>
      <div className="rightSite">
        <button
          className="prev"
          onClick={() => prev?.onClick && prev?.onClick()}
          disabled={prev?.disabled ?? true}
        >
          {prev?.buttonText ?? 'Previous'}
        </button>
        <button
          className="next"
          onClick={() => next?.onClick && next?.onClick()}
          disabled={next?.disabled}
        >
          {next?.buttonText ?? 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ChainPaginator;

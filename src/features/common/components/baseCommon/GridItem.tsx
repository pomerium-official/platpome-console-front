import React, { FC } from 'react';
import styles from './GridItem.module.scss';

export interface GridItemType {
  name?: React.ReactNode;
  content?: React.ReactNode;
  require?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: boolean;
}

const GridItem: FC<GridItemType> = ({
  name,
  require,
  className,
  style,
  content,
  onFocus,
}) => {
  return (
    <>
      <dl className={`${styles.gridItem} ${className ?? ''}`} style={style}>
        <dt>
          <span className={onFocus ? 'point' : ''}>{name}</span>
          {require ? <i className={styles.require} /> : ''}
        </dt>
        <dd>{content}</dd>
      </dl>
    </>
  );
};

export default GridItem;

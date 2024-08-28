import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  style?: React.CSSProperties;
  className?: string;
  loaderColor?: string;
}

const Skeleton = ({ style, className, loaderColor }: SkeletonProps) => {
  return (
    <>
      <div
        className={`${styles.skeleton} skeleton${
          className ? ` ${className}` : ''
        }${loaderColor ? ' useLoaderColor' : ''}`}
        style={style}
      >
        <i style={{ background: `${loaderColor}` }} />
      </div>
    </>
  );
};

export default Skeleton;

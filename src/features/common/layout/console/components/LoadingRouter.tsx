import React from 'react';
import styles from './LoadingRouter.module.scss';

interface LoadingRouterProps {
  style?: React.CSSProperties;
  className?: string;
  complete?: boolean;
}

const LoadingRouter = ({ style, className, complete }: LoadingRouterProps) => {
  return (
    <div
      className={`${styles.loadingRouter} loadingRouter${
        className ? ` ${className}` : ''
      }${complete ? ` ${styles.complete}` : ''}`}
      style={style}
    />
  );
};

export default LoadingRouter;

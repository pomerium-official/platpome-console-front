import React from 'react';
import styles from './Connecting.module.scss';

interface ConnectingProps {
  style?: React.CSSProperties;
  className?: string;
}

const Connecting = ({ style, className }: ConnectingProps) => {
  return (
    <div
      className={`${styles.connecting} connecting${
        className ? ` ${className}` : ''
      }`}
      style={style}
    />
  );
};

export default Connecting;

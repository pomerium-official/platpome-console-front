import React, { FC } from 'react';
import styles from './ProgressCircle.module.scss';
export interface ProgressCircleProps {
  value: number;
  className?: string;
  height?: number;
  width?: number;
}

const ProgressCircle: FC<ProgressCircleProps> = ({
  value,
  className = '',
  height = '100%',
  width = '100%',
}) => {
  const remainder = 100 - value;

  return (
    <div
      className={`${styles.circleProgressWrap} ${className}`}
      style={{ width: width, height: height }}
    >
      <svg
        className={styles.wrapper}
        viewBox="0 0 33.83098862 33.83098862"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.background}
          cx="16.91549431"
          cy="16.91549431"
          r="15.91549431"
        />
        <circle
          className={styles.circle}
          cx="16.91549431"
          cy="16.91549431"
          r="15.91549431"
          style={{ strokeDasharray: `${value} ${remainder}` }}
        />
      </svg>
      <div className={styles.circleChartInfo}>
        <span className="percent">
          <span id="donut-percent">{value}</span>%
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;

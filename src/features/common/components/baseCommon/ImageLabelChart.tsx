import React, { FC, useMemo } from 'react';
import styles from './ImageLabelChart.module.scss';

export interface ImageLabelChartDataType {
  datasets: {
    backgroundColor: string | string[];
    data: number[];
  }[];
  labels: { label: string; url: string }[];
}

export interface ImageLabelChartProps {
  data: ImageLabelChartDataType;
  options: { legend: { labels: string[] } };
}

const ImageLabelChart: FC<ImageLabelChartProps> = ({ data, options }) => {
  const dataSet = data.datasets;
  const { labels: legendLabel } = options.legend;

  /**
   * legendLabel 기준 label별 합계 계산을 위한 배열 생성.
   */
  const secTotalFn = useMemo(() => {
    const total: number[][] = [];
    let dataSum: number[] = [];
    for (let i = 0; i < legendLabel.length; i++) {
      for (let j = 0; j < dataSet.length; j++) {
        dataSum.push(dataSet[j].data[i]);
      }
      total.push(dataSum);
      dataSum = [];
    }
    return total;
  }, [dataSet, legendLabel.length]);

  const totalSum = useMemo(() => {
    let sum = 0;
    data.datasets.map((v) => {
      const calc = v.data.reduce((x, y) => x + y);
      sum += calc;
    });
    return sum;
  }, [data.datasets]);

  const renderSticks = (sectionTotal: number, idx: number) => {
    for (let i = 0; i < secTotalFn.length; i++) {
      return dataSet.map((v, i) => {
        const zIndex = dataSet[i].data.length - (i + 1);
        const width = (v.data[idx] / sectionTotal) * 100;
        const bgColor = dataSet[i].backgroundColor;
        const bg = () => {
          if (Array.isArray(bgColor)) {
            return bgColor[idx];
          } else {
            return bgColor;
          }
        };
        return (
          <>
            <div
              style={{
                flex: `0 0 calc(${width}% + 5px)`,
                background: `${bg()}`,
                zIndex: zIndex,
              }}
            />
          </>
        );
      });
    }
  };

  return (
    <>
      <div className={styles.graphWrap}>
        <div className={styles.legend}>
          <ul>
            {legendLabel.map((v, i: number) => {
              return (
                <>
                  <li key={i.toString()}>
                    <i
                      style={{
                        backgroundColor: `${dataSet[i].backgroundColor}`,
                      }}
                    />
                    {v}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className={styles.graph}>
          {data.labels.map((_chunk, idx: number) => {
            const sectionTotal = secTotalFn[idx].reduce(
              (x: number, y: number) => x + y
            );
            const percent = (sectionTotal / totalSum) * 100;
            return (
              <>
                <div className={styles.item} key={idx.toString()}>
                  <div className={styles.itemLabel}>
                    <em>[{idx + 1}]</em>
                    <span className={styles.labelArea}>
                      {data.labels[idx].label.length ? (
                        <span>{data.labels[idx].label}</span>
                      ) : (
                        ''
                      )}
                      {data.labels[idx].url.length ? (
                        <img src={data.labels[idx].url} alt="" />
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                  <div className={styles.itemContent}>
                    <div
                      className={styles.sticks}
                      style={{ width: `${percent.toFixed(1)}%` }}
                    >
                      {renderSticks(sectionTotal, idx)}
                    </div>
                    <div
                      className={styles.itemValueText}
                      style={{ left: `calc(${percent.toFixed(1)}% + 10px)` }}
                    >
                      {percent.toFixed(1)}% ({sectionTotal}명)
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <div className={styles.bgLines}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className={styles.bottomFigure}>
          <i>0</i>
          <i>25</i>
          <i>50</i>
          <i>75</i>
          <i>100(%)</i>
        </div>
      </div>
    </>
  );
};

export default ImageLabelChart;

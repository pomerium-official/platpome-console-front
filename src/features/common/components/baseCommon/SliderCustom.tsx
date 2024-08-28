import React, { FC, useEffect, useState } from 'react';
import styles from './SliderCustom.module.css';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';

export interface SliderCustomProps {
  /**
   * 슬라이더 이동 단위 - 100으로 잡으면 100씩 이동
   */
  step?: number;
  /**
   * 최소값
   */
  min?: number;
  /**
   * 최대값
   */
  max?: number;
  /**
   * 하단에 구간 사용 여부
   */
  visibleSection?: boolean;
  /**
   * 하단 구간 갯수
   */
  sectionCount?: number;
  /**
   * 값 입력 인풋 사용 여부
   */
  visibleInput?: boolean;
}

const SliderCustom: FC<SliderCustomProps> = ({
  step = 1,
  min = 0,
  max = 100,
  sectionCount = 5,
  visibleSection = true,
  visibleInput = false,
}) => {
  const [value, setValue] = useState<any>();
  const [sectArray, setSectArray] = useState<number[]>([]);

  useEffect(() => {
    const sectArray = [];
    const diffValue = (max - min) / (sectionCount - 1);
    sectArray.push(min);
    let prevValue = min;
    for (let i = 0; i < sectionCount - 2; i++) {
      const currentValue = prevValue + diffValue;
      sectArray.push(currentValue);
      prevValue = currentValue;
    }
    sectArray.push(max);

    setSectArray(sectArray);
  }, [min, max, sectionCount]);

  return (
    <>
      <div className={styles.sliderWrap}>
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={(e) => setValue(e.value)}
          step={step}
        />

        {visibleSection && (
          <div className={styles.steps}>
            {sectArray.map((v, i) => {
              return (
                <span
                  key={i}
                  style={{ left: `${(100 / (sectionCount - 1)) * i}%` }}
                >
                  <i>{v}</i>
                </span>
              );
            })}
          </div>
        )}

        {visibleInput && (
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        )}
      </div>
    </>
  );
};

export default SliderCustom;

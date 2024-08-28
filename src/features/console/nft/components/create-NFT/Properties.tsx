import React from 'react';
import styles from './Properties.module.scss';

export interface PropertyType {
  type?: string;
  value?: string;
}

interface PropertiesProps {
  properties?: PropertyType[];
}

const Properties = ({ properties }: PropertiesProps) => {
  return (
    <div className={`properties ${styles.properties}`}>
      {properties?.map((v, i) => {
        return (
          <dl key={`${v.type}${v.value}${i}`}>
            <dt>{v.type}</dt>
            <dd>{v.value}</dd>
          </dl>
        );
      })}
    </div>
  );
};

export default Properties;

import { Card, CardProps } from 'primereact/card';
import styles from './TableWrapperCard.module.scss';

export const TableWrapperCard = ({ className, ...props }: CardProps) => {
  return (
    <Card
      className={`${className ?? ''} ${styles.tableWrapperCard}`}
      {...props}
    />
  );
};

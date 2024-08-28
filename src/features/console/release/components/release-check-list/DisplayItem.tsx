import React from 'react';
import styles from './DisplayItem.module.scss';

interface DisplayItemProps {
  onDelete?: () => void;
  imgSrc?: string;
}

const DisplayItem = ({ onDelete, imgSrc }: DisplayItemProps) => {
  return (
    <div className={`displayItem ${styles.displayItem}`}>
      <img src={imgSrc} alt="" />
      <button onClick={() => onDelete && onDelete()} className="delete" />
    </div>
  );
};

export default DisplayItem;

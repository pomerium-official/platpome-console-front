import React from 'react';
import styles from './CreateNFTWrap.module.scss';

interface CreateNFTWrapProps {
  children?: React.ReactNode;
  goBack: () => void;
}

const CreateNFTWrap = ({ children, goBack }: CreateNFTWrapProps) => {
  return (
    <div className={`createNftWrap ${styles.createNftWrap}`}>
      <button
        onClick={() => {
          goBack();
        }}
        className="goBack"
      >
        Go back
      </button>
      {children}
    </div>
  );
};

export default CreateNFTWrap;

import React from 'react';
import styles from './SkeletonNFTCard.module.scss';
import Skeleton from '@/features/console/common/Skeleton';

const SkeletonNFTCard = () => {
  return (
    <div className={`${styles.skeletonNFTCard}`}>
      <Skeleton
        style={{
          width: '329px',
          height: '329px',
          marginBottom: 16,
          borderRadius: 0,
        }}
      />
      <Skeleton style={{ width: 120, height: 14, margin: '0 0 8px 16px' }} />
      <Skeleton style={{ width: 200, height: 14, margin: '0 0 8px 16px' }} />
      <Skeleton style={{ width: 72, height: 14, margin: '0 0 14px 16px' }} />
      <Skeleton style={{ width: 72, height: 14, margin: '0 0 0 16px' }} />
      <div className={'buttonVoid'} />
    </div>
  );
};

export default SkeletonNFTCard;

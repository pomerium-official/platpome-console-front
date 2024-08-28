import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import React from 'react';
import styles from './BreadCrumb.module.scss';
import { useRouter } from 'next/router';

interface BreadCrumbProps {
  className?: string;
  style?: React.CSSProperties;
  currentPage?: string;
}

const BreadCrumb = ({ className, style, currentPage }: BreadCrumbProps) => {
  const router = useRouter();
  const { baseUrl, currentMenu } = useBaseUrl();
  return (
    <div
      className={`breadCrumb ${styles.breadCrumb}${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      <button onClick={() => router.push(`${baseUrl}/${currentMenu}`)}>
        {currentMenu === 'nft' ? (
          currentMenu.toUpperCase()
        ) : (
          <span style={{ textTransform: 'capitalize' }}>{currentMenu}</span>
        )}
      </button>
      <i className="slash">/</i>
      <strong>{currentPage ?? router.asPath.split('/')[4]}</strong>
    </div>
  );
};

export default BreadCrumb;

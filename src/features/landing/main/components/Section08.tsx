import React, { useEffect } from 'react';
import styles from './Section08.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useRouter } from 'next/router';

const Section08 = () => {
  const router = useRouter();
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const target = document.querySelector('.section08');
      const targetHeight = target?.getBoundingClientRect();
      if (targetHeight && targetHeight.y <= wHeight) {
        target?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);
  return (
    <div className={`section08 ${styles.section08}`}>
      <img src="/assets/images/platpome/s08-icon-x.png" alt="" />
      <p>Get started with PomeriumX</p>
      <SolidButton
        onClick={() => router.push('/console')}
        label="Get Started"
        size="xlarge"
        styleType="color"
        icon={
          <i
            style={{
              display: 'block',
              width: 16,
              height: 16,
              background:
                'url(/assets/images/icons/icon-rocket.svg) no-repeat center center / contain',
            }}
          />
        }
      />
    </div>
  );
};

export default Section08;

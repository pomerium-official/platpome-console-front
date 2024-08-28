import React, { useEffect } from 'react';
import styles from './Section05.module.scss';

const Section05 = () => {
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const target = document.querySelector('.section05');
      const targetHeight = target?.getBoundingClientRect();
      if (targetHeight && targetHeight.y <= wHeight) {
        target?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);
  return (
    <div className={`section05 ${styles.section05}`}>
      <div className="bg" />
      <dl>
        <dt>
          <span className="gradient">Manage</span>
          <strong className="txt01">Manage Web3.0 Game Apps</strong>
        </dt>
        <dd>
          <span className="txt02">
            You can analyze and manage various data of game apps.
          </span>
          <span className="txt03">
            Analytics helps you grow your app further.
          </span>
        </dd>
      </dl>
      <img
        src="/assets/images/platpome/img-section05.png"
        alt=""
        className="img"
      />
    </div>
  );
};

export default Section05;

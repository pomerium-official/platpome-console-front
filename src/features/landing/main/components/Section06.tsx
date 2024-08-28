import React, { useEffect } from 'react';
import styles from './Section06.module.scss';

const Section06 = () => {
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const target = document.querySelector('.section06');
      const targetHeight = target?.getBoundingClientRect();
      if (targetHeight && targetHeight.y <= wHeight) {
        target?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);
  return (
    <div className={`section06 ${styles.section06}`}>
      <div className="bgs">
        <img src="/assets/images/platpome/s06-c2.png" alt="" className="c2" />
        <img src="/assets/images/platpome/s06-c1.png" alt="" className="c1" />
        <img src="/assets/images/platpome/s06-c3.png" alt="" className="c3" />
        <img src="/assets/images/platpome/s06-c4.png" alt="" className="c4" />
        <img src="/assets/images/platpome/s06-c5.png" alt="" className="c5" />
        <img src="/assets/images/platpome/s06-c6.png" alt="" className="c6" />
      </div>
      <dl>
        <dt>
          <span className="gradient">NFT</span>
          <strong>Create powerful game NFT item.</strong>
        </dt>
        <dd>
          <span className="txt01">
            Increase the value of game items by minting NFTs.
          </span>
          <span className="txt02">
            It is possible to mint NFTs easily and quickly in various ways.
          </span>
        </dd>
      </dl>
    </div>
  );
};

export default Section06;

import React, { useEffect } from 'react';
import styles from './Section04.module.scss';

const Section04 = () => {
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const target = document.querySelector('.section04');
      const targetHeight = target?.getBoundingClientRect();
      if (targetHeight && targetHeight.y <= wHeight) {
        target?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);
  return (
    <div className={`section04 ${styles.section04}`}>
      <div className="bgs">
        <img
          src="/assets/images/platpome/section04-coin.png"
          alt=""
          className="coins"
        />
        <img
          src="/assets/images/platpome/section04-w01.png"
          alt=""
          className="wallet01"
        />
        <img
          src="/assets/images/platpome/section04-w02.png"
          alt=""
          className="wallet02"
        />
        <div className="wallet03">
          <img
            src="/assets/images/platpome/section04-c01.png"
            alt=""
            className="card01"
          />
          <img
            src="/assets/images/platpome/section04-w03.png"
            alt=""
            className="wallet"
          />
        </div>
      </div>
      <dl>
        <dt>
          <span className="gradient">Wallet</span>
          <strong>Exclusive wallet for game developers</strong>
        </dt>
        <dd>
          <span className="txt01">
            A developer console wallet is created by default.
          </span>
          <span className="txt02">
            Also you can manage tokens more easily and quickly by connecting to
            an external wallet.
          </span>
        </dd>
      </dl>
    </div>
  );
};

export default Section04;

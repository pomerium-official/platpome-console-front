import React, { useEffect, useState } from 'react';
import styles from './Section02.module.scss';

const Section02 = () => {
  const [pos, setPos] = useState({ p01: '', p02: '' });
  const [action, setAction] = useState(false);
  useEffect(() => {
    const target = document.querySelector('.section02') as HTMLElement;
    const std = target?.offsetTop;
    const wHeight = window.innerHeight / 2;
    if (target.getBoundingClientRect().y < window.innerHeight - 300) {
      setTimeout(() => {
        setAction(true);
      }, 1000);
    }
    setPos({
      p01: (std - wHeight).toString(),
      p02: (std - wHeight).toString(),
    });
    const onScrolling = () => {
      const getSt = (document.querySelector(
        '.section02'
      ) as HTMLElement)?.getBoundingClientRect();
      const st = window.scrollY;
      const pos = getSt?.y - wHeight < 0 ? 0 : std - wHeight - st;
      setPos({
        p01: pos.toString(),
        p02: pos.toString(),
      });
      if (getSt?.y - wHeight <= 0) {
        setAction(true);
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);

  return (
    <div className={`section02 ${styles.section02}`}>
      <div className="parts">
        <img
          className="parts01"
          style={{ transform: `translateY(${pos.p01}px)` }}
          src="/assets/images/platpome/section02-parts01.png"
          alt=""
        />
        <img
          className="parts02"
          style={{ transform: `translateY(${pos.p02}px)` }}
          src="/assets/images/platpome/section02-parts02.png"
          alt=""
        />
      </div>
      <div className={`content${action ? ' action' : ''}`}>
        <h1>
          <img
            src="/assets/images/platpome/logo-pomerium-x-console.svg"
            alt="pomerium X Console"
          />
        </h1>
        <p className="txt01">
          A new development service platform created by gaming
        </p>
        <p className="txt02">
          studio Pomerium for a better development environment.
        </p>
      </div>
    </div>
  );
};

export default Section02;

import React, { useEffect } from 'react';
import styles from './Section07.module.scss';

const Section07 = () => {
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const target = document.querySelector('.section07');
      const targetHeight = target?.getBoundingClientRect();
      if (targetHeight && targetHeight.y <= wHeight) {
        target?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);
  return (
    <div className={`section07 ${styles.section07}`}>
      <div className="inner">
        <dl>
          <dt>
            <span className="gradient">Help center</span>
            <strong>Have questions about PomeriumX?</strong>
          </dt>
          <dd>
            You can see how to use the service and frequently asked questions.
          </dd>
        </dl>
        <a
          href={`${process.env.NEXT_PUBLIC_HELP_CENTER_URL}`}
          target={'_blank'}
          rel={'noreferrer'}
        >
          View detail
        </a>
      </div>
    </div>
  );
};

export default Section07;

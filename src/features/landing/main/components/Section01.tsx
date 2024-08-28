import React from 'react';
import styles from './Section01.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { useRouter } from 'next/router';

const Section01 = () => {
  const router = useRouter();
  return (
    <div className={`section section01 ${styles.section01}`}>
      <video
        className="bgVideo"
        muted
        autoPlay
        loop
        src="/assets/media/main-bg.mp4"
      />
      <div className="content">
        <div>
          <dl>
            <dt>
              <p className="txt01">The easiest and fastest way </p>
              <p className="txt02">to build web3 app games.</p>
            </dt>
            <dd>
              The essential APIs, SDKs and tools to build and scale your web3
              app with ease.
            </dd>
          </dl>
          <div className="buttons">
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
            <a
              href={process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}
              target={'_blank'}
            >
              <SolidButton
                label="See documents"
                size="xlarge"
                styleType="neutral"
                icon={
                  <i
                    style={{
                      display: 'block',
                      width: 16,
                      height: 16,
                      background: 'var(--color-191919)',
                      WebkitMask:
                        'url(/assets/images/icons/icon-doc.svg) no-repeat center center / contain',
                    }}
                  />
                }
              />
            </a>
          </div>
        </div>
        <img src="/assets/images/platpome/img-x.png" alt="" className="imgX" />
      </div>
    </div>
  );
};

export default Section01;

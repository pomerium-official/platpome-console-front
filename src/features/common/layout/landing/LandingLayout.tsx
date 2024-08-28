import React, { useEffect } from 'react';
import styles from './LandingLayout.module.scss';
import { useMinHeight } from '@/libs/hooks/useMinHeight';
// import BottomSection from '@/features/landing/main/components/BottomSection';
import LandingHeader from './LandingHeader';
import LandingFooter from './LadingFooter';
import FooterMenu from './component/FooterMenu';

interface LandingLayoutProps {
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
}

const LandingLayout = ({ children, theme }: LandingLayoutProps) => {
  useMinHeight('#landingLayout');

  useEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', theme ?? 'dark');
  }, [theme]);

  return (
    <div
      id={'landingLayout'}
      className={`landingWrapper ${styles.landingWrapper}`}
    >
      <LandingHeader />
      {children}
      <LandingFooter
        addContent={
          <>
            {/* <BottomSection /> */}
            <FooterMenu />
          </>
        }
      />
    </div>
  );
};

export default LandingLayout;

import LandingLayout from '@/features/common/layout/landing/LandingLayout';
import React from 'react';
import Section01 from '../components/Section01';
import Section02 from '../components/Section02';
import Section03 from '../components/Section03';
import Logos from '../components/Logos';
import Section04 from '../components/Section04';
import Section05 from '../components/Section05';
import Section06 from '../components/Section06';
import Section07 from '../components/Section07';
import Section08 from '../components/Section08';

const Main = () => {
  return (
    <LandingLayout>
      <Section01 />
      <Logos />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Section06 />
      <Section07 />
      <Section08 />
    </LandingLayout>
  );
};

export default Main;

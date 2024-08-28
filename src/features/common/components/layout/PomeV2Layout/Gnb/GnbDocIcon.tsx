import React from 'react';
import styles from './GnbDocIcon.module.scss';
import { MyIcons } from '@/features/common/components/common/MyIcons';
import { OnlyIconButton } from '@/features/common/components/common/Button/OnlyIconButton';

export const GnbDocIcon = (): JSX.Element => {
  return (
    <OnlyIconButton
      tooltip={'API Document'}
      className={`gnbDocIconBtn ${styles['GNB-doc-icon']} `}
      tooltipOptions={{
        mouseTrack: true,
        position: 'bottom',
        mouseTrackTop: 20,
      }}
    >
      <MyIcons.FileDocumentOutline width={'1.25rem'} height={'1.25rem'} />
    </OnlyIconButton>
  );
};

import React from 'react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import Loading from './Loading';

const LoadingModal = observer(() => {
  const { commonStore } = useStore();
  if (commonStore.showLoading) {
    return <Loading />;
  } else {
    return null;
  }
});

export default LoadingModal;

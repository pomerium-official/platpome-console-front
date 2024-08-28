import React from 'react';
import ErrorForm from '@/features/common/components/baseCommon/ErrorForm';

const Error404 = () => {
  return (
    <ErrorForm errorCode={404} errorMessage={'This page could not be found.'} />
  );
};

export default Error404;

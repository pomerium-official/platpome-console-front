import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// const Component = (props) => {
//   const {receiveAmount, sendAmount } = props
//   const prevAmount = usePrevious({receiveAmount, sendAmount});
//   useEffect(() => {
//     if(prevAmount.receiveAmount !== receiveAmount) {
//
//       // process here
//     }
//     if(prevAmount.sendAmount !== sendAmount) {
//
//       // process here
//     }
//   }, [receiveAmount, sendAmount])

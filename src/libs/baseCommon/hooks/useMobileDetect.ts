import { useEffect, useState } from 'react';

/**
 * mobile detector true is Desktop
 * @param detectNo
 */
const useMobileDetect = (detectNo = 960) => {
  const [size, setSize] = useState<number>(detectNo);

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size > detectNo;
};
export default useMobileDetect;

import { useEffect, useState } from 'react';

/**
 * 폰트 크기 조절 hooks
 */
const useFontScale = () => {
  // TODO 이 부분 때문에 화면이 울컥하는걸로 보임. 처음 설정시에만 하고 나중에는 빼야할 듯
  const [scale, setScale] = useState(16);
  const [scales] = useState([12, 13, 14, 15, 16]);
  useEffect(() => {
    document.documentElement.style.fontSize = scale + 'px';
  }, [scale]);

  const decrementScale = () => {
    setScale((prevState) => --prevState);
  };

  const incrementScale = () => {
    setScale((prevState) => ++prevState);
  };

  return { scale, scales, decrementScale, incrementScale };
};

export default useFontScale;

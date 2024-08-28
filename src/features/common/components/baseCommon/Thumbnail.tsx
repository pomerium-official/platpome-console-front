import React, { FC, useState } from 'react';
import Img from './Img';

export interface ThumbnailProps {
  /**
   * s3 이미지면 fileName을 넣습니다.
   */
  imgSrc: string;
  thumbSrc?: string;
  className?: string;
  /**
   * s3 이미지 일 때 반드시 넣어줍니다.
   */
  s3?: boolean;
  /**
   * <p>썸네일 기본 사이즈는 세로 50px 입니다.</p>
   * <p>기본 css - width:auto; height:50px</p>
   * <p>썸네일 크기 수정하고 싶을 땐 height를 조정해 주세요.</p>
   */
  thumbStyle?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  alt?: string;
}

const Thumbnail: FC<ThumbnailProps> = ({
  imgSrc,
  thumbSrc,
  className,
  thumbStyle,
  popupStyle,
  alt,
  s3,
}) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const handleThumb = () => {
    setVisibleModal(!visibleModal);
  };
  return (
    <div className={`thumbnailSet ${className ? className : ''}`}>
      <button style={thumbStyle} onClick={handleThumb}>
        {s3 ? (
          <Img fileName={thumbSrc ? thumbSrc : imgSrc} alt={`${alt} 썸네일`} />
        ) : (
          <Img src={thumbSrc ? thumbSrc : imgSrc} alt={`${alt} 썸네일`} />
        )}
      </button>
      {visibleModal && (
        <div className="modalWrap">
          {s3 ? (
            <Img style={popupStyle} fileName={imgSrc} alt={alt} />
          ) : (
            <Img style={popupStyle} src={imgSrc} alt={alt} />
          )}
          <button
            className="modalClose pi pi-times"
            onClick={handleThumb}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;

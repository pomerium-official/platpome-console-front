import React, { FC, useEffect, useState } from 'react';

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * size: S3 size (small, middle, large, origin)
   */
  size?: 's' | 'm' | 'l' | 'o';

  /**
   * fileName : 파일명(확장자까지)
   */
  fileName?: string;

  /**
   * baseS3Url : env.NEXT_PUBLIC_IMG_S3_URL 대신 사용할 url
   */
  baseS3Url?: string;

  /**
   * defaultImage : 이미지가 없을 때 나타나는 이미지(프로필이미지/게시판이미지 default 이미지 차이를 두기 위해)
   */
  defaultImage?: string;
}

const Img: FC<ImgProps> = (props) => {
  const baseS3Url = props.baseS3Url || `${process.env.NEXT_PUBLIC_IMG_S3_URL!}`;
  const baseS3OriginUrl = `${baseS3Url}/o`;
  const [imgUrl, setImgUrl] = useState<string>();
  const [originImgUrl, setOriginImgUrl] = useState<string>();
  const defaultImage =
    props.defaultImage || '/assets/baseCommon/images/no-image.png';

  useEffect(() => {
    setImgUrl(`${baseS3Url}/${props.size}/${props.fileName}`);
    setOriginImgUrl(`${baseS3OriginUrl}/${props.fileName}`);
  }, [props.size, props.fileName, baseS3Url, baseS3OriginUrl]);

  if (baseS3Url === undefined) {
    throw new Error('NEXT_PUBLIC_IMG_S3_URL env or baseS3Url props needs');
  }

  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (originImgUrl) {
      setImgUrl(originImgUrl);
      if (originImgUrl === imgUrl) {
        if (props.src) {
          setImgUrl(props.src);
        } else {
          setImgUrl(defaultImage);
        }
      }
    }
    props.onError && props.onError(event);
  };

  return (
    <img
      alt={props.fileName}
      src={imgUrl}
      {...props}
      onError={(e) => onError(e)}
    />
  );
};

export default Img;

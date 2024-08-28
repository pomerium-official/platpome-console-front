import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import styles from './ImageUploader.module.css';
import Thumbnail from '../Thumbnail';
import _ from 'lodash';
import { privateApi } from '@/apis';

/**
 * 이미지 아이템
 */
export interface ImageItem {
  src: string;
  alt: string;
  fileId: number;
}

/**
 * 이미지 업로더 props
 */
export interface ImageUploaderProps {
  className?: string;
  /**
   * 이미지 preview imgSrcArray
   */
  imgArray?: ImageItem[];

  /**
   * 이미지 upload 멀티 여부. default : false
   */
  isMulti?: boolean;

  /**
   * 버튼 label. 기본값 +
   */
  buttonLabel?: string;

  /**
   * S3 uploadSubPath
   */
  subPath: string;

  /**
   * 이미지 업로드 및 삭제 등 변경 이벤트.
   * @param imgSrcArray 변경 후 이미지 목록
   */
  onChange?: (imgSrcArray: ImageItem[]) => void;

  /**
   * 사진 및 버튼 Height
   */
  itemHeight?: number;

  /**
   * 등록인 id. 없으면 에러
   */
  regId?: number;
}

/**
 * 이미지 업로드 컴포넌트
 * @constructor
 */
export const ImageUploader: FC<ImageUploaderProps> = ({
  className = '',
  buttonLabel = '+',
  imgArray = [],
  isMulti = false,
  subPath = '',
  onChange,
  itemHeight = 100,
  regId,
}) => {
  const [imgArrayState, setImgArray] = useState<ImageItem[]>(imgArray);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const imgArrayFromProps = imgArray;
    setImgArray((prevState) => {
      if (_.isEqual(prevState, imgArrayFromProps)) {
        return prevState;
      } else {
        return imgArrayFromProps;
      }
    });
  }, [imgArray]);

  useEffect(() => {
    onChange && onChange(imgArrayState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgArrayState]);

  const inputRef = useRef<HTMLInputElement>(null);
  const renderAddButton = () => {
    let doRender = false;
    if (!isMulti && imgArrayState.length === 0) {
      doRender = true;
    }

    if (isMulti) {
      doRender = true;
    }

    if (doRender) {
      return (
        <Button
          label={buttonLabel}
          style={{ width: itemHeight, height: itemHeight }}
          className={`${styles.item} ${styles.addButton}`}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            inputRef.current!.value = null;
            inputRef.current?.click();
          }}
        />
      );
    } else {
      return null;
    }
  };

  if (!regId) {
    return null;
  }

  return (
    <div className={`${className} ${styles.wrapper}`}>
      {imgArrayState.map((imgItem) => (
        <div
          key={imgItem.src}
          className={`${styles.item} ${styles.thumbnailContainer}`}
        >
          <button
            className={styles.thumbnailDelete}
            disabled={isUploading}
            onClick={() => {
              // remove images from image
              setImgArray((prevState) => {
                return prevState.filter((img) => img !== imgItem);
              });
            }}
          >
            &#10006;
          </button>
          <Thumbnail
            alt={imgItem.alt}
            className={styles.thumbnail}
            imgSrc={imgItem.src}
            thumbStyle={{ width: 'auto', height: itemHeight }}
          />
        </div>
      ))}
      {renderAddButton()}

      <input
        style={{
          visibility: 'hidden',
          width: 0,
          height: 0,
          position: 'absolute',
          zIndex: -1,
          left: '-10px',
          top: '-10px',
        }}
        ref={inputRef}
        type="file"
        name="myImage"
        accept="image/*"
        multiple={isMulti}
        onChange={async (event) => {
          setIsUploading(true);
          const files = event.target.files;
          if (files) {
            for (let i = 0; i < files.length; i++) {
              // regId 처리 필요. 백엔드에서 토큰에서 가져가는걸로 문의드림.
              // TODO 파일 업로더 컴포넌트 추가 필요
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const response = await privateApi.file.uploadAttachFileUsingPost(
                {
                  regId: regId,
                  subPath: subPath,
                },
                { file: files[i] }
              );
              const { fileUrl, fileName, id } = response.data;
              setImgArray((prevState) => {
                return [
                  ...prevState,
                  { src: fileUrl!, alt: fileName!, fileId: id! },
                ];
              });
            }
          }

          setIsUploading(false);
        }}
      />
    </div>
  );
};

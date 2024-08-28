import React, { useEffect, useRef, useState } from 'react';
import styles from './NFTImageUpload.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';

interface NFTImageUploadProps {
  imgSrc?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  infoText?: React.ReactNode;
  buttonText?: string;
  type?: 'createNFT' | 'appDetail';
  multi?: boolean;
  multiImgCount?: React.ReactNode;
  uploadDisplay?: React.ReactNode;
  onCancel?: () => void;
  showDisplay?: boolean;
  noMore?: boolean;
  className?: string;
}

const NFTImageUpload = ({
  imgSrc,
  onChange,
  infoText,
  buttonText,
  type = 'createNFT',
  multi,
  multiImgCount,
  uploadDisplay,
  onCancel,
  showDisplay,
  noMore,
  className,
}: NFTImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [display, setDisplay] = useState(showDisplay);
  useEffect(() => {
    setDisplay(showDisplay);
  }, [showDisplay]);

  return (
    <div
      className={`imageUpload ${styles.imageUpload}${
        className ? ` ${className}` : ''
      }`}
    >
      {display ? (
        <div className="content after">
          <div className="imgArea">
            {uploadDisplay ? (
              uploadDisplay
            ) : (
              <img
                src={imgSrc}
                alt=""
                style={{
                  display: 'block',
                  maxWidth: '630px',
                  margin: '0 auto',
                }}
              />
            )}
          </div>
          {type === 'createNFT' && (
            <button onClick={() => setDisplay(false)} className="close" />
          )}
          {multi && !noMore && (
            <div className="addSet">
              <span className="multiImgCount">{multiImgCount}</span>
              <SolidButton
                id="uploadButton"
                size="small"
                styleType="neutral"
                label={buttonText ? buttonText : 'Choose File'}
                onClick={() => inputRef.current?.click()}
              />
            </div>
          )}
          {!multi && (
            <button
              onClick={() => {
                setDisplay(false);
                onCancel && onCancel();
              }}
              className="close"
            />
          )}
        </div>
      ) : (
        <div className="content before">
          <p>
            {infoText ? infoText : 'PNG, GIF, WEBP, MP4 or MP3. Max 100mb.'}
          </p>
          <SolidButton
            id="uploadButton"
            size="small"
            styleType="neutral"
            label={buttonText ? buttonText : 'Choose File'}
            onClick={() => inputRef.current?.click()}
          />
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        accept={'.jpg, .png'}
      />
    </div>
  );
};

export default NFTImageUpload;

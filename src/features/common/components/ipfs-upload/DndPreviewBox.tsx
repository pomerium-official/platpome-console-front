import styles from './index.module.css';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import IconUp from './IconUp.svg';
import IconMedia from './IconMedia.svg';
import IconImage from './IconImage.svg';
import Loading from '../baseCommon/Loading';
import {
  getVideoThumbnail,
  importFileandPreview,
} from '@/libs/videoPreviewImg';
import { useChainId } from '@thirdweb-dev/react';

export interface IpfsFileWithPreview {
  ipfsUrl: string;
  imageUrl: string;
}

export interface DndPreviewBoxProps {
  mediaType?: 'img' | 'video';
  dispMediaType: string;
  limitByteSize?: number;
  onValidError?: (error: string) => void;
  onFileUploaded?: (ipfsInfo?: IpfsFileWithPreview) => void;
  onFileUploadStart?: (file: File) => void;
}

export interface DndPreviewBoxElement {
  click: () => void;
}

const DndPreviewBox = forwardRef<DndPreviewBoxElement, DndPreviewBoxProps>(
  (
    {
      mediaType,
      dispMediaType,
      limitByteSize,
      onValidError,
      onFileUploaded,
      onFileUploadStart,
    },
    ref
  ) => {
    const [fileAccept, setFileAccept] = useState('*');

    const dndPreviewBoxRef = useRef<HTMLLabelElement>(null);

    const [hover, setHover] = useState(false);
    const [previewImgUrlState, setPreviewImgUrlState] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const chainId = useChainId();

    useEffect(() => {
      if (mediaType === 'img') {
        setFileAccept('image/png,image/jpeg');
      } else {
        setFileAccept('video/avi,video/mp4');
      }
    }, [mediaType]);

    const dndPreviewBoxClick = useCallback(() => {
      dndPreviewBoxRef.current?.click();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return { click: dndPreviewBoxClick };
      },
      [dndPreviewBoxClick]
    );

    const uploadIpfs = useCallback(
      async (file: File) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('title', 'test');
        formData.append('description', 'asdasd');

        try {
          const result = await fetch(
            `http://localhost:8200/api/chains/${chainId}/ipfs/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          if (result.status === 204 || result.status === 200) {
            // onChange(attachFile);

            return result.json();
          }
        } catch (e) {
          console.error(e);
        }
      },
      [chainId]
    );

    const uploadFile = useCallback(
      async (file: File) => {
        setIsLoading(true);
        if (onFileUploadStart) {
          onFileUploadStart(file);
        }
        try {
          // 파일은 하나만 첨부 가능
          const attachedFile = file;

          if (attachedFile) {
            // const s3FilePromises = Array.from(e.target.files).map((file) => {
            // //limitSize 체크
            if (
              limitByteSize !== undefined &&
              attachedFile.size > limitByteSize
            ) {
              if (onValidError) {
                onValidError(
                  '파일 크기가 가이드에 맞지 않아 적용되지 않았어요.'
                );
              }

              return;
            }

            let thumbnail;
            if (mediaType === 'video') {
              thumbnail = await getVideoThumbnail(attachedFile, 0.1);
            } else {
              thumbnail = await importFileandPreview(attachedFile);
            }

            setPreviewImgUrlState(thumbnail);

            const ipfsFileResult = await uploadIpfs(attachedFile);
            onFileUploaded &&
              onFileUploaded({
                ...ipfsFileResult.data,
                previewUrl: thumbnail,
              });
          }
        } catch {
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      },
      [
        limitByteSize,
        mediaType,
        onFileUploadStart,
        onFileUploaded,
        onValidError,
        chainId,
      ]
    );

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        await uploadFile(e.target.files?.[0]);
      }
    };

    const renderIcon = () => {
      if (hover) {
        return <IconUp className={styles.fileDndIcon} />;
      }
      /* dnd 활성화되어있을 때는 upload icon, 그게 아닐 때 이미지 일때는 이미지, 영상일때는 영상 */

      if (mediaType === 'video') {
        return <IconMedia className={styles.fileDndIcon} />;
      } else {
        return <IconImage className={styles.fileDndIcon} />;
      }
    };

    const [dragOver, setDragOver] = useState(false);

    // dnd 안내 패널이 나오면 drag leave이벤트가 발생하는 문제 수정
    const dragEnterCnt = useRef(0);

    return (
      <>
        <label
          ref={dndPreviewBoxRef}
          className={`${styles.dndWrapper} ${
            previewImgUrlState ? '' : styles.dndReady
          } ${dragOver ? styles.dndFileDragOver : ''}`}
          onPointerEnter={() => {
            setHover(true);
          }}
          onPointerLeave={() => {
            setHover(false);
          }}
          onDragOver={(ev) => {
            setHover(true);
            setDragOver(true);
            ev.preventDefault();
          }}
          onDragEnter={(ev) => {
            ev.preventDefault();
            dragEnterCnt.current++;
          }}
          onDragLeave={() => {
            dragEnterCnt.current--;
            if (dragEnterCnt.current === 0) {
              setHover(false);
              setDragOver(false);
            }
          }}
          onDrop={(ev) => {
            dragEnterCnt.current = 0;
            setHover(false);
            setDragOver(false);
            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();

            if (ev.dataTransfer.items.length > 1) {
              onValidError && onValidError('1개의 파일만 업로드해 주세요.');
              return;
            }
            const item = ev.dataTransfer.files[0];

            if (item) {
              if (fileAccept.indexOf(item.type) === -1) {
                onValidError &&
                  onValidError('파일 확장자가 잘못되어 적용되지 않았어요.');
                return;
              }

              uploadFile(item).then();
            }
          }}
        >
          {previewImgUrlState && (
            <img
              className={styles.previewImg}
              alt=""
              src={previewImgUrlState}
            />
          )}
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Loading />
              {dispMediaType}를 업로드 중이에요
            </div>
          ) : (
            <div className={styles.dndGuideWrapper}>
              {renderIcon()}
              <div className={styles.dndGuideMessageWrapper}>
                <p className={styles.p}>
                  여기를 클릭하여 {dispMediaType}를 선택하거나,
                </p>
                <p className={styles.mbJpg}>
                  업로드할 {dispMediaType}를 끌어다 놓으세요
                </p>
              </div>
            </div>
          )}

          <input
            type="file"
            accept={fileAccept}
            style={{ display: 'none' }}
            multiple={false}
            onChange={async (e) => await handleFileChange(e)}
          />
        </label>
      </>
    );
  }
);

DndPreviewBox.displayName = 'DndPreviewBox';

export default DndPreviewBox;

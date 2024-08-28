import Input from '@/features/common/components/common/Input/Input';
import NFTImageUpload from '@/features/console/nft/components/create-NFT/NFTImageUpload';
import React, { useEffect, useRef, useState } from 'react';
import DisplayItem from './DisplayItem';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import Textarea from '@/features/common/components/common/Input/Textarea';

const AppDetail = observer(() => {
  const { releaseStore: store } = useStore();

  const [showBannerImg, setShowBannerImg] = useState(false);

  const [showScreenshotImg, setShowScreenshotImg] = useState(false);

  const [showControls, setShowControls] = useState(false);

  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const stdWidth = document.querySelector('.custom .imgArea')?.scrollWidth;
      const swiperWrapper = document.querySelector(
        '.custom .imgArea .swiper-wrapper'
      );
      const items = Array.from(swiperWrapper?.children || []) as HTMLElement[];
      const targetWidths = items
        .map((item: HTMLElement) => {
          return item.offsetWidth + 10;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      if (targetWidths && stdWidth && targetWidths > stdWidth) {
        setShowControls(true);
      } else {
        setShowControls(false);
      }
    }, 1500);
  }, [store.checkData.screenUrls.length]);

  useEffect(() => {
    const prev = document.querySelector('.custom .imgArea .swiper-button-prev');
    const next = document.querySelector('.custom .imgArea .swiper-button-next');
    prev?.addEventListener('click', () => {
      swiperRef.current?.swiper.slidePrev();
    });
    next?.addEventListener('click', () => {
      swiperRef.current?.swiper.slideNext();
    });
  }, [showControls]);

  return (
    <div className="appDetailWrap">
      <div className="appDetailInput">
        <strong className="labelName">Banner image</strong>
        <NFTImageUpload
          showDisplay={!!store.checkData.bannerUrl ?? showBannerImg}
          uploadDisplay={
            <ul className="uploadImgDisplay">
              {store.checkData.bannerUrl && (
                <DisplayItem
                  imgSrc={store.checkData.bannerUrl}
                  onDelete={() => {
                    store.checkData.bannerUrl = '';
                    setShowBannerImg(false);
                  }}
                />
              )}
            </ul>
          }
          onChange={async (e) => {
            const bannerUrl = await store.imgUpload(e.target.files![0]);
            if (bannerUrl) {
              store.handleReleaseInput('bannerUrl', bannerUrl);
              setShowBannerImg(true);
            }
          }}
          infoText={
            <p style={{ margin: 0, textAlign: 'center' }}>
              JPG or PNG <br />
              Recommanded at least 1920 X 706 px
            </p>
          }
          buttonText="Upload File"
          type="appDetail"
          multi
          noMore
        />
        <strong className="labelName" style={{ marginTop: 32 }}>
          Screenshot image (10 Screenshots maximum)
        </strong>
        <NFTImageUpload
          className="custom"
          showDisplay={
            store.checkData.screenUrls.length > 0 ?? showScreenshotImg
          }
          uploadDisplay={
            <>
              <Swiper
                ref={swiperRef}
                slidesPerView={'auto'}
                spaceBetween={10}
                navigation={showControls}
                style={{
                  width: 'fit-content',
                  maxWidth: '100%',
                  padding: '0 24px',
                }}
              >
                {store.checkData.screenUrls?.map((v, i) => {
                  return (
                    <SwiperSlide
                      style={{ width: 'fit-content' }}
                      key={`${v + i}`}
                    >
                      <DisplayItem
                        imgSrc={v}
                        onDelete={() => {
                          store.checkData.screenUrls.splice(i, 1);
                          if (store.checkData.screenUrls.length < 1) {
                            setShowScreenshotImg(false);
                          }
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </>
          }
          onChange={async (e) => {
            const screenUrl = await store.imgUpload(e.target.files![0]);
            if (screenUrl) {
              store.checkData.screenUrls.push(screenUrl);
              setShowScreenshotImg(true);
            }
          }}
          infoText={
            <p style={{ margin: 0, textAlign: 'center' }}>
              JPG or PNG <br />
              Recommanded at least vertical 339 X 603 px or horizontal 1071 X
              603 px
            </p>
          }
          buttonText="Upload File"
          type="appDetail"
          multi
          multiImgCount={
            <>
              ScreenShot {store.checkData.screenUrls.length}/{10}
            </>
          }
        />
        <Textarea
          onChange={(e) => {
            store.handleReleaseInput('detailDescription', e.target.value);
          }}
          value={store.checkData.detailDescription}
          label="App information (Maximum 5000 characters)"
          placeholder="Enter contents"
          style={{ marginTop: 32 }}
        />
        <Input
          onChange={(e) => {
            store.handleReleaseInput('siteUrl', e.target.value);
          }}
          value={store.checkData.siteUrl}
          label="Official website address"
          placeholder="Enter URL"
          style={{ marginTop: 32 }}
        />
      </div>
      <div className="detailPagePreview">
        <strong className="labelName">
          Detail page preview (Scaled down version)
        </strong>
        <div className="pagePreview">
          <div
            className={`bannerArea${store.checkData.bannerUrl ? '' : ' noImg'}`}
            style={{
              background: `var(--color-e6e6e6) url(${store.checkData.bannerUrl}) no-repeat center center / cover`,
            }}
          >
            <div className="appInfo">
              <strong className="appName">{store.appData?.name}</strong>
              <div
                className="appIcon"
                style={{
                  background: `url(${store.appData?.iconUrl}) no-repeat center center / cover`,
                }}
              />
            </div>
          </div>
          <div className="infoArea">
            <div className="imgSlide">
              <div className="inner">
                <ul>
                  {store.checkData.screenUrls &&
                  store.checkData.screenUrls.length > 0 ? (
                    store.checkData.screenUrls?.map((v, i) => {
                      return (
                        <li key={`imgSl${i}`}>
                          <img
                            src={v}
                            alt=""
                            style={{ display: 'block', height: 70 }}
                          />
                        </li>
                      );
                    })
                  ) : (
                    <li className="noImg"></li>
                  )}
                </ul>
              </div>
            </div>
            <p
              className={`infoText${
                store.checkData.detailDescription ? '' : ' noTxt'
              }`}
            >
              {store.checkData.detailDescription.split('\n').map((v, i) => {
                if (i > 0) {
                  return (
                    <>
                      <br />
                      {v}
                    </>
                  );
                }
                return v;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppDetail;

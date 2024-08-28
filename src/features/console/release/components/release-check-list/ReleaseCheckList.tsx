import Accordion from '@/features/common/components/common/Accordion/Accordion';
import React, { useEffect, useState } from 'react';
import AppCard from './AppCard';
import AppDetail from './AppDetail';
import Language from './Language';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import Platforms from './Platforms';

const ReleaseCheckList = observer(() => {
  const { releaseStore: store } = useStore();

  const [isOpen, setIsOpen] = useState({
    appCard: false,
    appDetail: false,
    platform: false,
    lang: false,
  });

  useEffect(() => {
    setIsOpen((prev) => {
      {
        return {
          ...prev,
          appCard: store.appData?.status === 'Preparation',
        };
      }
    });
  }, [store.appData]);

  return (
    <>
      {/* <h2 className="sectionTitle">Release check list</h2> */}
      <Accordion
        items={[
          {
            title: (
              <>
                <i
                  className={`iconCheck${
                    !!store.checkData.cardUrl &&
                    !!store.checkData.promotionalText
                      ? ' checked'
                      : ''
                  }`}
                />
                App card
              </>
            ),
            content: <AppCard />,
            open: isOpen.appCard,
            openAction: () =>
              setIsOpen((prev) => {
                return { ...prev, appCard: !prev.appCard };
              }),
          },
          {
            title: (
              <>
                <i
                  className={`iconCheck${
                    !!store.checkData.bannerUrl &&
                    !!store.checkData.screenUrls &&
                    !!store.checkData.detailDescription &&
                    !!store.checkData.siteUrl
                      ? ' checked'
                      : ''
                  }`}
                />
                App detail
              </>
            ),
            content: <AppDetail />,
            open: isOpen.appDetail,
            openAction: () =>
              setIsOpen((prev) => {
                return { ...prev, appDetail: !prev.appDetail };
              }),
          },
          {
            title: (
              <>
                <i
                  className={`iconCheck${
                    store.checkData.platformUrls.length > 0 ? ' checked' : ''
                  }`}
                />
                Platform
              </>
            ),
            content: <Platforms />,
            open: isOpen.platform,
            openAction: () =>
              setIsOpen((prev) => {
                return { ...prev, platform: !prev.platform };
              }),
          },
          {
            title: (
              <>
                <i
                  className={`iconCheck${
                    store.checkData.selectedLanguages &&
                    store.checkData.selectedLanguages.length > 0
                      ? ' checked'
                      : ''
                  }`}
                />
                Language
              </>
            ),
            content: <Language />,
            open: isOpen.lang,
            openAction: () =>
              setIsOpen((prev) => {
                return { ...prev, lang: !prev.lang };
              }),
          },
        ]}
      />
    </>
  );
});

export default ReleaseCheckList;

import React, { useEffect, useState } from 'react';
import LinkInputSet from './LinkInputSet';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { Platform } from '@/generated/api/api-service';

const defaultPlatformsData = [
  {
    platform: 'iOS',
    iconSrc: '/assets/images/icons/icon-apple.svg',
  },
  {
    platform: 'Android',
    iconSrc: '/assets/images/icons/icon-android.svg',
  },
  {
    platform: 'Steam',
    iconSrc: '/assets/images/icons/icon-steam.svg',
  },
  {
    platform: 'Window',
    iconSrc: '/assets/images/icons/icon-window.svg',
  },
  {
    platform: 'macOS',
    iconSrc: '/assets/images/icons/icon-apple.svg',
  },
];

const Platforms = observer(() => {
  const { releaseStore: store } = useStore();

  const [platformsData, setPlatformsData] = useState<
    {
      platform: string;
      iconSrc: string;
      link?: string;
    }[]
  >([]);

  useEffect(() => {
    setPlatformsData(
      defaultPlatformsData.map((v) => {
        return {
          ...v,
          link: store.checkData.platformUrls.find(
            (f) => f.platform === v.platform
          )?.url,
        };
      })
    );
  }, [store.checkData.platformUrls]);

  return (
    <div className="platformWrap">
      <ul>
        {platformsData?.map((v, i) => {
          return (
            <li key={v.platform + i}>
              <div className="platform">
                <i
                  className="icon"
                  style={{
                    background: `url(${v.iconSrc}) no-repeat center center / contain`,
                  }}
                />
                {v.platform}
              </div>
              <div className="right">
                <LinkInputSet
                  onChange={(e) =>
                    setPlatformsData((prev) => {
                      return prev.map((w, j) => {
                        if (i === j) {
                          return { ...w, link: e };
                        } else {
                          return { ...w };
                        }
                      });
                    })
                  }
                  onSave={() => {
                    store.checkData.platformUrls = platformsData
                      .filter((f) => !!f.link)
                      .map((w) => {
                        return {
                          platform: w.platform as Platform,
                          url: w.link!,
                        };
                      });
                  }}
                  onClose={() =>
                    setPlatformsData((prev) => {
                      return prev.map((w, j) => {
                        if (i === j) {
                          return { ...w, link: undefined };
                        } else {
                          return { ...w };
                        }
                      });
                    })
                  }
                  linkText={
                    v.link ??
                    store.checkData.platformUrls.find(
                      (f) => f.platform === v.platform
                    )?.url
                  }
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Platforms;

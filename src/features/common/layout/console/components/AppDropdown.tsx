import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/libs/baseCommon/hooks/useStore';

type AppDropdownOptionType = {
  name: string;
  value: number;
  current: boolean;
  iconUrl: string;
};

interface AppDropdownProps {
  options: AppDropdownOptionType[];
  setCurrentApp: (appId: number) => void;
}

const AppDropdown = ({ options, setCurrentApp }: AppDropdownProps) => {
  const router = useRouter();
  const [isClick, setIsClick] = useState(false);
  const { commonStore: store } = useStore();

  // const onSelectApp = useCallback(
  //   (selectedAppId: number) => {
  //     return options.map((option) => {
  //       if (option.value === selectedAppId) {
  //         return { ...option, current: true };
  //       } else {
  //         return { ...option, current: false };
  //       }
  //     });
  //   },
  //   [options]
  // );

  const appListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const optionDelete = (e: any) => {
      if (!appListRef.current?.contains(e.target)) {
        setIsClick(false);
      }
    };
    window.addEventListener('click', optionDelete);
    return () => window.removeEventListener('click', optionDelete);
  }, []);

  return (
    <div ref={appListRef} className="appDropdown">
      <div className="selectedValue">
        <div className="appItemSet">
          <button
            onClick={() => setIsClick(!isClick)}
            className={isClick ? `opened` : ''}
          >
            <i
              className="appIcon"
              style={{
                background: `url(${
                  options.find((f) => f.current)?.iconUrl
                }) no-repeat center center / cover`,
              }}
            />
            <span className="appLabel">
              {options.find((f) => f.current)?.name}
            </span>
          </button>
        </div>
      </div>
      {isClick && (
        <div className="optionLayer">
          <ul>
            {options.map((app) => {
              return (
                <li key={`${app.name}${app.value}`}>
                  <div className={`appItemSet${app.current ? ' current' : ''}`}>
                    <button
                      onClick={() => {
                        setCurrentApp(app.value);
                        setIsClick(false);
                        store.initConsoleWallet();
                        router.push(`/console/${app.value}/dashboard`).then();
                      }}
                    >
                      <i
                        className="appIcon"
                        style={{
                          background: `url(${app.iconUrl}) no-repeat center center / cover`,
                        }}
                      />
                      <span className="appLabel">{app.name}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <button className="goList" onClick={() => router.push('/console/')}>
            Go App List
          </button>
        </div>
      )}
    </div>
  );
};

export default AppDropdown;

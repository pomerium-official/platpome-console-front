import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';

const gnbData = [
  {
    iconSrc: '/assets/images/icons/icon-dashboard.svg',
    name: 'Dashboard',
    current: false,
  },
  {
    iconSrc: '/assets/images/icons/icon-release.svg',
    name: 'Release',
    current: false,
  },
  {
    iconSrc: '/assets/images/icons/icon-wallet.svg',
    name: 'Wallet',
    current: false,
  },
  {
    iconSrc: '/assets/images/icons/icon-nft.svg',
    name: 'NFT',
    current: false,
  },
  // {
  //   iconSrc: '/assets/images/icons/icon-created-token.svg',
  //   name: 'Created token',
  //   current: false,
  // },
  {
    iconSrc: '/assets/images/icons/icon-user.svg',
    name: 'User',
    current: false,
  },
  {
    iconSrc: '/assets/images/icons/icon-setting.svg',
    name: 'Setting',
    current: false,
  },
];

const AsideGnb = () => {
  const { commonStore } = useStore();
  const router = useRouter();
  const { baseUrl, currentMenu } = useBaseUrl();
  const [gnb, setGnb] = useState(gnbData);
  useEffect(() => {
    setGnb((prev) => {
      return prev.map((v) => {
        if (v.name.toLowerCase() === currentMenu) {
          return { ...v, current: true };
        } else {
          return { ...v, current: false };
        }
      });
    });
  }, [router, router.isReady, currentMenu]);

  const renderGnb = useMemo(() => {
    return gnb.map((v, i) => {
      const menuName = v.name.toLowerCase();
      return (
        <li key={`${v.iconSrc}${i}`}>
          <button
            onClick={() => {
              router
                .push(
                  `${baseUrl}/${menuName}${
                    menuName === 'wallet' ? `/${commonStore.currentWallet}` : ''
                  }`
                )
                .then();
            }}
            className={`${v.current ? 'current' : ''}`}
          >
            <i
              className="icon"
              style={{
                WebkitMask: `url(${v.iconSrc}) no-repeat center center`,
              }}
            />
            <span className="menuName">{v.name}</span>
          </button>
        </li>
      );
    });
  }, [gnb]);

  return <ul>{renderGnb}</ul>;
};

export default AsideGnb;

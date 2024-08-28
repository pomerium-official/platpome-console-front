import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SolidButton } from '../../components/common/Button/SolidButton';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { login } from '@/features/auth/libs/client/actions';
import AccountInfo from '../console/components/AccountInfo';
import { api } from '@/apis';

const gnbData = [
  {
    name: 'Service',
    link: `${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/overview/services`,
  },
  { name: 'API Doc', link: `${process.env.NEXT_PUBLIC_DOCUMENT_API_URL}` },
  { name: 'Help center', link: `${process.env.NEXT_PUBLIC_HELP_CENTER_URL}` },
];

const LandingHeader = () => {
  const { data: userInfo } = useUserInfo({ needLogin: false });
  const router = useRouter();

  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (isMember || userInfo === undefined) {
      return;
    }

    const getMe = async () => {
      try {
        const res = await api.members.findMe();
        if (res.data.error.code === '00') {
          setIsMember(true);
        }
        // eslint-disable-next-line no-empty
      } catch {}
    };

    getMe().then();
  }, [router.isReady, userInfo, isMember]);

  return (
    <div className="header">
      <div className="headerInner">
        <h1 className="logo">
          <Link href="/">
            <a>
              <img
                src="/assets/images/platpome/logo-pomerium-x-console.svg"
                alt="pomerium X console"
              />
            </a>
          </Link>
        </h1>
        <div className="gnb">
          <ul>
            {gnbData.map((v, i) => {
              return (
                <li key={`${v.name}${i}`}>
                  <a href={v.link} target={'_blank'} rel={'noreferrer'}>
                    <a>{v.name}</a>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right">
          <SolidButton
            onClick={() => {
              if (isMember) {
                router.push('/console').then();
              } else if (userInfo) {
                router.push('/console/create-developer').then();
              } else {
                login();
              }
            }}
            size={'medium'}
            styleType="color"
            label={isMember || userInfo ? 'Go to console' : 'Sign in'}
          />
          {userInfo && <AccountInfo isLanding style={{ marginLeft: 12 }} />}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;

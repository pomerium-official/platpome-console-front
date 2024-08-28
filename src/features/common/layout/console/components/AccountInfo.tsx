import React, { useEffect, useRef, useState } from 'react';
import { logout } from '@/features/auth/libs/client/actions';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import styles from './AccountInfo.module.scss';

interface AccountInfoProps {
  isLanding?: boolean;
  style?: React.CSSProperties;
}

const AccountInfo = observer(
  ({ isLanding = false, style }: AccountInfoProps) => {
    const { data: userInfo } = useUserInfo({ needLogin: true });
    const { commonStore: store } = useStore();
    const router = useRouter();

    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
      if (router.isReady && !store.userInfo) {
        store.getMe(!isLanding).then();
      }
    }, [router.isReady, store.userInfo, isLanding]);

    const accountInfoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const optionDelete = (e: any) => {
        if (!accountInfoRef.current?.contains(e.target)) {
          setIsClick(false);
        }
      };
      window.addEventListener('click', optionDelete);
      return () => window.removeEventListener('click', optionDelete);
    }, []);

    return (
      <>
        {userInfo && (
          <div
            ref={accountInfoRef}
            className={`accountInfo ${styles.accountInfo}${
              isLanding ? ` ${styles.inLanding}` : ''
            }`}
            style={style}
          >
            {isLanding ? (
              <button
                onClick={() => setIsClick(!isClick)}
                style={{
                  background: `url(/assets/images/initial/initial-${userInfo.email
                    .substring(0, 1)
                    .toLowerCase()}.svg) no-repeat center center / contain`,
                }}
              />
            ) : (
              <>
                <button
                  className="siteName"
                  onClick={() => setIsClick(!isClick)}
                >
                  Developer nickname
                </button>
                <p className="nickname colorViolet">
                  {store.userInfo?.nickname}
                </p>
              </>
            )}
            {isClick && (
              <div className="layer">
                <div className="layerInner">
                  <dl>
                    <dt>PomeriumX account</dt>
                    <dd>ID : {userInfo.email}</dd>
                  </dl>
                  <button
                    className="logout"
                    onClick={async () => {
                      setIsClick(false);
                      await logout({
                        redirectUri:
                          process.env.NEXT_PUBLIC_AUTH_LOGOUT_REDIRECT_URL,
                      });
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);

export default AccountInfo;

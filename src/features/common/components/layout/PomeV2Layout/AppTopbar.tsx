import React, { FC, useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LayoutColorModeType } from '@/libs/baseCommon/providers/ThemeProvider';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
// import { api } from '@/apis';

interface AppTopbarProps {
  onToggleMenuClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  layoutColorMode?: LayoutColorModeType;
  onMobileTopbarMenuClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMobileSubTopbarMenuClick?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  mobileTopbarMenuActive?: boolean;
}

export const AppTopbar: FC<AppTopbarProps> = observer((props) => {
  const { commonStore } = useStore();

  // TODO commonStore에 userInfo 넣기
  // useEffect(() => {
  //   // privateApi에서 refershToken Process후 commonStore.userInfo에 데이터가 들어옵니다.
  //   // me도 privateApi이므로 userInfo에 데이터가 들어갑니다.
  //   if (commonStore.userInfo === undefined) {
  //     api.user.me({});
  //   }
  // }, []);

  const renderAuthenticated = useCallback(() => {
    return (
      <>
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-calendar" />
            <span>Events</span>
          </button>
        </li>
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-cog" />
            <span>Settings</span>
          </button>
        </li>
        <li>
          <button
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-user" />
            <span>Profile</span>
          </button>
        </li>
      </>
    );
  }, [props.onMobileSubTopbarMenuClick]);
  const renderUnAuthenticated = useCallback(() => {
    return (
      <>
        <li>
          <Link href={'/login'}>
            <button
              className="p-link layout-topbar-button"
              onClick={() => {
                props.onMobileSubTopbarMenuClick &&
                  props.onMobileSubTopbarMenuClick();
              }}
            >
              <i className="pi pi-key" />
              <span>Login</span>
            </button>
          </Link>
        </li>
      </>
    );
  }, [props.onMobileSubTopbarMenuClick]);

  return (
    <div className="layout-topbar">
      <Link href="/">
        <a className="layout-topbar-logo">
          <img
            src={
              props.layoutColorMode === 'light'
                ? '/assets/layout/images/Default/logo-dark.svg'
                : '/assets/layout/images/Default/logo-white.svg'
            }
            alt="logo"
          />
          <span>SAKAI</span>
        </a>
      </Link>

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={classNames('layout-topbar-menu lg:flex origin-top', {
          'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive,
        })}
      >
        {commonStore.userInfo ? renderAuthenticated() : renderUnAuthenticated()}
      </ul>
    </div>
  );
});

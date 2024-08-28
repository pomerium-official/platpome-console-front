import React from 'react';
import { GnbDocIcon } from './GnbDocIcon';
// import { GnbMenuButton } from './GnbMenuButton';
// import { GnbProfileAsset } from './GnbProfileAsset';
// import { IconComponentNode } from './IconComponentNode';
// import { IconographyCaesarzkn } from './IconographyCaesarzkn';
// import { NamecandidateNameGnbProfileAssetScore101 } from './NamecandidateNameGnbProfileAssetScore101';

import styles from './index.module.scss';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';

interface Props {
  page:
    | 'web-console-page'
    | 'console-login-page'
    | 'common-login-page'
    | 'landing-page';
  state:
    | 'login'
    | 'profile-hover'
    | 'default'
    | 'scroll'
    | 'profile-pressed'
    | 'search-open';
  className: any;
}

const Gnb = ({ page, state, className }: Props): JSX.Element => {
  return (
    <div className={`${styles.GNB} ${page} state-${state} ${className}`}>
      {['common-login-page', 'console-login-page', 'landing-page'].includes(
        page
      ) && (
        <div className={`${styles['GNB-contents']}`}>
          {page === 'landing-page' && (
            <>
              <div className={`${styles['logo-frame']}`}>
                <div className={`${styles['group']}`}>
                  <img
                    className="vector"
                    alt="Vector"
                    src={
                      state === 'login'
                        ? 'vector-9.svg'
                        : state === 'profile-hover'
                        ? 'vector-17.svg'
                        : state === 'profile-pressed'
                        ? 'vector-25.svg'
                        : state === 'default'
                        ? 'vector.svg'
                        : state === 'scroll'
                        ? 'vector-41.svg'
                        : undefined
                    }
                  />
                  <div className="group-2">
                    <img
                      className="img"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-10.svg'
                          : state === 'profile-hover'
                          ? 'vector-18.svg'
                          : state === 'profile-pressed'
                          ? 'vector-26.svg'
                          : state === 'default'
                          ? 'vector-2.svg'
                          : state === 'scroll'
                          ? 'vector-42.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-2"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-11.svg'
                          : state === 'profile-hover'
                          ? 'vector-19.svg'
                          : state === 'profile-pressed'
                          ? 'vector-27.svg'
                          : state === 'default'
                          ? 'vector-3.svg'
                          : state === 'scroll'
                          ? 'vector-43.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-3"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-12.svg'
                          : state === 'profile-hover'
                          ? 'vector-20.svg'
                          : state === 'profile-pressed'
                          ? 'vector-28.svg'
                          : state === 'default'
                          ? 'vector-4.svg'
                          : state === 'scroll'
                          ? 'vector-44.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-4"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-13.svg'
                          : state === 'profile-hover'
                          ? 'vector-21.svg'
                          : state === 'profile-pressed'
                          ? 'vector-29.svg'
                          : state === 'default'
                          ? 'vector-5.svg'
                          : state === 'scroll'
                          ? 'vector-45.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-5"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-14.svg'
                          : state === 'profile-hover'
                          ? 'vector-22.svg'
                          : state === 'profile-pressed'
                          ? 'vector-30.svg'
                          : state === 'default'
                          ? 'vector-6.svg'
                          : state === 'scroll'
                          ? 'vector-46.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-6"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-15.svg'
                          : state === 'profile-hover'
                          ? 'vector-23.svg'
                          : state === 'profile-pressed'
                          ? 'vector-31.svg'
                          : state === 'default'
                          ? 'vector-7.svg'
                          : state === 'scroll'
                          ? 'vector-47.svg'
                          : undefined
                      }
                    />
                    <img
                      className="vector-7"
                      alt="Vector"
                      src={
                        state === 'login'
                          ? 'vector-16.svg'
                          : state === 'profile-hover'
                          ? 'vector-24.svg'
                          : state === 'profile-pressed'
                          ? 'vector-32.svg'
                          : state === 'default'
                          ? 'vector-8.svg'
                          : state === 'scroll'
                          ? 'vector-48.svg'
                          : undefined
                      }
                    />
                    <img
                      className="union"
                      alt="Union"
                      src={
                        state === 'login'
                          ? 'union-2.svg'
                          : state === 'profile-hover'
                          ? 'union-3.svg'
                          : state === 'profile-pressed'
                          ? 'union-4.svg'
                          : state === 'default'
                          ? 'union.svg'
                          : state === 'scroll'
                          ? 'union-6.svg'
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="menu-button">
                {/*<GnbMenuButton*/}
                {/*  buttonText="Service"*/}
                {/*  showLeftIcon={false}*/}
                {/*  showRightIcon={false}*/}
                {/*  size="medium"*/}
                {/*  state="selected"*/}
                {/*  style="neutral"*/}
                {/*/>*/}
                {/*<GnbMenuButton*/}
                {/*  buttonText=" API Doc"*/}
                {/*  showLeftIcon={false}*/}
                {/*  showRightIcon={false}*/}
                {/*  size="medium"*/}
                {/*  state="default"*/}
                {/*  style="neutral"*/}
                {/*/>*/}
                {/*<GnbMenuButton*/}
                {/*  buttonText="FAQ"*/}
                {/*  showLeftIcon={false}*/}
                {/*  showRightIcon={false}*/}
                {/*  size="medium"*/}
                {/*  state="default"*/}
                {/*  style="neutral"*/}
                {/*/>*/}
              </div>
              <SolidButton
                className={`${
                  ['default', 'scroll'].includes(state) && 'class'
                } ${
                  ['login', 'profile-hover', 'profile-pressed'].includes(
                    state
                  ) && 'class-2'
                }`}
                size="medium"
                styleType="color"
              >
                {['default', 'scroll'].includes(state)
                  ? 'Sign in'
                  : ['login', 'profile-hover', 'profile-pressed'].includes(
                      state
                    )
                  ? 'Go to console'
                  : undefined}
              </SolidButton>
            </>
          )}

          {['login', 'profile-hover', 'profile-pressed'].includes(state) && (
            <div className="GNB-landing-profile">
              {/*{state === 'login' && (*/}
              {/*  <GnbProfileAsset className="instance-node" />*/}
              {/*)}*/}

              {/*{['profile-hover', 'profile-pressed'].includes(state) && (*/}
              {/*  <>*/}
              {/*    <div className="GNB-profile-asset-wrapper">*/}
              {/*      {state === 'profile-hover' && (*/}
              {/*        <IconComponentNode className="instance-node" />*/}
              {/*      )}*/}

              {/*      {state === 'profile-pressed' && (*/}
              {/*        <NamecandidateNameGnbProfileAssetScore101 className="instance-node" />*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*    <div className="frame-wrapper">*/}
              {/*      <div className="frame-2">*/}
              {/*        <div className="pome">*/}
              {/*          {state === 'profile-hover' && <>Pome 통합 계정</>}*/}

              {/*          {state === 'profile-pressed' && (*/}
              {/*            <>*/}
              {/*              <div className="text-wrapper-2">Pome 통합 계정</div>*/}
              {/*              <div className="text-wrapper-3">김포메</div>*/}
              {/*              <div className="text-wrapper-3">*/}
              {/*                pome@blocksmith.xyz*/}
              {/*              </div>*/}
              {/*            </>*/}
              {/*          )}*/}
              {/*        </div>*/}
              {/*        <div className="i">*/}
              {/*          {state === 'profile-hover' && <>김포메</>}*/}
              {/*        </div>*/}
              {/*        <div className="pome-blocksmith-xyz">*/}
              {/*          {state === 'profile-hover' && <>pome@blocksmith.xyz</>}*/}

              {/*          {state === 'profile-pressed' && (*/}
              {/*            <>*/}
              {/*              <div className="dropdown-option">*/}
              {/*                <div className="dropdown-option-i">Setting</div>*/}
              {/*              </div>*/}
              {/*              <div className="dropdown-option">*/}
              {/*                <div className="dropdown-option-i">Logout</div>*/}
              {/*              </div>*/}
              {/*            </>*/}
              {/*          )}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </>*/}
              {/*)}*/}
            </div>
          )}

          {page === 'console-login-page' && (
            <img className="logo-frame" alt="Logo frame" src="logo-frame.svg" />
          )}

          {page === 'common-login-page' && (
            <div className="group-wrapper">
              <div className="group">
                <img className="vector" alt="Vector" src="vector-33.svg" />
                <div className="group-2">
                  <img className="img" alt="Vector" src="vector-34.svg" />
                  <img className="vector-2" alt="Vector" src="vector-35.svg" />
                  <img className="vector-3" alt="Vector" src="vector-36.svg" />
                  <img className="vector-4" alt="Vector" src="vector-37.svg" />
                  <img className="vector-5" alt="Vector" src="vector-38.svg" />
                  <img className="vector-6" alt="Vector" src="vector-39.svg" />
                  <img className="vector-7" alt="Vector" src="vector-40.svg" />
                  <img className="union" alt="Union" src="union-5.svg" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {page === 'web-console-page' && (
        <>
          <img
            className="logo-frame-2"
            alt="Logo frame"
            src={
              state === 'default'
                ? 'image.svg'
                : state === 'scroll'
                ? 'logo-frame-2.svg'
                : state === 'profile-hover'
                ? 'logo-frame-3.svg'
                : state === 'profile-pressed'
                ? 'logo-frame-4.svg'
                : state === 'search-open'
                ? 'logo-frame-5.svg'
                : undefined
            }
          />
          <div className="frame-3">
            <div className="frame-4">
              <div className="GNB-search-icon">
                <div className="iconography-2">
                  {[
                    'default',
                    'profile-hover',
                    'profile-pressed',
                    'scroll',
                  ].includes(state) && <div className="group-3" />}

                  {state === 'search-open' && (
                    <>
                      <div className="only-icon-button">
                        <div className="div-wrapper">
                          <div className="group-4" />
                        </div>
                      </div>
                      <div className="search">Search</div>
                    </>
                  )}
                </div>
              </div>
              <div className="GNB-notification">
                <div className="div-wrapper">
                  <div className="group-5" />
                </div>
              </div>
              <GnbDocIcon />
            </div>
            <div className="GNB-developer">
              <div className="developer-account">
                <div className="frame-5">
                  <div className="developer">Developer platform2.0</div>
                  <div className="nickname">Nickname</div>
                </div>
                {/*<IconographyCaesarzkn className="iconography-caesarzkn-instance" />*/}
              </div>
              {['profile-hover', 'profile-pressed'].includes(state) && (
                <div className="frame-6">
                  <div className="frame-7">
                    <div className="frame-8">
                      <div className="text-wrapper-2">Pome Console 계정</div>
                      <div className="text-wrapper-3">ID : 149382014</div>
                    </div>
                    {state === 'profile-pressed' && (
                      <>
                        <div className="rectangle" />
                        <div className="frame-9">
                          <div className="dropdown-option">
                            <div className="dropdown-option-i">Setting</div>
                          </div>
                          <div className="dropdown-option">
                            <div className="dropdown-option-i">Logout</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gnb;

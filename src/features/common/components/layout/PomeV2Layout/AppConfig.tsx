import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch, InputSwitchChangeParams } from 'primereact/inputswitch';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputStyleType } from 'primereact/api';
import useTheme from '@/libs/baseCommon/hooks/useTheme';
import { LayoutColorModeType } from '@/libs/baseCommon/providers/ThemeProvider';
import { useRouter } from 'next/router';
import useFontScale from './useFontScale';

interface AppConfigProps {
  onColorModeChange: (mode: LayoutColorModeType) => void;
  onInputStyleChange: (value: InputStyleType) => void;
  /**
   * outlined/ filled
   */
  inputStyle?: InputStyleType;
  rippleEffect?: boolean;
  onRippleEffect?: (e: InputSwitchChangeParams) => void;
  onLayoutModeChange: (value: string) => void;
  /**
   * static
   */
  layoutMode?: string;
  layoutColorMode?: LayoutColorModeType;
}

export const AppConfig: FC<AppConfigProps> = (props) => {
  const router = useRouter();

  const { setSelectedTheme } = useTheme();
  const [active, setActive] = useState(false);
  // const [scale, setScale] = useState(14);
  // const [scales] = useState([12, 13, 14, 15, 16]);
  const config = useRef<HTMLDivElement | null>(null);
  const outsideClickListener = useRef<React.MouseEventHandler<HTMLButtonElement> | null>(
    null
  );

  const { scale, scales, decrementScale, incrementScale } = useFontScale();

  const unbindOutsideClickListener = useCallback(() => {
    if (outsideClickListener.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener('click', outsideClickListener.current);
      outsideClickListener.current = null;
    }
  }, []);

  const hideConfigurator: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setActive(false);
      unbindOutsideClickListener();
      event.preventDefault();
    },
    [unbindOutsideClickListener]
  );

  const bindOutsideClickListener = useCallback(() => {
    if (!outsideClickListener.current) {
      outsideClickListener.current = (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        if (active && isOutsideClicked(event)) {
          hideConfigurator(event);
        }
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.addEventListener('click', outsideClickListener.current);
    }
  }, [active, hideConfigurator]);

  useEffect(() => {
    if (active) {
      bindOutsideClickListener();
    } else {
      unbindOutsideClickListener();
    }
  }, [active, bindOutsideClickListener, unbindOutsideClickListener]);

  const isOutsideClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const target: Node = event.target;
    return !(
      config.current?.isSameNode(target) || config.current?.contains(target)
    );
  };

  // const decrementScale = () => {
  //   setScale((prevState) => --prevState);
  // };
  //
  // const incrementScale = () => {
  //   setScale((prevState) => ++prevState);
  // };

  // useEffect(() => {
  //   document.documentElement.style.fontSize = scale + 'px';
  // }, [scale]);

  const toggleConfigurator = () => {
    setActive((prevState) => !prevState);
  };

  const configClassName = classNames('layout-config', {
    'layout-config-active': active,
  });

  // const replaceLink = useCallback(
  //   (linkElement: HTMLElement | null, href: string) => {
  //     if (linkElement === null) {
  //       alert('linkElement가 없습니다.');
  //       return;
  //     }
  //     if (isIE()) {
  //       linkElement.setAttribute('href', href);
  //
  //       // if (callback) {
  //       //   callback();
  //       // }
  //     } else {
  //       const id = linkElement.getAttribute('id');
  //       const cloneLinkElement = linkElement.cloneNode(true) as HTMLElement;
  //
  //       if (id === null) {
  //         alert('id가 없습니다');
  //
  //         return;
  //       }
  //
  //       cloneLinkElement.setAttribute('href', href);
  //       cloneLinkElement.setAttribute('id', id + '-clone');
  //
  //       linkElement.parentNode?.insertBefore(
  //         cloneLinkElement,
  //         linkElement.nextSibling
  //       );
  //
  //       cloneLinkElement.addEventListener('load', () => {
  //         linkElement.remove();
  //         cloneLinkElement.setAttribute('id', id);
  //
  //         // if (callback) {
  //         //   callback();
  //         // }
  //       });
  //     }
  //   },
  //   []
  // );
  //
  // useEffect(() => {
  //   const themeElement = document.getElementById('theme-link');
  //   const themeHref = '/assets/themes/' + theme + '/theme.css';
  //   replaceLink(themeElement, themeHref);
  // }, [theme, replaceLink]);
  //
  // const isIE = () => {
  //   return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  // };

  const changeTheme = (
    _e: React.MouseEvent<HTMLButtonElement>,
    theme: string,
    scheme: LayoutColorModeType
  ) => {
    props.onColorModeChange(scheme);
    setSelectedTheme(theme);
  };

  if (router.query.guhyeon !== 'true') return null;

  return (
    <div ref={config} className={configClassName} id={'layout-config'}>
      <button
        className="layout-config-button p-link"
        id="layout-config-button"
        onClick={toggleConfigurator}
      >
        <i className="pi pi-cog"></i>
      </button>
      <Button
        className="p-button-danger layout-config-close p-button-rounded p-button-text"
        icon="pi pi-times"
        onClick={hideConfigurator}
      />

      <div className="layout-config-content">
        <h5 className="mt-0">Component Scale</h5>
        <div className="config-scale">
          <Button
            icon="pi pi-minus"
            onClick={decrementScale}
            className="p-button-text"
            disabled={scale === scales[0]}
          />
          {scales.map((item) => {
            return (
              <i
                className={classNames('pi pi-circle-on', {
                  'scale-active': item === scale,
                })}
                key={item}
              />
            );
          })}
          <Button
            icon="pi pi-plus"
            onClick={incrementScale}
            className="p-button-text"
            disabled={scale === scales[scales.length - 1]}
          />
        </div>

        <h5>Input Style</h5>
        <div className="p-formgroup-inline">
          <div className="field-radiobutton">
            <RadioButton
              inputId="input_outlined"
              name="inputstyle"
              value="outlined"
              onChange={(e) => props.onInputStyleChange(e.value)}
              checked={props.inputStyle === 'outlined'}
            />
            <label htmlFor="input_outlined">Outlined</label>
          </div>
          <div className="field-radiobutton">
            <RadioButton
              inputId="input_filled"
              name="inputstyle"
              value="filled"
              onChange={(e) => props.onInputStyleChange(e.value)}
              checked={props.inputStyle === 'filled'}
            />
            <label htmlFor="input_filled">Filled</label>
          </div>
        </div>

        <h5>Ripple Effect</h5>
        <InputSwitch
          checked={props.rippleEffect}
          onChange={props.onRippleEffect}
        />

        <h5>Menu Type</h5>
        <div className="p-formgroup-inline">
          <div className="field-radiobutton">
            <RadioButton
              inputId="static"
              name="layoutMode"
              value="static"
              onChange={(e) => props.onLayoutModeChange(e.value)}
              checked={props.layoutMode === 'static'}
            />
            <label htmlFor="static">Static</label>
          </div>
          <div className="field-radiobutton">
            <RadioButton
              inputId="overlay"
              name="layoutMode"
              value="overlay"
              onChange={(e) => props.onLayoutModeChange(e.value)}
              checked={props.layoutMode === 'overlay'}
            />
            <label htmlFor="overlay">Overlay</label>
          </div>
        </div>

        <h5>Themes</h5>
        <h6 className="mt-0">Bootstrap</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                changeTheme(e, 'bootstrap4-light-blue', 'light');
              }}
            >
              <img
                src="/assets/layout/images/Default/themes/bootstrap4-light-blue.svg"
                alt="Bootstrap Light Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) =>
                changeTheme(e, 'bootstrap4-light-purple', 'light')
              }
            >
              <img
                src="/assets/layout/images/Default/themes/bootstrap4-light-purple.svg"
                alt="Bootstrap Light Purple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'bootstrap4-dark-blue', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/bootstrap4-dark-blue.svg"
                alt="Bootstrap Dark Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'bootstrap4-dark-purple', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/bootstrap4-dark-purple.svg"
                alt="Bootstrap Dark Purple"
              />
            </button>
          </div>
        </div>

        <h6>Material Design</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'md-light-indigo', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-light-indigo.svg"
                alt="Material Light Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'md-light-deeppurple', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-light-deeppurple.svg"
                alt="Material Light DeepPurple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'md-dark-indigo', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-dark-indigo.svg"
                alt="Material Dark Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'md-dark-deeppurple', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-dark-deeppurple.svg"
                alt="Material Dark DeepPurple"
              />
            </button>
          </div>
        </div>

        <h6>Material Design Compact</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'mdc-light-indigo', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-light-indigo.svg"
                alt="Material Light Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'mdc-light-deeppurple', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-light-deeppurple.svg"
                alt="Material Light DeepPurple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'mdc-dark-indigo', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-dark-indigo.svg"
                alt="Material Dark Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'mdc-dark-deeppurple', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/md-dark-deeppurple.svg"
                alt="Material Dark DeepPurple"
              />
            </button>
          </div>
        </div>

        <h6>Tailwind</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'tailwind-light', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/tailwind-light.png"
                alt="Tailwind Light"
              />
            </button>
          </div>
        </div>

        <h6>Fluent UI</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'fluent-light', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/fluent-light.png"
                alt="Fluent Light"
              />
            </button>
          </div>
        </div>

        <h6>PrimeOne Design - 2022</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-light-indigo', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-light-indigo.png"
                alt="Lara Light Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-light-blue', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-light-blue.png"
                alt="Lara Light Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-light-purple', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-light-purple.png"
                alt="Lara Light Purple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-light-teal', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-light-teal.png"
                alt="Lara Light Teal"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-dark-indigo', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-dark-indigo.png"
                alt="Lara Dark Indigo"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-dark-blue', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-dark-blue.png"
                alt="Lara Dark Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-dark-purple', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-dark-purple.png"
                alt="Lara Dark Purple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'lara-dark-teal', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/lara-dark-teal.png"
                alt="Lara Dark Teal"
              />
            </button>
          </div>
        </div>

        <h6>PrimeOne Design - 2021</h6>
        <div className="grid free-themes">
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'saga-blue', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/saga-blue.png"
                alt="Saga Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'saga-green', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/saga-green.png"
                alt="Saga Green"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'saga-orange', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/saga-orange.png"
                alt="Saga Orange"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'saga-purple', 'light')}
            >
              <img
                src="/assets/layout/images/Default/themes/saga-purple.png"
                alt="Saga Purple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'vela-blue', 'dim')}
            >
              <img
                src="/assets/layout/images/Default/themes/vela-blue.png"
                alt="Vela Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'vela-green', 'dim')}
            >
              <img
                src="/assets/layout/images/Default/themes/vela-green.png"
                alt="Vela Green"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'vela-orange', 'dim')}
            >
              <img
                src="/assets/layout/images/Default/themes/vela-orange.png"
                alt="Vela Orange"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'vela-purple', 'dim')}
            >
              <img
                src="/assets/layout/images/Default/themes/vela-purple.png"
                alt="Vela Purple"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'arya-blue', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/arya-blue.png"
                alt="Arya Blue"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'arya-green', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/arya-green.png"
                alt="Arya Green"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'arya-orange', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/arya-orange.png"
                alt="Arya Orange"
              />
            </button>
          </div>
          <div className="col-3 text-center">
            <button
              className="p-link"
              onClick={(e) => changeTheme(e, 'arya-purple', 'dark')}
            >
              <img
                src="/assets/layout/images/Default/themes/arya-purple.png"
                alt="Arya Purple"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { AppMenuItem } from '../../../../../config/menu';
import NavLink from '../../baseCommon/NavLink';
import { LayoutColorModeType } from '@/libs/baseCommon/providers/ThemeProvider';

interface AppSubmenuItem {
  badgeStyleClass?: string;
  to?: string;
  url?: string;
  label?: string;
  items?: AppSubmenuItem[];
}

interface AppSubmenuProps {
  className?: string;
  root?: boolean;
  items?: AppSubmenuItem[];
  onMenuItemClick?: onMenuItemClickType;
}

const AppSubmenu: FC<AppSubmenuProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: AppMenuItem,
    index: number
  ) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item,
      });
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      // TODO 확인 필요
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.target.click();
    }
  };

  const renderLinkContent = (item: AppMenuItem) => {
    const submenuIcon = item.items && (
      <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />
    );
    const badge = item.badge && <Badge value={item.badge} />;

    return (
      <React.Fragment>
        <i className={item.icon} />
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
        <Ripple />
      </React.Fragment>
    );
  };

  const renderLink = (item: AppMenuItem, i: number) => {
    const content = renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink
          aria-label={item.label}
          onKeyDown={onKeyDown}
          role="menuitem"
          className="p-ripple"
          activeClassName="router-link-active router-link-exact-active"
          href={item.to}
          onClick={(e) => onMenuItemClick(e, item, i)}
          exact
          target={item.target}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        <a
          tabIndex={0}
          aria-label={item.label}
          onKeyDown={onKeyDown}
          role="menuitem"
          href={item.url}
          className="p-ripple"
          onClick={(e) => onMenuItemClick(e, item, i)}
          target={item.target}
        >
          {content}
        </a>
      );
    }
  };

  const items =
    props.items &&
    props.items.map((item, i) => {
      const active = activeIndex === i;
      const styleClass = classNames(item.badgeStyleClass, {
        'layout-menuitem-category': props.root,
        'active-menuitem': active && !item.to,
      });

      if (props.root) {
        return (
          <li className={styleClass} key={i} role="none">
            {props.root && (
              <React.Fragment>
                <div
                  className="layout-menuitem-root-text"
                  aria-label={item.label}
                >
                  {item.label}
                </div>
                <AppSubmenu
                  items={item.items}
                  onMenuItemClick={props.onMenuItemClick}
                />
              </React.Fragment>
            )}
          </li>
        );
      } else {
        return (
          <li className={styleClass} key={i} role="none">
            {renderLink(item, i)}
            <CSSTransition
              classNames="layout-submenu-wrapper"
              timeout={{ enter: 1000, exit: 450 }}
              in={active}
              unmountOnExit
            >
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
              />
            </CSSTransition>
          </li>
        );
      }
    });

  return items ? (
    <ul className={props.className} role="menu">
      {items}
    </ul>
  ) : null;
};

export type onMenuItemClickEvent = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  item: AppMenuItem;
};

export type onMenuItemClickType = (event: onMenuItemClickEvent) => void;

export interface AppMenuProps {
  onMenuItemClick: onMenuItemClickType;
  model?: AppMenuItem[];
  layoutColorMode?: LayoutColorModeType;
}

export const AppMenu: FC<AppMenuProps> = (props) => {
  return (
    <div className="layout-menu-container">
      <AppSubmenu
        items={props.model}
        className="layout-menu"
        onMenuItemClick={props.onMenuItemClick}
        root={true}
        // role="menu"
      />
      <a
        href="https://www.primefaces.org/primeblocks-react"
        className="block mt-3"
      >
        <img
          alt="primeblocks"
          className="w-full"
          src={
            props.layoutColorMode === 'light'
              ? '/assets/layout/images/Default/banner-primeblocks.png'
              : '/assets/layout/images/Default/banner-primeblocks-dark.png'
          }
        />
      </a>
    </div>
  );
};

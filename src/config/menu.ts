import React, { ReactElement } from 'react';
import CSS from 'csstype';

/**
 * pathname으로 menu를 찾습니다.
 * @param data
 * @param key
 */
export const findMenuItem = ({
  data,
  pathname,
}: {
  data?: AppMenuItem[];
  pathname: string;
}) => {
  if (data === undefined) return;
  for (let i = 0; i < data.length; i++) {
    if (data[i].to === pathname) {
      return data[i];
    }
    const result = findMenuItem({
      data: data[i].items,
      pathname,
    }) as AppMenuItem;
    if (result) {
      return result;
    }
  }
};

export const menu: AppMenuItem[] = [
  {
    label: 'Home',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/sample/',
      },
    ],
  },
  {
    label: 'Auth',
    items: [
      {
        label: 'UserInfo',
        icon: 'pi pi-fw pi-home',
        to: '/sample/auth/user-info',
      },
      {
        label: 'UserInfoWithoutLogin',
        icon: 'pi pi-fw pi-home',
        to: '/sample/auth/user-info-no-redirect',
      },
      {
        label: 'Private Data Fetch',
        icon: 'pi pi-fw pi-home',
        to: '/sample/auth/private-data',
      },
    ],
  },
  {
    label: 'Pome Common',
    icon: 'pi pi-fw pi-sitemap',
    items: [
      {
        label: 'Buttons',
        icon: 'pi pi-fw pi-book',
        to: '/common/buttons',
      },
      {
        label: 'DataTable',
        icon: 'pi pi-fw pi-book',
        to: '/common/datatable',
      },
      {
        label: 'Paginator',
        icon: 'pi pi-fw pi-book',
        to: '/common/paginator',
      },
      {
        label: 'Tags',
        icon: 'pi pi-fw pi-book',
        to: '/common/tags',
      },
      {
        label: 'Tabs',
        icon: 'pi pi-fw pi-book',
        to: '/common/tabs',
      },
      {
        label: 'Accordion',
        icon: 'pi pi-fw pi-book',
        to: '/common/accordion',
      },
      {
        label: 'Input',
        icon: 'pi pi-fw pi-book',
        to: '/common/input',
      },
      {
        label: 'Layout',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Gnb',
            icon: 'pi pi-fw pi-id-card',
            to: '/common/layout/gnb',
          },
          {
            label: 'Layout_landing',
            icon: 'pi pi-fw pi-id-card',
            to: '/common/layout/layout_landing',
          },
          {
            label: 'Layout_console',
            icon: 'pi pi-fw pi-id-card',
            to: '/common/layout/layout_console',
          },
        ],
      },
    ],
  },
  {
    label: 'UI Components',
    icon: 'pi pi-fw pi-sitemap',
    items: [
      {
        label: 'Form Layout',
        icon: 'pi pi-fw pi-id-card',
        to: '/sample/formlayout',
      },
      { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/sample/input' },
      {
        label: 'Float Label',
        icon: 'pi pi-fw pi-bookmark',
        to: '/sample/floatlabel',
      },
      {
        label: 'Invalid State',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/sample/invalidstate',
      },
      { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/sample/button' },
      { label: 'Table', icon: 'pi pi-fw pi-table', to: '/sample/table' },
      { label: 'List', icon: 'pi pi-fw pi-list', to: '/sample/list' },
      { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/sample/tree' },
      { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/sample/panel' },
      { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/sample/overlay' },
      { label: 'Media', icon: 'pi pi-fw pi-image', to: '/sample/media' },
      { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/sample/menu' },
      { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/sample/messages' },
      { label: 'File', icon: 'pi pi-fw pi-file', to: '/sample/file' },
      { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/sample/chart' },
      { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/sample/misc' },
    ],
  },
  {
    label: 'UI Blocks',
    items: [
      {
        label: 'Free Blocks',
        icon: 'pi pi-fw pi-eye',
        to: '/sample/blocks',
        badge: 'NEW',
      },
      {
        label: 'All Blocks',
        icon: 'pi pi-fw pi-globe',
        url: 'https://www.primefaces.org/primeblocks-react',
      },
    ],
  },
  {
    label: 'Icons',
    items: [
      { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/sample/icons' },
    ],
  },
  {
    label: 'Biz',
    icon: 'pi pi-fw pi-clone',
    items: [
      {
        label: 'Board',
        icon: 'pi pi-fw pi-user-edit',
        to: '/sample/biz/board',
      },
    ],
  },
  {
    label: 'Web3',
    icon: 'pi pi-fw pi-clone',
    items: [
      {
        label: 'Storage',
        icon: 'pi pi-fw pi-circle-off',
        to: '/sample/web3/storage',
      },
      { label: 'NFT', icon: 'pi pi-fw pi-user-edit', to: '/sample/web3/nft' },
      {
        label: 'Wallet & Network',
        icon: 'pi pi-fw pi-user-edit',
        to: '/sample/web3/wallet',
      },
    ],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-clone',
    items: [
      { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/sample/crud' },
      {
        label: 'Timeline',
        icon: 'pi pi-fw pi-calendar',
        to: '/sample/timeline',
      },
      { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/sample/empty' },
    ],
  },
  {
    label: 'Menu Hierarchy',
    icon: 'pi pi-fw pi-search',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
        ],
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Get Started',
    items: [
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-question',
        command: () => {
          window.location.assign('https://www.primefaces.org/primereact/setup');
        },
      },
      {
        label: 'View Source',
        icon: 'pi pi-fw pi-search',
        command: () => {
          window.location.assign(
            'https://bitbucket.org/blocksmithdevelopment/base-template/src/69213113cc3e65bf4077a5fc0907a05fe29533c6/?at=release%2Fbare'
          );
        },
      },
    ],
  },
];

/**
 * SmithUiComponent MenuItem type
 */
export interface MenuItem {
  /**
   * Text of the item.
   */
  label?: string;
  /**
   * Icon of the item.
   */
  icon?: string;
  /**
   * Callback to execute when item is clicked.
   */
  command?: (event: {
    originalEvent: React.MouseEvent<
      HTMLAnchorElement | HTMLButtonElement,
      MouseEvent
    >;
    item: MenuItem;
  }) => void;
  /**
   * External link to navigate when item is clicked.
   */
  url?: string;
  /**
   * An array of children menuitems.
   */
  items?: MenuItem[];
  /**
   * Visibility of submenu. default false
   */
  expanded?: boolean;
  /**
   * When set as true, disables the menuitem. default false
   */
  disabled?: boolean;
  /**
   * Specifies where to open the linked document.
   */
  target?: string;
  /**
   * Defines the item as a separator. default false
   */
  separator?: boolean;
  /**
   * Inline style of the menuitem.
   */
  style?: CSS.Properties;
  /**
   * Style class of the menuitem.
   */
  className?: string;
  /**
   * Template of the menuitem.
   * @param item
   * @param options
   */
  template?: (
    /**
     * Current item object.
     */
    item: MenuItem,
    options: {
      /**
       *  Click event for the default element.
       */
      onClick?: () => void;
      /**
       * Style class of the default element.
       */
      className?: string;
      /**
       * Style class of the default label element.
       */
      labelClassName?: string;
      /**
       * Style class of the default icon element.
       */
      iconClassName?: string;
      /**
       * Default element created by the component.
       */
      element?: ReactElement;
      /**
       * component props.
       */
      props?: any;
    }
  ) => ReactElement;
}

export interface AppMenuItem extends MenuItem {
  items?: AppMenuItem[];
  badgeStyleClass?: string;
  badge?: string;
  to?: string;
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Steps } from 'primereact/steps';
import { TabMenu } from 'primereact/tabmenu';
import { TieredMenu } from 'primereact/tieredmenu';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { ContextMenu } from 'primereact/contextmenu';
import { MegaMenu } from 'primereact/megamenu';
import { PanelMenu } from 'primereact/panelmenu';
import { PersonalDemo } from './menu/PersonalDemo';
import { ConfirmationDemo } from './menu/ConfirmationDemo';
import { PaymentDemo } from './menu/PaymentDemo';
import { SeatDemo } from './menu/SeatDemo';
import { useRouter } from 'next/router';

const MenuDemo = () => {
  const router = useRouter();

  const { subpage } = router.query;

  const [activeIndex, setActiveIndex] = useState(0);

  const menu = useRef<Menu>(null);
  const contextMenu = useRef<ContextMenu>(null);

  const checkActiveIndex = useCallback(() => {
    switch (subpage) {
      case 'seat':
        setActiveIndex(1);
        break;
      case 'payment':
        setActiveIndex(2);
        break;
      case 'confirmation':
        setActiveIndex(3);
        break;
      default:
        break;
    }
  }, [subpage]);

  useEffect(() => {
    checkActiveIndex();
  }, [checkActiveIndex]);

  const nestedMenuitems = [
    {
      label: 'Customers',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',
          items: [
            {
              label: 'Customer',
              icon: 'pi pi-fw pi-plus',
            },
            {
              label: 'Duplicate',
              icon: 'pi pi-fw pi-copy',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-user-edit',
        },
      ],
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'View',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
        },
      ],
    },
    {
      label: 'Shipments',
      icon: 'pi pi-fw pi-envelope',
      items: [
        {
          label: 'Tracker',
          icon: 'pi pi-fw pi-compass',
        },
        {
          label: 'Map',
          icon: 'pi pi-fw pi-map-marker',
        },
        {
          label: 'Manage',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
        },
        {
          label: 'Billing',
          icon: 'pi pi-fw pi-file',
        },
      ],
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-sign-out',
    },
  ];

  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'Computer' },
    { label: 'Notebook' },
    { label: 'Accessories' },
    { label: 'Backpacks' },
    { label: 'Item' },
  ];

  const wizardItems = [
    {
      label: 'Personal',
      // nextjs 에서는 스크롤이 자동으로 복구되는데, 이걸 막으려면 scroll :false를 주면됩니다.
      command: () => router.push('/sample/menu', undefined, { scroll: false }),
    },
    {
      label: 'Seat',
      command: () =>
        router.push('/sample/menu/seat', undefined, { scroll: false }),
    },
    {
      label: 'Payment',
      command: () =>
        router.push('/sample/menu/payment', undefined, { scroll: false }),
    },
    {
      label: 'Confirmation',
      command: () =>
        router.push('/sample/menu/confirmation', undefined, { scroll: false }),
    },
  ];

  const tieredMenuItems = [
    {
      label: 'Customers',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',
          items: [
            {
              label: 'Customer',
              icon: 'pi pi-fw pi-plus',
            },
            {
              label: 'Duplicate',
              icon: 'pi pi-fw pi-copy',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-user-edit',
        },
      ],
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'View',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
        },
      ],
    },
    {
      label: 'Shipments',
      icon: 'pi pi-fw pi-envelope',
      items: [
        {
          label: 'Tracker',
          icon: 'pi pi-fw pi-compass',
        },
        {
          label: 'Map',
          icon: 'pi pi-fw pi-map-marker',
        },
        {
          label: 'Manage',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
        },
        {
          label: 'Billing',
          icon: 'pi pi-fw pi-file',
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-sign-out',
    },
  ];

  const overlayMenuItems = [
    {
      label: 'Save',
      icon: 'pi pi-save',
    },
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
    {
      separator: true,
    },
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
  ];

  const menuitems = [
    {
      label: 'Customers',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-user-edit',
        },
      ],
    },
    {
      label: 'Orders',
      items: [
        {
          label: 'View',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
        },
      ],
    },
  ];

  const contextMenuItems = [
    {
      label: 'Save',
      icon: 'pi pi-save',
    },
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
    {
      separator: true,
    },
    {
      label: 'Options',
      icon: 'pi pi-cog',
    },
  ];

  const megamenuItems = [
    {
      label: 'Fashion',
      icon: 'pi pi-fw pi-tag',
      items: [
        [
          {
            label: 'Woman',
            items: [
              { label: 'Woman Item' },
              { label: 'Woman Item' },
              { label: 'Woman Item' },
            ],
          },
          {
            label: 'Men',
            items: [
              { label: 'Men Item' },
              { label: 'Men Item' },
              { label: 'Men Item' },
            ],
          },
        ],
        [
          {
            label: 'Kids',
            items: [{ label: 'Kids Item' }, { label: 'Kids Item' }],
          },
          {
            label: 'Luggage',
            items: [
              { label: 'Luggage Item' },
              { label: 'Luggage Item' },
              { label: 'Luggage Item' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Electronics',
      icon: 'pi pi-fw pi-desktop',
      items: [
        [
          {
            label: 'Computer',
            items: [{ label: 'Computer Item' }, { label: 'Computer Item' }],
          },
          {
            label: 'Camcorder',
            items: [
              { label: 'Camcorder Item' },
              { label: 'Camcorder Item' },
              { label: 'Camcorder Item' },
            ],
          },
        ],
        [
          {
            label: 'TV',
            items: [{ label: 'TV Item' }, { label: 'TV Item' }],
          },
          {
            label: 'Audio',
            items: [
              { label: 'Audio Item' },
              { label: 'Audio Item' },
              { label: 'Audio Item' },
            ],
          },
        ],
        [
          {
            label: 'Sports.7',
            items: [{ label: 'Sports.7.1' }, { label: 'Sports.7.2' }],
          },
        ],
      ],
    },
    {
      label: 'Furniture',
      icon: 'pi pi-fw pi-image',
      items: [
        [
          {
            label: 'Living Room',
            items: [
              { label: 'Living Room Item' },
              { label: 'Living Room Item' },
            ],
          },
          {
            label: 'Kitchen',
            items: [
              { label: 'Kitchen Item' },
              { label: 'Kitchen Item' },
              { label: 'Kitchen Item' },
            ],
          },
        ],
        [
          {
            label: 'Bedroom',
            items: [{ label: 'Bedroom Item' }, { label: 'Bedroom Item' }],
          },
          {
            label: 'Outdoor',
            items: [
              { label: 'Outdoor Item' },
              { label: 'Outdoor Item' },
              { label: 'Outdoor Item' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Sports',
      icon: 'pi pi-fw pi-star',
      items: [
        [
          {
            label: 'Basketball',
            items: [{ label: 'Basketball Item' }, { label: 'Basketball Item' }],
          },
          {
            label: 'Football',
            items: [
              { label: 'Football Item' },
              { label: 'Football Item' },
              { label: 'Football Item' },
            ],
          },
        ],
        [
          {
            label: 'Tennis',
            items: [{ label: 'Tennis Item' }, { label: 'Tennis Item' }],
          },
        ],
      ],
    },
  ];

  const panelMenuitems = [
    {
      label: 'Customers',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',
          items: [
            {
              label: 'Customer',
              icon: 'pi pi-fw pi-plus',
            },
            {
              label: 'Duplicate',
              icon: 'pi pi-fw pi-copy',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-user-edit',
        },
      ],
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'View',
          icon: 'pi pi-fw pi-list',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-search',
        },
      ],
    },
    {
      label: 'Shipments',
      icon: 'pi pi-fw pi-envelope',
      items: [
        {
          label: 'Tracker',
          icon: 'pi pi-fw pi-compass',
        },
        {
          label: 'Map',
          icon: 'pi pi-fw pi-map-marker',
        },
        {
          label: 'Manage',
          icon: 'pi pi-fw pi-pencil',
        },
      ],
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
        },
        {
          label: 'Billing',
          icon: 'pi pi-fw pi-file',
        },
      ],
    },
  ];

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    menu.current?.toggle(event);
  };

  const onContextRightClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    contextMenu.current?.show(event);
  };

  const menubarEndTemplate = () => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="text" placeholder="Search" />
      </span>
    );
  };

  function renderSubPage() {
    switch (subpage) {
      case 'confirmation': {
        return <ConfirmationDemo />;
      }
      case 'payment': {
        return <PaymentDemo />;
      }
      case 'seat': {
        return <SeatDemo />;
      }

      default: {
        return <PersonalDemo />;
      }
    }
  }

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <div className="card card-w-title">
          <h5>Menubar</h5>
          <Menubar model={nestedMenuitems} end={menubarEndTemplate} />
        </div>
      </div>

      <div className="col-12">
        <div className="card card-w-title">
          <h5>Breadcrumb</h5>
          <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card card-w-title">
          <h5>Steps</h5>
          <Steps
            model={wizardItems}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly={false}
          />
          {renderSubPage()}
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card card-w-title">
          <h5>TabMenu</h5>
          <TabMenu
            model={wizardItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
          {renderSubPage()}
        </div>
      </div>

      <div className="col-12 md:col-4">
        <div className="card">
          <h5>Tiered Menu</h5>
          <TieredMenu model={tieredMenuItems} />
        </div>
      </div>

      <div className="col-12 md:col-4">
        <div className="card">
          <h5>Plain Menu</h5>
          <Menu model={menuitems} />
        </div>
      </div>

      <div className="col-12 md:col-4">
        <div className="card">
          <h5>Overlay Menu</h5>

          <Menu ref={menu} model={overlayMenuItems} popup />
          <Button
            type="button"
            label="Options"
            icon="pi pi-angle-down"
            onClick={toggleMenu}
            style={{ width: 'auto' }}
          />
        </div>

        <div className="card" onContextMenu={onContextRightClick}>
          <h5>ContextMenu</h5>
          Right click to display.
          <ContextMenu ref={contextMenu} model={contextMenuItems} />
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card">
          <h5>MegaMenu - Horizontal</h5>
          <MegaMenu model={megamenuItems} />

          <h5 style={{ marginTop: '1.55em' }}>MegaMenu - Vertical</h5>
          <MegaMenu model={megamenuItems} orientation="vertical" />
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="card">
          <h5>PanelMenu</h5>
          <PanelMenu model={panelMenuitems} />
        </div>
      </div>
    </div>
  );
};

export default MenuDemo;

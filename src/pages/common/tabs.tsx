import React, { useState } from 'react';
import { Button } from 'primereact/button';
import Tabs from '@/features/common/components/common/Tabs';
import { MenuItem } from 'primereact/menuitem';
import { Card } from 'primereact/card';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

const Page: PageComponent = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  const items: MenuItem[] = [{ label: '탭 메뉴' }, { label: 'Calendar' }];

  return (
    <Card title={'Tabs'}>
      <div>
        <div className="card">
          <div className="grid">
            <div className="col-6">
              <h5>UnderLine</h5>
              <Tabs type={'underline'} model={items} size={24} />
              <Tabs type={'underline'} model={items} size={18} />
              <Tabs type={'underline'} model={items} size={14} />
            </div>
            <div className="col-6">
              <h5>Solid</h5>
              <Tabs type={'solid'} model={items} size={24} />
              <Tabs type={'solid'} model={items} size={18} className={'mt-1'} />
              <Tabs type={'solid'} model={items} size={14} className={'mt-1'} />
            </div>
          </div>
        </div>

        <div className="card">
          <h5>Programmatic</h5>
          <div className="pt-2 pb-4">
            <Button
              onClick={() => setActiveIndex(0)}
              className="p-button-text"
              label="Activate 1st"
            />
            <Button
              onClick={() => setActiveIndex(1)}
              className="p-button-text"
              label="Activate 2nd"
            />
            <Button
              onClick={() => setActiveIndex(2)}
              className="p-button-text"
              label="Activate 3rd"
            />
          </div>

          <Tabs
            type={'underline'}
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
        </div>
      </div>
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

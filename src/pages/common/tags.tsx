import { Card } from 'primereact/card';
import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';
import { SignTag } from '@/features/common/components/common/Tag/SignTag';
import { StatusTag } from '@/features/common/components/common/Tag/StatusTag';
import { AuthorityTag } from '@/features/common/components/common/Tag/AuthorityTag';
import { HoldingTokenTag } from '@/features/common/components/common/Tag/HoldingTokenTag';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import Layout from '@/features/common/components/layout/PomeV2Layout';
const Page: PageComponent = () => {
  return (
    <Card title={'Tag'}>
      <Card title={'BasicTag'}>
        <div className="flex flex-row gap-5">
          <div className={'flex flex-row gap-2'}>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-l-gray-line-on"
                color="l-gray"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-VL-line-on"
                color="l-VL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-RD-line-on"
                color="l-RD"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-YL-line-on"
                color="l-YL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-GR-line-on"
                color="l-GR"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-NV-line-on"
                color="l-NV"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-BL-line-on"
                color="l-BL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl2"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl3"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PP-line-on"
                color="l-PP"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PK-line-on"
                color="l-PK"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-OR-line-on"
                color="l-OR"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-VL-line-on"
                color="VL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-RD-line-off"
                color="RD"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-YL-line-off"
                color="YL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-GR-line-off"
                color="GR"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-NV-line-off"
                color="NV"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-BL-line-off"
                color="BL"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl2"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl3"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PP-line-off"
                color="PP"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PK-line-off"
                color="PK"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-OR-line-off"
                color="OR"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-error-line-off"
                color="error"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-success-line"
                color="success"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-warning-line"
                color="warning"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-info-line-off"
                color="info"
                line="on"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
          </div>
          <div className={'flex flex-row gap-2'}>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-l-gray-line-on"
                color="l-gray"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-VL-line-on"
                color="l-VL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-RD-line-on"
                color="l-RD"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-YL-line-on"
                color="l-YL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-GR-line-on"
                color="l-GR"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-NV-line-on"
                color="l-NV"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-BL-line-on"
                color="l-BL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl2"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl3"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PP-line-on"
                color="l-PP"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PK-line-on"
                color="l-PK"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-OR-line-on"
                color="l-OR"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-VL-line-on"
                color="VL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-RD-line-off"
                color="RD"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-YL-line-off"
                color="YL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-GR-line-off"
                color="GR"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-NV-line-off"
                color="NV"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-BL-line-off"
                color="BL"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl2"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl3"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PP-line-off"
                color="PP"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PK-line-off"
                color="PK"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-OR-line-off"
                color="OR"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-error-line-off"
                color="error"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-success-line"
                color="success"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-warning-line"
                color="warning"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-info-line-off"
                color="info"
                line="on"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
          </div>
          <div className={'flex flex-row gap-2'}>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-l-gray-line-on"
                color="l-gray"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-VL-line-on"
                color="l-VL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-RD-line-on"
                color="l-RD"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-YL-line-on"
                color="l-YL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-GR-line-on"
                color="l-GR"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-NV-line-on"
                color="l-NV"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-BL-line-on"
                color="l-BL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl2"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl3"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PP-line-on"
                color="l-PP"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PK-line-on"
                color="l-PK"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-OR-line-on"
                color="l-OR"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-VL-line-on"
                color="VL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-RD-line-off"
                color="RD"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-YL-line-off"
                color="YL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-GR-line-off"
                color="GR"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-NV-line-off"
                color="NV"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-BL-line-off"
                color="BL"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl2"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl3"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PP-line-off"
                color="PP"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PK-line-off"
                color="PK"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-OR-line-off"
                color="OR"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-error-line-off"
                color="error"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-success-line"
                color="success"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-warning-line"
                color="warning"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-info-line-off"
                color="info"
                line="off"
                styleClass="round"
              >
                Label
              </BasicTag>
            </div>
          </div>

          <div className={'flex flex-row gap-2'}>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-l-gray-line-on"
                color="l-gray"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-VL-line-on"
                color="l-VL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-RD-line-on"
                color="l-RD"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-YL-line-on"
                color="l-YL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-GR-line-on"
                color="l-GR"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-NV-line-on"
                color="l-NV"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-BL-line-on"
                color="l-BL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl2"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-line-on"
                color="l-bl3"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PP-line-on"
                color="l-PP"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-PK-line-on"
                color="l-PK"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-l-OR-line-on"
                color="l-OR"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-VL-line-on"
                color="VL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-RD-line-off"
                color="RD"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-YL-line-off"
                color="YL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-GR-line-off"
                color="GR"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-NV-line-off"
                color="NV"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-BL-line-off"
                color="BL"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl2"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-line-off"
                color="bl3"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PP-line-off"
                color="PP"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-PK-line-off"
                color="PK"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-OR-line-off"
                color="OR"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
            <div className={'flex flex-column gap-1'}>
              <BasicTag
                className="color-error-line-off"
                color="error"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-success-line"
                color="success"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-warning-line"
                color="warning"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
              <BasicTag
                className="color-info-line-off"
                color="info"
                line="off"
                styleClass="square"
              >
                Label
              </BasicTag>
            </div>
          </div>
        </div>
      </Card>

      <div className={'grid'}>
        <Card title={'Sign Tag'} className={'col-3'}>
          <div className={'flex flex-column gap-2'}>
            <SignTag state={'auto'} />
            <SignTag state={'manual'} />
          </div>
        </Card>
        <Card title={'Status tag'} className={'col-3'}>
          <div className={'flex flex-column gap-2'}>
            <StatusTag state={'fail'} />
            <StatusTag state={'success'} />
            <StatusTag state={'pending'} />
          </div>
        </Card>

        <Card title={'Authority tag'} className={'col-3'}>
          <div className={'flex flex-column gap-2'}>
            <AuthorityTag state={'OWNER'} />
            <AuthorityTag state={'ADMIN'} />
            <AuthorityTag state={'DEVELOPER'} />
          </div>
        </Card>

        <Card title={'Holding token tag'} className={'col-3'}>
          <div className={'flex flex-column gap-2'}>
            <HoldingTokenTag token={3} />
          </div>
        </Card>
      </div>
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

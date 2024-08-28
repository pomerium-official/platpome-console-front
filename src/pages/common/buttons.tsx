import { Card } from 'primereact/card';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import { TextButton } from '@/features/common/components/common/Button/TextButton';
import { GnbMenuButton } from '@/features/common/components/common/Button/GnbMenuButton';
import { OnlyTextButton } from '@/features/common/components/common/Button/OnlyTextButton';
import { OnlyIconButton } from '@/features/common/components/common/Button/OnlyIconButton';
import { MyIcons } from '@/features/common/components/common/MyIcons';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from '@/features/common/components/common/Button/RadioButton';
import { Checkbox } from '@/features/common/components/common/Checkbox';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import { PageComponent } from '@/types/baseCommon/LayoutTypes';

const Page: PageComponent = () => {
  return (
    <Card title="Buttons">
      <Card title={'SolidButton'}>
        <div className={'flex flex-column gap-5'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <SolidButton size="xlarge" styleType="color">
                X large 버튼
              </SolidButton>
              <SolidButton size="xlarge" styleType="color" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
            <div className={'flex gap-2'}>
              <SolidButton size="xlarge" styleType="neutral">
                X large 버튼
              </SolidButton>
              <SolidButton size="xlarge" styleType="neutral" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <SolidButton size="large" styleType="color">
                large 버튼
              </SolidButton>
              <SolidButton size="large" styleType="color" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
            <div className={'flex gap-2'}>
              <SolidButton size="large" styleType="neutral">
                large 버튼
              </SolidButton>
              <SolidButton size="large" styleType="neutral" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <SolidButton size="medium" styleType="color">
                medium 버튼
              </SolidButton>
              <SolidButton size="medium" styleType="color" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
            <div className={'flex gap-2'}>
              <SolidButton size="medium" styleType="neutral">
                medium 버튼
              </SolidButton>
              <SolidButton size="medium" styleType="neutral" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <SolidButton size="small" styleType="color">
                small 버튼
              </SolidButton>
              <SolidButton size="small" styleType="color" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
            <div className={'flex gap-2'}>
              <SolidButton size="small" styleType="neutral">
                small 버튼
              </SolidButton>
              <SolidButton size="small" styleType="neutral" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <SolidButton size="xsmall" styleType="color">
                xsmall 버튼
              </SolidButton>
              <SolidButton size="xsmall" styleType="color" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
            <div className={'flex gap-2'}>
              <SolidButton size="xsmall" styleType="neutral">
                xsmall 버튼
              </SolidButton>
              <SolidButton size="xsmall" styleType="neutral" disabled>
                Disabled 버튼
              </SolidButton>
            </div>
          </div>
        </div>
      </Card>
      <Card title={'LineButton'}>
        <div className={'flex flex-column gap-5'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <LineButton size="xlarge" styleType="color">
                X large 버튼
              </LineButton>
              <LineButton size="xlarge" styleType="color" disabled>
                Disabled 버튼
              </LineButton>
            </div>
            <div className={'flex gap-2'}>
              <LineButton size="xlarge" styleType="neutral">
                X large 버튼
              </LineButton>
              <LineButton size="xlarge" styleType="neutral" disabled>
                Disabled 버튼
              </LineButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <LineButton size="large" styleType="color">
                large 버튼
              </LineButton>
              <LineButton size="large" styleType="color" disabled>
                Disabled 버튼
              </LineButton>
            </div>
            <div className={'flex gap-2'}>
              <LineButton size="large" styleType="neutral">
                large 버튼
              </LineButton>
              <LineButton size="large" styleType="neutral" disabled>
                Disabled 버튼
              </LineButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <LineButton size="medium" styleType="color">
                medium 버튼
              </LineButton>
              <LineButton size="medium" styleType="color" disabled>
                Disabled 버튼
              </LineButton>
            </div>
            <div className={'flex gap-2'}>
              <LineButton size="medium" styleType="neutral">
                medium 버튼
              </LineButton>
              <LineButton size="medium" styleType="neutral" disabled>
                Disabled 버튼
              </LineButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <LineButton size="small" styleType="color">
                small 버튼
              </LineButton>
              <LineButton size="small" styleType="color" disabled>
                Disabled 버튼
              </LineButton>
            </div>
            <div className={'flex gap-2'}>
              <LineButton size="small" styleType="neutral">
                small 버튼
              </LineButton>
              <LineButton size="small" styleType="neutral" disabled>
                Disabled 버튼
              </LineButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <LineButton size="xsmall" styleType="color">
                xsmall 버튼
              </LineButton>
              <LineButton size="xsmall" styleType="color" disabled>
                Disabled 버튼
              </LineButton>
            </div>
            <div className={'flex gap-2'}>
              <LineButton size="xsmall" styleType="neutral">
                xsmall 버튼
              </LineButton>
              <LineButton size="xsmall" styleType="neutral" disabled>
                Disabled 버튼
              </LineButton>
            </div>
          </div>
        </div>
      </Card>
      <Card title={'TextButton'}>
        <div className={'flex flex-column gap-5'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <TextButton size="xlarge" styleType="color">
                X large 버튼
              </TextButton>
              <TextButton size="xlarge" styleType="color" disabled>
                Disabled 버튼
              </TextButton>
            </div>
            <div className={'flex gap-2'}>
              <TextButton size="xlarge" styleType="neutral">
                X large 버튼
              </TextButton>
              <TextButton size="xlarge" styleType="neutral" disabled>
                Disabled 버튼
              </TextButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <TextButton size="large" styleType="color">
                large 버튼
              </TextButton>
              <TextButton size="large" styleType="color" disabled>
                Disabled 버튼
              </TextButton>
            </div>
            <div className={'flex gap-2'}>
              <TextButton size="large" styleType="neutral">
                large 버튼
              </TextButton>
              <TextButton size="large" styleType="neutral" disabled>
                Disabled 버튼
              </TextButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <TextButton size="medium" styleType="color">
                medium 버튼
              </TextButton>
              <TextButton size="medium" styleType="color" disabled>
                Disabled 버튼
              </TextButton>
            </div>
            <div className={'flex gap-2'}>
              <TextButton size="medium" styleType="neutral">
                medium 버튼
              </TextButton>
              <TextButton size="medium" styleType="neutral" disabled>
                Disabled 버튼
              </TextButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <TextButton size="small" styleType="color">
                small 버튼
              </TextButton>
              <TextButton size="small" styleType="color" disabled>
                Disabled 버튼
              </TextButton>
            </div>
            <div className={'flex gap-2'}>
              <TextButton size="small" styleType="neutral">
                small 버튼
              </TextButton>
              <TextButton size="small" styleType="neutral" disabled>
                Disabled 버튼
              </TextButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <TextButton size="xsmall" styleType="color">
                xsmall 버튼
              </TextButton>
              <TextButton size="xsmall" styleType="color" disabled>
                Disabled 버튼
              </TextButton>
            </div>
            <div className={'flex gap-2'}>
              <TextButton size="xsmall" styleType="neutral">
                xsmall 버튼
              </TextButton>
              <TextButton size="xsmall" styleType="neutral" disabled>
                Disabled 버튼
              </TextButton>
            </div>
          </div>
        </div>
      </Card>
      <Card title={'GnbMenuButton'}>
        <div className={'flex flex-column gap-5'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="xlarge" styleType="color">
                X large 버튼
              </GnbMenuButton>
              <GnbMenuButton size="xlarge" styleType="color" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="xlarge" styleType="neutral">
                X large 버튼
              </GnbMenuButton>
              <GnbMenuButton size="xlarge" styleType="neutral" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="large" styleType="color">
                large 버튼
              </GnbMenuButton>
              <GnbMenuButton size="large" styleType="color" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="large" styleType="neutral">
                large 버튼
              </GnbMenuButton>
              <GnbMenuButton size="large" styleType="neutral" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="medium" styleType="color">
                medium 버튼
              </GnbMenuButton>
              <GnbMenuButton size="medium" styleType="color" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="medium" styleType="neutral">
                medium 버튼
              </GnbMenuButton>
              <GnbMenuButton size="medium" styleType="neutral" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="small" styleType="color">
                small 버튼
              </GnbMenuButton>
              <GnbMenuButton size="small" styleType="color" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="small" styleType="neutral">
                small 버튼
              </GnbMenuButton>
              <GnbMenuButton size="small" styleType="neutral" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
          </div>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="xsmall" styleType="color">
                xsmall 버튼
              </GnbMenuButton>
              <GnbMenuButton size="xsmall" styleType="color" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
            <div className={'flex gap-2'}>
              <GnbMenuButton size="xsmall" styleType="neutral">
                xsmall 버튼
              </GnbMenuButton>
              <GnbMenuButton size="xsmall" styleType="neutral" disabled>
                Disabled 버튼
              </GnbMenuButton>
            </div>
          </div>
        </div>
      </Card>

      <Card title="OnlyTextButton">
        <div className={'flex flex-row gap-5'}>
          <div className={'flex gap-2'}>
            <OnlyTextButton
              className="state-default-usage"
              size="fourteen-px"
              usage="link"
            >
              링크
            </OnlyTextButton>
            <OnlyTextButton
              className="state-default-usage"
              size="fourteen-px"
              usage="button"
            >
              버튼
            </OnlyTextButton>
            <OnlyTextButton
              className="state-default-usage"
              size="fourteen-px"
              usage="email"
            >
              이메일
            </OnlyTextButton>
          </div>
          <div className={'flex gap-2'}>
            <OnlyTextButton
              className="state-default-usage"
              size="sixteen-px"
              usage="link"
            >
              링크
            </OnlyTextButton>
            <OnlyTextButton
              className="state-default-usage"
              size="sixteen-px"
              usage="button"
            >
              버튼
            </OnlyTextButton>
            <OnlyTextButton
              className="state-default-usage"
              size="sixteen-px"
              usage="email"
            >
              이메일
            </OnlyTextButton>
          </div>
        </div>
      </Card>

      <Card title="OnlyIconButton">
        <div className={'flex flex-row gap-5'}>
          <div className={'flex gap-2'}>
            <OnlyIconButton>
              <MyIcons.CartIcon width={'1rem'} color={'#F2F2F2'} />
            </OnlyIconButton>
          </div>
        </div>
      </Card>
      <Card title="InputSwitch">
        <InputSwitch checked={true} />
        <InputSwitch />
      </Card>
      <Card title="RadioButton" style={{ background: 'black' }}>
        <RadioButton checked={true} />
        <RadioButton checked={false} />

        <RadioButton sizeClass={'sixteen-px'} checked={true} />
        <RadioButton sizeClass={'sixteen-px'} checked={false} />
      </Card>
      <Card title="CheckBox" style={{ background: 'black' }}>
        <Checkbox checked={true} />
        <Checkbox checked={false} />
        <Checkbox sizeClass={'sixteen-px'} checked={true} />
        <Checkbox sizeClass={'sixteen-px'} checked={false} />
      </Card>
    </Card>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

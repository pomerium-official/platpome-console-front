import { PageComponent } from '@/types/baseCommon/LayoutTypes';
import { Card } from 'primereact/card';
import React, { useState } from 'react';
import Layout from '@/features/common/components/layout/PomeV2Layout';
import Input from '@/features/common/components/common/Input/Input';
import dayjs from 'dayjs';
import Select from '@/features/common/components/common/Select/Select';
import VerificationSet from '@/features/common/components/common/Verification/VerificationSet';
import SixDigits from '@/features/common/components/common/Verification/SixDigits';

const Page: PageComponent = () => {
  const [text, setText] = useState('');
  return (
    <>
      <Card header={'verification'}>
        <SixDigits
          onChange={(e) => console.log('code', e)}
          boxStyle={{ width: 48, height: 48 }}
          style={{ marginBottom: 20 }}
        />
        <SixDigits
          onChange={(e) => console.log('code', e)}
          autoInput="234569"
        />
        <VerificationSet
          timer={{ time: 1, expired: (e) => alert(e) }}
          handleCountry={(e) => console.log(e)}
          style={{ marginTop: 20 }}
        />
      </Card>

      <Card header={'password'} className="mt-4">
        <Input password label="password" />
        <Input password integral label="password" style={{ marginTop: 20 }} />
        <Input
          password
          integral
          label="password"
          result="error"
          style={{ marginTop: 20 }}
        />
        <Input
          password
          integral
          label="password"
          result="success"
          style={{ marginTop: 20 }}
        />
      </Card>

      <Card header={'input'} className="mt-4">
        <Input placeholder="placeholder" />
        <Input
          placeholder="placeholder"
          label="label"
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          result="error"
          label={'error'}
          value={'error'}
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          result="success"
          label={'success'}
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="disabled"
          disabled
          value={'hihie'}
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="date"
          value={dayjs(new Date()).format('YYYY-MM-DD')}
          date
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="date"
          date
          result="error"
          style={{ marginTop: 20 }}
        />
      </Card>
      <Card header={'input integral'} className="mt-4">
        <Input placeholder="placeholder" label="label" integral />
        <Input
          placeholder="placeholder"
          result="error"
          label={'error'}
          integral
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          result="success"
          label={'success'}
          integral
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="disabled"
          disabled
          integral
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="date"
          date
          integral
          style={{ marginTop: 20 }}
        />
        <Input
          placeholder="placeholder"
          label="date"
          date
          result="error"
          integral
          style={{ marginTop: 20 }}
        />
      </Card>

      <Card header={'drowdown'} className="mt-4">
        <Select />
        <Select label="label" style={{ marginTop: 20 }} />
        <Select result="error" label="label" style={{ marginTop: 20 }} />
        <Select result="success" label="label" style={{ marginTop: 20 }} />
        <Select
          label="disabled"
          disabled
          value={'text'}
          style={{ marginTop: 20 }}
        />
      </Card>

      <Card header={'drowdown integral'} className="mt-4">
        <Select
          label="label"
          integral
          options={[
            { label: 'hi', value: '1' },
            { label: 'hello', value: '2' },
          ]}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select
          result="error"
          label="label"
          integral
          style={{ marginTop: 20 }}
        />
        <Select
          result="success"
          label="label"
          integral
          style={{ marginTop: 20 }}
        />
        <Select
          label="disabled"
          disabled
          value={'text'}
          integral
          style={{ marginTop: 20 }}
        />
      </Card>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

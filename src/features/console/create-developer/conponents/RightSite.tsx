import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { TextButton } from '@/features/common/components/common/Button/TextButton';
import { Checkbox } from '@/features/common/components/common/Checkbox';
import Input from '@/features/common/components/common/Input/Input';
import VerificationSet from '@/features/common/components/common/Verification/VerificationSet';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { regExpNickname, regExpName } from '@/libs/regex';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import { useRouter } from 'next/router';

const RightSite = observer(() => {
  const router = useRouter();
  const { createDeveloperStore: store } = useStore();
  const { data: userInfo } = useUserInfo({ needLogin: true });

  useEffect(() => {
    if (store.isSent) {
      const interval = setInterval(() => {
        store.count > 0
          ? store.setCount(store.count - 1)
          : clearInterval(interval);
      }, 1000);
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [store.isSent]);

  return (
    <div className="rightSite">
      <h1>Create a developer account</h1>
      <Input
        label="Developer nickname"
        integral
        maxLength={20}
        onChange={(e) => {
          if (e.target.value.length) {
            if (!regExpNickname.test(e.target.value)) {
              store.onChangeInput(
                'nickname',
                e.target.value.replace(regExpNickname, '')
              );
            }
          } else {
            store.onChangeInput('nickname', '');
          }
        }}
        value={store.inputValues.nickname}
      />

      <Input
        label="Developer name"
        integral
        maxLength={50}
        onChange={(e) => {
          if (e.target.value.length) {
            if (!regExpName.test(e.target.value)) {
              store.onChangeInput(
                'name',
                e.target.value.replace(regExpName, '')
              );
            }
          } else {
            store.onChangeInput('name', '');
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'backward' && store.inputValues.name.length === 1) {
            store.inputValues.name = '';
          }
        }}
        value={store.inputValues.name}
      />

      <VerificationSet
        inputPhone={(e) => store.onChangeInput('mobileNumber', e)}
        inputCode={(e) => store.onChangeInput('certificationCode', e)}
        handleCountry={(e) => store.onChangeInput('nationCode', e.dial_code)}
        onSend={() => store.sendCertificationSMS()}
        timer={store.timer && store.timer}
        onVerification={() => store.verify()}
        verified={store.verified}
        errorInputCode={store.inputError.code.isError}
        codeErrorText={store.inputError.code.text}
        errorInputPhone={store.inputError.mobileNumber.isError}
        count={store.count}
      />

      <ul className="agreeList">
        {store.agreements.map((v, i) => {
          return (
            <li key={`${v.text}${i}`}>
              <Checkbox
                checked={v.checked}
                onChange={(e) => store.onCheckAgreement(e.checked, i)}
              />
              <span>
                <>
                  {v.text}&nbsp;
                  {v.link && (
                    <>
                      <Link href={v.link.url}>{v.link.text}</Link>.
                    </>
                  )}
                </>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="buttons">
        <SolidButton
          size="xlarge"
          styleType="color"
          label="Create developer account"
          disabled={!store.validated}
          onClick={() => userInfo && store.createAccount(userInfo)}
        />
        <TextButton
          onClick={() => router.push('/')}
          size="xlarge"
          styleType="neutral"
          label="Go back"
        />
      </div>
    </div>
  );
});

export default RightSite;

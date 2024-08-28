import React, { FC } from 'react';
import { Button } from 'primereact/button';
import Router, { useRouter } from 'next/router';

export const showError = async () => {
  let uri;
  if (Router.asPath.indexOf('?') > -1) {
    uri = `${Router.asPath}&showError=true`;
  } else {
    uri = `${Router.pathname}?showError=true`;
  }
  await Router.push(`${uri}`, undefined, {
    shallow: true,
  });
};

const ErrorLoad: FC = () => {
  const router = useRouter();
  return (
    <div className={'errorPage load'}>
      <div className="errorContent">
        <div className="icon">
          <img
            src="/assets/baseCommon/images/exclamation_triangle_gray.svg"
            alt="error"
          />
        </div>
        <p>
          불편을 드려 죄송합니다 <br />
          잠시 후 다시 시도해 주세요
        </p>
        <Button
          label={'새로고침'}
          className={'green'}
          onClick={async () => {
            let std;
            if (router.asPath.indexOf('?showError=true') > -1) {
              std = '?';
            } else {
              std = '&';
            }
            const uri = router.asPath
              .split(std)
              .filter((v) => v !== 'showError=true');
            await router.replace(`${uri}`);
            await router.reload();
          }}
          style={{
            height: 'auto',
            borderRadius: '1.6vw',
            fontWeight: 'normal',
          }}
        />
      </div>
    </div>
  );
};

export default ErrorLoad;

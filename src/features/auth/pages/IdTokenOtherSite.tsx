import { useEffect } from 'react';

import { isServer } from '@/libs/baseCommon/utils/common';
import { saveIdToken } from '@/features/auth/libs/client/actions';
import { ActionSaveIdTokenOther } from '@/features/auth/libs/shared/shared-config';

export const Page = () => {
  useEffect(() => {
    if (isServer) return;

    const messageHandler = (event: MessageEvent<any>) => {
      // 메시지 데이터 확인
      const data = event.data;
      if (data && data.action === ActionSaveIdTokenOther) {
        const allowOrigins = process.env.NEXT_PUBLIC_SET_IDTOKEN_ALLOW_ORIGINS?.split(
          ','
        );
        // event.origin은 메시지를 보낸 origin입니다.
        if (allowOrigins && allowOrigins.indexOf(event.origin) === -1) {
          window.parent.postMessage(
            {
              action: ActionSaveIdTokenOther,
              status: 'failed',
              message: `보안 오류: 허용되지 않은 origin입니다: ${event.origin}`,
            },
            event.origin
          );
          return;
        }

        const receivedIdToken = data.idToken;
        saveIdToken(receivedIdToken);
        window.parent.postMessage(
          {
            action: ActionSaveIdTokenOther,
            status: 'success',
            message: '',
          },
          event.origin
        );

        // 수신한 idToken을 사용하여 작업을 수행합니다.
        console.log('받은 idToken:', receivedIdToken);
      }
    };
    // 이벤트 리스너를 등록하여 메시지를 수신합니다.
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return <div />;
};

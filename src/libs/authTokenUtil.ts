export interface AuthSessionToken {
  accessToken: string;
  refreshToken: string;
}

/**
 * 로컬 스토리지에 있는 session 정보를 가져옵니다.
 * @param key
 */
export const getSessionLocalStorage = (key = 'session') => {
  const sessionStr = localStorage.getItem(key);
  if (sessionStr) {
    const session = JSON.parse(sessionStr);

    return {
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
    } as AuthSessionToken;
  }

  return null;
};

/**
 * 로컬 스토리지 session 정보 저장
 * @param key
 * @param data
 */
export const setSessionLocalStorage = ({
  key = 'session',
  data,
}: {
  key?: string;
  data: AuthSessionToken;
}) => {
  localStorage.setItem(key, JSON.stringify(data));
};

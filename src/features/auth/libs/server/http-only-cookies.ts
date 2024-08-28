import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

class HttpOnlyCookies {
  private cookies: Cookies;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.cookies = new Cookies(req, res, {
      secure: process.env.COOKIE_SECURE === 'true',
    });
  }

  remove(name: string) {
    this.cookies.set(name, null, { maxAge: 0 });
  }

  set(
    name: string,
    value: string | null | undefined,
    options: Cookies.SetOption = {}
  ) {
    // Set your default options here

    // cross origin 하려면 https 설정해야함.
    // sameSite는 none | lax로 해야함. lax로하면 폼제출 및 링크 클릭에서만 쿠키가 전송됨.
    // sameSite가 none인 경우 secure는 true여야한다.

    // 로컬호스트일 때, sameSite이다.
    // sameSite가 none인 경우는 secure가 true여야한다.

    // sameSite인 경우에 구워준 쿠키를, 다른 서버에 같이보내서 쓸수있나?

    // localhost인 경우
    // 방법1. sameSite:strict 로 하면 localhost쪽 다 공유됨.
    //      --> 외부 리소스 호출시 쿠키 공유 안될 수 있음.
    // const defaultOptions: Cookies.SetOption = {
    //     httpOnly: true,
    //     sameSite: 'strict',
    //     // secure를 localhost일때 false로 변경하면, 보안상 localhost로 했을때 뚫려버릴 수 있음.
    //     // 따라서 env로 조절하는 코드 그대로 둡니다.
    //     secure: false//process.env.COOKIE_SECURE === 'true',
    // };

    // 방법2. sameSite:'none', secure true. https 설정
    const defaultOptions: Cookies.SetOption = {
      httpOnly: true,
      sameSite: process.env.COOKIE_SECURE === 'true' ? 'none' : 'strict',
      // secure를 localhost일때 false로 변경하면, 보안상 localhost로 했을때 뚫려버릴 수 있음.
      // 따라서 env로 조절하는 코드 그대로 둡니다.
      secure: process.env.COOKIE_SECURE === 'true',
    };

    const mergedOptions = { ...defaultOptions, ...options };

    this.cookies.set(name, value, mergedOptions);
  }

  get(name: string, opts?: Cookies.GetOption) {
    return this.cookies.get(name, opts);
  }
}

export default HttpOnlyCookies;

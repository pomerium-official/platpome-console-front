import { TreeNodeType } from '@/types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { match } from 'path-to-regexp';

dayjs.extend(duration);

/**
 * 서버 여부
 */
export const isServer = typeof window === 'undefined';

/**
 * 오늘 날짜.
 */
export const today = dayjs();

/**
 * 시간을 제외한 날짜의 Date형식으로 변환합니다.
 * @param date
 */
export const convertToDate = (date?: dayjs.ConfigType) =>
  new Date(dayjs(date).format('YYYY-MM-DD'));

/**
 * 오늘 날짜. 시간 제외 Date형식
 */
export const todayDate = convertToDate();

/**
 * 윈도우 팝업.
 * @param url
 * @param features default 'width=800,height=500'
 */
export const windowPopup = (url: string, features?: string) => {
  return window.open(
    url,
    '_blank',
    features ? features : 'width=1000,height=800'
  );
};
/**
 * 윈도우 팝업 닫기
 */
export const windowClose = () => window.open(``, '_self')?.close();

/**
 * DataTable 역순 번호
 * @param totalRecord 전체 열 수
 * @param rowIndex 현재 rowIndex
 * @param pageNum 현재 page 번호
 * @param pageSize 페이지의 열 수
 */
export const getReverseIndexNumber = (
  totalRecord: number,
  rowIndex: number,
  pageNum: number,
  pageSize: number
) => {
  return totalRecord - rowIndex - (pageNum - 1) * pageSize;
};

/**
 * DataTable 순번
 * @param rowIndex 현재 rowIndex
 * @param pageNum 현재 page 번호
 * @param pageSize 페이지의 열 수
 */
export const getIndexNumber = (
  rowIndex: number,
  pageNum: number,
  pageSize: number
) => {
  return rowIndex + 1 + (pageNum - 1) * pageSize;
};

/**
 * url에서 DataUrl을 가져옵니다.(cors 회피)
 * @param url
 */
export async function toDataURL(url: string) {
  let blob;
  try {
    // blob으로 다운로드 시도
    const response = await fetch(url);
    blob = await response.blob();
  } catch {
    // cors 에러 발생시 proxy server 호출
    blob = await fetchBlob(url);
  }

  return URL.createObjectURL(blob);
}

/**
 * url 파일을 blob으로 가져옵니다. (cors 회피)
 * @param url
 */
export async function fetchBlob(url: string) {
  const response = await fetch(
    `/api/common/arraybuffer/${encodeURIComponent(url)}`
  );

  const arrayBuffer = await response.arrayBuffer();
  const type = response.headers.get('content-type') || '';

  return new Blob([arrayBuffer], {
    type,
  });
}

/**
 * 파일 다운로드
 * @param url
 * @param fileName
 */
export async function download(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = await toDataURL(url);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 키로 트리노드 아이템을 찾는다.
 * @param data
 * @param key
 */
export const findTreeNodeItem = <T>(data: TreeNodeType<T>[], key: string) => {
  if (data === undefined) return;
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return data[i];
    }
    const result = findTreeNodeItem(data[i].children, key) as TreeNodeType<T>;
    if (result) {
      return result;
    }
  }
};

/**
 * arr에 property 평탄화한다.
 * <p>ex) flattenByProperty([{name:"a",children:[{name:"a-1",children:[{name:"a-1-1"}]}]}], "children")
 * => [{name:"a"},{name:"a-1"},{name:"a-1-1"}]
 * </p>
 * @param arr
 * @param propertyName
 */
export const flattenByProperty = <T, K extends keyof T>(
  arr: T[],
  propertyName: K
) => {
  if (arr) {
    return arr.reduce((result: T[], item: T) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const childArr: T[] = item[propertyName];
      const children: T[] = flattenByProperty(childArr, propertyName);
      delete item[propertyName];

      return [...result, item, ...children];
    }, [] as T[]);
  }

  return [] as T[];
};

/**
 * 숫자 형태 천자리 콤마 형태로 변형
 * ex) 1000 => 1,000
 * @param x
 */
export const numberWithCommas = (x?: number | string) => {
  if (x !== undefined && x !== null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};
/**
 * number 초 => 0일 00:00:00 로 변경
 * @param seconds
 */
export const formatSecondsToTime = (seconds: number) => {
  const duration = dayjs.duration(seconds, 'seconds');

  const days = Math.floor(duration.asDays());

  if (days >= 1) {
    duration.subtract({ days: days });
    return `${numberWithCommas(days)}일 ${duration.format('HH:mm:ss')}`;
  } else {
    return duration.format('HH:mm:ss');
  }
};

/**
 * 초성 검사
 */
export const wordsParser = (keyWords: string) => {
  const pattern = /([ㄱ-ㅎㅏ])/g;
  return !pattern.test(keyWords);
};

/**
 * 단위까지 파일 사이즈 계산
 * @param x
 */
export const getFileSize = (x: number) => {
  const s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const e = Math.floor(Math.log(x) / Math.log(1024));
  return (x / Math.pow(1024, e)).toFixed(2) + ' ' + s[e];
};

/**
 * 날짜포맷 YYYY-MM-DD HH:mm:ss
 * @param date
 */
export const dateWithTime = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * 휴대전화번호 포맷
 * @param num
 */
export const cellphoneFormat = (num: string) => {
  if (num.length <= 10) {
    return (
      num.substring(0, 3) +
      '-' +
      num.substring(3, 6) +
      '-' +
      num.substring(6, 10)
    );
  } else {
    return (
      num.substring(0, 3) +
      '-' +
      num.substring(3, 7) +
      '-' +
      num.substring(7, 11)
    );
  }
};

export const getGeoLocation = () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position: GeolocationPosition) {
          resolve(position);
        },
        function (error: GeolocationPositionError) {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      reject('GPS를 지원하지 않습니다');
    }
  });
};

export const isLoginFreePath = (path: string) => {
  const loginFreePaths = process.env.NEXT_PUBLIC_PUBLIC_PATHS!.split(',');
  return (
    process.env.NEXT_PUBLIC_LOGIN_FREE === 'true' ||
    loginFreePaths.some((s) => {
      const matchCheck = match(s);
      return matchCheck(path);
    })
  );
};

export const ellipsisWalletAddress = (
  walletAddress?: string,
  front = 4,
  rear = 4
) => {
  if (walletAddress) {
    return `${walletAddress.slice(0, front)}...${walletAddress.slice(-rear)}`;
  } else {
    return '';
  }
};

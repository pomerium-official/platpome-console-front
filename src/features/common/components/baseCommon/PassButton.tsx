import React, { FC, useEffect } from 'react';
import { Button, ButtonProps } from 'primereact/button';
import { windowPopup } from '@/libs/baseCommon/utils/common';

export interface CompleteDataType {
  /**
   * CI 값. 연계정보 확인정보 (88byte)
   */
  CI: string;
  /**
   * CI 업데이트 횟수 (현재 ‘1’ 로 고정임)
   */
  CI_UPDATE: string;
  /**
   * DI 값. 중복가입 확인정보 (64byte)
   */
  DI: string;
  /**
   * 처리 결과 메시지
   */
  RETURN_MSG: string;
  /**
   * 생년월일
   */
  RSLT_BIRTHDAY: string;
  /**
   * 성명
   */
  RSLT_NAME: string;
  /**
   * 내외국인 구분 (내국인:L, 외국인:F)
   */
  RSLT_NTV_FRNR_CD: string;
  /**
   * 성별 (남자:M, 여자:F)
   */
  RSLT_SEX_CD: string;
  /**
   * 통신사 구분 [01:SKT,,02:KT,03:LGU+,04:알뜰폰SKT,05:알뜰폰KT,06:알뜰폰LGU+]
   */
  TEL_COM_CD: string;
  /**
   * 휴대폰번호
   */
  TEL_NO: string;
}

/**
 * Pass 인증 버튼 Props Type
 */
export interface PassButtonProps extends ButtonProps {
  /**
   * pass 인증 완료 이벤트
   * @param data
   */
  onComplete?: (data: CompleteDataType) => void;
  /**
   * 팝업 url
   */
  popupUrl?: string;
  // onComplete?: (data: any) => void;

  /**
   * className명
   */
  className?: string;

  /**
   * 라벨명
   */
  label?: string;
}

/**
 * Pass 인증 버튼
 * onClick은 줄 수 없습니다.
 * */
const PassButton: FC<PassButtonProps> = (props) => {
  /**
   *  protocol포함 domain 변경 함수
   * */
  const extractHostname = (url: string) => {
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return url.split('/')[0] + '//' + hostname;
  };

  const {
    popupUrl,
    onComplete,
    className = 'p-button-outlined',
    label = '본인인증',
  } = props;

  useEffect(() => {
    /**
     * 아래 랜딩될때 방어로직을 위한 domainUrl 선언
     */
    const receivePostMsg = (event: MessageEvent<any>) => {
      if (popupUrl) {
        const domainUrl = extractHostname(popupUrl);
        if (event.origin === domainUrl) {
          onComplete && onComplete(event.data);
        }
      }
    };

    window.addEventListener('message', receivePostMsg);
    return () => {
      window.removeEventListener('message', receivePostMsg);
    };
  }, [popupUrl, onComplete]);

  // PassButton에서 사용하는 props를 제외하고 button에 관련된 props만 뿌려준다
  const buttonProps = { ...props } as PassButtonProps;
  delete buttonProps.onComplete;
  delete buttonProps.popupUrl;

  return (
    <Button
      label={label}
      className={className}
      {...buttonProps}
      onClick={() => {
        if (props.popupUrl) {
          windowPopup(props.popupUrl, 'width=430,height=642');
        }
      }}
    />
  );
};

export default PassButton;

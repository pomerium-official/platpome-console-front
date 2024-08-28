import React from 'react';
import {
  confirm,
  ConfirmOptions,
} from '@/features/common/components/baseCommon/Dialog/Confirm';
import {
  alert,
  AlertOptions,
} from '@/features/common/components/baseCommon/Dialog/Alert';

export * from '../baseCommon/utils/common';

/**
 * 사이트용 공통 confirm
 * @param content
 * @param title
 * @param options
 */
export const confirmUser = (
  content: string | JSX.Element,
  title?: string | JSX.Element,
  options?: ConfirmOptions
) => {
  return confirm(
    <>
      <h2 className="title" style={{ textAlign: 'center' }}>
        {title}
      </h2>
      <p className="text" style={{ textAlign: 'center' }}>
        {content}
      </p>
    </>,
    '',
    {
      noButtonLabel: '아니오',
      okButtonLabel: '네',
      okButtonStyle: { width: '50%', marginRight: 0 },
      noButtonStyle: { width: '50%' },
      ...options,
    }
  );
};

/**
 * 사이트용 공통 alert
 * @param content
 * @param title
 * @param options
 */
export const alertUser = (
  content: string | JSX.Element,
  title?: string | JSX.Element,
  options?: AlertOptions
) => {
  return alert(
    <>
      <h2 className="title" style={{ textAlign: 'center' }}>
        {title}
      </h2>
      <p className="text" style={{ textAlign: 'center' }}>
        {content}
      </p>
    </>,
    '',
    {
      buttonLabel: '확인',
      buttonStyle: { width: '100%' },
      ...options,
    }
  );
};

/**
 * input 하단 active, warning 표시 클래스명 가져오기.
 * 유효성 에러가 없고, 필드에 값이 있으면 active.
 * 유효성 에러가 있으면 warning
 * @param model
 * @param validErrors
 * @param field
 */
export const getStatusClassNameForInput = (
  model: any,
  validErrors: Map<string, string[]>,
  field: string
) => {
  if (validErrors.get(field) && validErrors.get(field)!.length > 0) {
    return 'warning';
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (model[field].length > 0) {
      return 'active';
    }
  }

  return '';
};

export const renderText = (text: string, keyString: string) => {
  return (
    <>
      {text.split('\n').map((splitValue, index) => {
        return (
          <React.Fragment key={`${keyString}_${index}`}>
            {index != 0 && <br />}
            {splitValue}
          </React.Fragment>
        );
      })}
    </>
  );
};

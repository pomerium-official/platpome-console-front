import { makeAutoObservable } from 'mobx';

import { IsEqualTo } from '@/libs/baseCommon/utils/customValidators';
import {
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidationArguments,
} from 'class-validator';
import { regExpPassword } from '@/libs/baseCommon/regex';

const enum AuthProvider {
  SELF = 'SELF',
  APPLE = 'APPLE',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
}

export class JoinFormModel {
  constructor() {
    makeAutoObservable(this);
  }

  provider: AuthProvider = AuthProvider.SELF;

  /**
   * 사용자 이름
   */
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]} 글자 이상 입력해주세요.`;
    },
  })
  @MaxLength(5000, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]}글자까지 입력할 수 있습니다.`;
    },
  })
  name = '';

  /**
   * 로그인 ID
   */
  @IsEmail(
    {},
    {
      message: () => {
        return '이메일 형식으로 입력해주세요';
      },
    }
  )
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]} 글자 이상 입력해주세요.`;
    },
  })
  @MaxLength(5000, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]}글자까지 입력할 수 있습니다.`;
    },
  })
  username = '';

  /**
   * 비밀번호
   */
  @ValidateIf((o) => o.provider === 'SELF')
  @Matches(regExpPassword, {
    message: () => {
      return '최소 8자이상 영문 대 소문자, 숫자 및 특수문자를 함께 사용하세요.';
    },
  })
  password = '';

  @ValidateIf((o) => o.provider === 'SELF')
  @IsEqualTo('password', {
    message: () => {
      return '비밀번호가 일치하지 않습니다.';
    },
  })
  passwordConfirm = '';

  showAuthKey = false;

  authKey = '';
}

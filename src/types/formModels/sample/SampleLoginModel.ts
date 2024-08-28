import { MaxLength, MinLength, ValidationArguments } from 'class-validator';
import { makeAutoObservable } from 'mobx';

/**
 * LoginModel
 * 유효성 검사 https://github.com/typestack/class-validator 참고
 * 모델에 propery들은 undefined인 경우 모든 유효성검사가 작동합니다. 유의해주세요.
 */
export class SampleLoginModel {
  /**
   * Store에서 사용하는 Model클래스는 observable로 만들어주세요.
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 로그인 ID
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
  loginId = '';

  /**
   * 로그인 비밀번호
   */
  @MinLength(1, {
    message: () => {
      return '비밀번호를 입력해주세요';
    },
  })
  @MaxLength(5000, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]}글자까지 입력할 수 있습니다.`;
    },
  })
  password = '';
}

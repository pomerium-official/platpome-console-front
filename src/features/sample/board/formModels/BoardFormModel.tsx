import { MaxLength, MinLength, ValidationArguments } from 'class-validator';
import { makeAutoObservable } from 'mobx';
import { Board } from '@/generated/api/api-service';

export class BoardFormModel implements Board {
  content: string | null;
  createdAt: string | null;
  id: number;
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]} 글자 이상 입력해주세요.`;
    },
  })
  @MaxLength(50, {
    message: (args: ValidationArguments) => {
      const { constraints } = args;
      return `${constraints[0]}글자까지 입력할 수 있습니다.`;
    },
  })
  title: string;
  updatedAt: string | null;

  updatorId: number | null;
  creatorId: number;
  boardCd: string | null;

  constructor() {
    makeAutoObservable(this);
    this.content = null;
    this.createdAt = null;
    this.id = -1;
    this.title = '';
    this.updatedAt = null;
    this.creatorId = -1;
    this.updatorId = null;
    this.boardCd = null;
  }
}

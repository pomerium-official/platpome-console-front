import { action, computed, makeObservable, observable } from 'mobx';
import {
  focusFirstInvalidElement,
  refreshValidationErrorMessage,
  setValidationErrorMessage,
  setValidationErrorMessages,
} from '../utils/formUtil';

/**
 * 폼 아이템 타입
 */
export interface IBaseFormItem {
  [key: string]: any;
}

/**
 * 폼 베이스 스토어
 */
export class BaseFormStore<T extends IBaseFormItem> {
  defaultItem: T; // = new BoardFormModel(); // { title: undefined, content: undefined, id: -1n };

  /**
   * 폼 아이템
   */
  @observable
  item: T;

  /**
   * 유효성 검사 에러 메시지 맵
   */
  @observable
  validErrors: Map<string, string[]> = new Map();

  /**
   * 입력 Refs
   */
  @observable
  inputRefs = new Map<string, any>();

  @computed
  get validErrorFlatArray() {
    return [...this.validErrors.values()].flat();
  }

  constructor(defaultItem: T) {
    this.defaultItem = { ...defaultItem };
    this.item = defaultItem;
    makeObservable(this);
  }

  @action
  init() {
    this.item = this.defaultItem;
  }

  @action
  validate = async () => {
    await setValidationErrorMessages(this.item, this.validErrors);
    return this.validErrors;
  };

  @action
  validateField = async (fieldName: string) => {
    await setValidationErrorMessage(this.item, this.validErrors, fieldName);
    return this.validErrors;
  };

  /**
   * 첫 번째 유효성 실패한 input에 포커스를 줍니다.
   */
  focusFirstInvalidElement = () => {
    focusFirstInvalidElement(this.validErrors, this.inputRefs);
  };

  /**
   * input Field 이벤트 처리기
   * @param fieldName 필드
   * @param value 값
   */
  @action
  handleChangeInput = async (fieldName: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.item[fieldName] = value;
    await refreshValidationErrorMessage(this.item, this.validErrors, fieldName);
  };
}

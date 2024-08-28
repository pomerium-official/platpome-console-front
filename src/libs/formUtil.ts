import { validate } from 'class-validator';
import { runInAction } from 'mobx';

/**
 * targetObject에 inputFieldName 해당하는 에러 결과를 반환합니다.
 * @param targetObject
 * @param inputFieldName
 */
export async function validateField(targetObject: any, inputFieldName: string) {
  const errors = await validate(targetObject);
  return errors.find((e) => e.property === inputFieldName);
}

/**
 * 특정 필드의 유효성 검사를 새로해서 가져옵니다.
 * @param model 모델 객체
 * @param validErrors 에러 메시지맵 객체
 * @param inputFieldName 필드명
 */
export async function refreshValidationErrorMessage(
  model: any,
  validErrors: Map<string, string[]>,
  inputFieldName: string
) {
  // 저장 후 기존 에러가 있는 경우 현재 input에 해당하는 에러메시지만 변경해줍니다.
  if (validErrors.size === 0) return;

  // 기존 에러 메시지 객체를 찾는다.
  if (!validErrors.has(inputFieldName)) return;

  await setValidationErrorMessage(model, validErrors, inputFieldName);

  // // 프로퍼티에 해당하는 유효성 검사 결과를 가져온다.
  // const error = await validateField(model, inputFieldName);
  // if (error && error?.constraints) {
  //   validErrors.set(inputFieldName, Object.values(error?.constraints));
  // } else {
  //   validErrors.delete(inputFieldName);
  // }
}

/**
 * 특정 필드의 유효성 검사
 * @param model
 * @param validErrors
 * @param inputFieldName
 */
export async function setValidationErrorMessage(
  model: any,
  validErrors: Map<string, string[]>,
  inputFieldName: string
) {
  // 프로퍼티에 해당하는 유효성 검사 결과를 가져온다.
  const error = await validateField(model, inputFieldName);
  runInAction(() => {
    if (error && error?.constraints) {
      validErrors.set(inputFieldName, [
        ...new Set(Object.values(error?.constraints)), // remove duplicate errorMessage
      ]);
    } else {
      validErrors.delete(inputFieldName);
    }
  });
}

/**
 * validErrors에 formModel에 정의된 유효성 규칙에 따라 에러 메시지를 설정해줍니다.
 * @param formModel 데이터. class-validator를 참고해주세요.
 * @param validErrors validationError 목록. 결과를 담을 Map<"inputId", "에러메시지"목록>
 */
export async function setValidationErrorMessages(
  formModel: any,
  validErrors: Map<string, string[]>
) {
  if (formModel === null || formModel === undefined) {
    throw new Error(
      '폼 데이터가 없습니다. formModel은 undefined or null일 수 없습니다.'
    );
  }
  const errors = await validate(formModel);
  runInAction(() => {
    validErrors.clear();
    if (errors && errors.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].constraints !== undefined) {
          validErrors.set(errors[i].property, [
            ...new Set(Object.values(errors[i].constraints!)), // remove duplicate errorMessage
          ]);
        }
      }
    }
  });
}

/**
 * 유효성에 통과하지 못한 첫 번째 Input에 포커스를 활성화합니다.
 * @param validErrors 유효성 에러 목록
 * @param inputRefs 입력 ref 목록.
 */
export function focusFirstInvalidElement(
  validErrors: Map<string, string[]>,
  inputRefs: Map<string, any>
) {
  const firstInputRefKeyValue = Array.from(inputRefs).find((item) =>
    validErrors.has(item[0])
  );
  const firstInputRef = firstInputRefKeyValue
    ? firstInputRefKeyValue[1]
    : undefined;
  console.log('-> firstInputRef', firstInputRef);

  if (firstInputRef) {
    // normal Input Focus처리
    if (typeof firstInputRef.ref.focus !== 'undefined') {
      firstInputRef.ref.focus();
      return;
    }

    // smith-ui-components Button Focus처리
    if (
      firstInputRef.ref.input &&
      typeof firstInputRef.ref.input.focus !== 'undefined'
    ) {
      firstInputRef.ref.input.focus();
      return;
    }

    // smith-ui-components Input Focus처리
    if (
      firstInputRef.ref.element &&
      typeof firstInputRef.ref.element.focus !== 'undefined'
    ) {
      firstInputRef.ref.element.focus();
      return;
    }

    // smith-ui-components Password v1 Focus처리
    if (
      firstInputRef.ref.inputEl &&
      typeof firstInputRef.ref.inputEl.focus !== 'undefined'
    ) {
      firstInputRef.ref.inputEl.focus();
      return;
    }

    // smith-ui-components Password v2 Focus처리
    if (
      firstInputRef.ref.inputRef &&
      firstInputRef.ref.inputRef.current &&
      typeof firstInputRef.ref.inputRef.current.focus !== 'undefined'
    ) {
      firstInputRef.ref.inputRef.current.focus();
      return;
    }

    // Editor 포커스 처리
    if (
      firstInputRef.ref.quill &&
      typeof firstInputRef.ref.quill.focus !== 'undefined'
    ) {
      firstInputRef.ref.quill.focus();
      return;
    }

    console.error('첫 번째 inputRef에 focus()함수가 없습니다');
  }
}

/**
 * to object에 from의 내용들의 값을 복사해서 넣는다.
 * @param from
 * @param to
 */
export function bindFromTo(from: any, to: any) {
  for (const key in from) {
    if (
      !Array.isArray(from[key]) &&
      typeof from[key] == 'object' &&
      from[key] != null &&
      to[key]
    ) {
      bindFromTo(from[key], to[key]);
    } else if (Object.keys(to).find((k) => k === key)) {
      to[key] = from[key];
    }
  }
}

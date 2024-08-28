export const regexKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;

/**
 * 비밀번호 regExp. 대소문자+특수문자+숫자조합 8글자이상
 * pattern에 /g 없어야 작동 https://github.com/typestack/class-validator/issues/484#issuecomment-595821457
 */
export const regExpPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).{8,})/;
export const regExpResidentRegistrationNumber = /(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
export const regExpPhoneNumber = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
export const regExpUserName = /[^a-zA-Zㄱ-ㅎ가-힣 ]/g;
export const regExpOnlyNumber = /[^0-9]/g;
export const regExpOnlyNumberAndDot = /[^0-9|.]/g;
export const regExpOnlyNumberAndComma = /[^0-9|, ]/g;
export const regExpOnlyNumberAndDash = /[^0-9|-]/g;
export const regExpPrice = /^([0-9]{0,10})(\.[0-9]{0,10})?$/;
export const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

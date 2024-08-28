const charEntry = {
  ㄱ: 44032,
  ㄲ: 44620,
  ㄴ: 45208,
  ㄷ: 45796,
  ㄸ: 46384,
  ㄹ: 46972,
  ㅁ: 47560,
  ㅂ: 48148,
  ㅃ: 48736,
  ㅅ: 49324,
};

const reESC = /[\\^$.*+?()[\]{}|]/g,
  reChar = /[가-힣]/,
  reJa = /[ㄱ-ㅎ]/,
  offset = 44032;

const pattern = (ch: keyof typeof charEntry) => {
  let r;
  if (reJa.test(ch)) {
    const begin =
      charEntry[ch] || (ch.charCodeAt(0) - 12613) * 588 + charEntry['ㅅ'];
    const end = begin + 587;
    r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else if (reChar.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    if (chCode % 28 > 0) return ch;
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else r = ch.replace(reESC, '\\$&');
  return `(${r})`;
};

const matcher = (v: string, matches: RegExpExecArray | null) => {
  if (matches) {
    let last = 0,
      vLast = 0,
      acc = v;
    for (let i = 1; i < matches.length; i++) {
      const curr = matches[i];
      vLast = v.indexOf(curr, vLast);
      last = acc.indexOf(curr, last);
      acc = `${acc.substring(0, last)}${curr}${acc.substring(last + 1)}`;
    }
    return { name: acc };
  }
};

export const nameSearch = (
  value: string,
  array: any,
  targetFieldName: string
) => {
  const reg = new RegExp(
    value
      .split('')
      .map((v) => pattern(v as keyof typeof charEntry))
      .join('.*?'),
    'i'
  );
  return array.reduce((acc: any, curr: any) => {
    const matches = reg.exec(curr[targetFieldName]);
    const result = matcher(curr[targetFieldName], matches);
    if (matches && result) acc.push(result);
    return acc;
  }, []);
};

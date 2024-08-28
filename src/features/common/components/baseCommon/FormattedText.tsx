import React from 'react';

interface DescriptionContentProps {
  text?: string | null;
  /**
   * 링크로 된 텍스트 클릭 가능 하도록 변경 여부.
   * default. true.
   * true인 경우 http://abc.com 등의 내용이 있을때 <a></a> 로 감싸줍니다.
   */
  convertLink?: boolean;
}

const linkifyText = (text: string) => {
  // return text;
  // 정규 표현식을 사용하여 다양한 프로토콜을 찾아내는 함수
  const regex = /(\b(?:https?|ftp|mailto|tel|file):\/\/\S+\b)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (regex.test(part)) {
      if (part.startsWith('http') || part.startsWith('https')) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else if (part.startsWith('ftp')) {
        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a key={index} href={part} target="_blank">
            {part}
          </a>
        );
      } else if (part.startsWith('mailto')) {
        return (
          <a key={index} href={part}>
            {part}
          </a>
        );
      } else if (part.startsWith('tel')) {
        return (
          <a key={index} href={part}>
            {part}
          </a>
        );
      } else if (part.startsWith('file')) {
        return (
          <a key={index} href={part}>
            {part}
          </a>
        );
      }
    }
    return part;
  });
};

/**
 * TextChanger
 * @param text
 * @param convertLink
 * @constructor
 */
const FormattedText: React.FC<DescriptionContentProps> = ({
  text,
  convertLink = true,
}) => {
  if (text === undefined || text === null) {
    return null;
  }

  const textWithLineBreaks = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {convertLink ? linkifyText(line) : line}
      {index < text.split('\n').length - 1 && <br />} {/* 줄 바꿈 태그 삽입 */}
    </React.Fragment>
  ));

  return <>{textWithLineBreaks}</>;
};

export default FormattedText;

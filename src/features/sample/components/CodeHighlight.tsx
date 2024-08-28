import React, { FC, ReactNode, useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import CSS from 'csstype';

export type CodeLangType =
  | 'clike'
  | 'markup'
  | 'jsx'
  | 'js'
  | 'javascript'
  | 'css'
  | 'scss';

interface CodeHighlightProps {
  style?: CSS.Properties;
  lang?: CodeLangType;
  children: ReactNode;
}

export const CodeHighlight: FC<CodeHighlightProps> = ({
  children,
  style,
  lang = 'jsx',
}) => {
  const codeElement = useRef(null);

  useEffect(() => {
    if (Prism) {
      Prism.highlightElement(codeElement.current);
    }
  }, []);

  return (
    <pre style={style}>
      <code ref={codeElement} className={`language-${lang}`}>
        {children}&nbsp;
      </code>
    </pre>
  );
};

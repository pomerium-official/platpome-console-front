import React, { ReactNode } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';

/**
 * Next JS의 Link 렌더링
 * @param href
 * @param children
 */
const linkNext = (href: any, children: ReactNode) => {
  if (href) {
    return (
      <Link href={href} key={v4()}>
        {children}
      </Link>
    );
  }
  return children;
};

export default linkNext;

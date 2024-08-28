import Link from 'next/link';
import React from 'react';
import styles from './FooterMenu.module.scss';

const footerMenuData = [
  // {
  //   title: '소개',
  //   items: [
  //     { name: 'Platpome 홈', link: '/' },
  //     { name: 'API 문서', link: '/' },
  //     { name: '자주묻는 질문', link: '/' },
  //   ],
  // },
  // {
  //   title: '상세 기능',
  //   items: [
  //     { name: 'Create App', link: '/' },
  //     { name: 'Create Token', link: '/' },
  //   ],
  // },
  {
    title: 'Service',
    items: [
      {
        name: 'PomeriumX Console',
        link: `${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/overview/services`,
      },
      {
        name: 'API Document',
        link: `${process.env.NEXT_PUBLIC_DOCUMENT_API_URL}`,
      },
      {
        name: 'Help Center',
        link: `${process.env.NEXT_PUBLIC_HELP_CENTER_URL}`,
      },
    ],
  },
];

const FooterMenu = () => {
  return (
    <div className={`footerMenu ${styles.footerMenu}`}>
      <Link href="/">
        <h1>pomeriumX</h1>
      </Link>
      <div className="menus">
        {footerMenuData.map((v, i) => {
          return (
            <dl key={`${v.title}${i}`}>
              <dt>{v.title}</dt>
              {v.items.map((w, j) => {
                return (
                  <dd key={`${v.title}${w.name}${j}`}>
                    <a href={w.link} rel="noreferrer" target={'_blank'}>
                      {w.name}
                    </a>
                  </dd>
                );
              })}
            </dl>
          );
        })}
      </div>
    </div>
  );
};

export default FooterMenu;

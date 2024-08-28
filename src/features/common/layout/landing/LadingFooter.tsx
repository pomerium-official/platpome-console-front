import Link from 'next/link';
import React from 'react';

const snsData = [
  // {
  //   name: 'twitter',
  //   src: '/assets/images/platpome/icon-twitter.svg',
  //   link: '/',
  // },
  {
    name: 'X',
    src: '/assets/images/icons/icon-pome-x.svg',
    link: '/',
  },
  {
    name: 'discode',
    src: '/assets/images/platpome/icon-discode.svg',
    link: '/',
  },
  {
    name: 'telegram',
    src: '/assets/images/platpome/icon-telegram.svg',
    link: '/',
  },
  {
    name: 'medium',
    src: '/assets/images/platpome/icon-medium.svg',
    link: '/',
  },
];

interface LandingFooterProps {
  addContent?: React.ReactNode;
}

const LandingFooter = ({ addContent }: LandingFooterProps) => {
  return (
    <div className="footer">
      {addContent}
      <div className="footerInner">
        <div className="buttons">
          <div className="left">
            <ul>
              <li>
                <Link
                  href={`${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/provision/private-policy`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={`${process.env.NEXT_PUBLIC_DOCUMENT_CONSOLE_URL}/provision/terms-of-service`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
            Contact us
            <a href="mailto:contact@pomerium.space">contact@pomerium.space</a>
          </div>
          <div className="right">
            <ul>
              {snsData.map((v) => {
                return (
                  <li key={v.name}>
                    <a href={v.link} target={'_blank'} rel="noreferrer">
                      <img src={v.src} alt={v.name} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <p className="address">
          © Pomerium, Inc. all related logos, characters, names and distinctive
          likenesses <br />
          there of are exclusive property of Pomerium, Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingFooter;

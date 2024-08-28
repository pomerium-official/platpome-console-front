import React from 'react';
import styles from './Logos.module.scss';

const logoData = [
  '/assets/images/platpome/logo-bnb-chain.svg',
  '/assets/images/platpome/logo-cosmic-guild.svg',
  '/assets/images/platpome/logo-openblox.svg',
  '/assets/images/platpome/logo-trantor.svg',
  '/assets/images/platpome/logo-kyberswap.svg',
  '/assets/images/platpome/logo-tofunft.svg',
  '/assets/images/platpome/logo-metamask.svg',
];

const Logos = () => {
  return (
    <div className={`logos ${styles.logos}`}>
      <div className="rail">
        <ul>
          {logoData.map((v, i) => {
            return (
              <li key={v + i}>
                <img src={v} alt="" />
              </li>
            );
          })}
        </ul>
        <ul>
          {logoData.map((v, i) => {
            return (
              <li key={v + '0' + i}>
                <img src={v} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Logos;

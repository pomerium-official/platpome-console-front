import React, { useEffect, useState } from 'react';
import styles from './Section03.module.scss';
import CountUp from 'react-countup';

const Section03 = () => {
  const [countStart, setCountStart] = useState(false);
  useEffect(() => {
    const wHeight = window.innerHeight / 2;
    const onScrolling = () => {
      const cont01Top = (document.querySelector(
        '.section03 .content01'
      ) as HTMLElement)?.getBoundingClientRect();
      const cont02Top = (document.querySelector(
        '.section03 .content02'
      ) as HTMLElement)?.getBoundingClientRect();
      const cont03Top = (document.querySelector(
        '.section03 .content03'
      ) as HTMLElement)?.getBoundingClientRect();
      const cont04Top = (document.querySelector(
        '.section03 .content04'
      ) as HTMLElement)?.getBoundingClientRect();
      // const st = window.scrollY;
      // console.log(cont01Top, cont02Top, cont04Top);
      if (cont01Top?.y - wHeight <= 0) {
        document
          .querySelector('.section03 .content01')
          ?.classList.add('action');
        setCountStart(true);
      }
      if (cont02Top?.y - wHeight <= 0) {
        document
          .querySelector('.section03 .content02')
          ?.classList.add('action');
      }
      if (cont03Top?.y - wHeight <= 0) {
        document
          .querySelector('.section03 .content03')
          ?.classList.add('action');
      }
      if (cont04Top?.y - wHeight <= 0) {
        document
          .querySelector('.section03 .content04')
          ?.classList.add('action');
      }
    };
    window.addEventListener('scroll', onScrolling);
    return () => window.removeEventListener('scroll', onScrolling);
  }, []);

  return (
    <div className={`section03 ${styles.section03}`}>
      <div className="content01">
        <strong className="pomerium">Pomerium</strong>
        <p className="txt01">Pomerium continues to grow steadily and</p>
        <p className="txt02">provides a solid foundation.</p>
        <ul>
          <li>
            <strong>
              <CountUp end={countStart ? 162 : 0} duration={4} />K +
            </strong>
            Pomerium Community members
          </li>
          <li>
            <strong>
              $ <CountUp end={countStart ? 14 : 0} duration={4} />K +
            </strong>
            PMR-PMG market capitalization
          </li>
          <li>
            <strong>
              <CountUp end={countStart ? 3 : 0} duration={4} />.
              <CountUp end={countStart ? 7 : 0} duration={4} />K +
            </strong>
            Active Guardians
          </li>
        </ul>
      </div>
      <div className="content02">
        <div>
          <dl>
            <dt>
              <span className="gradient">Start</span>
              <strong>
                <span className="txt01">If you want to try something </span>
                <span className="txt02">
                  new, start with <span className="gradient">PomeriumX!</span>
                </span>
              </strong>
            </dt>
            <dd>
              <span className="txt03">
                I want to move my existing Web2.0 game to Web3.0 environment.
              </span>
              <span className="txt04">
                I want to use the existing game money in a new game.
              </span>
              <span className="txt05">
                I want to quickly attract new users by developing a Web3.0 game.
              </span>
              <span className="txt06">
                I want to build a game company's own ecosystem by minting
                tokens.
              </span>
            </dd>
          </dl>
          <img
            className="rocket"
            src="/assets/images/platpome/img-rocket-x.png"
            alt=""
          />
        </div>
      </div>
      <div className="content03">
        <div>
          <p>Explore our main features!</p>
        </div>
      </div>
      <div className="content04">
        <div>
          <dl>
            <dt>
              <span className="gradient">Apps</span>
              <span className="txt01">Create various Web3.0 game apps</span>
            </dt>
            <dd className="txt02">Various Web3.0 games can be developed.</dd>
          </dl>
          <img
            className="img01"
            src="/assets/images/platpome/img-content04.png"
            alt=""
          />
          <img
            className="img02"
            src="/assets/images/platpome/img-content0401.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Section03;

import React, { useEffect } from 'react';
import { content } from './content';
import style from './companies-using-kedro.module.scss';

export default function CompaniesUsingKedro() {
  useEffect(() => {
    createWordListAnimation(
      document.querySelector(`.${style.animation}`),
      3000
    );
  }, []);

  function createWordListAnimation(
    animationWrapper: HTMLMediaElement,
    delay: number
  ) {
    const listWrapper = animationWrapper.querySelector('ul');
    const allCompanies = listWrapper.querySelectorAll('li');

    function goTo(liNum: number) {
      const company = allCompanies[liNum];

      const allCompaniesTop = company.getBoundingClientRect().top;
      const listWrapperTop = listWrapper.getBoundingClientRect().top;

      listWrapper.style.top = -(allCompaniesTop - listWrapperTop) + 'px';
    }

    let current = 2;

    let ascending = true;

    return setInterval(function () {
      allCompanies[current].className = '';

      ascending =
        (ascending && current + 3 < allCompanies.length) || current === 2;
      current = ascending ? current + 1 : current - 1;

      goTo(current);

      allCompanies[current].className = style.active;
    }, delay);
  }

  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.left}>
          <p className={style.title}>Used and loved by </p>
        </div>
        <div className={style.right}>
          <div className={style.animation}>
            <ul>
              <li>Leapfrog</li>
              <li>Naranja</li>
              {content.map((listContent, i) => (
                <li key={i} className={i == 0 ? style.active : ''}>
                  {listContent}
                </li>
              ))}
              <li>Beamery</li>
              <li>Telkomsel</li>
            </ul>
          </div>
          <div className={style.animationMask}></div>
        </div>
      </div>
    </section>
  );
}

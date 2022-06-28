import React, { useEffect } from 'react';
import style from './companies-using-kedro.module.scss';

export const companies = [
  'Telkomsel',
  'NASA',
  'Belfius',
  'Sber',
  'Augment Partners',
  'McKinsey & Company',
  'GetInData',
  'Indicium',
  'NHS',
  'GMO',
  'QuantumBlack',
  'XP',
  'AI Singapore',
  'Helvetas',
  'Leapfrog',
  'Naranja',
];

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

    function changeCompany(companyIndex: number) {
      const company = allCompanies[companyIndex];

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

      changeCompany(current);

      allCompanies[current].className = style.active;
    }, delay);
  }
  // Added two <li> hard-coded elements on top and bottom to make the animation consistent with design.
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.left}>
          <span className={style.title}>Used and loved by </span>
        </div>
        <div className={style.right}>
          <div className={style.animation}>
            <ul>
              <li>Leapfrog</li>
              <li>Naranja</li>
              {companies.map((company, i) => (
                <li key={i} className={i == 0 ? style.active : ''}>
                  {company}
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

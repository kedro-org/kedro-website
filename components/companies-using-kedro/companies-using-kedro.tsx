import React, { useEffect } from 'react';
import { companies } from './companies-using-kedro-content';

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
              <li>
                <a
                  href="https://www.lftechnology.com/blog/ai-pipeline-kedro/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Leapfrog
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/quantumblack/odelsa-uses-kedro-for-social-good-3c7e7fc20306"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Naranja
                </a>
              </li>
              {companies.map((company, i) => (
                <li key={i} className={i == 0 ? style.active : ''}>
                  <a
                    href={company.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {company.name}{' '}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://medium.com/hacking-talent/production-code-for-data-science-and-our-experience-with-kedro-60bb69934d1f"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Beamery
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/life-at-telkomsel/how-we-build-a-production-grade-data-pipeline-7004e56c8c98"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Telkomsel
                </a>
              </li>
            </ul>
          </div>
          <div className={style.animationMask}></div>
        </div>
      </div>
    </section>
  );
}

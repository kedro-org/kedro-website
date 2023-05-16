import React from 'react';
import Image from 'next/image';
import { companies } from './companies-using-kedro-content';

import style from './companies-using-kedro.module.scss';

export default function CompaniesUsingKedro() {
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <span className={style.title}>Our community</span>
        <div className={style.bannerOuter}>
          <div className={style.bannerInner}>
            <div className={style.animateWrapper}>
              {companies.map((company) => (
                <Image
                  priority
                  className={style.company}
                  key={company.name}
                  alt={`${company.name} logo`}
                  height="120px"
                  src={company.logo}
                  width="308px"
                />
              ))}
            </div>
            <div className={style.animateWrapper}>
              {companies.map((company) => (
                <Image
                  priority
                  className={style.company}
                  key={company.name}
                  alt={`${company.name} logo`}
                  height="120px"
                  src={company.logo}
                  width="308px"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

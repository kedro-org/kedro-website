import React from 'react';
import Image from 'next/image';
import { companies } from './companies-using-kedro-content';

import style from './companies-using-kedro.module.scss';

export default function CompaniesUsingKedro() {
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.titleContainer}>
          <span role="titleText" className={style.title}>
            Our community
          </span>
        </div>
        <div className={style.carouselWrapper}>
          <div className={style.carouselAnimate}>
            {companies.map((company) => (
              <Image
                loading="eager" // for Safari
                className={style.company}
                key={company.name}
                alt={`${company.name} logo`}
                height="120px"
                src={company.logo}
                width="308px"
              />
            ))}
          </div>
          {/* Repeating the companies block to create a circular animation */}
          <div className={style.carouselAnimate}>
            {companies.map((company) => (
              <Image
                loading="eager" // for Safari
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
    </section>
  );
}

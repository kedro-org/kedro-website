import React from 'react';
import Image from 'next/image';
import { companies } from './companies-using-kedro-content';
import { defaultImageStyle } from '../../../utils/blog';

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
                // for Safari
                loading="eager"
                className={style.company}
                key={company.name}
                alt={`${company.name} logo`}
                height={120}
                src={company.logo}
                style={defaultImageStyle}
                width={308}
              />
            ))}
          </div>
          {/* Repeating the companies block to create a circular animation */}
          <div className={style.carouselAnimate}>
            {companies.map((company) => (
              <Image
                // for Safari
                loading="eager"
                className={style.company}
                key={company.name}
                alt={`${company.name} logo`}
                height={120}
                src={company.logo}
                style={defaultImageStyle}
                width={308}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Image from 'next/image';
import { companies } from './companies-using-kedro-content';

import style from './companies-using-kedro.module.scss';

export default function CompaniesUsingKedro() {
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.left}></div>
        <div className={style.right}>
          <ul className={style.list}>
            {companies.map((company) => (
              <li className={style.company} key={company.name}>
                <a
                  href={company.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={`${company.name} logo`}
                    height="120px"
                    src={company.logo}
                    width="308px"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

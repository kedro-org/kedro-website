import React from 'react';
import { companies } from './companies-using-kedro-content';

import style from './companies-using-kedro.module.scss';

export default function CompaniesUsingKedro() {
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.left}>
          <h3 className={style.sectionTitle}>Used and loved by</h3>
        </div>
        <div className={style.right}>
          <ul className={style.list}>
            {companies.map((company) => (
              <li className={style.company} key={company.name}>
                <a
                  href={company.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {company.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

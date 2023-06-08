import CaseStudiesCard from '../case-studies-card';
import { content } from './case-studies-content';

import style from './case-studies.module.scss';

export default function CaseStudies() {
  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <h3 className={style.sectionTitle}>Case studies</h3>
        <div className={style.cards}>
          {content.map((cardContent, i) => (
            <CaseStudiesCard key={i} {...cardContent} />
          ))}
        </div>
      </div>
    </section>
  );
}

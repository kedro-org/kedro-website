import CaseStudiesCard from '../case-studies-card';
import { content } from './content';

import style from './case-studies.module.scss';

export default function CaseStudies() {
  return (
    <section className={style.container}>
      <h3 className={style.sectionTitle}>Case Studies</h3>
      <div className={style.cards}>
        {content.map((cardContent, i) => (
          <CaseStudiesCard
            title={cardContent.title}
            text={cardContent.text}
            logo={cardContent.logo}
            linkUrl={cardContent.linkUrl}
            linkText={cardContent.linkText}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}

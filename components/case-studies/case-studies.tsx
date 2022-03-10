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
            key={i}
            linkText={cardContent.linkText}
            linkUrl={cardContent.linkUrl}
            logo={cardContent.logo}
            text={cardContent.text}
            title={cardContent.title}
          />
        ))}
      </div>
    </section>
  );
}

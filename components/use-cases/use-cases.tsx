import TelkonselLogo from '../../assets/logos/telkonsel';
import UseCasesCard from '../use-cases-card';
import { content } from './content';

import style from './use-cases.module.scss';

export default function UseCases() {
  return (
    <div className={style.container}>
      <h3 className={style.sectionTitle}>Use Cases</h3>
      <div className={style.cards}>
        {content.map((cardContent, i) => (
          <UseCasesCard
            title={cardContent.title}
            text={cardContent.text}
            logo={cardContent.logo}
            linkUrl={cardContent.linkUrl}
            linkText={cardContent.linkText}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

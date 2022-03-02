import TelkonselLogo from '../../assets/logos/telkonsel';
import UseCasesCard from '../use-cases-card';
import { content } from './content';

import style from './use-cases.module.scss';

export default function UseCases() {
  return (
    <div className={style.container}>
      <h3 className={style.sectionTitle}>Use Cases</h3>
      <div className={style.cards}>
        <UseCasesCard
          title={content[0].title}
          text={content[0].text}
          logo={content[0].logo}
          linkUrl={content[0].linkUrl}
          linkText={content[0].linkText}
        />
        <UseCasesCard
          title={content[1].title}
          text={content[1].text}
          logo={content[1].logo}
          linkUrl={content[1].linkUrl}
          linkText={content[1].linkText}
        />
      </div>
    </div>
  );
}

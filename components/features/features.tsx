import { useState } from 'react';

import { hiddenContent, shownContent } from './features-content';
import FeatureDetailsCard from '../feature-details-card';

import style from './features.module.scss';

export default function Hero() {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <section id="features" className={style.outer}>
      <div className={style.inner}>
        <h3 className={style.sectionTitle}>Features</h3>
        {shownContent.map((featureContent) => {
          return (
            <FeatureDetailsCard
              key={featureContent.title}
              {...featureContent}
            />
          );
        })}
        <div style={{ display: showMoreFeatures ? 'block' : 'none' }}>
          {hiddenContent.map((featureContent) => {
            return (
              <FeatureDetailsCard
                key={featureContent.title}
                {...featureContent}
              />
            );
          })}
        </div>
        <div className={style.buttonWrapper}>
          <button
            className={style.button}
            onClick={() => setShowMoreFeatures(!showMoreFeatures)}
          >
            Show {showMoreFeatures ? 'fewer' : 'more'} features
          </button>
        </div>
      </div>
    </section>
  );
}

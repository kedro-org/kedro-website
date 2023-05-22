import { useState } from 'react';

import { hiddenContent, shownContent } from './features-content';
import FeatureDetailsCard from '../feature-details-card';

import style from './features.module.scss';

export default function Hero() {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <section className={style.outer} id="features">
      <div className={style.inner}>
        <h3 className={style.sectionTitle}>Features</h3>
        {shownContent.map((featureContent, index) => {
          return (
            <FeatureDetailsCard
              key={featureContent.title}
              index={index}
              {...featureContent}
            />
          );
        })}
        <div style={{ display: showMoreFeatures ? 'block' : 'none' }}>
          {hiddenContent.map((featureContent, index) => {
            return (
              <FeatureDetailsCard
                key={featureContent.title}
                index={shownContent.length + index}
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
            Show {showMoreFeatures ? 'Fewer' : 'More'} Features
          </button>
        </div>
      </div>
    </section>
  );
}

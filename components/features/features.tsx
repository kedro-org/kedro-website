import { useState } from 'react';

import { hiddenContent, shownContent } from './features-content';
import FeatureDetailsCard from '../feature-details-card';

import style from './features.module.scss';

export default function Hero() {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <section id="features" className={style.features}>
      <h3 className={style.sectionTitle}>Features</h3>
      {shownContent.map((featureContent) => {
        return (
          <FeatureDetailsCard
            altText={featureContent.altText}
            assetPosition={featureContent.assetPosition}
            buttonLink={featureContent.buttonLink}
            buttonText={featureContent.buttonText}
            imageSrc={featureContent.imageSrc}
            key={featureContent.title}
            subtitle={featureContent.subtitle}
            title={featureContent.title}
          />
        );
      })}
      {showMoreFeatures ? (
        <>
          {hiddenContent.map((featureContent) => {
            return (
              <FeatureDetailsCard
                altText={featureContent.altText}
                assetPosition={featureContent.assetPosition}
                buttonLink={featureContent.buttonLink}
                buttonText={featureContent.buttonText}
                imageSrc={featureContent.imageSrc}
                key={featureContent.title}
                subtitle={featureContent.subtitle}
                title={featureContent.title}
              />
            );
          })}
        </>
      ) : null}
      <div className={style.buttonWrapper}>
        <button
          className={style.button}
          onClick={() => setShowMoreFeatures(!showMoreFeatures)}
        >
          Show {showMoreFeatures ? 'fewer' : 'more'} features
        </button>
      </div>
    </section>
  );
}

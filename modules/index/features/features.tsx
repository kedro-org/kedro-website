import { useState, useEffect } from 'react';

import { hiddenContent, shownContent } from './features-content';
import FeatureDetailsCard from '../feature-details-card';
import vizScreenshotMobile from '../../../public/images/viz-screenshot-mobile.png';

import style from './features.module.scss';

export default function Hero() {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [showMobileSize, setShowMobileSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setShowMobileSize(true);
      } else {
        setShowMobileSize(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              imageSrc={
                index === 0 && showMobileSize
                  ? vizScreenshotMobile
                  : featureContent.imageSrc
              }
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
            Show {showMoreFeatures ? 'fewer' : 'more'} features
          </button>
        </div>
      </div>
    </section>
  );
}

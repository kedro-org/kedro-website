import React from 'react';

import { demoData, Demo } from './demo-data';

import style from './demo-section.module.scss';

const DemoSection = () => {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <h2 className={style.heading}>Demos</h2>
        <p className={style.subtitle}>
          In-depth walkthroughs and hands-on tutorials.
        </p>

        {demoData.length === 0 ? (
          <div className={style.emptyState}>
            <p className={style.emptyStateText}>
              Come back for our new demos! Stay tuned!
            </p>
          </div>
        ) : (
          <div className={style.grid}>
            {demoData.map((demo: Demo) => (
              <div key={demo.videoSrc} className={style.card}>
                <div className={style.videoWrapper}>
                  <video
                    controls
                    className={style.video}
                    poster={demo.posterSrc}
                  >
                    <source src={demo.videoSrc} type="video/mp4" />
                  </video>
                </div>
                <p className={style.cardTitle}>{demo.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;

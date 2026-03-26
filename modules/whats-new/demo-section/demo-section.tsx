import React from 'react';

import { demoData, demoBrowseAllUrl, Demo } from './demo-data';

import style from './demo-section.module.scss';

const DemoSection = () => {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <h2 className={style.heading}>Demos</h2>
        <p className={style.subtitle}>In-depth walkthroughs and tutorials.</p>

        {demoData.length === 0 ? (
          <div className={style.emptyState}>
            <p className={style.emptyStateText}>
              Come back for our new demos! Stay tuned!
            </p>
          </div>
        ) : (
          <div className={style.grid}>
            {demoData.map((demo: Demo) => (
              <a
                key={demo.youtubeUrl}
                href={demo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={style.card}
              >
                <div className={style.thumbnailWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={demo.thumbnailUrl}
                    alt={demo.title}
                    className={style.thumbnail}
                  />
                  {demo.duration && (
                    <span className={style.duration}>{demo.duration}</span>
                  )}
                </div>
                <p className={style.cardTitle}>{demo.title}</p>
              </a>
            ))}
          </div>
        )}

        {demoBrowseAllUrl && (
          <div className={style.browseAll}>
            <a
              href={demoBrowseAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={style.browseAllLink}
            >
              Browse all Demos &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;

import React, { useState } from 'react';
import Image from 'next/image';

import { demoData, Demo } from './demo-data';

import style from './demo-section.module.scss';

const DemoSection = () => {
  const [activeVideos, setActiveVideos] = useState<string[]>([]);

  const handlePlayVideo = (videoSrc: string) => {
    setActiveVideos((currentVideos) =>
      currentVideos.includes(videoSrc)
        ? currentVideos
        : [...currentVideos, videoSrc]
    );
  };

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
            {demoData.map((demo: Demo) => {
              const isVideoActive = activeVideos.includes(demo.videoSrc);

              return (
                <div key={demo.videoSrc} className={style.card}>
                  <div className={style.videoWrapper}>
                    {isVideoActive ? (
                      <video
                        autoPlay
                        controls
                        className={style.video}
                        playsInline
                      >
                        <source src={demo.videoSrc} type="video/mp4" />
                      </video>
                    ) : (
                      <button
                        type="button"
                        className={style.videoPosterButton}
                        onClick={() => handlePlayVideo(demo.videoSrc)}
                        aria-label={`Play demo: ${demo.title}`}
                      >
                        <Image
                          alt=""
                          src={demo.posterSrc}
                          fill
                          sizes="(max-width: 819px) 100vw, (max-width: 1234px) 50vw, 33vw"
                          className={style.posterImage}
                        />
                        <span className={style.durationBadge}>{demo.duration}</span>
                        <span className={style.posterOverlay}>
                          <span className={style.playIcon} aria-hidden="true" />
                        </span>
                      </button>
                    )}
                  </div>
                  <p className={style.cardTitle}>{demo.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;

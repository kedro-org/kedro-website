import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tabData } from './why-kedro-data';

import style from './why-kedro.module.scss';

export default function WhyKedro() {
  const [selectedTab, setSelectedTab] = useState(tabData[0]);

  return (
    <section className={style.outer} id="why-kedro">
      <div className={style.inner}>
        <h3 className={style.title}>Why Kedro?</h3>
        <div className={style.mediaWrapper}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="100%"
            loading="lazy"
            src="https://www.youtube-nocookie.com/embed/5-RnVQrM8I8?modestbranding=1&rel=0"
            title="YouTube video player"
            width="100%"
          ></iframe>
        </div>
        <div className={style.contentWrapper}>
          {tabData.map((data, i) => {
            return (
              <div className={style.contentBlock} key={i}>
                <div className={style.label}>{data.label}</div>
                <div className={style.description}>{data.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

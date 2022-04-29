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
        <div className={style.tabsWrapper}>
          <ul className={style.list} role="tablist">
            {tabData.map((item) => {
              return (
                <li
                  aria-selected={item === selectedTab}
                  key={item.label}
                  className={
                    item === selectedTab
                      ? `${style.selected} ${style.listItem}`
                      : style.listItem
                  }
                  onClick={() => setSelectedTab(item)}
                  role="tab"
                >
                  {item.label}
                  {item === selectedTab ? (
                    <motion.div className={style.underline} layoutId="tab" />
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className={style.gradient}></div>
        </div>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={style.tabContent}
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
            key={selectedTab ? selectedTab.label : null}
            role="tabpanel"
            transition={{ duration: 0.1 }}
          >
            {selectedTab.description}
          </motion.p>
        </AnimatePresence>
        <div className={style.mediaWrapper}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="100%"
            loading="lazy"
            src="https://www.youtube-nocookie.com/embed/yEQqf3XUvzk?modestbranding=1&rel=0"
            title="YouTube video player"
            width="100%"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tabData } from './why-kedro-data';

import image from '../../public/images/why-kedro.png';
import Media from '../media';

import style from './why-kedro.module.scss';

export default function WhyKedro() {
  const [selectedTab, setSelectedTab] = useState(tabData[0]);

  return (
    <div className={style.container}>
      <h3 className={style.title}>Why Kedro?</h3>
      <div className={style.tabsWrapper}>
        <ul className={style.list}>
          {tabData.map((item) => (
            <li
              key={item.label}
              className={
                item === selectedTab
                  ? `${style.selected} ${style.listItem}`
                  : style.listItem
              }
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div className={style.underline} layoutId="tab" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className={style.tabContent}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          key={selectedTab ? selectedTab.label : null}
          transition={{ duration: 0.1 }}
        >
          {selectedTab.description}
        </motion.p>
      </AnimatePresence>
      <Media source={image} />
    </div>
  );
}

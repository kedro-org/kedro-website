import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tabData } from './why-kedro-data';

import image from '../../public/images/whykedro.png';
import Media from '../media';

import style from './why-kedro.module.scss';

export default function WhyKedro() {
  const [selectedTab, setSelectedTab] = useState(tabData[0]);

  return (
    <div className={style.window}>
      <h3 className={style.title}>Why Kedro?</h3>
      <div className={style.nav}>
        <ul className={style.ul}>
          {tabData.map((item) => (
            <li
              key={item.label}
              className={
                item === selectedTab
                  ? `${style.selected} ${style.li}`
                  : style.li
              }
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div className={style.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.main}>
        <AnimatePresence exitBeforeEnter>
          <React.Fragment key={selectedTab ? selectedTab.label : null}>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className={style.conceptContent}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1 }}
            >
              {selectedTab.description}
            </motion.p>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15 }}
            >
              {selectedTab ? selectedTab.icon : null}
            </motion.div>
          </React.Fragment>
        </AnimatePresence>
      </div>
    </div>
  );
}

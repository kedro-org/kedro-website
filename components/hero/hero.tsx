import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Media from '../media';
import hero from '../../public/images/hero.webp';

import style from './hero.module.scss';

const variants = {
  enter: (wordIndex: number) => {
    return {
      opacity: 1,
      y: wordIndex === 0 ? 100 : -100,
    };
  },
  center: (wordIndex: number) => {
    return {
      opacity: 1,
      transition: {
        duration: 0.35,
      },
      width: wordIndex === 0 ? 465 : 298,
      y: 0,
    };
  },
  exit: (wordIndex: number) => {
    return {
      opacity: 1,
      transition: {
        duration: 0.35,
      },
      width: wordIndex === 0 ? 465 : 298,
      y: wordIndex === 0 ? -100 : 100,
    };
  },
};

const headerText = ['Maintainable', 'Modular'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(wordIndex === 0 ? 1 : 0);
    }, 5500);

    return () => clearInterval(interval);
  });

  return (
    <section className={style.container}>
      <div className={style.row}>
        <div className={style.info}>
          <h1 className={style.title}>
            <div className={style.outerHeader}>
              <div className={style.innerHeader}>
                <AnimatePresence
                  custom={wordIndex}
                  exitBeforeEnter
                  initial={false}
                >
                  <motion.div
                    animate="center"
                    custom={wordIndex}
                    exit="exit"
                    initial="enter"
                    key={wordIndex}
                    variants={variants}
                  >
                    {headerText[wordIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <span>data </span>
              <span>science </span>
              <span>solved</span>
            </div>
          </h1>
          <h2 className={style.subtitle}>
            Kedro is an open-sourced Python framework for creating maintainable
            and modular data science code.
          </h2>
          <div className={style.buttons}>
            <a
              href="https://kedro.readthedocs.io/en/stable/02_get_started/01_prerequisites.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.start}>Get Started</button>
            </a>
            <a
              href="https://kedro.readthedocs.io/en/stable/03_tutorial/01_spaceflights_tutorial.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.tutorial}>Take the Tutorial</button>
            </a>
          </div>
        </div>
        <div className={style.image}>
          <Media alt="Kedro logo" image={hero} />
        </div>
      </div>
      <div className={style.video}>
        <Media poster="/images/intro-poster.jpg" video="/kedro.mp4" />
      </div>
    </section>
  );
}

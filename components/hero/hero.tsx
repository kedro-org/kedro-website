import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Size, useWindowSize } from '../../utils/hooks/useWindowSize';

import Media from '../media';
import hero from '../../public/images/hero.webp';

import style from './hero.module.scss';

const headerText = [
  { width: 465, word: 'Maintainable' },
  { width: 298, word: 'Modular' },
];
const MOBILE_BREAKPOINT = 819;
const BUTTON_HEIGHT = 48; // 3rem.

function computeVariants(isMobile: boolean) {
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
        width: isMobile ? '100%' : headerText[wordIndex].width,
        y: 0,
      };
    },
    exit: (wordIndex: number) => {
      return {
        opacity: 1,
        transition: {
          duration: 0.35,
        },
        width: isMobile ? '100%' : headerText[wordIndex].width,
        y: wordIndex === 0 ? -100 : 100,
      };
    },
  };

  return variants;
}

const buttonTransition = {
  damping: 40,
  stiffness: 500,
  type: 'spring',
};

export default function Hero() {
  const size: Size = useWindowSize();
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    size.width > MOBILE_BREAKPOINT ? false : true
  );

  useEffect(() => {
    setIsMobile(size.width > MOBILE_BREAKPOINT ? false : true);
  }, [size]);

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
              <div className={style.animatingWord}>
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
                    variants={computeVariants(isMobile)}
                  >
                    {headerText[wordIndex].word}
                  </motion.div>
                </AnimatePresence>
              </div>
              <span>data</span>
              <span>science</span>
              <span>solved</span>
            </div>
          </h1>
          <h2 className={style.subtitle}>
            Kedro is an open-sourced Python framework for creating maintainable
            and modular data science code.
          </h2>
          <div className={style.buttons}>
            <motion.div
              animate="visible"
              className={style.buttonWrapper}
              initial="hidden"
              whileHover="hover"
            >
              <a
                href="https://kedro.readthedocs.io/en/stable/02_get_started/01_prerequisites.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className={style.start}
                  transition={buttonTransition}
                  variants={{
                    hidden: { y: 0 },
                    hover: { y: BUTTON_HEIGHT },
                  }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  className={style.letsGo}
                  transition={buttonTransition}
                  variants={{
                    hidden: { y: -BUTTON_HEIGHT },
                    hover: { y: 0 },
                  }}
                >
                  Let&apos;s go!
                </motion.button>
              </a>
            </motion.div>
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

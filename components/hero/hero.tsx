import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Media from '../media';
import hero from '../../public/images/hero.webp';

import style from './hero.module.scss';

const headerText = ['Maintainable', 'Modular'];

const headerVariants = {
  enter: (wordIndex: number) => {
    return {
      opacity: 1,
      y: wordIndex === 0 ? 100 : -100,
    };
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
    y: 0,
  },
  exit: (wordIndex: number) => {
    return {
      opacity: 1,
      transition: {
        duration: 0.35,
      },
      y: wordIndex === 0 ? -100 : 100,
    };
  },
};

const buttonTransition = {
  damping: 40,
  stiffness: 500,
  type: 'spring',
};

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(wordIndex === 0 ? 1 : 0);
    }, 4250);

    return () => clearInterval(interval);
  });

  return (
    <section className={style.container}>
      <div className={style.row}>
        <div className={style.info}>
          <h1 className={style.title}>
            <div className={style.outerHeader}>
              <div className={style.animatingWord}>
                <AnimatePresence custom={wordIndex} exitBeforeEnter>
                  <motion.div
                    animate="center"
                    custom={wordIndex}
                    exit="exit"
                    initial="enter"
                    key={wordIndex}
                    variants={headerVariants}
                  >
                    {headerText[wordIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              data science solved
            </div>
          </h1>
          <h2 className={style.subtitle}>
            Kedro is an open sourced Python framework for creating maintainable
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
                href="https://docs.kedro.org/en/stable/get_started/install.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className={style.start}
                  transition={buttonTransition}
                  variants={{
                    hidden: { opacity: 1 },
                    hover: { opacity: 0 },
                  }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  className={style.letsGo}
                  transition={buttonTransition}
                  variants={{
                    hidden: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                >
                  Let&apos;s go!
                </motion.button>
              </a>
            </motion.div>
            <a
              href="https://docs.kedro.org/en/stable/tutorial/spaceflights_tutorial.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.tutorial}>Take the Tutorial</button>
            </a>
          </div>
        </div>
        <div className={style.image}>
          <Media
            alt="Kedro logo"
            image={hero}
            placeholder="empty"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}

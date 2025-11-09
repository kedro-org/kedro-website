import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultImageStyle } from '../../../utils/blog';

import hero from '../../../public/images/hero-update.svg';

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
              data pipelines solved
            </div>
          </h1>
          <h2 className={style.subtitle}>
            Kedro is a toolbox for production-ready data pipelines.
          </h2>
          <div className={style.buttons}>
            <motion.div
              animate="visible"
              className={style.buttonWrapper}
              initial="hidden"
              whileHover="hover"
            >
              <Link href="/#get-started" className={style.link} passHref>
                <motion.button
                  className={style.start}
                  transition={buttonTransition}
                  variants={{
                    hidden: { opacity: 1 },
                    hover: { opacity: 0 },
                  }}
                >
                  Get started
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
              </Link>
            </motion.div>
          </div>
        </div>
        <div className={style.image}>
          <Image
            alt="Kedro hero graphic"
            priority={true}
            src={hero}
            style={defaultImageStyle}
          />
        </div>
      </div>
    </section>
  );
}

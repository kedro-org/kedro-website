import { useState } from 'react';
import { StaticImageData } from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials } from './testimonial-content';

import Image from 'next/image';
import Media from '../../shared/media';

import style from './testimonials.module.scss';

type Props = {
  testimonial: Testimonial;
  view: 'mobile' | 'desktop';
};

type Testimonial = {
  headline: string;
  jobTitle: string;
  linkText: string;
  linkUrl: string;
  logo: string;
  logoWidth: number;
  text: string;
  user: string;
  userImage: StaticImageData;
};

const UserDescription = ({ testimonial, view }: Props) => {
  return (
    <div className={`${style[view]}`}>
      {/* Dynamic maxWidth needed to size and position logos correctly. */}
      <div className={style.logo} style={{ maxWidth: testimonial.logoWidth }}>
        <Image alt="Company logo" layout="fill" src={testimonial.logo} />
      </div>
      <p className={style.user}>
        {testimonial.user},{' '}
        <span className={style.jobTitle}>{testimonial.jobTitle}</span>
      </p>
    </div>
  );
};

const containerVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const textVariants = {
  enter: {
    x: 0,
  },
  center: {
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
    x: 0,
  },
  exit: {
    transition: {
      duration: 0.5,
    },
    x: -40,
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section className={style.outer}>
      <h3 className={style.sectionTitle}>Testimonials</h3>
      <div className={style.inner}>
        <div className={style.carousel}>
          <AnimatePresence initial={false}>
            <motion.div
              animate="center"
              className={style.slide}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              exit="exit"
              initial="enter"
              key={index}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  // Swipe left
                  setIndex(
                    index + 1 === testimonials.length ? index : index + 1
                  );
                } else if (swipe > swipeConfidenceThreshold) {
                  // Swipe right
                  setIndex(index - 1 === -1 ? index : index - 1);
                }
              }}
              variants={containerVariants}
            >
              <UserDescription
                testimonial={testimonials[index]}
                view="mobile"
              />
              <motion.div
                className={style.userImage}
                exit={{
                  opacity: 0,
                  scale: 0.75,
                  transition: {
                    duration: 0.4,
                  },
                }}
              >
                <Media
                  alt={testimonials[index].user}
                  image={testimonials[index].userImage}
                  layout="fill"
                />
              </motion.div>
              <motion.div variants={textVariants}>
                <UserDescription
                  testimonial={testimonials[index]}
                  view="desktop"
                />
                <h4 className={style.headline}>
                  {testimonials[index].headline}
                </h4>
                <p className={style.quote}>
                  <q>{testimonials[index].text}</q>
                </p>
                <a
                  href={testimonials[index].linkUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className={style.button}>
                    {testimonials[index].linkText}
                  </button>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={style.dots} title="carousel-nav">
        {testimonials.map((testimonial: Testimonial, i: number) => (
          <span
            className={i === index ? `${style.dot} ${style.active}` : style.dot}
            key={testimonial.user}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

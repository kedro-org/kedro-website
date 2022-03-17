import { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from './testimonial-content';

import Image from 'next/image';
import Media from '../media';

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
  text: string;
  user: string;
  userImage: StaticImageData;
};

const UserDescription = ({ testimonial, view }: Props) => {
  return (
    <div className={`${style[view]}`}>
      <div className={style.logo}>
        <Image alt="Company logo" layout="fill" src={testimonial.logo} />
      </div>
      <p className={style.user}>{testimonial.user}</p>
      <p className={style.jobTitle}>{testimonial.jobTitle}</p>
    </div>
  );
};

const variants = {
  enter: (direction: number) => {
    return {
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    };
  },
  center: {
    opacity: 1,
    x: 0,
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
          <motion.div
            animate="center"
            className={style.slide}
            custom={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            exit="exit"
            initial="enter"
            key={index}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                setIndex(index + 1 === testimonials.length ? index : index + 1);
              } else if (swipe > swipeConfidenceThreshold) {
                setIndex(index - 1 === -1 ? index : index - 1);
              }
            }}
            transition={{
              x: {
                damping: 50,
                duration: 0.75,
                stiffness: 500,
                type: 'spring',
              },
              opacity: { duration: 0.75 },
            }}
            variants={variants}
          >
            <UserDescription testimonial={testimonials[index]} view="mobile" />
            <div className={style.userImage}>
              <Media
                alt={testimonials[index].user}
                image={testimonials[index].userImage}
                layout="fill"
              />
            </div>
            <div>
              <UserDescription
                testimonial={testimonials[index]}
                view="desktop"
              />
              <h3 className={style.headline}>{testimonials[index].headline}</h3>
              <p className={style.quote}>
                &#34;{testimonials[index].text}&#34;
              </p>
              <a
                className={style.link}
                href={testimonials[index].linkUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {testimonials[index].linkText}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className={style.dots}>
        {testimonials.map((testimonial: Testimonial, i: number) => (
          <span
            className={style.dot}
            key={testimonial.user}
            onClick={() => setIndex(i)}
            style={{
              background: i === index ? '#C4C4C4' : '#6D6D6D',
            }}
          />
        ))}
      </div>
    </section>
  );
}

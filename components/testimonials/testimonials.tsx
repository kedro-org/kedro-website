import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { testimonials } from './testimonial-content';

import Image from 'next/image';
import Media from '../media';

import style from './testimonials.module.scss';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const newToValue = () => {
      return index * containerRef.current?.clientHeight * -1;
    };

    animate(y, newToValue(), {
      bounce: 0.05,
      damping: 30,
      stiffness: 500,
      type: 'spring',
    });
  }, [index, y]);

  return (
    <section className={style.outer}>
      <h3 className={style.sectionTitle}>Testimonials</h3>
      <div className={style.inner}>
        <div className={style.carousel} ref={containerRef}>
          {testimonials.map((testimonial, i) => (
            <motion.div className={style.slide} key={i} style={{ y }}>
              <div className={style.userImage}>
                <Media
                  alt={testimonial.user}
                  image={testimonial.userImage}
                  layout="fill"
                />
              </div>
              <div>
                <div className={style.logo}>
                  <Image
                    alt="Company logo"
                    layout="fill"
                    src={testimonial.logo}
                  />
                </div>
                <p className={style.user}>{testimonial.user}</p>
                <p className={style.jobTitle}>{testimonial.jobTitle}</p>
                <h3 className={style.headline}>{testimonial.headline}</h3>
                <p className={style.quote}>&#34;{testimonial.text}&#34;</p>
                <a
                  className={style.link}
                  href={testimonial.linkUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {testimonial.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={style.dots}>
          {testimonials.map((testimonial, i) => (
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
      </div>
    </section>
  );
}

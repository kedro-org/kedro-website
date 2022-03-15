import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { testimonials } from './testimonial-content';

import Image from 'next/image';
import Media from '../media';

import style from './testimonials.module.scss';

export default function Testimonials() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const newToValue = () => {
      return index * containerRef.current?.clientWidth * -1;
    };

    animate(x, newToValue(), {
      bounce: 0,
      type: 'spring',
    });
  }, [index, x]);

  return (
    <section className={style.outer}>
      <h3 className={style.sectionTitle}>Testimonials</h3>
      <div className={style.inner}>
        <div className={style.carousel} ref={containerRef}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              className={style.slide}
              key={i}
              style={{
                x,
                left: `${i * 100}%`,
                right: `${i * 100}%`,
              }}
            >
              <div className={style.userImage}>
                <Media alt={testimonial.user} image={testimonial.userImage} />
              </div>
              <div>
                <div className="logo">
                  <Image
                    alt="Case study logo"
                    layout="fill"
                    src={testimonial.logo}
                  />
                </div>
                <p>{testimonial.user}</p>
                <p>{testimonial.jobTitle}</p>
                <h4>{testimonial.callout}</h4>
                <p>{testimonial.text}</p>
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

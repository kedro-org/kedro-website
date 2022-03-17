import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
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

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const newToValue = () => {
      return index * containerRef.current?.clientWidth * -1;
    };

    animate(x, newToValue(), {
      bounce: 0.05,
      damping: 30,
      stiffness: 500,
      type: 'spring',
    });
  }, [index, x]);

  return (
    <section className={style.outer}>
      <h3 className={style.sectionTitle}>Testimonials</h3>
      <div className={style.inner}>
        <div className={style.carousel} ref={containerRef}>
          {testimonials.map((testimonial: Testimonial, i: number) => (
            <motion.div className={style.slide} key={i} style={{ x }}>
              <UserDescription testimonial={testimonial} view="mobile" />
              <div className={style.userImage}>
                <Media
                  alt={testimonial.user}
                  image={testimonial.userImage}
                  layout="fill"
                />
              </div>
              <div>
                <UserDescription testimonial={testimonial} view="desktop" />
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

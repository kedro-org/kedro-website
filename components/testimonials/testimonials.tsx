import { useEffect, useRef, useState } from 'react';
import {
  animate,
  AnimationOptions,
  motion,
  MotionStyle,
  useMotionValue,
} from 'framer-motion';
import { testimonials } from './testimonial-content';

import Media from '../media';

import style from './testimonials.module.scss';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  display: 'flex',
};

const dotWrapStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const pageStyle: MotionStyle = {
  width: '100%',
  height: '100%',
  display: 'inline-block',
  flex: 'none',
};

const dotItemStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: '0 10px',
  display: 'inline-block',
  cursor: 'pointer',
};

const transition: AnimationOptions<any> = {
  type: 'spring',
  bounce: 0,
};

export default function Testimonials() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const calculateNewX = () =>
      -index * (containerRef.current?.clientWidth || 0);
    const controls = animate(x, calculateNewX(), transition);

    return controls.stop;
  }, [index, x]);

  return (
    <section className={style.container}>
      <h3 className={style.sectionTitle}>Testimonials</h3>
      <div ref={containerRef} style={containerStyle}>
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            style={{
              ...pageStyle,
              x,
              left: `${i * 100}%`,
              right: `${i * 100}%`,
            }}
          >
            <Media alt={testimonial.user} image={testimonial.userImage} />
            <p>{testimonial.text}</p>
          </motion.div>
        ))}

        <div style={dotWrapStyle}>
          {testimonials.map((testimonial, i) => (
            <span
              key={testimonial.user}
              onClick={() => setIndex(i)}
              style={{
                ...dotItemStyle,
                background: i === index ? '#C4C4C4' : '#6D6D6D',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

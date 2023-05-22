import Image from 'next/image';

import { testimonials } from './testimonial-content';

import containerStyles from '../case-studies/case-studies.module.scss';
import cardStyle from '../case-studies-card/case-studies-card.module.scss';
import overrideStyle from './testimonials.module.scss';

type Props = {
  testimonial: Testimonial;
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
};

const TestimonialCard = ({ testimonial }: Props) => {
  return (
    <div className={cardStyle.container}>
      <div
        className={cardStyle.logo + ' ' + overrideStyle.logo}
        style={{ maxWidth: testimonial.logoWidth }}
      >
        <Image alt="Testimonial logo" layout="fill" src={testimonial.logo} />
      </div>
      <p className={cardStyle.user}>
        {testimonial.user},{' '}
        <span className={cardStyle.jobTitle}>{testimonial.jobTitle}</span>
      </p>
      <div className={cardStyle.textContainer}>
        <h4 className={overrideStyle.headline}>{testimonial.headline}</h4>
        <p className={cardStyle.text}>&quot;{testimonial.text}&quot;</p>
        <a href={testimonial.linkUrl} rel="noopener noreferrer" target="_blank">
          <button className={cardStyle.button} role="button">
            {testimonial.linkText}
          </button>
        </a>
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className={containerStyles.outer + ' ' + overrideStyle.outer}>
      <div className={containerStyles.inner}>
        <h3 className={containerStyles.sectionTitle}>Testimonials</h3>
        <div className={containerStyles.cards}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.user} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

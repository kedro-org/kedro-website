import React from 'react';
import Image from 'next/image';

import style from './case-studies-card.module.scss';

type Props = {
  linkText?: string;
  linkUrl?: string;
  logo: string;
  text: string;
  title: string;
};

export default function CaseStudiesCard({
  linkText,
  linkUrl,
  logo,
  text,
  title,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <div className={style.logo}>
          <Image alt="Case study logo" layout="fill" src={logo} />
        </div>
      </div>

      <div className={style.textContainer}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.text}>{text}</p>
        <a
          href={linkUrl}
          rel="noopener noreferrer"
          role="button"
          target="_blank"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}

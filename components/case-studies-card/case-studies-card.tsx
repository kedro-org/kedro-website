import React from 'react';
import Image from 'next/image';

import style from './case-studies-card.module.scss';

type Props = {
  linkUrl?: string;
  linkText?: string;
  logo: string;
  title: string;
  text: string;
};

export default function CaseStudiesCard({
  title,
  text,
  logo,
  linkUrl,
  linkText,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <div className={style.logo}>
          <Image
            alt="Logo"
            src={logo}
            layout="fill"
            width="100px"
            height="92px"
          />
        </div>
      </div>

      <div className={style.textContainer}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.text}>{text}</p>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}

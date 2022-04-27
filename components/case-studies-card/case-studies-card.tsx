import React from 'react';
import Image from 'next/image';

import style from './case-studies-card.module.scss';

type Props = {
  linkText?: string;
  linkUrl?: string;
  logo: {
    height: number;
    src: string;
    width: number;
  };
  logoStyleAdjustments?: Object;
  text: string;
  title: string;
};

export default function CaseStudiesCard({
  linkText,
  linkUrl,
  logo,
  logoStyleAdjustments = undefined,
  text,
  title,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.logo} style={logoStyleAdjustments}>
        <Image
          alt="Case study logo"
          layout="fill"
          height={logo.height}
          width={logo.width}
          src={logo.src}
        />
      </div>

      <div className={style.textContainer}>
        <h4 className={style.title}>{title}</h4>
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

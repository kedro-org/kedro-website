import React from 'react';
import style from './case-studies-card.module.scss';

type Props = {
  linkUrl?: string;
  linkText?: string;
  logo: React.ComponentType;
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
  const Logo = logo;
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Logo />
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

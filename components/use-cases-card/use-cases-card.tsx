import React from 'react';
import style from './use-cases-card.module.scss';

type Props = {
  title: string;
  text: string | JSX.Element;
  logo: React.ComponentType;
  linkUrl?: string;
  linkText?: string;
};

export default function UseCasesCard({
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
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </div>
    </div>
  );
}

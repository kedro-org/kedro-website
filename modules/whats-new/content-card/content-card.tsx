import React from 'react';
import Link from 'next/link';

import style from './content-card.module.scss';

export interface ContentCardProps {
  date: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
  isExternal?: boolean;
}

const ContentCard = ({
  date,
  title,
  description,
  linkUrl,
  linkText,
  isExternal = false,
}: ContentCardProps) => {
  const Wrapper = isExternal ? 'a' : Link;
  const wrapperProps = isExternal
    ? { href: linkUrl, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: linkUrl };

  return (
    <Wrapper {...wrapperProps} className={style.card}>
      <p className={style.date}>{date}</p>
      <h3 className={style.cardTitle}>{title}</h3>
      <p className={style.description}>{description}</p>
      <span className={style.actionLink}>
        {linkText} &rarr;
      </span>
    </Wrapper>
  );
};

export default ContentCard;

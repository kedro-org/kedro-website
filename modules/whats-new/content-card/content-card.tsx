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
  const linkProps = isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <div className={style.card}>
      <p className={style.date}>{date}</p>
      <h3 className={style.cardTitle}>
        {isExternal ? (
          <a href={linkUrl} {...linkProps} className={style.cardTitleLink}>
            {title}
          </a>
        ) : (
          <Link href={linkUrl} className={style.cardTitleLink}>
            {title}
          </Link>
        )}
      </h3>
      <p className={style.description}>{description}</p>
      {isExternal ? (
        <a href={linkUrl} {...linkProps} className={style.actionLink}>
          {linkText} &rarr;
        </a>
      ) : (
        <Link href={linkUrl} className={style.actionLink}>
          {linkText} &rarr;
        </Link>
      )}
    </div>
  );
};

export default ContentCard;

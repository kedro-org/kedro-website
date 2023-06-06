import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostSnippet } from '../post-snippet';
import { dateFormatting } from '../../../utils/blog';
import { tiltEffectSettings, getTiltEffectValues } from '../../../utils/blog';

import style from './posts-list.module.scss';

type PostsList = {
  post: PostSnippet;
};

const PostsList = ({ post }: PostsList) => {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const titleRef = useRef(null);

  const onMouseMouse = (event: React.MouseEvent) => {
    setIsTitleHovered(true);
    const { valueX, valueY } = getTiltEffectValues(titleRef, event);

    setRotateX(valueX);
    setRotateY(valueY);
  };

  const onMouseLeave = () => {
    setIsTitleHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className={style.container}>
      <div
        className={classNames(style.imageWrapper, {
          [style.imageWrapperShown]: isTitleHovered,
        })}
        style={{
          transition: `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`,
          transform: `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`,
        }}
      >
        <Image
          alt="cover image alt"
          height={236}
          src={post.coverImage.url}
          width={236}
        />
      </div>
      <p
        className={style.category}
      >{`${post.category} — ${post.readingTime} min read`}</p>
      <Link href={`/blog/${post.slug}`}>
        <a>
          <h2
            className={style.title}
            onMouseEnter={onMouseMouse}
            onMouseLeave={onMouseLeave}
            ref={titleRef}
          >
            {post.title}
          </h2>
        </a>
      </Link>
      <p className={style.description}>{post.description}</p>
      <div className={style.authorWrapper}>
        {post.author && (
          <Link href={`/blog/author/${post.author.urlDisplayName}`}>
            <a className={style.author}>{post.author.name}</a>
          </Link>
        )}
        <p className={style.date}>
          {dateFormatting(post.sys.firstPublishedAt)}
        </p>
      </div>
    </div>
  );
};

export default PostsList;

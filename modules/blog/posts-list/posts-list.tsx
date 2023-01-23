import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { Post } from '../../../pages/blog';
import { dateFormatting } from '../../../utils/date-formatting';
import {
  tiltEffectSettings,
  getTiltEffectValues,
} from '../../../utils/get-tilt-effect-values';

import style from './posts-list.module.scss';

type PostsList = {
  post: Post;
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
          src={post.coverImage.url}
          alt="cover image alt"
          width={236}
          height={236}
        />
      </div>
      <p
        className={style.category}
      >{`${post.category} — ${post.readingTime} min read`}</p>
      <Link href={`/blog/${post.slug}`} passHref>
        <h2
          className={style.title}
          onMouseMove={onMouseMouse}
          onMouseOut={onMouseLeave}
          ref={titleRef}
        >
          {post.title}
        </h2>
      </Link>
      <p className={style.description}>{post.description}</p>
      <div className={style.authorWrapper}>
        <Link href={`/blog/author/${post.author.urlDisplayName}`} passHref>
          <p className={style.author}>{post.author.name}</p>
        </Link>
        <p className={style.date}>{dateFormatting(post.date)}</p>
      </div>
    </div>
  );
};

export default PostsList;

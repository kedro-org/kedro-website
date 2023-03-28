import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { dateFormatting } from '../../../utils/blog';
import { tiltEffectSettings, getTiltEffectValues } from '../../../utils/blog';
import { Author } from '../author-detail';

import Image from 'next/image';
import Link from 'next/link';

import style from './post-snippet.module.scss';

export type PostSnippet = {
  author: Author;
  category: string;
  coverImage: {
    title: string;
    url: string;
  };
  date: string;
  description: string;
  excerpt: string;
  featuredPost: boolean;
  readingTime: number;
  secondaryPost: boolean | null;
  slug: string;
  sys: {
    firstPublishedAt: Date;
    id: string;
    publishedAt: Date;
  };
  title: string;
};

type PostSnippetProps = {
  imgPosition: string;
  onPostPage?: boolean;
  post: PostSnippet;
  size: string;
};

const PostSnippet = ({
  imgPosition = 'right',
  onPostPage = false,
  post,
  size,
}: PostSnippetProps) => {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const titleRef = useRef(null);

  const imgSize = size === 'large' ? 592 : 400;

  const onMouseMouse = (event: React.MouseEvent) => {
    const { valueX, valueY } = getTiltEffectValues(titleRef, event);

    setIsTitleHovered(true);
    setRotateX(valueX);
    setRotateY(valueY);
  };

  const onMouseLeave = () => {
    setIsTitleHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  if (post === null) {
    return null;
  }

  return (
    <div
      className={classNames(style.container, {
        [style.containerRowReverse]: imgPosition === 'left',
        [style.containerOnPostPage]: onPostPage,
      })}
    >
      <div
        className={classNames(style.info, {
          [style.infoMedium]: size === 'medium',
        })}
      >
        <p
          className={style.category}
        >{`${post.category} — ${post.readingTime} min read`}</p>
        {onPostPage ? (
          <div className={style.titleWrapper}>
            <h1
              className={classNames(style.title, {
                [style.titleOnPostPage]: onPostPage,
              })}
            >
              {post.title}
            </h1>
            <p
              className={classNames(style.description, {
                [style.descriptionOnPostPage]: onPostPage,
              })}
            >
              {post.description}
            </p>
          </div>
        ) : (
          <Link href={`/blog/${post.slug}`}>
            <a>
              <div
                className={style.titleWrapper}
                onMouseMove={onMouseMouse}
                onMouseOut={onMouseLeave}
                ref={titleRef}
              >
                <h1
                  className={classNames(style.title, {
                    [style.isHovered]: isTitleHovered,
                  })}
                >
                  {post.title}
                </h1>
                <p
                  className={classNames(style.description, {
                    [style.isHovered]: isTitleHovered,
                  })}
                >
                  {post.description}
                </p>
              </div>
            </a>
          </Link>
        )}
        {onPostPage ? (
          <div className={style.publishedAt}>
            {dateFormatting(post.sys.firstPublishedAt)} (last updated{' '}
            {dateFormatting(post.sys.publishedAt)})
          </div>
        ) : (
          <>
            <Link href={`/blog/author/${post.author.urlDisplayName}`}>
              <a className={style.author}>{post.author.name}</a>
            </Link>
            <p className={style.date}>
              {dateFormatting(post.sys.firstPublishedAt)}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <button className={style.button}>Read more</button>
              </a>
            </Link>
          </>
        )}
      </div>
      <div
        className={classNames(style.image, {
          [style.imageLarge]: size === 'large',
          [style.imageMedium]: size === 'medium',
          [style.isImageHovered]: isTitleHovered,
        })}
        style={{
          transition: `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`,
          transform: `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`,
        }}
      >
        <Image
          alt={post.coverImage.title || 'Generic image for blog post'}
          height={imgSize}
          objectFit="cover"
          src={post.coverImage.url}
          width={imgSize}
        />
      </div>
    </div>
  );
};

export default PostSnippet;

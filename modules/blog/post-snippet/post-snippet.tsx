import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { dateFormatting } from '../../../utils/date-formatting';
import {
  tiltEffectSettings,
  getTiltEffectValues,
} from '../../../utils/get-tilt-effect-values';

import Image from 'next/image';
import Link from 'next/link';

import style from './post-snippet.module.scss';

export type PostSnippet = {
  author: {
    name: string;
    picture: any;
    urlDisplayName: string;
  };
  category: string;
  coverImage: {
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
    id: string;
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

  return (
    <div
      className={classNames(style.container, {
        [style.containerRowReverse]: imgPosition === 'left',
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
            <h1 className={style.title}>{post.title}</h1>
            <p
              className={classNames(style.description, {
                [style.descriptionOnPostPage]: onPostPage,
              })}
            >
              {post.description}
            </p>
          </div>
        ) : (
          <Link href={`/blog/${post.slug}`} passHref>
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
          </Link>
        )}
        {onPostPage ? null : (
          <>
            <Link href={`/blog/author/${post.author.urlDisplayName}`} passHref>
              <p className={style.author}>{post.author.name}</p>
            </Link>
            <p className={style.date}>{dateFormatting(post.date)}</p>
            <Link href={`/blog/${post.slug}`} passHref>
              <button className={style.button}>Read more</button>
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
          alt="cover image alt"
          height={imgSize}
          src={post.coverImage.url}
          width={imgSize}
        />
      </div>
    </div>
  );
};

export default PostSnippet;

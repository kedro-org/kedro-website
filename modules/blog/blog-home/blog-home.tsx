import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostInterface } from '../../../pages/blog';
import { dateFormatting } from '../../../utils/date-formatting';
import {
  tiltEffectSettings,
  getTiltEffectValues,
} from '../../../utils/get-tilt-effect-values';

import style from './blog-home.module.scss';

interface PostHomeTypes {
  imgPosition: string;
  post: PostInterface;
  size: string;
}

const BlogHome = ({ size, imgPosition = 'right', post }: PostHomeTypes) => {
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
        <Link href={`/blog/author/${post.author.urlDisplayName}`} passHref>
          <p className={style.author}>{post.author.name}</p>
        </Link>
        <p className={style.date}>{dateFormatting(post.date)}</p>
        <Link href={`/blog/${post.slug}`} passHref>
          <button className={style.button}>Read more</button>
        </Link>
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
          src={post.coverImage.url}
          alt="cover image alt"
          width={imgSize}
          height={imgSize}
        />
      </div>
    </div>
  );
};

export default BlogHome;

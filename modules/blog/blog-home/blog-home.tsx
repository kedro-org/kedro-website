import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostInterface } from '../../../pages/blog';
import { dateFormatting } from '../../../utils/date-formatting';

import style from './blog-home.module.scss';

const tiltEffectSettings = {
  max: 4, // max tilt rotation (degrees (deg))
  perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale: 1,
  speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: 'cubic-bezier(.03,.98,.52,.99)', // easing (transition-timing-function) of the enter/exit transition
};

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

  const onMouseMouse = (event: any) => {
    setIsTitleHovered(true);

    const card = titleRef?.current?.getBoundingClientRect();
    const cardWidth = card.width;
    const cardHeight = card.height;
    const centerX = card.left + cardWidth / 2;
    const centerY = card.top + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped =
      (-1 * tiltEffectSettings.max * mouseY) / (cardHeight / 2);
    const rotateYUncapped =
      (+1 * tiltEffectSettings.max * mouseX) / (cardWidth / 2);
    const valueX =
      rotateXUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateXUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateXUncapped;
    const valueY =
      rotateYUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateYUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateYUncapped;

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
            ref={titleRef}
            className={style.titleWrapper}
            onMouseMove={onMouseMouse}
            onMouseOut={onMouseLeave}
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

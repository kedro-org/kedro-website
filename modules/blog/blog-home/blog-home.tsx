import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostInterface } from '../../../pages/blog';

import style from './blog-home.module.scss';

interface PostHomeTypes {
  imgPosition: string;
  post: PostInterface;
  size: string;
}

const BlogHome = ({ size, imgPosition = 'right', post }: PostHomeTypes) => {
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const imgSize = size === 'large' ? 592 : 400;

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
        >{`${post.category} - ${post.readingTime} min read`}</p>
        <Link href={`/blog/${post.slug}`} passHref>
          <h1
            className={classNames(style.title, {
              [style.isHovered]: isTitleHovered,
            })}
            onMouseOver={() => setIsTitleHovered(true)}
            onMouseOut={() => setIsTitleHovered(false)}
          >
            {post.title}
          </h1>
        </Link>
        <Link href={`/blog/${post.slug}`} passHref>
          <p
            className={classNames(style.description, {
              [style.isHovered]: isTitleHovered,
            })}
            onMouseOver={() => setIsTitleHovered(true)}
            onMouseOut={() => setIsTitleHovered(false)}
          >
            {post.description}
          </p>
        </Link>
        <Link href={`/blog/author/${post.author.urlDisplayName}`} passHref>
          <p className={style.author}>{post.author.name}</p>
        </Link>
        <p className={style.date}>
          {new Date(post.date).toLocaleDateString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <Link href={`/blog/${post.slug}`} passHref>
          <button className={style.button}>Read more</button>
        </Link>
      </div>
      <div
        className={classNames(style.image, {
          [style.imageMedium]: size === 'medium',
          [style.isImageHovered]: isTitleHovered,
        })}
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

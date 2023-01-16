import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostInterface } from '../../../pages/blog';

import style from './blog-posts-list.module.scss';

interface BlogPostsListTypes {
  post: PostInterface;
}

const BlogPostsList = ({ post }: BlogPostsListTypes) => {
  const [isTitleHovere, setIsTitleHovered] = useState(false);

  return (
    <div className={style.container}>
      <div
        className={classNames(style.imageWrapper, {
          [style.imageWrapperShown]: isTitleHovere,
        })}
      >
        <Image
          src={post.coverImage.url}
          alt="cover image alt"
          width={180}
          height={180}
        />
      </div>
      <p
        className={style.category}
      >{`${post.category} - ${post.readingTime} min read`}</p>
      <Link href={`/blog/${post.slug}`} passHref>
        <h2
          className={style.title}
          onMouseOver={() => setIsTitleHovered(true)}
          onMouseOut={() => setIsTitleHovered(false)}
        >
          {post.title}
        </h2>
      </Link>
      <p className={style.description}>{post.description}</p>
      <div className={style.authorWrapper}>
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
      </div>
    </div>
  );
};

export default BlogPostsList;

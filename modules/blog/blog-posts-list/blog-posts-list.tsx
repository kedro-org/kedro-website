import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

import { PostInterface } from '../../../pages/blog';
import { dateFormatting } from '../../../utils/date-formatting';

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
          width={230}
          height={230}
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
        <p className={style.date}>{dateFormatting(post.date)}</p>
      </div>
    </div>
  );
};

export default BlogPostsList;

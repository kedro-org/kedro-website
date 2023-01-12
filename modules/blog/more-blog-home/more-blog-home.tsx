import React from 'react';
import Link from 'next/link';

import { PostInterface } from '../../../pages/blog';

import style from './more-blog-home.module.scss';

interface MoreBlogHomeTypes {
  post: PostInterface;
}

const MoreBlogHome = ({ post }: MoreBlogHomeTypes) => {
  return (
    <div className={style.container}>
      <p
        className={style.category}
      >{`${post.category} - ${post.readingTime} min read`}</p>
      <Link href={`/blog/${post.slug}`} passHref>
        <h2 className={style.title}>{post.title}</h2>
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

export default MoreBlogHome;

import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { PostSnippet } from '../../blog/post-snippet/post-snippet';
import PostsList from '../../blog/posts-list';
import { dateFormatting } from '../../../utils/blog';

import style from './blog-section.module.scss';

interface BlogSectionProps {
  posts: PostSnippet[];
}

const INITIAL_CARDS = 6;
const PAGE_SIZE = 6;

const BlogSection = ({ posts }: BlogSectionProps) => {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [allPostsLength, setAllPostsLength] = useState(PAGE_SIZE);

  const featuredCards = posts.slice(0, INITIAL_CARDS);
  const remainingPosts = posts.slice(INITIAL_CARDS);

  return (
    <section className={style.section}>
      <div className={style.inner}>
        <h2 className={style.heading}>Blogs</h2>
        <div className={style.grid}>
          {featuredCards.map((post: PostSnippet) => (
            <div key={post.sys.id} className={style.card}>
              <p className={style.date}>
                {dateFormatting(post.sys.firstPublishedAt)}
              </p>
              <h3 className={style.cardTitle}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={style.cardTitleLink}
                >
                  {post.title}
                </Link>
              </h3>
              <p className={style.description}>{post.description}</p>
              <Link href={`/blog/${post.slug}`} className={style.readLink}>
                Read blog &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className={style.viewMoreWrapper}>
          <button
            className={classNames(style.viewMoreButton, {
              [style.viewMoreButtonActive]: showAllPosts,
            })}
            onClick={() => setShowAllPosts(true)}
          >
            View more blogs
          </button>
        </div>

        {showAllPosts && remainingPosts.length > 0 && (
          <div className={style.allPostsSection}>
            <div className={style.allPostsInner}>
              <h3 className={style.allPostsHeading}>All blog posts</h3>
              {remainingPosts.slice(0, allPostsLength).map((post: PostSnippet) => (
                <PostsList key={post.sys.id} post={post} />
              ))}
              {remainingPosts.length > allPostsLength && (
                <div className={style.showMoreWrapper}>
                  <button
                    className={style.showMoreButton}
                    onClick={() => setAllPostsLength(allPostsLength + PAGE_SIZE)}
                  >
                    Show more posts
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

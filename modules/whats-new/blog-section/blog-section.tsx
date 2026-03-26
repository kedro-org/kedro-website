import React, { useState } from 'react';
import classNames from 'classnames';

import { PostSnippet } from '../../blog/post-snippet/post-snippet';
import PostsList from '../../blog/posts-list';
import { dateFormatting } from '../../../utils/blog';
import { ContentCard } from '../content-card';

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
        <p className={style.subtitle}>Feature, release and other announcements from the Kedro team.</p>
        <div className={style.grid}>
          {featuredCards.map((post: PostSnippet) => (
            <ContentCard
              key={post.sys.id}
              date={dateFormatting(post.sys.firstPublishedAt)}
              title={post.title}
              description={post.description}
              linkUrl={`/blog/${post.slug}`}
              linkText="Read blog"
            />
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

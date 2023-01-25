import React, { useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { getAllPostsForBlog } from '../lib/api';
import { PostSnippet as PostSnippetTypes } from '../modules/blog/post-snippet';

import Header from '../modules/shared/header';
import PostsList from '../modules/blog/posts-list';
import PostSnippet from '../modules/blog/post-snippet';

import style from './blog.module.scss';

const defaultLength = 6;

type PostTypes = {
  allPosts: PostSnippetTypes[];
  featuredPost: PostSnippetTypes;
  secondaryPosts: PostSnippetTypes[];
};

const Blog = ({ featuredPost, secondaryPosts, allPosts }: PostTypes) => {
  const [allPostsLength, setAllPostLength] = useState(defaultLength);

  return (
    <>
      <Head>
        <title>Blog | Kedro</title>
      </Head>
      <Header />
      <section className={style.featuredOuter}>
        <div
          className={classNames(
            style.featuredInner,
            style.animationWrapper,
            style.fadeInBottom
          )}
        >
          <PostSnippet size="large" imgPosition="right" post={featuredPost} />
        </div>
      </section>
      <section className={style.secondaryOuter}>
        <div
          className={classNames(
            style.secondaryInner,
            style.animationWrapper,
            style.fadeInBottom,
            style.animationDelay1
          )}
        >
          <h3 className={style.secondaryTitle}>Recent blog posts</h3>
          {secondaryPosts.map((post: PostSnippetTypes, index: number) => {
            return (
              <div key={post.sys.id}>
                <PostSnippet
                  imgPosition={index % 2 == 0 ? 'left' : 'right'}
                  post={post}
                  size="medium"
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className={style.allBlogPostsOuter}>
        <div
          className={classNames(
            style.allBlogPostsInner,
            style.animationWrapper,
            style.fadeInBottom,
            style.animationDelay2
          )}
        >
          <h3 className={style.secondaryTitle}>All blog posts</h3>
          {allPosts.length === 0 ? (
            <p>{'No more posts'}</p>
          ) : (
            <>
              {allPosts
                .slice(0, allPostsLength)
                .map((post: PostSnippetTypes) => {
                  return <PostsList key={post.sys.id} post={post} />;
                })}
              {allPosts.length > defaultLength &&
              allPosts.length > allPostsLength ? (
                <div className={style.buttonWrapper}>
                  <button
                    className={style.showMoreButton}
                    onClick={() =>
                      setAllPostLength(allPostsLength + defaultLength)
                    }
                  >
                    Show more posts
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
      <style jsx global>{`
        body {
          color: #000;
        }

        a {
          color: #1e58a8;
        }
      `}</style>
    </>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllPostsForBlog(preview);

  return {
    props: {
      featuredPost: data.filter(
        (post: PostSnippetTypes) => post.featuredPost
      )[0],
      secondaryPosts: data
        .filter((post: PostSnippetTypes) => post.secondaryPost)
        .slice(0, 2),
      allPosts: data,
      preview,
    },
    revalidate: 10,
  };
}

export default Blog;

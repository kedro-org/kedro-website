import React, { useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';

import Header from '../modules/shared/header';

import { getAllPostsForBlog } from '../lib/api';
import BlogHome from '../modules/blog/blog-home';
import BlogPostsList from '../modules/blog/blog-posts-list';

import style from './blog.module.scss';

const defaultLength = 6;

export interface PostInterface {
  sys: { id: string };
  slug: string;
  title: string;
  coverImage: {
    url: string;
  };
  category: string;
  readingTime: number;
  description: string;
  date: string;
  featuredPost: boolean;
  secondaryPost: boolean | null;
  author: { name: string; picture: any; urlDisplayName: string };
  excerpt: string;
}

interface PostTypes {
  featuredPost: PostInterface;
  secondaryPosts: PostInterface[];
  allPosts: PostInterface[];
}

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
          <BlogHome size="large" imgPosition="right" post={featuredPost} />
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
          {secondaryPosts.map((post: PostInterface, index: number) => {
            return (
              <div key={post.sys.id}>
                <BlogHome
                  size="medium"
                  imgPosition={index % 2 == 0 ? 'left' : 'right'}
                  post={post}
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
              {allPosts.slice(0, allPostsLength).map((post: PostInterface) => {
                return (
                  <div key={post.sys.id}>
                    <BlogPostsList post={post} />
                  </div>
                );
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
      featuredPost: data.filter((post: PostInterface) => post.featuredPost)[0],
      secondaryPosts: data
        .filter((post: PostInterface) => post.secondaryPost)
        .slice(0, 2),
      allPosts: data,
      preview,
    },
    revalidate: 10,
  };
}

export default Blog;

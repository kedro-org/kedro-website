import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Header from '../modules/shared/header';

import { getAllPostsForBlog } from '../lib/api';
import BlogHome from '../modules/blog/blog-home';
import MoreBlogHome from '../modules/blog/more-blog-home';

import style from './blog.module.scss';

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
  return (
    <>
      <Head>
        <title>Blog | Kedro</title>
      </Head>
      <Header />
      <section className={style.featured}>
        <BlogHome size="large" imgPosition="right" post={featuredPost} />
      </section>
      <section className={style.secondary}>
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
      </section>
      <section className={style.allBlogs}>
        <h3 className={style.secondaryTitle}>All blog posts</h3>
        {allPosts.length === 0 ? (
          <p>{'No more posts'}</p>
        ) : (
          <>
            {allPosts.map((post: PostInterface) => {
              return (
                <div key={post.sys.id}>
                  <MoreBlogHome post={post} />
                </div>
              );
            })}
            {allPosts.length > 2 ? (
              <div className={style.buttonWrapper}>
                <button className={style.showMoreButton}>
                  Show more posts
                </button>
              </div>
            ) : null}
          </>
        )}
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
      //   allPosts: data.filter(
      //     (post: PostInterface) => !(post.featuredPost || post.secondaryPost) ?? null
      //   ),
      allPosts: data.filter((post: PostInterface) => post),
      preview,
    },
    revalidate: 10,
  };
}

export default Blog;

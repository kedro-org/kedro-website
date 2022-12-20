import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Header from '../modules/shared/header';

import { getAllPostsForBlog } from '../lib/api';

interface Post {
  sys: { id: string };
  slug: string;
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  featuredPost: boolean;
  secondaryPost: boolean | null;
  author: { name: string; picture: any; urlDisplayName: string };
  excerpt: string;
}

interface PostTypes {
  featuredPost: Post;
  secondaryPosts: Post[];
  allPosts: Post[];
}

const Blog = ({ featuredPost, secondaryPosts, allPosts }: PostTypes) => {
  return (
    <>
      <Head>
        <title>Blog | Kedro</title>
      </Head>
      <Header />
      <div style={{ marginTop: 100 }}>
        <h3>Featured post</h3>
        <Link href={`/blog/${featuredPost.slug}`} passHref>
          <a>{featuredPost.title}</a>
        </Link>
        <p>
          Written by:{' '}
          <Link
            href={`/blog/author/${featuredPost.author.urlDisplayName}`}
            passHref
          >
            <a> {featuredPost.author.name}</a>
          </Link>
        </p>
      </div>
      <div style={{ marginTop: 50 }}>
        <h3>Secondary posts</h3>

        {secondaryPosts.map((post: Post) => {
          return (
            <div key={post.sys.id}>
              <Link href={`/blog/${post.slug}`} passHref>
                <a>{post.title}</a>
              </Link>
              <p>
                Written by:
                <Link
                  href={`/blog/author/${post.author.urlDisplayName}`}
                  passHref
                >
                  <a> {post.author.name}</a>
                </Link>
              </p>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 50 }}>
        <h3>All posts</h3>
        <p>
          {allPosts.length === 0 ? 'No more posts' : 'There are more posts'}
        </p>
      </div>
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
      featuredPost: data.filter((post: Post) => post.featuredPost)[0],
      secondaryPosts: data.filter((post: Post) => post.secondaryPost),
      allPosts: data.filter(
        (post: Post) => !(post.featuredPost || post.secondaryPost) ?? null
      ),
      preview,
    },
    revalidate: 10,
  };
}

export default Blog;

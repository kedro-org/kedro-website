/* eslint-disable camelcase */

import RSS from 'rss';
import { getAllPostsForBlog } from '../lib/api';
import { GetServerSideProps } from 'next';
import { PostSnippet as PostSnippetTypes } from '../modules/blog/post-snippet';
import { siteMetadata } from '../modules/shared/config';

function generateRssFeed(posts: PostSnippetTypes[]) {
  const feedOptions = {
    title: 'The Kedro Blog | Kedro',
    description: siteMetadata.socialDescription,
    site_url: siteMetadata.baseUrl,
    feed_url: `${siteMetadata.baseUrl}rss`,
    image_url: `${siteMetadata.baseUrl}images/kedro-logo.svg`,
    pubDate: new Date(),
  };

  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteMetadata.baseUrl}blog/${post.slug}`,
      date: post.sys.firstPublishedAt,
    });
  });

  return feed;
}

function rss() {
  // getServerSideProps() does the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPostsForBlog(false);
  const rssFeed = generateRssFeed(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(rssFeed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
};

export default rss;

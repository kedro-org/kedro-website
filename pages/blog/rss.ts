import { Feed } from 'feed';
import { getAllPostsForBlog } from '../../lib/api';
import { GetServerSideProps } from 'next';
import { PostSnippet as PostSnippetTypes } from '../../modules/blog/post-snippet';
import { siteMetadata } from '../../modules/shared/config';

function generateRssFeed(posts: PostSnippetTypes[]) {
  const feed = new Feed({
    title: 'The Kedro Blog | Kedro',
    description: siteMetadata.socialDescription,
    id: siteMetadata.baseUrl,
    link: siteMetadata.baseUrl,
    language: 'en',
    image: `${siteMetadata.baseUrl}images/kedro-logo.png`,
    favicon: `${siteMetadata.baseUrl}images/kedro-logo.png`,
    copyright: '',
    updated: new Date(),
    feedLinks: {
      rss: `${siteMetadata.baseUrl}blog/rss`,
    },
  });

  posts.map((post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      id: `${siteMetadata.baseUrl}blog/${post.slug}`,
      link: `${siteMetadata.baseUrl}blog/${post.slug}`,
      date: new Date(post.sys.firstPublishedAt),
      author: [
        {
          name: post.author.name,
        },
      ],
    });
  });

  return feed;
}

function rss() {
  // getServerSideProps() does the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPostsForBlog(false);
  const feed = generateRssFeed(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.rss2());
  res.end();

  return {
    props: {},
  };
};

export default rss;

import { NextApiResponse } from 'next';
import { getAllPostsWithSlug, getAllAuthors } from '../lib/api';
import { AuthorInfo } from './blog/author/[author]';

type PostInfo = {
  slug: string;
  sys: {
    firstPublishedAt: string;
  };
};

function generateSiteMap(postInfo: [PostInfo], authors: [AuthorInfo]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://kedro.org/</loc>
        <lastmod>2022-11-15</lastmod>
      </url>
      <url>
        <loc>https://kedro.org/blog</loc>
        <lastmod>2023-03-27</lastmod>
    </url>
     ${postInfo
       .map(({ slug, sys }) => {
         return `
       <url>
          <loc>${`https://kedro.org/blog/${slug}`}</loc>
          <lastmod>${sys.firstPublishedAt.split('T')[0]}</lastmod>
       </url>
     `;
       })
       .join('')}
      ${authors
        .map(({ urlDisplayName }) => {
          return `
      <url>
        <loc>${`https://kedro.org/blog/author/${urlDisplayName}`}</loc>
      </url>
    `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const postInfo = await getAllPostsWithSlug();
  const authors = await getAllAuthors();
  const sitemap = generateSiteMap(postInfo, authors);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

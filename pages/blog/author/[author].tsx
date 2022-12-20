import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import ErrorPage from 'next/error';

import Header from '../../../modules/shared/header';

import { getAllAuthors, getSingleAuthor } from '../../../lib/api';

interface AuthorParams {
  author: string;
}

interface Post {
  author: {
    name: string;
    picture: any;
  };
  content: {
    json: any;
    links: any;
  };
  coverImage: {
    url: string;
  };
  date: string;
  excerpt: string;
  featuredPost: true;
  secondaryPost: false;
  slug: string;
  sys: {
    id: string;
  };
  title: string;
}

interface Author {
  authorInfo: {
    name: string;
    picture: {
      url: string;
    };
  };
  authorsPosts: Post[];
}

export default function Author({ authorInfo, authorsPosts }: Author) {
  const router = useRouter();

  if (!router.isFallback && !authorInfo) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <article>
            <Head>
              <title>{authorInfo.name} | Kedro</title>
              <meta property="og:image" content={authorInfo.picture.url} />
            </Head>
            <Header />
            <h2 style={{ marginTop: 100 }}>
              {authorInfo.name}&apos;s author page
            </h2>
            <div>
              <p>Articles by them:</p>
              <div>
                {authorsPosts.map((post) => {
                  return (
                    <div key={post.slug}>
                      <Link href={`/blog/${post.slug}`} passHref>
                        <a>{post.title}</a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        </>
      )}
      <style jsx global>{`
        body,
        a {
          color: #000;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params }: { params: AuthorParams }) {
  const data = await getSingleAuthor(params.author);

  return {
    props: {
      authorInfo: data?.authorInfo ?? null,
      authorsPosts: data?.authorInfo.linkedFrom.postCollection.items ?? null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allAuthors = await getAllAuthors();

  return {
    fallback: true,
    paths:
      allAuthors?.map(
        ({ urlDisplayName }: any) => `/blog/author/${urlDisplayName}`
      ) ?? [],
  };
}

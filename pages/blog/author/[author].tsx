import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Image from 'next/image';

import Header from '../../../modules/shared/header';
import PostsList from '../../../modules/blog/posts-list';
import { PostSnippet } from '../../../modules/blog/post-snippet';

import style from './author.module.scss';

import { getAllAuthors, getSingleAuthor } from '../../../lib/api';

interface AuthorParams {
  author: string;
}

interface Author {
  authorInfo: {
    name: string;
    bio: string;
    picture: {
      url: string;
    };
    jobTitle: string;
  };
  authorsPosts: PostSnippet[];
}

export default function Author({ authorInfo, authorsPosts }: Author) {
  const router = useRouter();

  if (!router.isFallback && !authorInfo) {
    return <ErrorPage statusCode={404} />;
  }

  const sortedDatePosts = authorsPosts.sort((a, b) => {
    return (
      new Date(b.sys.firstPublishedAt).valueOf() -
      new Date(a.sys.firstPublishedAt).valueOf()
    );
  });

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
            <div className={style.authorWrapper}>
              <section className={style.authorInfo}>
                <div className={style.imageWrapper}>
                  <Image
                    src={authorInfo.picture.url}
                    alt="author picture alt"
                    width={160}
                    height={160}
                  />
                </div>
                {/* The contacts sections to be confirmed by the design team */}
                {/* <div className={style.contacts}>
                    <div className={style.circle} />
                    <div className={style.circle} />
                    <div className={style.circle} />
                  </div> */}
                <div className={style.info}>
                  <p className={style.name}>{authorInfo.name}</p>
                  <p className={style.jobTitle}>{authorInfo.jobTitle}</p>
                </div>
                <p className={style.bio}>{authorInfo.bio}</p>
              </section>

              <section className={style.blogsList}>
                <p className={style.postsBy}>
                  Posts by <strong>{authorInfo.name}</strong>
                </p>
                <div>
                  {sortedDatePosts.map((post) => {
                    return (
                      <div key={post.slug}>
                        <PostsList key={post.sys.id} post={post} />
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className={style.buttonWrapper}>
                <Link href="/blog" passHref>
                  <a>
                    <button className={style.backButton}>
                      <Image
                        alt="Back arrow"
                        height={22}
                        src="/images/back-arrow.svg"
                        width={22}
                      />
                      Back to Blog home
                    </button>
                  </a>
                </Link>
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

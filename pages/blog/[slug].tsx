import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import { siteMetadata } from '../../modules/shared/config';

import AuthorDetail from '../../modules/blog/author-detail';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Header from '../../modules/shared/header';
import Image from 'next/image';
import Link from 'next/link';
import PostBody from '../../modules/blog/post-body';
import PostsList from '../../modules/blog/posts-list';
import PostSnippet, {
  PostSnippet as PostSnippetTypes,
} from '../../modules/blog/post-snippet';

import style from '../post.module.scss';

interface Slug {
  slug: string;
}

interface PostProps {
  content: {
    json: any;
    links: any;
  };
  socialImage: {
    url: string;
  };
}

interface Post {
  morePosts: PostSnippetTypes[];
  post: PostProps & PostSnippetTypes;
  preview: boolean;
  slug: string;
}

export default function Post({ post, morePosts, preview, slug }: Post) {
  const [isCopyLinkSelected, setIsCopyLinkSelected] = useState(false);
  const router = useRouter();
  const postUrl = post?.slug
    ? `https://kedro.org/blog/${post.slug}`
    : 'https://kedro.org';

  const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(str).then(
        () => {
          setIsCopyLinkSelected(true);
        },
        (reason) => {
          console.error("Couldn't copy the link to the clipboard: " + reason);
        }
      );
    }
  };

  useEffect(() => {
    let clickTimeout = setTimeout(() => {
      setIsCopyLinkSelected(false);
    }, 2250);

    return () => {
      clearTimeout(clickTimeout);
    };
  }, [isCopyLinkSelected]);

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <Head>
            <title>{post.title} | Kedro Blog</title>
            <meta
              name="description"
              content={post.excerpt || siteMetadata.socialDescription}
            />
            <meta property="og:title" content={`${post.title} | Kedro Blog`} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={post.socialImage?.url || siteMetadata.socialImage}
            />
            <meta property="og:url" content={postUrl || siteMetadata.baseUrl} />
            <meta
              content={post.excerpt || siteMetadata.socialDescription}
              property="og:description"
            />
            <meta property="og:site_name" content="Kedro" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              content={siteMetadata.socialDescription}
              name="twitter:image:alt"
            />
            <meta
              content={post.socialImage?.url || siteMetadata.socialImage}
              name="twitter:image"
            ></meta>
            <meta name="twitter:title" content={post.title}></meta>
            <meta
              name="twitter:description"
              content={post.excerpt || siteMetadata.socialDescription}
            ></meta>
          </Head>
          <article>
            <Header />
            <section className={style.featuredOuter}>
              <div className={style.featuredInner}>
                <PostSnippet
                  imgPosition="right"
                  onPostPage
                  post={post}
                  size="large"
                />
              </div>
            </section>
            <section className={style.postOuter}>
              <div className={style.postInner}>
                <PostBody content={post.content} slug={slug} />
                <AuthorDetail authorInfo={post.author} />
                <div className={style.sharePostWrapper}>
                  <div className={style.sharePostTitle}>Share post:</div>
                  <div className={style.sharePostIcons}>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${postUrl}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt="Twitter logo"
                        height={22}
                        src="/images/twitter-logo.svg"
                        width={27}
                      />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt="LinkedIn logo"
                        height={27}
                        src="/images/linkedin-logo.svg"
                        width={27}
                      />
                    </a>
                    <button
                      className={style.copyLink}
                      onClick={() => copyToClipboard(postUrl)}
                    >
                      <Image
                        alt="Copy icon"
                        height={17}
                        src="/images/copy-to-clipboard.svg"
                        width={17}
                      />
                      {isCopyLinkSelected ? 'Link copied!' : 'Copy link'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {morePosts && morePosts.length > 0 ? (
              <section className={style.allBlogPostsOuter}>
                <div className={style.allBlogPostsInner}>
                  <h3 className={style.secondaryTitle}>All blog posts</h3>
                  {morePosts
                    .slice(0, 6) // TODO: update in the future
                    .map((post: PostSnippetTypes) => {
                      return <PostsList key={post.sys.id} post={post} />;
                    })}
                  <div className={style.buttonWrapper}>
                    <Link href="/blog">
                      <a>
                        <button className={style.showMoreButton}>
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
              </section>
            ) : null}
          </article>
          {preview ? (
            <div className={style.pagePreviewWrapper}>
              This page is a preview.{' '}
              <strong>
                <Link href="/api/exit-preview">Click here</Link>
              </strong>{' '}
              to exit preview mode.
            </div>
          ) : null}
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

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: Slug;
  preview: boolean;
}) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      morePosts: data?.morePosts ?? null,
      post: data?.post ?? null,
      preview,
      slug: params.slug,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const postSlugs = await getAllPostsWithSlug();

  return {
    fallback: true,
    paths: postSlugs?.map(({ slug }: Slug) => `/blog/${slug}`) ?? [],
  };
}

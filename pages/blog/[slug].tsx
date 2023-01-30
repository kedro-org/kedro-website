import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';

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

type Slug = {
  slug: string;
};

type PostProps = {
  content: {
    json: any;
    links: any;
  };
};

type Post = {
  morePosts: PostSnippetTypes[];
  post: PostProps & PostSnippetTypes;
  preview: boolean;
};

const copyToClipboard = (str: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str);
  }

  return Promise.reject('The Clipboard API is not available.');
};

export default function Post({ post, morePosts, preview }: Post) {
  const router = useRouter();
  const postUrl = post?.slug
    ? `https://kedro.org/blog/${post.slug}`
    : 'https://kedro.org';

  if (!router.isFallback && !post) {
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
              <title>{post.title} | Kedro</title>
              <meta property="og:image" content={post.coverImage.url} />
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
                <PostBody content={post.content} />
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
                      Copy link
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
                          Back to Blog home
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}
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
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    fallback: true,
    paths: allPosts?.map(({ slug }: Slug) => `/blog/${slug}`) ?? [],
  };
}

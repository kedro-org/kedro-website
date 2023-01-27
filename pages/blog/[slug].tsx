import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';

import Head from 'next/head';
import ErrorPage from 'next/error';
import Header from '../../modules/shared/header';
import PostBody from '../../modules/blog/post-body';
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

export default function Post({ post, morePosts, preview }: Post) {
  console.log('post: ', post);
  const router = useRouter();

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
              </div>
            </section>
          </article>
          {morePosts && morePosts.length > 0 && <div>More posts here...</div>}
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

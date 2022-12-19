import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import Media from '../../components/media';
import PostBody from '../../components/post-body';

import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';

export default function Post({ post, morePosts, preview }) {
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
            <div style={{ width: 400, height: 260, position: 'relative' }}>
              <Media
                alt="Kedro screenshot"
                image={post.coverImage.url}
                layout="fill"
                placeholder="empty"
                priority={true}
              />
            </div>
            <div>{post.title}</div>
            <div>{post.date}</div>
            <div>{post.author.name}</div>
            <PostBody content={post.content} />
          </article>
          {morePosts && morePosts.length > 0 && <div>More posts here...</div>}
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
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
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
  };
}

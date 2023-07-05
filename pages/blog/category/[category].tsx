import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Image from 'next/image';

import Header from '../../../modules/shared/header';
import PostsList from '../../../modules/blog/posts-list';
import { PostSnippet } from '../../../modules/blog/post-snippet';

import style from './category.module.scss';

import { getCategoryPosts, getUniquePostCategories } from '../../../lib/api';

interface CategoryParams {
  category: string;
}

interface Author {
  category: CategoryParams;
  categoryPosts: PostSnippet[];
}

export default function Author({ category, categoryPosts }: Author) {
  const router = useRouter();

  if (!router.isFallback && !category) {
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
              <title>{category} | Kedro</title>
            </Head>
            <Header />
            <div className={style.categoryWrapper}>
              <section className={style.blogsList}>
                <p className={style.postsBy}>
                  Posts about <strong>{category}</strong>
                </p>
                <div>
                  {categoryPosts.map((post) => {
                    return (
                      <div key={post.slug}>
                        <PostsList key={post.slug} post={post} />
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

export async function getStaticProps({ params }: { params: CategoryParams }) {
  const data = await getCategoryPosts(params.category);

  return {
    props: {
      category: data.category,
      categoryPosts: data.posts ?? null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const uniqueCategories = await getUniquePostCategories();

  return {
    fallback: true,
    paths:
      uniqueCategories?.map(
        ({ category }: any) => `/blog/category/${category}`
      ) ?? [],
  };
}

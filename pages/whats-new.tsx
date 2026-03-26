import React, { useState } from 'react';
import Head from 'next/head';

import { getAllPostsForBlog } from '../lib/api';
import { PostSnippet } from '../modules/blog/post-snippet/post-snippet';
import { siteMetadata } from '../modules/shared/config';

import Header from '../modules/shared/header';
import { FilterBar, FilterValue } from '../modules/whats-new/filter-bar';
import { CoffeeChatSection } from '../modules/whats-new/coffee-chat-section';
import { BlogSection } from '../modules/whats-new/blog-section';
import { DemoSection } from '../modules/whats-new/demo-section';

import style from './whats-new.module.scss';

type WhatsNewProps = {
  allPosts: PostSnippet[];
};

const WhatsNew = ({ allPosts }: WhatsNewProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  return (
    <>
      <Head>
        <title>{"What's New | Kedro"}</title>
        <meta
          name="description"
          content={"What's New | " + siteMetadata.socialDescription}
        />
        <meta property="og:title" content={"What's New | Kedro"} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteMetadata.socialImage} />
        <meta
          property="og:url"
          content={siteMetadata.baseUrl + 'whats-new'}
        />
        <meta
          property="og:description"
          content={"What's New | " + siteMetadata.socialDescription}
        />
        <meta property="og:site_name" content="Kedro" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image:alt"
          content={siteMetadata.socialDescription}
        />
        <meta name="twitter:image" content={siteMetadata.socialImage} />
        <meta name="twitter:title" content={"What's New | Kedro"} />
        <meta
          name="twitter:description"
          content={"What's New | " + siteMetadata.socialDescription}
        />
      </Head>
      <Header />
      <main className={style.page}>
        <div className={style.hero}>
          <h1 className={style.heroTitle}>{"What's New"}</h1>
          <p className={style.heroSubtitle}>
            Coffee chats, blogs, and demos from the Kedro team.
          </p>
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
        {(activeFilter === 'all' || activeFilter === 'coffee-chats') && (
          <CoffeeChatSection />
        )}
        {(activeFilter === 'all' || activeFilter === 'blogs') && (
          <BlogSection posts={allPosts} />
        )}
        {(activeFilter === 'all' || activeFilter === 'demos') && (
          <DemoSection />
        )}
      </main>
    </>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = await getAllPostsForBlog(preview);

  return {
    props: {
      allPosts: data,
      preview,
    },
    revalidate: 10,
  };
}

export default WhatsNew;

import React, { useRef } from 'react';

import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Header from '../components/header';
import Hero from '../components/hero';
import Features from '../components/features';
import CaseStudies from '../components/case-studies';
import Footer from '../components/footer';

import useOnScreen from '../components/utils/hooks/useOnScreen'

const Home = () => {
  const ref = useRef();
  const onScreen = useOnScreen(ref);

  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      {!onScreen && <Header />}
      <Hero />
      <WhyKedro />
      <Features />
      <CaseStudies />
      <div ref={ref}>
        <Footer />
      </div>
    </>
  );
};

export default Home;

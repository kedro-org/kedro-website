import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';

import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Footer from '../components/footer';
import Head from 'next/head';

import Header from '../components/header';
import Hero from '../components/hero';
import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Header from '../components/header';
import Hero from '../components/hero';
import ReadyToStart from '../components/ready-to-start';
import WhyKedro from '../components/why-kedro';

const Home = () => {
  const footerRef = useRef();
  const onScreen = useOnScreen(footerRef);

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
      <div ref={footerRef}>
        <Footer />
      </div>
      <ReadyToStart />

    </>
  );
};

export default Home;

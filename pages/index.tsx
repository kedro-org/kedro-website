import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';

import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Footer from '../components/footer';
import Head from 'next/head';
import Header from '../components/header';
import Hero from '../components/hero';
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
    </>
  );
};

export default Home;

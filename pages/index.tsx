import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';
import Head from 'next/head';

import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Header from '../components/header';
import Hero from '../components/hero';
import Companies from '../components/companies-using-kedro';
import ReadyToStart from '../components/ready-to-start';
import WhyKedro from '../components/why-kedro';
import Footer from '../components/footer';

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
      <Companies />
      <ReadyToStart />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Home;

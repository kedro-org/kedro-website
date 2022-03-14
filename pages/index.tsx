import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Header from '../components/header';
import Hero from '../components/hero';
import Features from '../components/features';
import CaseStudies from '../components/case-studies';
import Footer from '../components/footer';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const onScroll = () => setOffset(window.innerHeight + window.scrollY);
    const footerOffset = document.getElementById('footer').offsetTop;
    if (footerOffset <= offset) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      {showHeader && <Header />}
      <Hero />
      <WhyKedro />
      <Features />
      <CaseStudies />
      <Footer />
    </>
  );
};

export default Home;

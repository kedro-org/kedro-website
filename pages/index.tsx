import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';
import Head from 'next/head';

import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Header from '../components/header';
import Hero from '../components/hero';
import CompaniesUsingKedro from '../components/companies-using-kedro';
import ReadyToStart from '../components/ready-to-start';
import Testimonials from '../components/testimonials';
import WhyKedro from '../components/why-kedro';
import Footer from '../components/footer';
import { Size, useWindowSize } from '../utils/hooks/useWindowSize';

const MOBILE_BREAKPOINT = 819;

const Home = () => {
  const footerRef = useRef();
  const onScreen = useOnScreen(footerRef);

  const size: Size = useWindowSize();
  const isMobile = size.width > MOBILE_BREAKPOINT ? false : true;

  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      {(!onScreen || isMobile) && <Header />}
      <Hero />
      <WhyKedro />
      <Features />
      <CaseStudies />
      <CompaniesUsingKedro />
      <Testimonials />
      <ReadyToStart />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Home;

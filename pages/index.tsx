import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';
import Head from 'next/head';

import CaseStudies from '../modules/index/case-studies';
import Features from '../modules/index/features';
import Header from '../modules/shared/header';
import Hero from '../modules/index/hero';
import CompaniesUsingKedro from '../modules/index/companies-using-kedro';
import ReadyToStart from '../modules/index/ready-to-start';
import Testimonials from '../modules/index/testimonials';
import WhyKedro from '../modules/index/why-kedro';
import Footer from '../modules/index/footer';
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
      <style jsx global>{`
        body {
          background: #000;
          color: #fff;
        }

        a {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Home;

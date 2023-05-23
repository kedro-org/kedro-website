import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';
import Head from 'next/head';
import { siteMetadata } from '../modules/shared/config';

import CaseStudies from '../modules/index/case-studies';
import Features from '../modules/index/features';
import FAQ from '../modules/index/faq';
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
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta property="og:title" content="Kedro" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteMetadata.socialImage} />
        <meta property="og:url" content={siteMetadata.baseUrl} />
        <meta
          content={siteMetadata.socialDescription}
          property="og:description"
        />
        <meta property="og:site_name" content="Kedro" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          content={siteMetadata.socialDescription}
          name="twitter:image:alt"
        />
        <meta content={siteMetadata.socialImage} name="twitter:image"></meta>
        <meta name="twitter:title" content="Kedro"></meta>
        <meta
          name="twitter:description"
          content={siteMetadata.socialDescription}
        ></meta>
      </Head>
      {(!onScreen || isMobile) && <Header />}
      <Hero />
      <WhyKedro />
      <Features />
      <FAQ />
      <CompaniesUsingKedro />
      <CaseStudies />
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

        p {
          color: #c6cad3;
        }

        a {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Home;

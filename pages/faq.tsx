import React, { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';
import Head from 'next/head';

import Header from '../components/header';
import Footer from '../components/footer';
import FAQ from '../components/faq';
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
      <FAQ />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Home;

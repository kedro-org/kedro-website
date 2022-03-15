import Head from 'next/head';

import CaseStudies from '../components/case-studies';
import Features from '../components/features';
import Header from '../components/header';
import Hero from '../components/hero';
import ReadyToStart from '../components/ready-to-start';
import WhyKedro from '../components/why-kedro';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Header />
      <Hero />
      <WhyKedro />
      <Features />
      <CaseStudies />
      <ReadyToStart />
    </>
  );
};

export default Home;

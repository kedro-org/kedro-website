import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Hero from '../components/hero';
import Features from '../components/features';
import CaseStudies from '../components/case-studies';

import style from '../styles/pages/index.module.scss';

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
    </>
  );
};

export default Home;

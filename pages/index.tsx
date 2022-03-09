import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Hero from '../components/hero';
import Features from '../components/features';
import CaseStudies from '../components/case-studies';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Hero />
      <WhyKedro />
      <Features />
      <CaseStudies />
    </>
  );
};

export default Home;

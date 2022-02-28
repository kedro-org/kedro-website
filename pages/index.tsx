import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Hero from '../components/hero';
import Features from '../components/features';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Hero />
      <WhyKedro />
      <Features />
    </>
  );
};

export default Home;

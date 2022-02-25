import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Hero from '../components/hero';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Hero />
      <WhyKedro />
    </>
  );
};

export default Home;

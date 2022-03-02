import Head from 'next/head';
import WhyKedro from '../components/why-kedro';
import Hero from '../components/hero';
import Features from '../components/features';
import UseCases from '../components/use-cases';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Hero />
      <WhyKedro />
      <Features />
      <UseCases />
    </>
  );
};

export default Home;

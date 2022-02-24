import Head from 'next/head';
import Hero from '../components/hero';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <Hero />
    </>
  );
};

export default Home;

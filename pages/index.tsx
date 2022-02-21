import Head from 'next/head';
import Hero from '../components/hero';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Kedro</title>
      </Head>
      <div>
        <Hero />
      </div>
    </div>
  );
};

export default Home;

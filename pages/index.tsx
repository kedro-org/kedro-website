import Head from 'next/head';
import Menu from '../components/menu';
import Hero from '../components/hero';
import WhyKedro from '../components/why-kedro';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Kedro</title>
      </Head>
      <div>
        <Menu />
        <Hero />
      </div>
    </div>
  );
};

export default Home;

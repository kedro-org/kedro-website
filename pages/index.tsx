import Head from 'next/head';
import Menu from '../components/menu';
import Hero from '../components/hero';

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
      <Container />
    </div>
  );
};

export default Home;

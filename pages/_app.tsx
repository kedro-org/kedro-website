import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles/global.scss';

function KedroWebsite({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default KedroWebsite;

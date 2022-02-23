import type { AppProps } from 'next/app';

import '../styles/global.scss';

function KedroWebsite({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default KedroWebsite;

import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles/global.scss';

function KedroWebsite({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="/consent/kedro-consent.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default KedroWebsite;

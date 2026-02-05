import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles/global.scss';

function KedroWebsite({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TEMP: Kedro Consent Management - handles cookie consent and Heap analytics */}
      <Script
        src="/consent/kedro-consent.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default KedroWebsite;

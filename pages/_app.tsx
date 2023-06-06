import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles/global.scss';

function KedroWebsite({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="heap">
        {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};   
          heap.load(${process.env.NEXT_PUBLIC_ANALYTICS_ID}); `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${process.env.NEXT_PUBLIC_GA_TRACKING_ID}");
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default KedroWebsite;

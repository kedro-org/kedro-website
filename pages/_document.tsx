import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="canonical" href="https://kedro.org/"></link>
        <meta
          name="description"
          content="Kedro is an open source Python framework for creating reproducible, maintainable and modular data science code."
        />

        <meta property="og:title" content="Kedro" />
        <meta property="og:type" content="website" />
        <meta
          content="https://kedro.org/images/kedro-social-image.png"
          property="og:image"
        />
        <meta property="og:url" content="https://kedro.org/" />
        <meta
          content="A Python framework for creating data science code."
          property="og:description"
        />
        <meta property="og:site_name" content="Kedro" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          content="A Python framework for creating reproducible, maintainable and modular data science code."
          name="twitter:image:alt"
        />
        <meta
          content="https://kedro.org/images/kedro-social-image.png"
          name="twitter:image"
        ></meta>
        <meta name="twitter:title" content="Kedro"></meta>
        <meta name="twitter:site" content="@quantumblack" />
        <meta
          name="twitter:description"
          content="A Python framework for creating reproducible, maintainable and modular data science code."
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

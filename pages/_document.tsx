import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Kedro is an open-source Python framework for creating reproducible, maintainable and modular data-science code. It borrows concepts from software engineering and applies them to machine-learning code."
        />

        <meta property="og:title" content="Kedro" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/kedro-social-image.png" />
        <meta property="og:url" content="https://kedro.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="A Python framework for creating reproducible, maintainable and modular data science code."
        />
        <meta property="og:site_name" content="Kedro" />
        <meta
          name="twitter:image:alt"
          content="A Python framework for creating reproducible, maintainable and modular data science code."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

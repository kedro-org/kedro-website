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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

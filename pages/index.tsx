import Head from 'next/head';
import FeatureDetails from '../components/feature-details';

import style from '../styles/pages/index.module.scss';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kedro</title>
      </Head>
      <section className={style.features}>
        <h3 className={style.sectionTitle}>Features</h3>
        <FeatureDetails
          buttonLink="https://demo.kedro.org/"
          buttonText="Explore Live Demo"
          iframeLink="https://demo.kedro.org/"
          subtitle={
            <>
              <a
                href="https://github.com/kedro-org/kedro-viz"
                rel="noopener noreferrer"
                target="_blank"
              >
                Kedro&#39;s pipeline visualisation plugin
              </a>{' '}
              shows a blueprint of your developing data and machine-learning
              workflows, provides data lineage, keeps track of machine-learning
              experiments and makes it easier to collaborate with business
              stakeholders.
            </>
          }
          title="Pipeline visualisation"
        />
        <FeatureDetails
          assetPosition="right"
          buttonLink="https://kedro.readthedocs.io/en/stable/02_get_started/05_example_project.html#project-directory-structure"
          buttonText="Learn more"
          subtitle={
            <>
              You can standardise how configuration, source code, tests,
              documentation, and notebooks are organised with an adaptable,
              easy-to-use project template.{' '}
              <a
                href="https://kedro.readthedocs.io/en/stable/07_extend_kedro/05_create_kedro_starters.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                Create your cookie cutter project templates with Starters.
              </a>
            </>
          }
          title="Project Template"
        />
        <FeatureDetails
          assetPosition="left"
          subtitle={
            <>
              Test-driven development using{' '}
              <a
                href="https://github.com/pytest-dev/pytest"
                rel="noopener noreferrer"
                target="_blank"
              >
                pytest
              </a>
              , produce well-documented code using{' '}
              <a
                href="http://www.sphinx-doc.org/en/master/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Sphinx
              </a>
              , create linted code with support for{' '}
              <a
                href="https://github.com/PyCQA/flake8"
                rel="noopener noreferrer"
                target="_blank"
              >
                flake8
              </a>
              ,{' '}
              <a
                href="https://github.com/PyCQA/isort"
                rel="noopener noreferrer"
                target="_blank"
              >
                isort
              </a>{' '}
              and{' '}
              <a
                href="https://github.com/psf/black"
                rel="noopener noreferrer"
                target="_blank"
              >
                black
              </a>{' '}
              and make use of the standard Python logging library.
            </>
          }
          title="Coding Standards"
        />
        <FeatureDetails
          assetPosition="right"
          subtitle="Apache Spark, Pandas, Dask, Matplotlib, Plotly, fsspec, Apache Airflow, Jupyter Notebook and Docker."
          title="Integrations"
        />
      </section>
    </>
  );
};

export default Home;

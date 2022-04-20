import { useState } from 'react';

import FeatureDetailsCard from '../feature-details-card';
import codingStandards from '../../public/images/coding-standards.png';
import dataCatalog from '../../public/images/data-catalog.png';
import flexibleDeployment from '../../public/images/flexible_deployment.png';
import integrations from '../../public/images/features_integrations.png';
import pipelineAbstraction from '../../public/images/pipeline-abstraction.png';
import projectTemplate from '../../public/images/project-template.jpg';
import vizScreenshot from '../../public/images/viz-screenshot.png';

import style from './features.module.scss';

export default function Hero() {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <section id="features" className={style.features}>
      <h3 className={style.sectionTitle}>Features</h3>
      <FeatureDetailsCard
        altText="Kedro-Viz example"
        buttonLink="https://demo.kedro.org/"
        buttonText="Explore Live Demo"
        imageSrc={vizScreenshot}
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
      <FeatureDetailsCard
        altText="Data Catalog example"
        assetPosition="right"
        buttonLink="https://kedro.readthedocs.io/en/stable/05_data/01_data_catalog.html"
        buttonText="Learn more"
        imageSrc={dataCatalog}
        subtitle="A series of lightweight data connectors used to save and load data across many different file formats and file systems, including local and network file systems, cloud object stores, and HDFS. The Data Catalog also includes data and model versioning for file-based systems."
        title="Data Catalog"
      />
      <FeatureDetailsCard
        altText="Integrations example"
        assetPosition="left"
        imageSrc={integrations}
        subtitle="Apache Spark, Pandas, Dask, Matplotlib, Plotly, fsspec, Apache Airflow, Jupyter Notebook and Docker."
        title="Integrations"
      />
      <FeatureDetailsCard
        altText="Project Template example"
        assetPosition="right"
        buttonLink="https://kedro.readthedocs.io/en/stable/02_get_started/05_example_project.html#project-directory-structure"
        buttonText="Learn more"
        imageSrc={projectTemplate}
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
      {showMoreFeatures ? (
        <>
          <FeatureDetailsCard
            altText="Pipeline Abstraction example"
            assetPosition="left"
            buttonLink="https://kedro.readthedocs.io/en/stable/06_nodes_and_pipelines/02_pipeline_introduction.html"
            buttonText="Explore"
            imageSrc={pipelineAbstraction}
            subtitle="You never have to label the running order of tasks in your pipeline because Kedro supports a dataset-driven workflow that supports automatic resolution of dependencies between pure Python functions."
            title="Pipeline Abstraction"
          />
          <FeatureDetailsCard
            altText="Coding Standards example"
            assetPosition="right"
            imageSrc={codingStandards}
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
          <FeatureDetailsCard
            altText="Flexible Deployment example"
            assetPosition="left"
            buttonLink="https://kedro.readthedocs.io/en/stable/10_deployment/01_deployment_guide.html"
            buttonText="Explore"
            imageSrc={flexibleDeployment}
            subtitle="Deployment strategies that include single or distributed-machine deployment as well as additional support for deploying on Argo, Prefect, Kubeflow, AWS Batch, AWS Sagemaker, Databricks, Dask and more."
            title="Flexible Deployment"
          />
        </>
      ) : null}
      {!showMoreFeatures ? (
        <div className={style.buttonWrapper}>
          <button
            className={style.button}
            onClick={() => setShowMoreFeatures(true)}
          >
            Show more features
          </button>
        </div>
      ) : null}
    </section>
  );
}

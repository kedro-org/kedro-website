import { FeatureProps } from '../feature-details-card/feature-details-card';

import codingStandards from '../../public/images/coding-standards.png';
import dataCatalog from '../../public/images/data-catalog.png';
import flexibleDeployment from '../../public/images/flexible_deployment.png';
import integrations from '../../public/images/features_integrations.png';
import pipelineAbstraction from '../../public/images/pipeline-abstraction.png';
import projectTemplate from '../../public/images/project-template.jpg';
import vizScreenshot from '../../public/images/viz-screenshot.png';

export const shownContent: FeatureProps[] = [
  {
    altText: 'Kedro-Viz example',
    buttonLink: 'https://demo.kedro.org/',
    buttonText: 'Explore Live Demo',
    imageSrc: vizScreenshot,
    subtitle:
      '<a href="https://github.com/kedro-org/kedro-viz" rel="noopener noreferrer" target="_blank"> Kedro&#39;s pipeline visualisation plugin</a> shows a blueprint of your developing data and machine-learning workflows, provides data lineage, keeps track of machine-learning experiments and makes it easier to collaborate with business stakeholders.',
    title: 'Pipeline Visualisation',
  },
  {
    altText: 'Data Catalog example',
    assetPosition: 'right',
    buttonLink:
      'https://kedro.readthedocs.io/en/stable/05_data/01_data_catalog.html',
    buttonText: 'Learn more',
    imageSrc: dataCatalog,
    subtitle:
      'A series of lightweight data connectors used to save and load data across many different file formats and file systems, including local and network file systems, cloud object stores, and HDFS. The Data Catalog also includes data and model versioning for file-based systems.',
    title: 'Data Catalog',
  },
  {
    altText: 'Integrations example',
    assetPosition: 'left',
    imageSrc: integrations,
    subtitle:
      'Apache Spark, Pandas, Dask, Matplotlib, Plotly, fsspec, Apache Airflow, Jupyter Notebook and Docker.',
    title: 'Integrations',
  },
  {
    altText: 'Project Template example',
    assetPosition: 'right',
    buttonLink:
      'https://kedro.readthedocs.io/en/stable/02_get_started/05_example_project.html#project-directory-structure',
    buttonText: 'Learn more',
    imageSrc: projectTemplate,
    subtitle:
      'You can standardise how configuration, source code, tests, documentation, and notebooks are organised with an adaptable, easy-to-use project template.<a href="https://kedro.readthedocs.io/en/stable/07_extend_kedro/05_create_kedro_starters.html" rel="noopener noreferrer" target="_blank" > Create your cookie cutter project templates with Starters.',
    title: 'Project Template',
  },
];

export const hiddenContent: FeatureProps[] = [
  {
    assetPosition: 'left',
    buttonLink:
      'https://kedro.readthedocs.io/en/stable/06_nodes_and_pipelines/02_pipeline_introduction.html',
    buttonText: 'Explore',
    iframeAttributes: {
      source:
        'https://carbon.now.sh/embed?bg=rgba%28187%2C187%2C187%2C0%29&t=lucario&wt=sharp&l=python&width=700&ds=true&dsyoff=3px&dsblur=13px&wc=true&wa=false&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=import%2520pandas%2520as%2520pd%250Afrom%2520kedro.pipeline%2520import%2520pipeline%252C%2520node%250A%250Adef%2520clean_data%28weather_df%253A%2520pd.DataFrame%29%2520-%253E%2520pd.DataFrame%253A%250A%2520%2520%2520%2520clean_weather_df%2520%253D%2520weather_df.drop%28%2522temperature%2522%252C%2520axis%253D1%29%250A%2520%2520%2520%2520return%2520clean_weather_df%250A%250Adef%2520join_meteoro_data%28%250A%2520%2520%2520%2520weather_df%253A%2520pd.DataFrame%252C%2520climate_df%253A%2520pd.DataFrame%29%2520-%253E%2520pd.DataFrame%253A%250A%2520%2520%2520%2520weather_climate_df%2520%253D%2520weather_df.merge%28climate_df%252C%2520on%253D%255B%2522country_code%2522%252C%2520%2522area_code%2522%255D%252C%2520how%253D%2522inner%2522%29%250A%2520%2520%2520%2520return%2520weather_climate_df%250A%250Adata_processing_pipeline%2520%253D%2520pipeline%28%250A%2520%2520%2520%2520%255B%250A%2520%2520%2520%2520%2520%2520%2520%2520node%28%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520func%253Dclean_data%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520inputs%253D%2522weather_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520outputs%253D%2522clean_weather_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%29%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520node%28%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520func%253Djoin_meteoro_data%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520inputs%253D%255B%2522clean_weather_data%2522%252C%2520%2522climate_change_data%2522%255D%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520outputs%253D%2522weather_climate_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%29%252C%250A%2520%2520%2520%2520%255D%250A%293%250A%2520%2520file_format%253A%2520csv',
      style: {
        border: 0,
        height: '473px',
        marginLeft: '-35px',
        overflow: 'hidden',
        transform: 'scale(1)',
        width: '770px',
      },
    },
    subtitle:
      'You never have to label the running order of tasks in your pipeline because Kedro supports a dataset-driven workflow that supports automatic resolution of dependencies between pure Python functions.',
    title: 'Pipeline Abstraction',
  },
  {
    altText: 'Coding Standards example',
    assetPosition: 'right',
    imageSrc: codingStandards,
    subtitle:
      'Test-driven development using <a href="https://github.com/pytest-dev/pytest" rel="noopener noreferrer" target="_blank">pytest</a>, produce well-documented code using <a href="http://www.sphinx-doc.org/en/master/" rel="noopener noreferrer" target="_blank">Sphinx</a>, create linted code with support for <a href="https://github.com/PyCQA/flake8" rel="noopener noreferrer" target="_blank">flake8</a>, <a href="https://github.com/PyCQA/isort" rel="noopener noreferrer" target="_blank">isort</a> and <a href="https://github.com/psf/black" rel="noopener noreferrer" target="_blank">black</a> and make use of the standard Python logging library.',
    title: 'Coding Standards',
  },
  {
    altText: 'Flexible Deployment example',
    assetPosition: 'left',
    buttonLink:
      'https://kedro.readthedocs.io/en/stable/10_deployment/01_deployment_guide.html',
    buttonText: 'Explore',
    imageSrc: flexibleDeployment,
    subtitle:
      'Deployment strategies that include single or distributed-machine deployment as well as additional support for deploying on Argo, Prefect, Kubeflow, AWS Batch, AWS Sagemaker, Databricks, Dask and more.',
    title: 'Flexible Deployment',
  },
];

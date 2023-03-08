import { FeatureProps } from '../feature-details-card/feature-details-card';

import dataCatalog1 from '../../public/images/data-catalog-1.png';
import dataCatalog2 from '../../public/images/data-catalog-2.png';
import flexibleDeployment from '../../public/images/flexible_deployment.png';
import expTracking from '../../public/images/features_experiment_tracking.png';
import integrations from '../../public/images/features_integrations.png';
import pipelineAbstraction from '../../public/images/pipeline-abstraction.png';
import projectTemplate from '../../public/images/project-template.png';
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
    assetPosition: 'right',
    buttonLink: 'https://docs.kedro.org/en/stable/data/data_catalog.html',
    buttonText: 'Explore the data catalog',
    iframeList: [
      {
        fallbackImg: dataCatalog1,
        source:
          'https://carbon.now.sh/embed?bg=rgba%28187%2C187%2C187%2C0%29&t=seti&wt=sharp&l=yaml&width=660&ds=false&dsyoff=3px&dsblur=13px&wc=true&wa=false&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%2523%2520Load%2520a%2520Spark%2520DataFrame%2520on%2520S3%250A%250Aflight_patterns%253A%250A%2520%2520type%253A%2520spark.SparkDataSet%250A%2520%2520filepath%253A%2520s3a%253A%252F%252Fyour_bucket%252Fdata%252F01_raw%252Fflight_patterns*%250A%2520%2520credentials%253A%2520dev_s3%250A%2520%2520file_format%253A%2520csv',
        style: {
          border: 0,
          height: '204px',
          overflow: 'hidden',
          transform: 'scale(1)',
        },
      },
      {
        fallbackImg: dataCatalog2,
        source:
          'https://carbon.now.sh/embed?bg=rgba%28187%2C187%2C187%2C0%29&t=seti&wt=sharp&l=yaml&width=660&ds=false&dsyoff=3px&dsblur=13px&wc=true&wa=false&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%2523%2520Save%2520an%2520image%2520created%2520with%2520Matplotlib%2520on%2520Google%2520Cloud%2520Storage%250A%250Aresults_plot%253A%250A%2520%2520type%253A%2520matplotlib.MatplotlibWriter%250A%2520%2520filepath%253A%2520gcs%253A%252F%252Fyour_bucket%252Fdata%252F08_results%252Fplots%252Foutput_1.jpeg%250A%2520%2520fs_args%253A%250A%2520%2520project%253A%2520my-project%250A%2520%2520credentials%253A%2520my_gcp_credentials',
        style: {
          border: 0,
          height: '235px',
          overflow: 'hidden',
          transform: 'scale(1)',
        },
      },
    ],
    subtitle:
      'A series of lightweight data connectors used to save and load data across many different file formats and file systems. Supported file formats include Pandas, Spark, Dask, NetworkX, Pickle, Plotly, Matplotlib and many more. The Data Catalog supports S3, GCP, Azure, sFTP, DBFS and local filesystems. The Data Catalog also includes data and model snapshots for file-based systems.',
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
    assetPosition: 'right',
    buttonLink:
      'https://docs.kedro.org/en/stable/02_get_started/05_example_project.html#project-directory-structure',
    buttonText: 'View the project template',
    iframeList: [
      {
        fallbackImg: projectTemplate,
        source:
          'https://carbon.now.sh/embed?bg=rgba%28187%2C187%2C187%2C0%29&t=seti&wt=sharp&l=application%2Fx-sh&width=660&ds=false&dsyoff=3px&dsblur=13px&wc=true&wa=false&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=1x&wm=false&code=project-template%2520%2520%2520%2520%2523%2520Project%2520folder%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520conf%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2523%2520Configuration%2520files%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520data%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2523%2520Local%2520project%2520data%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520docs%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2523%2520Documentation%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520logs%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2523%2520Logs%2520of%2520pipeline%2520runs%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520notebooks%2520%2520%2520%2520%2520%2520%2520%2523%2520Exploratory%2520Jupyter%2520notebooks%2520%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520pyproject.toml%2520%2520%2523%2520Identifies%2520the%2520project%2520root%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520setup.cfg%2520%2520%2520%2520%2520%2520%2520%2523%2520Configuration%2520options%2520for%2520testing%2520and%2520linting%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520README.md%2520%2520%2520%2520%2520%2520%2520%2523%2520README.md%2520explaining%2520your%2520project%250A%25E2%2594%259C%25E2%2594%2580%25E2%2594%2580%2520setup.cfg%2520%2520%2520%2520%2520%2520%2520%2523%2520Configuration%2520options%2520for%2520testing%2520and%2520linting%250A%25E2%2594%2594%25E2%2594%2580%25E2%2594%2580%2520src%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2523%2520Source%2520code%2520for%2520pipelines',
        style: {
          border: 0,
          height: '297px',
          overflow: 'hidden',
          transform: 'scale(1)',
        },
      },
    ],
    subtitle:
      'You can standardise how configuration, source code, tests, documentation, and notebooks are organised with an adaptable, easy-to-use project template. <a href="https://docs.kedro.org/en/stable/07_extend_kedro/05_create_kedro_starters.html" rel="noopener noreferrer" target="_blank" >Create your cookie cutter project templates with Starters.',
    title: 'Project Template',
  },
];

export const hiddenContent: FeatureProps[] = [
  {
    assetClassName: 'pipelineAbstraction',
    assetPosition: 'left',
    buttonLink:
      'https://docs.kedro.org/en/stable/06_nodes_and_pipelines/02_pipeline_introduction.html',
    buttonText: 'Build a pipeline',
    iframeList: [
      {
        fallbackImg: pipelineAbstraction,
        source:
          'https://carbon.now.sh/embed?bg=rgba%28187%2C187%2C187%2C0%29&t=seti&wt=sharp&l=python&width=660&ds=false&dsyoff=3px&dsblur=13px&wc=true&wa=false&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=import%2520pandas%2520as%2520pd%250Afrom%2520kedro.pipeline%2520import%2520pipeline%252C%2520node%250A%250Adef%2520clean_data%28weather_df%253A%2520pd.DataFrame%29%2520-%253E%2520pd.DataFrame%253A%250A%2520%2520%2520%2520clean_weather_df%2520%253D%2520weather_df.drop%28%2522temperature%2522%252C%2520axis%253D1%29%250A%2520%2520%2520%2520return%2520clean_weather_df%250A%250Adef%2520join_meteoro_data%28%250A%2520%2520%2520%2520weather_df%253A%2520pd.DataFrame%252C%2520climate_df%253A%2520pd.DataFrame%29%2520-%253E%2520pd.DataFrame%253A%250A%2520%2520%2520%2520weather_climate_df%2520%253D%2520weather_df.merge%28climate_df%252C%2520on%253D%255B%2522country_code%2522%252C%2520%2522area_code%2522%255D%252C%2520how%253D%2522inner%2522%29%250A%2520%2520%2520%2520return%2520weather_climate_df%250A%250Adata_processing_pipeline%2520%253D%2520pipeline%28%250A%2520%2520%2520%2520%255B%250A%2520%2520%2520%2520%2520%2520%2520%2520node%28%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520func%253Dclean_data%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520inputs%253D%2522weather_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520outputs%253D%2522clean_weather_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%29%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520node%28%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520func%253Djoin_meteoro_data%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520inputs%253D%255B%2522clean_weather_data%2522%252C%2520%2522climate_change_data%2522%255D%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520outputs%253D%2522weather_climate_data%2522%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520%29%250A%2520%2520%2520%2520%255D%250A%29',
        style: {
          border: 0,
          height: '570px',
          overflow: 'hidden',
          transform: 'scale(1)',
        },
      },
    ],
    subtitle:
      'You never have to label the running order of tasks in your pipeline because Kedro supports a dataset-driven workflow that supports automatic resolution of dependencies between pure Python functions.',
    title: 'Pipeline Abstraction',
  },
  {
    assetClassName: 'youtube',
    assetPosition: 'right',
    iframeList: [
      {
        source:
          'https://www.youtube-nocookie.com/embed/MErBf3sTn-A?modestbranding=1&rel=0&autoplay=1&loop=1',
        style: {
          height: '100%',
          marginLeft: 0,
          width: '100%',
        },
      },
    ],
    subtitle:
      'Test-driven development using <a href="https://github.com/pytest-dev/pytest" rel="noopener noreferrer" target="_blank">pytest</a>, produce well-documented code using <a href="http://www.sphinx-doc.org/en/master/" rel="noopener noreferrer" target="_blank">Sphinx</a>, create linted code with support for <a href="https://github.com/PyCQA/flake8" rel="noopener noreferrer" target="_blank">flake8</a>, <a href="https://github.com/PyCQA/isort" rel="noopener noreferrer" target="_blank">isort</a> and <a href="https://github.com/psf/black" rel="noopener noreferrer" target="_blank">black</a> and make use of the standard Python logging library.',
    title: 'Coding Standards',
  },
  {
    altText: 'Flexible Deployment example',
    assetPosition: 'left',
    buttonLink:
      'https://docs.kedro.org/en/stable/10_deployment/01_deployment_guide.html',
    buttonText: 'Choose your deployment target',
    imageSrc: flexibleDeployment,
    subtitle:
      'Deployment strategies that include single or distributed-machine deployment as well as additional support for deploying on Argo, Prefect, Kubeflow, AWS Batch, AWS Sagemaker, Databricks, Dask and more.',
    title: 'Flexible Deployment',
  },
  {
    altText: 'Experiment Tracking example',
    assetPosition: 'right',
    buttonLink:
      'https://docs.kedro.org/en/stable/visualisation/experiment_tracking.html',
    buttonText: 'Enable experiment tracking',
    imageSrc: expTracking,
    subtitle:
      'Experiment tracking records all the information you need to recreate and analyse a data science experiment.',
    title: 'Experiment Tracking',
  },
];

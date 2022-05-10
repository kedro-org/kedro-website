export const faqs = [
  {
    title: 'Catalog',
    items: [
      {
        question: 'How do I use data from S3 as input to my model?',
        answer:
          'All the input and output data needs to be specified in the Kedro <code>DataCatalog</code>. Kedro uses <code>fsspec</code> under the hood the read from different locations, such as S3. This is an example catalog entry for a dataset that is stored on S3:',
        link: 'https://kedro.readthedocs.io/en/stable/data/data_catalog.html',
        code: 'motorbikes:\n  type: pandas.CSVDataSet\n  filepath: s3://your_bucket/data/02_intermediate/company/motorbikes.csv',
      },
    ],
  },
  {
    title: 'Hooks',
    items: [
      {
        question:
          'How can I make a different decision depending on what part of my pipeline failed?',
        answer:
          'You could use hooks for this. Specifically the on_node_error gives you information about what node failed and with which exception. See this section in the docs for more details:',
        link: 'https://kedro.readthedocs.io/en/stable/extend_kedro/hooks.html',
      },
    ],
  },
  {
    title: 'Templating',
    items: [
      {
        question: 'How do I use templating in my configuration?',
        answer:
          'Kedro allows you to template values in your configuration files through the <code>TemplatedConfigLoader</code>. The documentation explains how to use this extension.',
        link: 'https://kedro.readthedocs.io/en/stable/kedro_project_setup/configuration.html#template-configuration',
      },
    ],
  },
  {
    title: 'Customisation',
    items: [
      {
        question: 'Can I use my own custom ConfigLoader?',
        answer:
          'Yes you can do this by creating your own <code>ConfigLoader</code> class which inherits from the kedro <code>ConfigLoader</code>. Then you’ll need to supply your custom config loader in the settings in <code>settings.py</code>. See more details in the docs.',
        link: 'https://kedro.readthedocs.io/en/stable/kedro_project_setup/settings.html',
      },
    ],
  },
  {
    title: 'Plots',
    items: [
      {
        question: 'How can I log plots in Kedro?',
        answer:
          'You can use the <code>PlotlyDataSet</code>. This dataset will then also be visualised in Kedro Viz:',
        link: 'https://kedro.readthedocs.io/en/stable/tutorial/visualise_pipeline.html#visualise-plotly-charts-in-kedro-viz',
      },
    ],
  },
];

export const faqs = [
  {
    title: 'Catalog',
    items: [
      {
        question: 'How do I use data from S3 as input to my model?',
        answer:
          'All the input and output data <a href="https://kedro.readthedocs.io/en/stable/data/data_catalog.html" target="_blank" rel="noopener noreferrer">needs to be specified</a> in the Kedro <code>DataCatalog</code>. Kedro uses <code>fsspec</code> under the hood the read from different locations, such as S3. This is an example catalog entry for a dataset that is stored on S3:',
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
          'You could use hooks for this. Specifically the on_node_error gives you information about what node failed and with which exception. <a href="https://kedro.readthedocs.io/en/stable/extend_kedro/hooks.html" target="_blank" rel="noopener noreferrer">See this section in the docs</a> for more details',
      },
    ],
  },
  {
    title: 'Templating',
    items: [
      {
        question: 'How do I use templating in my configuration?',
        answer:
          'Kedro allows you to template values in your configuration files through the <code>TemplatedConfigLoader</code>. <a href="https://kedro.readthedocs.io/en/stable/kedro_project_setup/configuration.html#template-configuration" target="_blank" rel="noopener noreferrer">The documentation</a> explains how to use this extension.',
      },
    ],
  },
  {
    title: 'Customisation',
    items: [
      {
        question: 'Can I use my own custom ConfigLoader?',
        answer:
          'Yes you can do this by creating your own <code>ConfigLoader</code> class which inherits from the kedro <code>ConfigLoader</code>. Then you’ll need to supply your custom config loader in the settings in <code>settings.py</code>. <a href="https://kedro.readthedocs.io/en/stable/kedro_project_setup/settings.html" target="_blank" rel="noopener noreferrer">See more details</a> in the docs.',
      },
    ],
  },
  {
    title: 'Plots',
    items: [
      {
        question: 'How can I log plots in Kedro?',
        answer:
          'You can use the <code>PlotlyDataSet</code>. This dataset will then also be visualised in Kedro Viz: <a href="https://kedro.readthedocs.io/en/stable/tutorial/visualise_pipeline.html#visualise-plotly-charts-in-kedro-viz" target="_blank" rel="noopener noreferrer">https://kedro.readthedocs.io/en/stable/tutorial/visualise_pipeline.html#visualise-plotly-charts-in-kedro-viz</a>',
      },
    ],
  },
];

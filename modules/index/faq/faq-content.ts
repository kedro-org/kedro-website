export const faqContent = [
  {
    question: 'What is Kedro?',
    answer: `Kedro is an open-source Python framework hosted by the Linux Foundation ([LF AI & Data](https://lfaidata.foundation/)). Kedro uses software engineering best practices to help you build production-ready data science code.`,
  },
  {
    question: 'What does Kedro do?',
    answer: `A Kedro project is scaffolding to help you build complex data and machine-learning pipelines. It uses best practices to help you create clean data science code with the result that you spend less time on the tedious "plumbing".\n\nKedro helps you version data, run incremental computations, and automate your pipeline running- order resolution. And, in combination with Kedro-Viz, it gives you a blueprint of your developing data and machine-learning workflows, provides data lineage, keeps track of machine-learning experiments, and makes it easier to communicate with business stakeholders.`,
  },
  {
    question: 'Is Kedro an orchestrator?',
    answer: `You might be wondering if Kedro isn't just another orchestrator. It's not. If you don’t know what one of those is, it’s a way to automate running code as a set of tasks.\n\nOrchestrators like Airflow, Luigi, Prefect, Dagster, Flyte, and Kubeflow focus on running, scheduling, and monitoring pipelines. Meanwhile, Kedro is all about the process of authoring pipelines. So, if you're looking for a solution that takes care of questions like "What time will this task run?" or "How do I manage my compute?", Kedro might not be what you need.\n\nBut don't worry - we still have you covered. Kedro provides a set of deployment guidelines for using orchestrators as deployment targets. We even collaborate with the maintainers of some of those tools to make the deployment experience as smooth as possible. If you're looking for a partner to help you production-ready data science code, Kedro is the perfect solution for you.`,
  },
  {
    question: "I'm a data scientist. Why should I use Kedro?",
    answer: `If you're a Data Scientist, then you should be interested in Kedro because it enables you to:\n- **Write cleaner code.** Kedro helps you apply software engineering best practices, making your Python code easy to maintain, share, and reuse.\n- **Make a seamless transition from development to production.** Use Kedro to write quick, throw-away exploratory code and expand it into maintainable easy-to-share code experiments.\n- **Stay current in machine learning operations (MLOps).** With Kedro, you can create data science code that lasts. You'll always be two steps in front of industry standards, which can help you stay relevant and competitive in your field.\n- **Use tools in the data science ecosystem.** Kedro supports integration with many standard data science tools, such as Tensorflow, SciKit-Learn, or Jupyter notebooks for experimentation. You can also use Sphinx for documentation, black, isort, and flake8 for code linting and formatting, and pytest for testing.
    `,
  },
  {
    question:
      "I'm a Machine-Learning Engineer/Data Engineer. Why should I be interested in Kedro?",
    answer: `- **Standardisation creates efficiency.** Establishing proper analytics code foundations can save up to 80% of your hours when putting models into production.\n- **You can focus on solving problems.** Kedro provides the scaffolding to build complex data and machine-learning projects. Spend less time on the tedious "plumbing" required to maintain analytics code and more time on solving problems.\n -**It makes it easy to create pipelines.** You'll find it easy to version data, perform incremental computing and automate your pipeline running-order resolution.\n - **It is platform-agnostic.** You can choose how and where to run your Kedro workflow. Kedro supports Databricks and products like Kubeflow, Argo, Prefect, and Airflow as deployment targets.\n- **It is easy to extend.** You can use Hooks to add tools like [MLFlow](https://mlflow.org/) for experiment tracking, [Great Expectations](https://greatexpectations.io/) for data validation and profiling, and [Grafana](https://grafana.com/) for pipeline monitoring.`,
  },
  {
    question: "I'm a Product Lead, and my team wants to use Kedro. Why?",
    answer: `- **Kedro promotes teamwork.** It offers an ability to scale analytics across an organisation with standardised team workflows. Stakeholders can use Kedro-Viz blueprints to understand pipeline workflows even as you build them.\n - **Production-ready code is closer than ever.** You no longer face delays caused by refactoring a proof of concept into production-quality code.\n- **Modular pipelines mean reusable code.** Standardisation and separation of concerns make it possible to reuse your analytics code in future projects.`,
  },
  {
    question: "What's Kedro's origin story?",
    answer: `Kedro was born at QuantumBlack to reduce technical debt in data science experiments, making an easier transition from experimentation to production. The latest iteration of Kedro is an incubating project within [https://lfaidata.foundation/](https://lfaidata.foundation/).`,
  },
  {
    question: 'How can I find out more about Kedro?',
    answer: `You can find the [Kedro community on Slack](https://slack.kedro.org/). Discussions from the [Slack channels are also archived online](https://linen-slack.kedro.org/), as are those from an [earlier set of Discord channels](https://linen-discord.kedro.org/).`,
  },
];

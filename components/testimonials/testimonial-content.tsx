import eduardo from '../../public/images/eduardo.png';
import ghifari from '../../public/images/ghifari.png';

export const testimonials = [
  {
    headline: 'We heavily use Kedro',
    jobTitle: 'Data Engineering',
    linkText: 'Thoughts on Kedro',
    linkUrl:
      'https://medium.com/life-at-telkomsel/how-we-build-a-production-grade-data-pipeline-7004e56c8c98',
    logo: '/images/telkomsel-white.svg',
    logoWidth: 292,
    text: 'We use Kedro in our production environment which consumes tens of TBs of data, runs hundreds of feature engineering tasks, and serves dozens of ML models.',
    user: 'Ghifari Dwiki Ramadhan',
    userImage: ghifari,
  },
  {
    headline: 'Tremendously valuable',
    jobTitle: 'Principal ML Engineer',
    linkText: 'Read the article',
    linkUrl:
      'https://junglescouteng.medium.com/jungle-scout-case-study-kedro-airflow-and-mlflow-use-on-production-code-150d7231d42e',
    logo: '/images/jungle-scout.svg',
    logoWidth: 337,
    text: 'Kedro has streamlined our workflow process, avoiding a lot of back and forth with debugging. It allowed our company to deliver more value to our customers quickly.',
    user: 'Eduardo Ohe',
    userImage: eduardo,
  },
];

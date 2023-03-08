import Image from 'next/image';

import style from './footer.module.scss';

export default function Footer() {
  return (
    <section id="footer" className={style.outer}>
      <div className={style.inner}>
        <a href="#" className={style.logo}>
          <Image
            alt="KedroLogo"
            src="/images/kedro-logo.svg"
            width={50}
            height={50}
          />
          <h4 className={style.logoText}>Kedro</h4>
        </a>
        <nav className={style.menu}>
          <a href="#why-kedro" className={style.link}>
            Why Kedro?
          </a>
          <a href="#features" className={style.link}>
            Features
          </a>
          <a href="#faq" className={style.link}>
            FAQs
          </a>
          <a
            className={style.link}
            href="https://kedro.readthedocs.io/en/stable/02_get_started/01_prerequisites.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Get Started
          </a>
          <a
            href="https://kedro.readthedocs.io/en/stable/"
            className={style.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <div className={style.iconLinks}>
            <a
              className={style.link}
              href="https://slack.kedro.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="SlackLogo"
                height={30}
                src="/images/slack.svg"
                width={30}
              />
              <span className={style.iconText}>Slack</span>
            </a>
            <a
              className={style.link}
              href="https://github.com/kedro-org/kedro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="GithubLogo"
                height={30}
                src="/images/github.svg"
                width={30}
              />
              <span className={style.iconText}> Github</span>
            </a>
          </div>
          <a
            className={style.linux}
            href="https://lfaidata.foundation/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Linux Foundation logo"
              height={30}
              src="/images/linux-foundation-logo.svg"
              width={90}
            />
          </a>
          <a
            className={style.netlify}
            href="https://www.netlify.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Deploys by Netlify"
              height={30}
              src="/images/netlify-logo.svg"
              width={67}
            />
          </a>
        </nav>
      </div>
    </section>
  );
}

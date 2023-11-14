import Image from 'next/image';
import Link from 'next/link';

import { defaultImageStyle } from '../../../utils/blog';

import style from './footer.module.scss';

export default function Footer() {
  return (
    <section id="footer" className={style.outer}>
      <div className={style.inner}>
        <a href="#" className={style.logo}>
          <Image
            alt="KedroLogo"
            height={25}
            src="/images/kedro_logo.svg"
            style={defaultImageStyle}
            width={25}
          />
          <h4 className={style.logoText}>kedro</h4>
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
          <Link href="/#get-started" className={style.link}>
            Get Started
          </Link>
          <a
            href="https://docs.kedro.org/en/stable/"
            className={style.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <Link href="/blog" className={style.link}>
            Blog
          </Link>
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
                style={defaultImageStyle}
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
                style={defaultImageStyle}
                width={30}
              />
              <span className={style.iconText}>Github</span>
            </a>
            <a
              className={style.link}
              href="https://www.youtube.com/@kedro-python"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="YouTubeLogo"
                height={40}
                src="/images/youtube_social_circle_dark.png"
                style={defaultImageStyle}
                width={40}
              />
              <span className={style.iconText}>YouTube</span>
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
              style={defaultImageStyle}
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
              style={defaultImageStyle}
              width={67}
            />
          </a>
        </nav>
      </div>
    </section>
  );
}

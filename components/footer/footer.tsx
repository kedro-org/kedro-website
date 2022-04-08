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
            width={30}
            height={30}
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
          <a href="#" className={style.link}>
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
              href="https://discord.gg/4qeKKspFf8"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="DiscordLogo"
                height={30}
                src="/images/discord.svg"
                width={30}
              />
              <span className={style.iconText}>Discord</span>
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
            className={style.netlify}
            href="https://www.netlify.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Deploys by Netlify"
              height={51}
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              width={114}
            />
          </a>
        </nav>
      </div>
    </section>
  );
}

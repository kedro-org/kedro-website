import Image from 'next/image';

import style from './footer.module.scss';

export default function Footer() {
  return (
    <section id="footer">
      <div className={style.container}>
        <div className={style.footer}>
          <a href="#" className={style.logo}>
            <Image
              alt="KedroLogo"
              src="/images/kedro-logo.svg"
              width={30}
              height={30}
            />
            <h4 className={style.logoText}>Kedro</h4>
          </a>
          {/*TO DO - Update All Links*/}
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="DiscordLogo"
                  src="/images/discord.svg"
                  width={30}
                  height={30}
                />
                <span className={style.iconText}>Discord</span>
              </a>
              <a
                className={style.link}
                href="https://github.com/kedro-org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="GithubLogo"
                  src="/images/github.svg"
                  width={30}
                  height={30}
                />
                <span className={style.iconText}> Github</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { defaultImageStyle } from '../../../utils/blog';

import style from './header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link href="/" passHref className={style.logo}>
          <Image
            alt="KedroLogo"
            height={25}
            src="/images/kedro_logo.svg"
            style={defaultImageStyle}
            width={25}
          />
          <h4 className={style.logoText}>kedro</h4>
        </Link>
        <nav
          className={menuOpen ? `${style.menu} ${style.active}` : style.menu}
          onClick={() => setMenuOpen(false)}
        >
          <Link href="/#why-kedro" className={style.link}>
            Why Kedro?
          </Link>
          <Link href="/#features" className={style.link}>
            Features
          </Link>
          <Link href="/#faq" className={style.link}>
            FAQs
          </Link>
          <Link href="/#get-started" className={style.link}>
            Get Started
          </Link>
          <a
            className={style.link}
            href="https://docs.kedro.org/en/stable/"
            rel="noopener noreferrer"
            target="_blank"
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
              rel="noopener noreferrer"
              target="_blank"
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
        </nav>
        <button
          aria-label={menuOpen ? 'open' : 'close'}
          className={style.burger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <Image
              alt="CloseIcon"
              height={15}
              src="/images/close.svg"
              style={defaultImageStyle}
              width={15}
            />
          ) : (
            <Image
              alt="BurgerIcon"
              height={25}
              src="/images/burger.svg"
              style={defaultImageStyle}
              width={25}
            />
          )}
        </button>
      </div>
    </div>
  );
}

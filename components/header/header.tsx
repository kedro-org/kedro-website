import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import style from './header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link href="/" passHref>
          <a className={style.logo}>
            <Image
              alt="KedroLogo"
              height={30}
              src="/images/kedro-logo.svg"
              width={30}
            />
            <h4 className={style.logoText}>Kedro</h4>
          </a>
        </Link>
        <nav
          className={menuOpen ? `${style.menu} ${style.active}` : style.menu}
          onClick={() => setMenuOpen(false)}
        >
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
            href="https://docs.kedro.org/en/stable/get_started/install.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Get Started
          </a>
          <a
            className={style.link}
            href="https://docs.kedro.org/en/stable/"
            rel="noopener noreferrer"
            target="_blank"
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
              rel="noopener noreferrer"
              target="_blank"
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
              width={15}
            />
          ) : (
            <Image
              alt="BurgerIcon"
              height={25}
              src="/images/burger.svg"
              width={25}
            />
          )}
        </button>
      </div>
    </div>
  );
}

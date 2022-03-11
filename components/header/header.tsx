import React, { useState } from 'react';
import Image from 'next/image';

import style from './header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.header}>
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
        <button
          aria-label={menuOpen ? 'open' : 'close'}
          className={style.burger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <Image
              alt="CloseIcon"
              src="/images/close.svg"
              width={15}
              height={15}
            />
          ) : (
            <Image
              alt="BurgerIcon"
              src="/images/burger.svg"
              width={25}
              height={25}
            />
          )}
        </button>
      </div>
    </div>
  );
}

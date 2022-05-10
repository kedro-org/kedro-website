import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import style from './header.module.scss';

export default function Header({ isHomepage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link href="/">
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
          {isHomepage ? (
            <>
              <a href="#why-kedro" className={style.link}>
                Why Kedro?
              </a>
              <a href="#features" className={style.link}>
                Features
              </a>
              <a href="#get-started" className={style.link}>
                Get Started
              </a>
              <Link href="/faq">
                <a className={style.link}>FAQ</a>
              </Link>
            </>
          ) : (
            <Link href="/">
              <a className={style.link}>Home</a>
            </Link>
          )}
          <a
            className={style.link}
            href="https://kedro.readthedocs.io/en/stable/"
            rel="noopener noreferrer"
            target="_blank"
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
              rel="noopener noreferrer"
              target="_blank"
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

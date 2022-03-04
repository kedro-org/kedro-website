import React, { useState } from 'react';
import Image from 'next/image';
import style from './header.module.scss';
import KedroLogo from '../../public/assets/logos/kedro';
import DiscordLogo from '../../public/assets/logos/discord';
import GithubLogo from '../../public/assets/logos/github';
import BurgerIcon from '../../public/assets/icons/burger';
import CloseIcon from '../../public/assets/icons/close';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <KedroLogo />
        <h4 className={style.logoText}>Kedro</h4>
      </div>
      <nav
        className={menuOpen ? `${style.menu} ${style.active}` : style.menu}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#why-kedro" className={style.link}>
          Why Kedro
        </a>
        <a href="#features" className={style.link}>
          Features
        </a>
        <a href="#" className={style.link}>
          Get Started
        </a>
        <a href="#" className={style.link}>
          Documentation
        </a>
        <div className={style.iconLinks}>
          <a className={style.link} href="https://github.com/kedro-org">
            <DiscordLogo />
            <span className={style.iconText}>Discord</span>
          </a>
          <a className={style.githubLink} href="https://github.com/kedro-org">
            <GithubLogo />
            <span className={style.iconText}> Github</span>
          </a>
        </div>
      </nav>
      <button
        aria-label={menuOpen ? 'open' : 'close'}
        className={style.burger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>
    </div>
  );
}

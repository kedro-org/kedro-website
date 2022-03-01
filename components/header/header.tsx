import React, { useState } from 'react';
import Image from 'next/image';
import style from './header.module.scss';
import logoIcon from '../../public/images/kedro-logo.svg';
import discordIcon from '../../public/images/discord.svg';
import githubIcon from '../../public/images/github.svg';
import burgerIcon from '../../public/images/burger.svg';
import closeIcon from '../../public/images/close.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image alt="logo-icon" src={logoIcon} />
        <span className={style.logoText}> Kedro </span>
      </div>
      <div
        className={menuOpen ? `${style.links} ${style.active}` : style.links}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#why-kedro" className={style.link}>
          Why Kedro
        </a>
        <a href="#features" className={style.link}>
          Features
        </a>
        <a href="#why-kedro" className={style.link}>
          Get Started
        </a>
        <a href="#why-kedro" className={style.link}>
          Documentation
        </a>
        <div className={style.iconLinks}>
          <a className={style.link} href="www.google.com">
            <Image alt="discord-icon" src={discordIcon} />
          </a>
          <a className={style.githubLink}>
            <Image alt="github-icon" src={githubIcon} />
          </a>
        </div>
      </div>
      {!menuOpen && (
        <div className={style.burger} onClick={() => setMenuOpen(true)}>
          <Image alt="burger-icon" src={burgerIcon} />
        </div>
      )}
      {menuOpen && (
        <div className={style.burger} onClick={() => setMenuOpen(false)}>
          <Image alt="close-icon" src={closeIcon} />
        </div>
      )}
    </div>
  );
}

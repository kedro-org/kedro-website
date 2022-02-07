import style from './hero.module.scss';
import Image from 'next/image';
import hero from '../../public/images/hero.png';

export default function Hero() {
  return (
    <div className={style.hero}>
      <div className={style['hero-info']}>
        <h1 className={style.hero_title}>Maintainable data science solved</h1>
        <h2 className={style.hero_subtitle}>
          Kedro is an open-sourced Python framework for creating maintainable
          and modular data science code
        </h2>
        <div className={style.hero_buttons}>
          <button className={style.hero_button_started}>Get Started</button>
          <button className={style.hero_button_tutorial}>
            Take the Tutorial
          </button>
        </div>
      </div>
      <div className={style.hero_image}>
        <Image src={hero} layout="intrinsic"></Image>
      </div>
    </div>
  );
}

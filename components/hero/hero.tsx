import Media from '../media';
import hero from '../../public/assets/images/hero.webp';

import style from './hero.module.scss';

export default function Hero() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.info}>
          <h1 className={style.title}>Maintainable data science solved</h1>
          <h2 className={style.subtitle}>
            Kedro is an open-sourced Python framework for creating maintainable
            and modular data science code.
          </h2>
          <div className={style.buttons}>
            <a
              href="https://kedro.readthedocs.io/en/stable/02_get_started/01_prerequisites.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.start}>Get Started</button>
            </a>
            <a
              href="https://kedro.readthedocs.io/en/stable/03_tutorial/01_spaceflights_tutorial.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.tutorial}>Take the Tutorial</button>
            </a>
          </div>
        </div>
        <div className={style.image}>
          <Media alt="Kedro logo" image={hero} />
        </div>
      </div>
      <div className={style.video}>
        <Media poster="/images/intro-poster.jpg" video="/kedro.mp4" />
      </div>
    </div>
  );
}

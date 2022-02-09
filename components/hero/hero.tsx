import style from './hero.module.scss';
import Media from '../media';
import hero from '../../public/images/hero.webp';

export default function Hero() {
  return (
    <div className={style['hero']}>
      <div className={style['hero-container']}>
        <div className={style['hero-info']}>
          <h1 className={style['hero-info-title']}>
            Maintainable data science solved
          </h1>
          <h2 className={style['hero-info-subtitle']}>
            Kedro is an open-sourced Python framework for creating maintainable
            and modular data science code
          </h2>
          <div className={style['hero-info-buttons']}>
            <button className={style['hero-info-buttons-started']}>
              Get Started
            </button>
            <button className={style['hero-info-buttons-tutorial']}>
              Take the Tutorial
            </button>
          </div>
        </div>
        <div className={style['hero-media']}>
          <Media source={hero} />
        </div>
      </div>
    </div>
  );
}

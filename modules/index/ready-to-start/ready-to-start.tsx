import Image from 'next/image';
import { defaultImageStyle } from '../../../utils/blog';

import readyToStart from '../../../public/images/ready-to-start.svg';

import style from './ready-to-start.module.scss';

export default function ReadyToStart() {
  return (
    <section className={style.outer} id="get-started">
      <div className={style.inner}>
        <div className={style.text}>
          <h3 className={style.sectionTitle}>Ready to start?</h3>
          <p className={style.startText}>
            Kedro is an open-source project. Go ahead and install it with pip or
            conda:
          </p>
          <p className={style.startText}>
            <code>pip install kedro</code>
          </p>
          <p className={style.startText}>or</p>
          <p className={style.startText}>
            <code>conda install -c conda-forge kedro</code>
          </p>
          <a
            href="https://docs.kedro.org/en/stable/tutorial/spaceflights_tutorial.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={style.button}>Take the tutorial</button>
          </a>
        </div>
        <div className={style.image}>
          <Image
            alt="Kedro ready to start graphic"
            src={readyToStart}
            style={defaultImageStyle}
          />
        </div>
      </div>
    </section>
  );
}

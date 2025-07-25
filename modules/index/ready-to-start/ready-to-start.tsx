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
          <p className={style.startText}>
            For more details, see the{' '}
            <a
              href="https://docs.kedro.org/en/stable/getting-started/install/"
              rel="noopener noreferrer"
              target="_blank"
            >
              set up documentation
            </a>{' '}
            or{' '}
            <a
              href="https://www.youtube.com/playlist?list=PL-JJgymPjK5LddZXbIzp9LWurkLGgB-nY"
              rel="noopener noreferrer"
              target="_blank"
            >
              watch the video
            </a>
            .
          </p>
          <a
            href="https://docs.kedro.org/en/stable/tutorials/spaceflights_tutorial/"
            rel="noopener noreferrer"
            target="_blank"
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

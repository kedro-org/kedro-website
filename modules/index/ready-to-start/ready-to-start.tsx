import Image from 'next/image';
import readyToStart from '../../../public/images/ready-to-start.svg';

import style from './ready-to-start.module.scss';

export default function ReadyToStart() {
  return (
    <section className={style.outer} id="get-started">
      <div className={style.inner}>
        <div className={style.text}>
          <h3 className={style.sectionTitle}>Ready to start?</h3>
          <p className={style.startText}>
            Visit the introductory tutorial to learn how to install Kedro and
            get up to speed with concepts like nodes, pipelines, and the data
            catalog.
          </p>
          <a
            href="https://docs.kedro.org/en/stable/get_started/install.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={style.button}>Get started</button>
          </a>
        </div>
        <div className={style.image}>
          <Image
            alt="Kedro ready to start graphic"
            src={readyToStart}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </section>
  );
}

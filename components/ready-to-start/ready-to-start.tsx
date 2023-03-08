import Media from '../media';
import diamonds from '../../public/images/ready-to-start.png';

import style from './ready-to-start.module.scss';

export default function ReadyToStart() {
  return (
    <section className={style.outer} id="get-started">
      <div className={style.inner}>
        <div className={style.text}>
          <h3 className={style.sectionTitle}>Ready to start?</h3>
          <p className={style.startText}>
            You are ready to get going with the Kedro workflow. But first, head
            to our documentation to learn how to install Kedro and then get up
            to speed with concepts like nodes, pipelines, the data catalog in
            our introductory tutorial.
          </p>
          <a
            href="https://docs.kedro.org/en/stable/02_get_started/01_prerequisites.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={style.button}>Get Started</button>
          </a>
        </div>
        <div className={style.image}>
          <Media alt="Kedro logo" image={diamonds} />
        </div>
      </div>
    </section>
  );
}

import React from 'react';

import style from './kedro-explainer.module.scss';

export default function KedroExplainer() {
  return (
    <section className={style.outer} id="kedro-explainer">
      <div className={style.inner}>
        <div className={style.mainSection}>
          <h3 className={style.title}>Kedro&apos;s Key Concepts Explained →</h3>
          <div className={style.mediaWrapper}>
            <video controls className={style.video} poster="/images/kedro-explainer-poster.jpeg">
              <source src="/videos/kedro-explainer.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={style.gradientBlock}></div>
        </div>
      </div>
    </section>
  );
}

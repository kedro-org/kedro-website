import React, { useEffect } from 'react';

import style from './companies.module.scss';

export default function Header() {
  useEffect(() => {
    createWordListAnimation(
      document.querySelector(`.${style.animation}`),
      3000
    );
  }, []);

  function createWordListAnimation(animNode: any, delay: number) {
    const animWindow = animNode.querySelector(`.${style.animationWindow}`);
    const ul = animWindow.querySelector('ul');
    const list = ul.querySelectorAll('li');

    function goTo(liNum: number) {
      const li = list[liNum];

      const liTop = li.getBoundingClientRect().top;
      const ulTop = ul.getBoundingClientRect().top;

      ul.style.top = -(liTop - ulTop) + 'px';
    }

    let current = 3;

    let ascending = true;

    return setInterval(function () {
      list[current].className = '';

      ascending = (ascending && current + 3 < list.length) || current === 2;
      current = ascending ? current + 1 : current - 1;

      goTo(current);

      list[current].className = style.active;
    }, delay);
  }

  return (
    <section className={style.outer}>
      <div className={style.inner}>
        <div className={style.left}>
          <p className={style.title}>Kedro is used and loved by </p>
        </div>
        <div className={style.right}>
          <div className={style.animation}>
            <div className={style.animationWindow}>
              <ul>
                <li>Leapfrog</li>
                <li>Naranja</li>
                <li>Beamery</li>
                <li>Telkomsel</li>
                <li>NASA</li>
                <li>Belfius</li>
                <li>Sber</li>
                <li>Augment Partners</li>
                <li>GetInData</li>
                <li>Indicium</li>
                <li>GMO</li>
                <li>QuantumBlack</li>
                <li>XP</li>
                <li>AI Singapore</li>
                <li>Helvetas</li>
                <li>Leapfrog</li>
                <li>Naranja</li>
                <li>Beamery</li>
                <li>Telkomsel</li>
              </ul>
            </div>
          </div>
          <div className={style.animationMask}></div>
        </div>
      </div>
    </section>
  );
}

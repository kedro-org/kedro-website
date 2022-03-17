import React, { useEffect } from 'react';

import style from './companies.module.scss';

export default function Header() {
      
      useEffect(()=>{
        createWordListAnimation(document.querySelector(`.${style.animation}`), 3000 /* (ms) */);
      },[])

      function createWordListAnimation(animNode: any, delay: number){
        // Fetch the DOM elements.
        var animWindow = animNode.querySelector(`.${style.animationWindow}`);
        var ul = animWindow.querySelector("ul");
        var lis = ul.querySelectorAll("li");
      
        // Copy the animation's window to create the gray list.
        var grayList = animWindow.cloneNode(true);
        var grayUl = grayList.querySelector("ul");
        grayList.className = style.animationGray;
        animNode.insertBefore(grayList, animWindow);
      
        // This function shows the li number `liNum`.                     
        function goTo(liNum: number, ascending: boolean){
          var li = lis[liNum];
          var prevli = ascending ? lis[liNum-1]:lis[liNum+1];
          var nextli = ascending ? lis[liNum+1]:lis[liNum-1];
          var liTop = li.getBoundingClientRect().top;
          var ulTop = ul.getBoundingClientRect().top;
          var liWidth = li.getBoundingClientRect().width + 30;
          var prevliWidth = prevli.getBoundingClientRect().width + 30;
          var nextliWidth = nextli.getBoundingClientRect().width + 30;
          var midprevliWidth = (liWidth+prevliWidth)/2;
          var midnextliWidth = (liWidth+nextliWidth)/2;
          if(prevliWidth <= liWidth && nextliWidth <= liWidth)
          {
            animWindow.style.setProperty('--duration', '3s'); 
            animWindow.style.setProperty('--firstWidth', liWidth+ "px"); 
            animWindow.style.setProperty('--secondWidth', liWidth+ "px"); 
            animWindow.style.setProperty('--finalWidth', liWidth+ "px"); 
          }
          else if(prevliWidth <= liWidth && nextliWidth > liWidth)
          {
            animWindow.style.setProperty('--duration', '3s'); 
            animWindow.style.setProperty('--firstWidth', liWidth+ "px"); 
            animWindow.style.setProperty('--secondWidth', midnextliWidth+ "px"); 
            animWindow.style.setProperty('--finalWidth', nextliWidth+ "px"); 
          }
          else if(prevliWidth > liWidth && nextliWidth <= liWidth)
          {
            animWindow.style.setProperty('--duration', '3s'); 
            animWindow.style.setProperty('--firstWidth', prevliWidth+ "px"); 
            animWindow.style.setProperty('--secondWidth', midprevliWidth+ "px"); 
            animWindow.style.setProperty('--finalWidth', liWidth+ "px"); 
          }

          else if (prevliWidth > liWidth && nextliWidth > liWidth)
          {
            animWindow.style.setProperty('--duration', '3s'); 
            animWindow.style.setProperty('--firstWidth', prevliWidth+ "px"); 
            animWindow.style.setProperty('--secondWidth', liWidth+ "px"); 
            animWindow.style.setProperty('--finalWidth', nextliWidth+ "px"); 
          }
          var liOffset = liTop - ulTop;
          ul.style.top = -liOffset + "px";
          grayUl.style.top = -liOffset + "px";
        
        }
      
        // Set up an interval that changes the current li every `delay` ms.
        var current = 2;
        // We need a boolean to know if the animation is going up or down.
        var ascending = true;
        // Create the interval.
        return setInterval(function(){
          ascending = ascending && current + 3 < lis.length || current === 1;
          current = ascending ? current + 1: current - 1;
          goTo(current,ascending);
        }, delay);
      }
      
    

  return (
    <div className={style.container}>
        <div className= {style.left}>
          <h3 className={style.title}>Kedro is used and loved by </h3>
        </div>
        <div className = {style.right}>
          <div className={style.animation}>
              <div className={style.animationWindow}>
                  <ul>
                      <li className={style.listItem}>Leapfrog</li>
                      <li className={style.listItem}>Naranja</li>
                      <li className={style.listItem}>Beamery</li>
                      <li className={style.listItem}>Telkomsel</li>
                      <li className={style.listItem}>NASA</li>
                      <li className={style.listItem}>Belfius</li>
                      <li className={style.listItem}>Sber</li>
                      <li className={style.listItem}>AISingapore</li>
                      <li className={style.listItem}>Helvetas</li>
                      <li className={style.listItem}>Leapfrog</li>
                      <li className={style.listItem}>Naranja</li>
                      <li className={style.listItem}>Beamery</li>
                      <li className={style.listItem}>Telkomsel</li>
                  </ul>
              </div>
          </div>
        <div className={style.animationMask}></div>
      </div>
    </div>
  );
}

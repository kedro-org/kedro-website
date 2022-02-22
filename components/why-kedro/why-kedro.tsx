import style from './why-kedro.module.scss';
import Tabs from '../ui/tabs';
import image from '../../public/images/whykedro.png';
import Media from '../media';

export default function WhyKedro() {
  return (
    <div className={style['why']}>
      <div className={style['why-container']}>
        <h1 className={style['why-title']}>Why Kedro?</h1>
        <div className={style['why-tab']}>
          <Tabs>
            <div data-label="Standardisation" className={style['why-tab-info']}>
              <p className={style['why-tab-summary']}>
                Kedro Standardises team workflows; the modular structure of
                Kedro facilitates a higher level of collaboration when teams
                solve problems together.
              </p>
              <Media source={image} className={style['why-tab-media']}></Media>
            </div>
            <div data-label="Croc">
              After while, <em>Crocodile</em>!
            </div>
            <div data-label="Sarcosuchus">
              Nothing to see here, this tab is <em>extinct</em>!
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

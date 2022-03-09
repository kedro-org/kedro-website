import style from './companies.module.scss';

export default function Companies() {
  return (
    <div className={style.container}>
        <h3 className={style.title}>Companies Using Kedro</h3>
        <div className={style.content}>
            <p className={style.text}>Kedro is used and loved by</p>
            <div className={style.listWrapper}>
                <ol className={style.list}>
                    <li>Beamery</li>
                    <li>Telkomsel</li>
                    <li>Nasa</li>
                    <li>Jungle Scout</li>
                    <li>Belfius</li>
                    <li>Beamery</li>
                    <li>Telkomsel</li>
                    <li>Nasa</li>
                    <li>Jungle Scout</li>
                    <li>Belfius</li>
                </ol>
                <div className={style.shadowBottom}></div>
            </div>
        </div>
    </div>
  );
}

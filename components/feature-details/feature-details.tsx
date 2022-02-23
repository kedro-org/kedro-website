import style from './feature-details.module.scss';

type Props = {
  assetPosition?: 'center' | 'left' | 'right';
  buttonText?: string;
  linkDestination?: string;
  subtitle: string | JSX.Element;
  title: string;
};

export default function FeatureDetails({
  assetPosition = 'center',
  buttonText = undefined,
  linkDestination,
  subtitle,
  title,
}: Props) {
  return (
    <div className={`${style.container} ${style[assetPosition]}`}>
      <div className={style.text}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.subtitle}>{subtitle}</p>
        {buttonText !== undefined && assetPosition !== 'center' ? (
          <a href={linkDestination} target="_blank" rel="noopener noreferrer">
            <button className={style.button}>{buttonText}</button>
          </a>
        ) : null}
      </div>
      <div className={style.asset}>
        <img
          src="https://tynandebold.com/assets/photo/people/1.jpg"
          style={{ width: '100%' }}
          alt="central p"
        />
      </div>
      {buttonText !== undefined ? (
        <a href={linkDestination} target="_blank" rel="noopener noreferrer">
          <button className={style.button}>{buttonText}</button>
        </a>
      ) : null}
    </div>
  );
}

import style from './feature-details.module.scss';

type Props = {
  assetPosition?: 'center' | 'left' | 'right';
  buttonLink?: string;
  buttonText?: string;
  iframeLink?: string;
  subtitle: string | JSX.Element;
  title: string;
};

export default function FeatureDetails({
  assetPosition = 'center',
  buttonLink,
  buttonText = undefined,
  iframeLink = undefined,
  subtitle,
  title,
}: Props) {
  const buttonMarkup = (
    <div className={style.buttonWrapper}>
      <a href={buttonLink} target="_blank" rel="noopener noreferrer">
        <button className={style.button}>{buttonText}</button>
      </a>
    </div>
  );

  return (
    <div className={`${style.container} ${style[assetPosition]}`}>
      <div className={style.text}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.subtitle}>{subtitle}</p>
        {buttonText !== undefined && assetPosition !== 'center'
          ? buttonMarkup
          : null}
      </div>
      <div className={style.asset}>
        {iframeLink !== undefined ? (
          <iframe
            className={style.iframe}
            frameBorder="0"
            src={iframeLink}
            width="100%"
          />
        ) : (
          <img
            src="https://tynandebold.com/assets/photo/people/1.jpg"
            style={{ width: '100%' }}
            alt="central p"
          />
        )}
      </div>
      {buttonText !== undefined ? buttonMarkup : null}
    </div>
  );
}

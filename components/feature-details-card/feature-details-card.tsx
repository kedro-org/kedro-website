import { StaticImageData } from 'next/image';

import Media from '../media';

import style from './feature-details-card.module.scss';

export interface FeatureProps {
  altText?: string;
  assetPosition?: 'center' | 'left' | 'right';
  buttonLink?: string;
  buttonText?: string;
  iframeLink?: string;
  imageSrc?: StaticImageData;
  posterText?: string;
  subtitle: string;
  title: string;
  videoSrc?: string;
}

export default function FeatureDetailsCard({
  altText,
  assetPosition = 'center',
  buttonLink,
  buttonText = undefined,
  iframeLink = undefined,
  imageSrc,
  posterText,
  subtitle,
  title,
  videoSrc,
}: FeatureProps) {
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
        <p
          className={style.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
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
          <Media
            alt={altText}
            image={imageSrc}
            poster={posterText}
            video={videoSrc}
          />
        )}
      </div>
      {buttonText !== undefined ? buttonMarkup : null}
    </div>
  );
}

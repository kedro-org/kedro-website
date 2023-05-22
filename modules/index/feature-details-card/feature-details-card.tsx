import { StaticImageData } from 'next/image';
import React from 'react';

import Media from '../../shared/media';

import style from './feature-details-card.module.scss';

export interface FeatureProps {
  altText?: string;
  assetClassName?: string;
  assetPosition?: 'center' | 'left' | 'right';
  buttonLink?: string;
  buttonText?: string;
  iframeList?: {
    fallbackImg?: StaticImageData;
    source: string;
    style?: Object;
  }[];
  imageSrc?: StaticImageData;
  index?: number;
  posterSrc?: string;
  subtitle: string;
  title: string;
  videoSrc?: string;
}

export default function FeatureDetailsCard({
  altText,
  assetClassName = undefined,
  assetPosition = 'center',
  buttonLink,
  buttonText = undefined,
  iframeList,
  index,
  imageSrc,
  posterSrc,
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
        {index !== 0 ? (
          <span className={style.featureIndex}>–– 0{index}</span>
        ) : null}
        <h4 className={style.title}>{title}</h4>
        <p
          className={style.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        {buttonText !== undefined && assetPosition !== 'center'
          ? buttonMarkup
          : null}
      </div>
      <div
        className={
          assetClassName
            ? `${style.asset} ${style[assetClassName]}`
            : style.asset
        }
      >
        {iframeList?.length > 0 ? (
          iframeList.map((iframe) => {
            return (
              <React.Fragment key={iframe.source}>
                <iframe
                  allowFullScreen
                  className={style.iframe}
                  frameBorder="0"
                  loading="lazy"
                  src={iframe.source}
                  style={iframe.style}
                  title={`${title}`}
                />
                {iframe.fallbackImg && (
                  <div className={style.iframeFallback}>
                    <Media alt={`${title}`} image={iframe.fallbackImg} />
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <Media
            alt={altText}
            image={imageSrc}
            poster={posterSrc}
            video={videoSrc}
          />
        )}
      </div>
      {buttonText !== undefined ? buttonMarkup : null}
    </div>
  );
}

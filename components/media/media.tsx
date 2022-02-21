import Image from 'next/image';

import style from './media.module.scss';

type Props = {
  alt?: string;
  image?: StaticImageData;
  poster?: string;
  video?: string;
};

export default function Media({ alt, image, poster, video }: Props) {
  if (image?.src?.includes('webp')) {
    return <Image alt={alt} src={image}></Image>;
  }

  if (video) {
    return (
      <video className={style.video} controls poster={poster} src={video}>
        Sorry, your browser doesn&#39;t support embedded videos.
      </video>
    );
  }

  return null;
}

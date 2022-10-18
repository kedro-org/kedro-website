import { StaticImageData } from 'next/image';

import Image from 'next/image';

import style from './media.module.scss';

type Props = {
  alt?: string;
  image?: StaticImageData | any;
  layout?: 'intrinsic' | 'fixed' | 'responsive' | 'fill';
  placeholder?: 'blur' | 'empty';
  poster?: string;
  priority?: boolean;
  video?: string;
};

export default function Media({
  alt,
  image,
  layout = 'intrinsic',
  placeholder = 'blur',
  poster,
  priority = false,
  video,
}: Props) {
  if (
    image?.src?.includes('webp') ||
    image?.src?.includes('jpg') ||
    image?.src?.includes('png') ||
    image?.includes('png')
  ) {
    return (
      <Image
        alt={alt}
        layout={layout}
        placeholder={placeholder}
        priority={priority}
        src={image}
      />
    );
  }

  if (!!video?.length) {
    return (
      <video className={style.video} controls poster={poster} src={video}>
        Sorry, your browser doesn&#39;t support embedded videos.
      </video>
    );
  }

  return null;
}

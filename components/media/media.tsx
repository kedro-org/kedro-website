import Image from 'next/image';

type Props = {
  alt?: string;
  image?: StaticImageData;
  poster?: string;
  video?: string;
};

export default function Media({ alt, image, poster, video }: Props) {
  if (image?.src?.includes('webp')) {
    return <Image alt={alt} src={image} layout="intrinsic"></Image>;
  }

  if (video) {
    return (
      <video controls poster={poster} src={video} style={{ width: '100%' }}>
        Sorry, your browser doesn&#39;t support embedded videos.
      </video>
    );
  }

  return null;
}

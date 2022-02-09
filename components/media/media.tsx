import Image from 'next/image';

interface IProps {
  source: StaticImageData;
}

export default function Media(media: IProps) {
  if (media?.source?.src?.includes('webp')) {
    return <Image src={media.source} layout="intrinsic"></Image>;
  } else {
    media.source.src.includes('mp4');
  }
  {
    return null;
  }
}

import Image from 'next/image';

export default function Media(media: any) {
  if (media.source.src.includes('webp')) {
    return <Image src={media.source} layout="intrinsic"></Image>;
  } else if (media.source.src.includes('mp4')) {
    return <video src={media.source}></video>;
  }
  return <></>;
}

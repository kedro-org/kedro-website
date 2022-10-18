import Image from 'next/image';

export default function RichTextAsset({ id, assets }) {
  console.log('assets: ', assets);
  console.log('id: ', id);
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}

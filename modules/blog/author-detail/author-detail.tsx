import Image from 'next/image';
import Link from 'next/link';

import style from './author-detail.module.scss';

export type Author = {
  jobTitle: string;
  name: string;
  picture: {
    height: number;
    url: string;
    width: number;
  };
  urlDisplayName: string;
};

type Props = {
  authorInfo: Author;
};

const AuthorDetail = ({ authorInfo }: Props) => {
  return (
    <div className={style.authorDetailWrapper}>
      <div className={style.imageWrapper}>
        <Image
          alt={`Photo of ${authorInfo.name}`}
          className={style.image}
          height={authorInfo.picture.height}
          src={authorInfo.picture.url}
          width={authorInfo.picture.width}
        />
      </div>
      <div>
        <Link href={`/blog/author/${authorInfo.urlDisplayName}`}>
          <a className={style.name}>{authorInfo.name}</a>
        </Link>
        <div className={style.jobTitle}>{authorInfo.jobTitle}</div>
      </div>
    </div>
  );
};

export default AuthorDetail;

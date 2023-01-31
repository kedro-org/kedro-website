import Image from 'next/image';

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
        <div className={style.name}>{authorInfo.name}</div>
        <div className={style.jobTitle}>{authorInfo.jobTitle}</div>
      </div>
    </div>
  );
};

export default AuthorDetail;
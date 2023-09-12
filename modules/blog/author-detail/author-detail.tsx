import Image from 'next/image';
import Link from 'next/link';

import { AuthorInfo } from '../../../pages/blog/author/[author]';

import style from './author-detail.module.scss';

interface Props {
  authorInfo: AuthorInfo;
}

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
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div>
        <Link
          href={`/blog/author/${authorInfo.urlDisplayName}`}
          className={style.name}
        >
          {authorInfo.name}
        </Link>
        <div className={style.jobTitle}>{authorInfo.jobTitle}</div>
      </div>
    </div>
  );
};

export default AuthorDetail;

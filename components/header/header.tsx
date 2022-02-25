import Image from 'next/image';
import style from './header.module.scss';
import headerLogo from '../../public/images/header-logo.webp';
export default function Header() {
  return (
    <div className={style.container}>
      <Image
        alt="header-logo"
        src={headerLogo}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}

// components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="relative bg-gradient-indigo background-animate overflow-hidden">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Image src="/gradia-assets/logos/gradia-name-white.svg" alt="Logo" width={150} height={50} />
            </a>
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;

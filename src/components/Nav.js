import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar1 = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="bg-white fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between h-20">
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="#">Como Funciona</Link>
          <Link href="#">Recursos</Link>
          <Link href="#">Planos</Link>
          <Link href="#">Contato</Link>
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="#" className="text-[#09B6A2]">Entrar</Link>
          <button className="bg-[#09B6A2] text-white py-2 px-4 rounded">Experimente Grátis</button>
        </div>
        <button className="lg:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className={`${mobileNavOpen ? 'block' : 'hidden'} lg:hidden fixed top-0 left-0 w-4/5 h-full bg-white z-50`}>
        <div className="flex flex-col items-start p-8 space-y-4">
          <Link href="/" passHref>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </Link>
          <Link href="#">Como Funciona</Link>
          <Link href="#">Recursos</Link>
          <Link href="#">Planos</Link>
          <Link href="#">Contato</Link>
          <Link href="#" className="text-[#09B6A2]">Entrar</Link>
          <button className="bg-[#09B6A2] text-white py-2 px-4 rounded">Experimente Grátis</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar1;

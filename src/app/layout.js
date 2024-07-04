'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";


const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <html lang="pt-br">
      <Head>
        <meta name="description" content="Dizem adeus aos cadastros burocráticos e descontos perdidos para sempre! Com @eficaz.email, você pode criar infinitos endereços de email personalizados e profissionais em instantes. Nossa solução inovadora desbloqueará um mundo de promoções exclusivas, ofertas imperdíveis e bônus tentadores em qualquer site. Apenas alguns cliques e seu novo email estará pronto, encaminhando discretamente todas as mensagens para sua caixa de entrada principal. Não é um serviço temporário - seu endereço @eficaz.email permanece ativo indefinidamente, mesmo no plano gratuito. Liberte-se das restrições de email e desfrute de descontos ilimitados com facilidade. Junte-se à revolução hoje!" />
        <title>Liberte-se das Restrições de Email com @eficaz.email: A Revolução dos Descontos Ilimitados</title>
      </Head>
      <body className={inter.className}>
      
          {!isDashboard && (
            <header>
              <Navbar />
            </header>
          )}
          <main className='w-full'>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
    
      </body>
    </html>
  );
}

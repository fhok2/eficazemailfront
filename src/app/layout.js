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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Diga adeus aos cadastros burocráticos e descontos perdidos para sempre! Com @eficaz.email, você pode criar infinitos endereços de email personalizados e profissionais em instantes. Nossa solução inovadora desbloqueará um mundo de promoções exclusivas, ofertas imperdíveis e bônus tentadores em qualquer site. Apenas alguns cliques e seu novo email estará pronto, encaminhando discretamente todas as mensagens para sua caixa de entrada principal. Não é um serviço temporário - seu endereço @eficaz.email permanece ativo indefinidamente, mesmo no plano gratuito. Liberte-se das restrições de email e desfrute de descontos ilimitados com facilidade. Junte-se à revolução hoje!" />
        <meta name="keywords" content="email personalizado, email profissional, descontos ilimitados, eficaz.email, promoções exclusivas, criação de email, encaminhamento de email, plano gratuito" />
        <meta name="author" content="Eficaz Email" />
        <meta name="robots" content="index, follow" />
        <meta name="og:title" content="Liberte-se das Restrições de Email com @eficaz.email: A Revolução dos Descontos Ilimitados" />
        <meta name="og:description" content="Com @eficaz.email, você pode criar infinitos endereços de email personalizados e profissionais em instantes. Aproveite promoções exclusivas, ofertas imperdíveis e bônus tentadores em qualquer site. Seu endereço @eficaz.email permanece ativo indefinidamente, mesmo no plano gratuito." />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://www.eficazmail.com" />
        <meta name="og:image" content="https://www.eficazmail.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liberte-se das Restrições de Email com @eficaz.email: A Revolução dos Descontos Ilimitados" />
        <meta name="twitter:description" content="Com @eficaz.email, você pode criar infinitos endereços de email personalizados e profissionais em instantes. Aproveite promoções exclusivas, ofertas imperdíveis e bônus tentadores em qualquer site. Seu endereço @eficaz.email permanece ativo indefinidamente, mesmo no plano gratuito." />
        <meta name="twitter:image" content="https://www.eficazmail.com/images/twitter-card.jpg" />
        <meta name="twitter:site" content="@eficaz.email" />
        <link rel="canonical" href="https://www.eficazmail.com" />
        <link rel="icon" href="/favicon.ico" />
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
        <footer className="bg-transparent text-secondary py-6 text-center h-20  relative">
        <Footer />
      </footer>
      </body>
    </html>
  );
}

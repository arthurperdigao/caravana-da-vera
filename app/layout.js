import './globals.css';
import Navbar from '@/components/Navbar';
import Script from 'next/script';

export const metadata = {
  title: 'Agência de Turismo Santa Edwirges',
  description: 'Há 28 anos proporcionando as melhores viagens religiosas!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18123149397"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18123149397');
          `}
        </Script>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Agência de Turismo Santa Edwirges',
  description: 'Há 28 anos proporcionando as melhores viagens religiosas!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


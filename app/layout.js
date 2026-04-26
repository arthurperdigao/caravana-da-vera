import './globals.css';

export const metadata = {
  title: 'Agência de Turismo Santa Edwirges',
  description: 'Há 28 anos proporcionando as melhores viagens religiosas!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <nav className="navbar" style={{ padding: '0.5rem 0' }}>
          <div className="container" style={{ alignItems: 'center' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
                 <span style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#D4AF37', fontWeight: '700', lineHeight: 1.1, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>Santa Edwirges</span>
                 <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#E0E8F5', letterSpacing: '6px', textTransform: 'uppercase', opacity: 0.9 }}>Agência de Turismo</span>
              </div>
            </a>
            <ul className="navLinks">
              <li><a href="/#proximas">Destinos</a></li>
              <li><a href="/#fotos">Galeria VIP</a></li>
              <li><a href="/#contato">Reserva & Contato</a></li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

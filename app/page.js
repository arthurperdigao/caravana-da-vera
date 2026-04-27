import { getTrips } from '@/lib/db';
import TripCard from '@/components/TripCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import Gallery from '@/components/Gallery';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const trips = await getTrips();

  return (
    <main>
      {/* 1. HERO ABSURDAMENTE PREMIUM (ESTILO ARQUITETURA / EDITORIAL) */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-text-side">
            <span className="hero-badge">Agência Santa Edwirges • 28 Anos</span>
            <h2>A Jornada <span style={{color: '#D4AF37'}}>Religiosa</span> da Sua Vida</h2>
            <p>Experiências transformadoras guiadas pela fé, proporcionando segurança absoluta e extremo conforto em ônibus executivos de luxo para a sua família.</p>
            <a href="#proximas" className="btn-gold" style={{marginTop: '1rem'}}>Explorar Nossos Destinos</a>
          </div>
          <div className="hero-image-side">
             <div className="hero-image-frame">
                <img src="/logo/santa capa.png" alt="Santa Edwirges - Agência de Turismo" />
             </div>
          </div>
        </div>
      </header>

      {/* 2. ÁREA DE VENDAS DE VIAGENS (MÓDULO DOS BANNERS COM INFO) */}
      <section id="proximas" className="section">
        <div className="section-title">
          <h3>Nossos Pacotes de Viagem</h3>
          <div></div>
        </div>

        {/* FAIXA PRINCIPAL DE COMUNICAÇÃO DE VALORES E FACILIDADES DA VERA */}
        <div className="benefits-banner">
           <div className="benefit-item">
              <div className="benefit-icon">📍</div>
              <div>
                <strong>Embarques Flexíveis</strong>
                <span>A nossa partida sempre tem vários locais de embarque para sua comodidade.</span>
              </div>
           </div>
           
           <div className="benefit-item">
              <div className="benefit-icon">💳</div>
              <div>
                <strong>Pagamento Facilitado</strong>
                <span>Aceitamos PIX ou Cartão de Crédito. Facilitamos seu pagamento!</span>
              </div>
           </div>
        </div>

        
        {trips.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }}>
            Nossas próximas agendas exclusivas estarão disponíveis em breve.
          </p>
        ) : (
          <div className="trips-container">
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </section>

      {/* 3. GALERIA DE FOTOS (PASSAGEIROS E COM OS PADRES) */}
      <section id="fotos" className="section" style={{ background: '#F8FAF9' }}>
        <div className="section-title">
          <h3>Momentos da Nossa Agência</h3>
          <div></div>
        </div>
        <p className="section-description" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.1rem', color: '#555', fontFamily: 'Inter'}}>
          Um pouco da nossa história. Veja as fotos dos nossos queridos passageiros e encontros inesquecíveis nos Santuários.
        </p>
        <Gallery />
      </section>

      {/* CARTA DA DIRETORIA (ASSINATURA DE PRESTÍGIO) */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
         <div className="directors-letter">
            <span className="quote-mark">"</span>
            <p className="letter-text">
               Há 28 anos, nossa honra é conduzir sua família com conforto e segurança ao encontro da sua fé.
            </p>
            <p className="signature">
               Com carinho, Vera.
            </p>
            <p className="role">
               Fundadora & Diretora Geral
            </p>
         </div>
      </section>

      {/* 4. CONTATO DE LUXO */}
      <section id="contato" className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-title">Fale com a <br/><span style={{ color: 'white', fontFamily: 'Cinzel', display: 'block', marginTop: '10px' }}>Agência Santa Edwirges</span></h3>
            <p>Garanta o seu assento! Atendimento humanizado e rápido.</p>
            
            <a href="https://wa.me/5531988861776" target="_blank" className="contact-link">
              <span style={{fontSize: '1rem', letterSpacing: '1px'}}>WHATSAPP</span> (31) 98886-1776
            </a>
            <a href="https://instagram.com/caravanadavera" target="_blank" className="contact-link">
              <span style={{fontSize: '1rem', letterSpacing: '1px'}}>INSTAGRAM</span> @caravanadavera
            </a>
            <a href="mailto:caravavanadavera@gmail.com" className="contact-link">
              <span style={{fontSize: '1rem', letterSpacing: '1px'}}>E-MAIL</span> caravavanadavera@gmail.com
            </a>
          </div>
          <div className="testimonial-card">
             <h4>O que dizem:</h4>
             <p className="testimonial-text">
               "A Agência Santa Edwirges me proporcionou a viagem com mais paz e extremo conforto que já tive na vida."
             </p>
             <p className="testimonial-author">- Maria do Socorro, Cliente</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="footer">
         Agência de Turismo Santa Edwirges © {new Date().getFullYear()} - Tradição e Fé.
      </footer>


      {/* Botão Flutuante (Mantido pois é muito conversivo) */}
      <WhatsAppButton />
    </main>
  );
}

// Comentário final para forçar o build da Vercel a puxar o redis-cyan-kite
// NOVO COMENTÁRIO - PRONTO PARA SUBIR A ATUALIZAÇÃO DEFINITIVA DO BANCO DE DADOS

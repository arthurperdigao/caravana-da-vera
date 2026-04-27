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
            <h2>A Jornada <br/><span style={{color: '#D4AF37'}}>Religiosa</span><br/>da Sua Vida</h2>
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
        <div className="benefits-banner" style={{ 
          display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', margin: '0 auto 4rem', 
          background: 'rgba(212, 175, 55, 0.08)', padding: '2.5rem 3rem', borderRadius: '16px', 
          border: '1px solid rgba(212, 175, 55, 0.4)', maxWidth: '1000px', boxShadow: '0 10px 30px rgba(212,175,55,0.05)'
        }}>
           <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="benefit-icon" style={{fontSize: '2.5rem', background: '#fff', padding: '15px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>📍</div>
              <div>
                <strong style={{ display: 'block', color: '#0B192C', fontSize: '1.15rem', marginBottom: '5px' }}>Embarques Flexíveis</strong>
                <span style={{ color: '#444', fontSize: '1rem', lineHeight: '1.4' }}>A nossa partida sempre tem vários locais de embarque para sua comodidade.</span>
              </div>
           </div>
           
           <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="benefit-icon" style={{fontSize: '2.5rem', background: '#fff', padding: '15px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>💳</div>
              <div>
                <strong style={{ display: 'block', color: '#0B192C', fontSize: '1.15rem', marginBottom: '5px' }}>Pagamento Facilitado</strong>
                <span style={{ color: '#444', fontSize: '1rem', lineHeight: '1.4' }}>Aceitamos PIX ou Cartão de Crédito. Facilitamos seu pagamento!</span>
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
         <div className="directors-letter" style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center', padding: '2rem 0' }}>
            <span style={{ fontSize: '4rem', color: '#D4AF37', fontFamily: 'Cinzel', lineHeight: 0, opacity: 0.3, display: 'block', marginBottom: '20px' }}>"</span>
            <p className="letter-text" style={{ fontFamily: 'Cinzel', fontSize: '1.9rem', color: '#0B192C', lineHeight: '1.6', margin: '0 0 3rem 0', fontStyle: 'italic' }}>
               Há 28 anos, nossa honra é conduzir sua família com conforto e segurança ao encontro da sua fé.
            </p>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3rem', color: '#D4AF37', margin: '0' }}>
               Com carinho, Vera.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#999', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '1rem', fontWeight: 600 }}>
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
              <span>W</span> (31) 98886-1776
            </a>
            <a href="https://instagram.com/caravanadavera" target="_blank" className="contact-link">
              <span>IG</span> @caravanadavera
            </a>
            <a href="mailto:caravavanadavera@gmail.com" className="contact-link">
              <span>@</span> caravavanadavera@gmail.com
            </a>
          </div>
          
          <div className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '4rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h4 style={{fontFamily: 'Cinzel', fontSize: '1.8rem', color: '#D4AF37', marginBottom: '2rem'}}>O que dizem:</h4>
             <p style={{fontStyle: 'italic', fontSize:'1.1rem', color: 'white', opacity: 0.8, marginBottom: '1.5rem'}}>
               "A Agência Santa Edwirges me proporcionou a viagem com mais paz e extremo conforto que já tive na vida."
             </p>
             <p style={{fontWeight: 'bold', color: '#D4AF37'}}>- Maria do Socorro, Cliente</p>
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

'use client'; 
import { useState } from 'react';

export default function TripCard({ trip }) {
  const [isHovered, setIsHovered] = useState(false);
  const zapMessage = encodeURIComponent(`Olá equipe da Agência Santa Edwirges, venho do site e gostaria de faturar uma reserva para: ${trip.title}`);
  
  const inclusionItems = (trip.included || '').split('\n').filter(i => i.trim() !== '');

  return (
    <div 
      className="trip-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        background: '#fff', 
        borderRadius: '16px', 
        border: '1px solid #f0f0f0', 
        overflow: 'hidden', 
        // A transição no parent permite a div inteira expandir suavemente
        transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isHovered ? 'scale(1.06) translateY(-10px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.03)',
        zIndex: isHovered ? 50 : 1,
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. Imagem Base: Sempre em Cover para não ficar feia com bordas, apenas acompanha expansão da div */}
      <div 
        className="trip-image-container" 
        style={{ 
           position: 'relative', 
           width: '100%', 
           background: '#0B192C', 
           overflow: 'hidden',
           // Animando apenas a altura da DIV para revelar mais a foto sem dar zoom interno
           height: isHovered ? '340px' : '280px',
           transition: 'height 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <img 
          src={trip.imageUrl} 
          alt={trip.title} 
          style={{ 
             objectFit: 'cover', 
             width: '100%', 
             height: '100%',
             transform: 'scale(1)' // Estático. Nenhum zoom na foto em si! O Zoom é só na div inteira.
          }} 
        />
        
        {/* Etiqueta Flutuante Blindada */}
        <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#D4AF37', color: '#0B192C', padding: '10px 20px', borderRadius: '30px', fontWeight: '900', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 8px 25px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.5)', zIndex: 10 }}>
          📅 {trip.dateInfo}
        </div>
      </div>
      
      <div className="trip-info" style={{ padding: '2rem', flexGrow: '1', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <h4 style={{ fontSize: '1.6rem', fontFamily: 'Cinzel, serif', color: '#0A2E5C', marginBottom: '1.8rem', lineHeight: '1.2' }}>{trip.title}</h4>
        
        <div style={{ marginBottom: '2.5rem', flexGrow: '1' }}>
          <strong style={{ display: 'block', color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.2rem' }}>Detalhes do Pacote</strong>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {inclusionItems.map((item, index) => (
              <li key={index} style={{ color: '#444', fontSize: '1.05rem', lineHeight: '1.4', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#D4AF37', fontSize: '1.2rem', marginTop: '-2px' }}>✦</span>
                <span style={{ flex: 1 }}>{item.replace(/^[✔*0-9.\-]+\s*/, '')}</span> 
              </li>
            ))}
          </ul>
        </div>
        
        <a href={`https://wa.me/5531988861776?text=${zapMessage}`} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: 'auto', padding: '1rem', letterSpacing: '2px' }}>CONSULTAR WHATSAPP</a>
      </div>
    </div>
  );
}

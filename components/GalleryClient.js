"use client";
import React, { useState, useEffect } from 'react';

export default function GalleryClient({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (idx) => setSelectedIndex(idx);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };
  
  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Trava o scroll da página quando loghtbox está aberto
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedIndex]);

  if (photos.length === 0) {
    return <p style={{textAlign: 'center', color: '#666'}}>Nenhuma foto encontrada na pasta passageirosImg.</p>;
  }

  return (
    <>
      {/* Grade normal com hover sutil indicando click */}
      <div className="gallery-masonry" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {photos.map((src, idx) => (
          <div 
            key={idx} 
            className="gallery-item-interactive" 
            onClick={() => openLightbox(idx)} 
            style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', height: '300px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Momentos da Agência - ${idx}`} />
            <div className="gallery-overlay" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '20px' }}>
              <span className="gallery-text" style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif', display: 'flex', justifyContent: 'space-between' }}>
                 <span>{src.includes('principal') ? 'Oração e Fé' : src.includes('vera') ? 'Curadoria de Vera' : 'Momentos Inesquecíveis'}</span>
                 <span style={{opacity: 0.5}}>🔍 Ampliar</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Tela Cheia Modal */}
      {selectedIndex !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(5, 10, 20, 0.95)', /* Tons de Blue Navy Escuro pro overlay */
          backdropFilter: 'blur(5px)', zIndex: 99999,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={closeLightbox}>
          
          <button onClick={closeLightbox} style={{
            position: 'absolute', top: '20px', right: '30px', background: 'none', border: 'none', 
            color: '#D4AF37', fontSize: '3rem', cursor: 'pointer', zIndex: 100000, transition: '0.2s'
          }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#D4AF37'}>&times;</button>

          <button onClick={goPrev} style={{
            position: 'absolute', left: '20px', background: 'none', border: 'none', 
            color: 'rgba(255,255,255,0.5)', fontSize: '5rem', cursor: 'pointer', zIndex: 100000, transition: '0.2s'
          }} onMouseOver={e => e.target.style.color = '#D4AF37'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>&#10094;</button>

          <img 
            src={photos[selectedIndex]} 
            style={{ 
              maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain', 
              borderRadius: '10px', boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.1)' 
            }} 
            onClick={(e) => e.stopPropagation()} 
            alt="Expanded view"
          />

          <button onClick={goNext} style={{
            position: 'absolute', right: '20px', background: 'none', border: 'none', 
            color: 'rgba(255,255,255,0.5)', fontSize: '5rem', cursor: 'pointer', zIndex: 100000, transition: '0.2s'
          }} onMouseOver={e => e.target.style.color = '#D4AF37'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>&#10095;</button>
          
          {/* Etiqueta elegante no rodapé da foto aberta */}
          <div style={{ position: 'absolute', bottom: '30px', color: '#D4AF37', fontFamily: 'Cinzel, serif', fontSize: '1.5rem', letterSpacing: '4px' }}>
             {photos[selectedIndex].includes('principal') ? 'Oração e Fé' : photos[selectedIndex].includes('vera') ? 'Curadoria de Vera' : 'Nossos Incríveis Passageiros'}
          </div>
        </div>
      )}
    </>
  );
}

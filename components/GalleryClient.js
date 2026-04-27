"use client";
import React, { useState, useEffect } from 'react';

export default function GalleryClient({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (idx) => setSelectedIndex(idx);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };
  
  const goPrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Lógica de Swipe para Mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
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
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>

          <button className="lightbox-nav lightbox-prev" onClick={goPrev}>&#10094;</button>

          <img 
            src={photos[selectedIndex]} 
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()} 
            alt="Expanded view"
          />

          <button className="lightbox-nav lightbox-next" onClick={goNext}>&#10095;</button>
          
          {/* Etiqueta elegante no rodapé da foto aberta */}
          <div className="lightbox-label">
             {photos[selectedIndex].includes('principal') ? 'Oração e Fé' : photos[selectedIndex].includes('vera') ? 'Curadoria de Vera' : 'Nossos Incríveis Passageiros'}
          </div>
        </div>
      )}
    </>
  );
}

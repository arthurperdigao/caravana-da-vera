"use client";
import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar" style={{ padding: '0.5rem 0' }}>
      <div className="container" style={{ alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
             <span style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#D4AF37', fontWeight: '700', lineHeight: 1.1, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>Santa Edwirges</span>
             <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#E0E8F5', letterSpacing: '6px', textTransform: 'uppercase', opacity: 0.9 }}>Agência de Turismo</span>
          </div>
        </a>

        {/* Botão Hamburguer para Mobile */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links de Navegação */}
        <ul className={`navLinks ${isOpen ? 'active' : ''}`}>
          <li><a href="/#proximas" onClick={() => setIsOpen(false)}>Destinos</a></li>
          <li><a href="/#fotos" onClick={() => setIsOpen(false)}>Galeria VIP</a></li>
          <li><a href="/#contato" onClick={() => setIsOpen(false)}>Reserva & Contato</a></li>
        </ul>
      </div>
    </nav>
  );
}

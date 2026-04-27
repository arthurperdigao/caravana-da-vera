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
             <span className="nav-logo-title">Santa Edwirges</span>
             <span className="nav-logo-subtitle">Agência de Turismo</span>
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

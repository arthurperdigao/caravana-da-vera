'use client';
import { useState, useEffect } from 'react';

// Painel Administrativo Completo Gestão Total
export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Fetch inicial para popular as lixeiras
  const fetchData = async () => {
    try {
      const resTrips = await fetch('/api/trips');
      if (resTrips.ok) setTrips(await resTrips.json());

      const resPhotos = await fetch('/api/photos');
      if (resPhotos.ok) setPhotos(await resPhotos.json());
    } catch(e) {
      console.error("Erro ao puxar dados do DB", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler Publicar Viagem
  async function handleSubmitTrip(e) {
    e.preventDefault(); 
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append('price', '');
    formData.append('installments', '');
    try {
      const res = await fetch('/api/trips', { method: 'POST', body: formData });
      if(res.ok) {
        alert('✨ Pacote criado com perfeição!');
        e.target.reset();
        fetchData();
      } else alert('Erro ao tentar salvar.');
    } catch (err) {
      alert('Problema de conexão.');
    }
    setLoading(false);
  }

  // Handler Excluir Viagem
  async function handleDeleteTrip(id) {
    if(!confirm("Atenção: Tem certeza que deseja apagar essa Romaria do site?")) return;
    try {
      const res = await fetch('/api/trips', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if(res.ok) fetchData();
      else alert('Erro ao excluir');
    } catch (e) { alert('Erro de conexão'); }
  }

  // Handler Upload Foto Galeria
  async function handlePhotoUpload(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/photos', { method: 'POST', body: formData });
      if(res.ok) {
        alert('📸 Foto enviada rápida enviada para a Galeria!');
        e.target.reset();
        fetchData();
      } else alert('Erro no upload.');
    } catch(e) { alert('Erro de conexão'); }
    setLoading(false);
  }

  // Handler Exclizar Foto (Lixeira)
  async function handleDeletePhoto(url) {
    if(!confirm("Atenção: A foto será apagada permanentemente da nuvem. Confirmar?")) return;
    try {
      const res = await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if(res.ok) fetchData();
      else alert('Erro ao excluir a foto');
    } catch(e) { alert('Erro de conexão'); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', padding: '3rem 5%' }}>
      <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* CABEÇALHO DO PAINEL */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
           <h1 style={{ fontFamily: 'Cinzel', color: '#0B192C', fontSize: '3rem', margin: 0 }}>Gestão Ouro</h1>
           <p style={{ color: '#666', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Painel da Agência Caravana da Vera</p>
        </div>

        {/* 1. PUBLICAR NOVA ROMARIA */}
        <div style={{ background: 'white', padding: '3rem', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'Cinzel', color: '#0B192C', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>✈️ Publicar Nova Romaria</h2>
          <form onSubmit={handleSubmitTrip} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Nome da Excursão</label>
              <input type="text" name="title" required placeholder="Exemplo: Romaria do Rosário da Vitória" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Previsão / Data</label>
                <input type="text" name="dateInfo" required placeholder="Bate e volta / Saída dia 10" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Arte da Romaria (Banner)</label>
                <input type="file" name="image" accept="image/*" required style={{ width: '100%', padding: '9px', border: '1px dashed #999', borderRadius: '8px' }} />
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>O que está incluso no pacote?</label>
              <textarea name="included" rows="3" required placeholder="Ônibus Executivo leito, Hospedagem VIP..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}></textarea>
            </div>
            <button type="submit" disabled={loading} style={{ gridColumn: '1 / -1', padding: '15px', background: '#0B192C', color: '#D4AF37', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}>
              {loading ? 'Subindo pro sistema...' : 'CADASTRAR DESTINO'}
            </button>
          </form>
        </div>

        {/* 2. GERENCIAR ROMARIAS ATUAIS (LIXEIRA) */}
        <div style={{ background: 'white', padding: '3rem', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'Cinzel', color: '#0B192C', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>🗑️ Gerenciar Romarias Ativas no Site</h2>
          
          {trips.length === 0 ? <p style={{color:'#666'}}>Nenhuma romaria no ar no momento.</p> : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {trips.map(trip => (
                <div key={trip.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img src={trip.imageUrl} alt="banner" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
                    <div>
                        <strong style={{ fontSize: '1.2rem', color: '#0B192C', display: 'block' }}>{trip.title}</strong>
                        <span style={{ fontSize: '0.9rem', color: '#777' }}>{trip.dateInfo}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteTrip(trip.id)} style={{ background: '#8b0000', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>Excluir Viagem</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. GERENCIAR GALERIA DE FOTOS (UPLOAD E LIXEIRA) */}
        <div style={{ background: 'white', padding: '3rem', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontFamily: 'Cinzel', color: '#0B192C', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>📸 Gerenciar Galeria (Fotos dos Momentos)</h2>
          
          <form onSubmit={handlePhotoUpload} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '2.5rem', padding: '15px', background: '#fafafa', borderRadius: '8px', border: '1px solid #eee' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#0B192C' }}>Adicionar Nova Foto Imediatamente</label>
              <input type="file" name="image" accept="image/*" required style={{ width: '100%', padding: '9px', border: '1px dashed #999', borderRadius: '8px', background: 'white' }} />
            </div>
            <button type="submit" disabled={loading} style={{ height: '42px', padding: '0 25px', background: '#D4AF37', color: '#0B192C', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase' }}>
              Subir Imagem
            </button>
          </form>

          {photos.length === 0 ? <p style={{color:'#666'}}>A galeria está vazia.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {photos.map(url => (
                <div key={url} style={{ position: 'relative', height: '180px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="galeria item" />
                  <button onClick={() => handleDeletePhoto(url)} style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '5px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

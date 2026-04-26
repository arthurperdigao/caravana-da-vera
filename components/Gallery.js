export default async function Gallery() {
  // Busca a lista de fotos da nossa nova API de nuvem
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  
  let photoFiles = [];
  try {
    const res = await fetch(`${protocol}://${host}/api/photos`, { cache: 'no-store' });
    photoFiles = await res.json();
  } catch (e) {
    console.error("Erro ao carregar galeria:", e);
  }

  // Entrega o array pronto para o Client Component renderizar a interação
  return <GalleryClient photos={photoFiles} />;
}


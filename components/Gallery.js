import GalleryClient from './GalleryClient';

export default async function Gallery() {
  // Na Vercel, o melhor é chamar o Blob diretamente se for Server Component
  // ou usar uma URL absoluta segura.
  const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  
  let photoFiles = [];
  try {
    const res = await fetch(`${host}/api/photos`, { cache: 'no-store' });
    if (res.ok) {
      photoFiles = await res.json();
    }
  } catch (e) {
    console.error("Erro ao carregar galeria:", e);
  }

  return <GalleryClient photos={Array.isArray(photoFiles) ? photoFiles : []} />;
}


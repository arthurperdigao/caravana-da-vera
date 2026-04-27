import GalleryClient from './GalleryClient';
import { list } from '@vercel/blob';

export default async function Gallery() {
  let photoFiles = [];
  try {
    // Busca as imagens diretamente do Vercel Blob (Pen Drive na nuvem)
    const { blobs } = await list({ prefix: 'passageiros/' });
    photoFiles = blobs.map(b => b.url);
  } catch (e) {
    console.error("Erro ao carregar galeria do Blob:", e);
  }

  return <GalleryClient photos={Array.isArray(photoFiles) ? photoFiles : []} />;
}

import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export default function Gallery() {
  const sourceDir = path.join(process.cwd(), 'passageirosImg');
  const publicDir = path.join(process.cwd(), 'public', 'passageirosImg');
  
  if (fs.existsSync(sourceDir) && !fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let photoFiles = [];
  
  // Rotina Autônoma: Lê a pasta raiz passageirosImg, copia pro Public e joga na Galeria
  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')) {
        const destPath = path.join(publicDir, file);
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(path.join(sourceDir, file), destPath);
        }
        photoFiles.push(`/passageirosImg/${file}`);
      }
    });
  }

  // Entrega o array pronto para o Client Component renderizar a interação
  return <GalleryClient photos={photoFiles} />;
}

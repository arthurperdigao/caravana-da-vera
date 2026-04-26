import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'viagens.json');

function initDB() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
    }

    const sourceViagensDir = path.join(process.cwd(), 'viagens');
    const publicViagensDir = path.join(process.cwd(), 'public', 'viagens');
    if (fs.existsSync(sourceViagensDir)) {
      if (!fs.existsSync(publicViagensDir)) fs.mkdirSync(publicViagensDir, { recursive: true });
      
      const arquivos = fs.readdirSync(sourceViagensDir);
      for (const arquivo of arquivos) {
        if (arquivo.toLowerCase().endsWith('.jpg') || arquivo.toLowerCase().endsWith('.png')) {
          const destPath = path.join(publicViagensDir, arquivo);
          if (!fs.existsSync(destPath)) {
             fs.copyFileSync(path.join(sourceViagensDir, arquivo), destPath);
          }
        }
      }
    }

    const sourceLogoDir = path.join(process.cwd(), 'logo');
    const publicLogoDir = path.join(process.cwd(), 'public', 'logo');
    
    // Sincroniza logo e rosas
    const logoSrcDir = path.join(process.cwd(), 'logo');
    const logoDestDir = path.join(process.cwd(), 'public', 'logo');
    if (!fs.existsSync(logoDestDir)) fs.mkdirSync(logoDestDir, { recursive: true });
    
    if (fs.existsSync(logoSrcDir)) {
      const files = fs.readdirSync(logoSrcDir);
      files.forEach(file => {
        fs.copyFileSync(path.join(logoSrcDir, file), path.join(logoDestDir, file));
      });
    }

    // Rotina segura temporária para a rosa aquarelada gerada
    try {
       const roseArtifact = 'C:\\Users\\Arthur Perdigao\\.gemini\\antigravity\\brain\\8f08a8cc-24f4-4aa7-901c-378179a111dc\\watercolor_roses_black_1776903539069.png';
       if (fs.existsSync(roseArtifact)) {
         fs.copyFileSync(roseArtifact, path.join(logoDestDir, 'watercolor-roses.png'));
       }
    } catch (e) {
       // Ignora erro em deploy
    }

    if (fs.existsSync(sourceLogoDir)) {
      if (!fs.existsSync(publicLogoDir)) fs.mkdirSync(publicLogoDir, { recursive: true });
      const arquivosLogo = fs.readdirSync(sourceLogoDir);
      for (const arquivo of arquivosLogo) {
        if (arquivo.toLowerCase().endsWith('.png') || arquivo.toLowerCase().endsWith('.jpg')) {
          const destPath = path.join(publicLogoDir, arquivo);
          if (!fs.existsSync(destPath)) {
             fs.copyFileSync(path.join(sourceLogoDir, arquivo), destPath);
          }
        }
      }
    }
  } catch(e) {
    console.error("Alerta: nao foi possivel injetar pastas estaticas", e);
  }
}

export function getTrips() {
  initDB();
  try {
    // replace previne crash do JSON.parse caso ocorra um erro de codificacao BOM silencioso
    const rawData = fs.readFileSync(dbPath, 'utf8').replace(/^\uFEFF/, '');
    const data = JSON.parse(rawData);
    return Array.isArray(data) ? data : [];
  } catch(e) {
    console.error("Alerta Crítico: JSON de viagens corrompido ou inacessivel.", e);
    return [];
  }
}

export function insertTrip(trip) {
  initDB();
  const trips = getTrips();
  const newTrip = { id: Date.now(), ...trip };
  trips.unshift(newTrip); 
  fs.writeFileSync(dbPath, JSON.stringify(trips, null, 2));
  return newTrip;
}

export function deleteTrip(id) {
  initDB();
  const trips = getTrips();
  const filteredTrips = trips.filter(t => t.id !== Number(id));
  fs.writeFileSync(dbPath, JSON.stringify(filteredTrips, null, 2));
  return true;
}

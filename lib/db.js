import Redis from 'ioredis';

// Conecta ao banco Redis usando a variável que a Vercel gerou (REDIS_URL)
// Usamos uma string vazia caso não exista localmente para não quebrar a compilação
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function getTrips() {
  try {
    const data = await redis.get('trips');
    if (!data) return [];
    
    // O Redis padrão retorna texto puro (string), precisamos converter de volta para Array
    const trips = JSON.parse(data);
    return Array.isArray(trips) ? trips : [];
  } catch (e) {
    console.error("Erro ao buscar viagens no Redis:", e);
    return [];
  }
}

export async function insertTrip(trip) {
  const trips = await getTrips();
  const newTrip = { id: Date.now(), ...trip };
  trips.unshift(newTrip);
  
  // Precisamos converter o Array para texto (string) antes de salvar no Redis padrão
  await redis.set('trips', JSON.stringify(trips));
  return newTrip;
}

export async function deleteTrip(id) {
  const trips = await getTrips();
  const filteredTrips = trips.filter(t => t.id !== Number(id));
  
  await redis.set('trips', JSON.stringify(filteredTrips));
  return true;
}

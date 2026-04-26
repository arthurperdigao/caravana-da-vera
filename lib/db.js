import { kv } from '@vercel/kv';

// Inicialização não é mais necessária com KV, mas mantemos o contrato se necessário
async function initDB() {
  // O KV já vem inicializado pela Vercel
}

export async function getTrips() {
  try {
    const trips = await kv.get('trips');
    return Array.isArray(trips) ? trips : [];
  } catch (e) {
    console.error("Erro ao buscar viagens no KV:", e);
    return [];
  }
}

export async function insertTrip(trip) {
  const trips = await getTrips();
  const newTrip = { id: Date.now(), ...trip };
  trips.unshift(newTrip);
  await kv.set('trips', trips);
  return newTrip;
}

export async function deleteTrip(id) {
  const trips = await getTrips();
  const filteredTrips = trips.filter(t => t.id !== Number(id));
  await kv.set('trips', filteredTrips);
  return true;
}


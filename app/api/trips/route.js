import { NextResponse } from 'next/server';
import { insertTrip, getTrips, deleteTrip } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const trips = getTrips();
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const dateInfo = formData.get('dateInfo');
    const included = formData.get('included');
    
    // Tratando price nulo (retro-compatibilidade com Front)
    const price = formData.get('price') || '';
    const installments = formData.get('installments') || '';
    const image = formData.get('image');

    if (!image || typeof image === 'string') {
        throw new Error('Seu arquivo de imagem falhou ou não foi enviado.');
    }
    
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = image.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${Date.now()}-${safeName}`;
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);
    const imageUrl = `/uploads/${filename}`;
    
    const newTrip = insertTrip({ title, dateInfo, included, price, installments, imageUrl });
    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error('ID é obrigatório');
    
    deleteTrip(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

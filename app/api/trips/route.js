import { NextResponse } from 'next/server';
import { insertTrip, getTrips, deleteTrip } from '@/lib/db';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const trips = await getTrips();
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
    const price = formData.get('price') || '';
    const installments = formData.get('installments') || '';
    const image = formData.get('image');

    if (!image || typeof image === 'string') {
      throw new Error('Seu arquivo de imagem falhou ou não foi enviado.');
    }
    
    // Sobe para o Vercel Blob
    const blob = await put(`trips/${Date.now()}-${image.name}`, image, {
      access: 'public',
    });
    
    const imageUrl = blob.url;
    
    const newTrip = await insertTrip({ title, dateInfo, included, price, installments, imageUrl });
    return NextResponse.json({ success: true, trip: newTrip });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error('ID é obrigatório');
    
    await deleteTrip(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


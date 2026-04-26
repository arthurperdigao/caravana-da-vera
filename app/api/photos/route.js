import { NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'passageiros/' });
    // Retorna apenas os nomes ou URLs para o front-end
    return NextResponse.json(blobs.map(b => b.url));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image || typeof image === 'string') {
      throw new Error('Nenhuma imagem enviada.');
    }

    // O Vercel Blob aceita o arquivo diretamente
    const blob = await put(`passageiros/${Date.now()}-${image.name}`, image, {
      access: 'public',
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { url } = await request.json();
    if (!url) throw new Error('URL da imagem é obrigatória');

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


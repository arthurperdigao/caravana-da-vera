import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sourceDir = path.join(process.cwd(), 'passageirosImg');
    if (!fs.existsSync(sourceDir)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(sourceDir);
    const photos = files.filter(f => f.toLowerCase().match(/\.(jpg|jpeg|png)$/));
    return NextResponse.json(photos);
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

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Mantém o nome original se possível
    const safeName = image.name.replace(/[^a-zA-Z0-9.\- ]/g, ''); 
    const filename = `${Date.now()}-${safeName}`;

    const sourceDir = path.join(process.cwd(), 'passageirosImg');
    const publicDir = path.join(process.cwd(), 'public', 'passageirosImg');

    if (!fs.existsSync(sourceDir)) fs.mkdirSync(sourceDir, { recursive: true });
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    // Salva na raiz e no public para carregar instantaneamente
    fs.writeFileSync(path.join(sourceDir, filename), buffer);
    fs.writeFileSync(path.join(publicDir, filename), buffer);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { filename } = await request.json();
    if (!filename) throw new Error('Nome do arquivo é obrigatório');

    const sourceDir = path.join(process.cwd(), 'passageirosImg');
    const publicDir = path.join(process.cwd(), 'public', 'passageirosImg');

    const sourcePath = path.join(sourceDir, filename);
    const publicPath = path.join(publicDir, filename);

    if (fs.existsSync(sourcePath)) fs.unlinkSync(sourcePath);
    if (fs.existsSync(publicPath)) fs.unlinkSync(publicPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

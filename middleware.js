import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // Rotas que vamos trancar a sete chaves:
  // - Qualquer coisa dentro de /admin
  // - As engrenagens da API (Exceto se for só leitura/GET, para o site poder exibir as fotos)
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isApiModifyRoute = url.pathname.startsWith('/api') && req.method !== 'GET';

  if (isAdminRoute || isApiModifyRoute) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      // Pega o hash enviado pelo navegador e descriptografa para ler o texto puro
      const authValue = basicAuth.split(' ')[1];
      const decoded = atob(authValue);
      const [user, pwd] = decoded.split(':');

      // 🔐 Credenciais lidas do arquivo .env.local (nunca expostas no código)
      const adminUser = process.env.ADMIN_USER;
      const adminPass = process.env.ADMIN_PASS;
      if (user === adminUser && pwd === adminPass) {
        return NextResponse.next(); // Liberado! Pode entrar.
      }
    }

    // Se não tiver senha, o sistema força o navegador a abrir aquele Pop-up clássico
    return new NextResponse('Area Restrita: Identifique-se', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Acesso Restrito - Agência"',
      },
    });
  }

  // Deixa o resto do site passar normalmente pros clientes
  return NextResponse.next();
}

// O Next.js vai ativar esse nosso "Segurança de Porta" especificamente nestas pastas:
export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

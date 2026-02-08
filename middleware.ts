import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acesso à página de login
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Se tentar abrir QUALQUER página dentro de /admin/
  if (pathname.startsWith("/admin/")) {

    // Procurar cookies do Supabase (sessão login)
    const hasSession =
      req.cookies.get("sb-access-token") ||
      req.cookies.get("sb-refresh-token") ||
      Array.from(req.cookies.getAll()).some(c => c.name.startsWith("sb-"));

    // Se NÃO estiver autenticado → voltar ao login
    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
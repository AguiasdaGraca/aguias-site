import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>

        {/* NAVBAR */}
        <header className="navbar">
          <div className="container navbarInner">

            <Link href="/" className="brand">
              <img
                src="/logo.jpg"
                alt="Associação Desportiva Águias da Graça F.C."
                style={{ width: 44, height: 44, objectFit: "contain" }}
              />
              <span>AD Águias da Graça FC</span>
            </Link>

            <nav className="menu">
              <Link href="/">Início</Link>
              <Link href="/clube">Clube</Link>
              <Link href="/equipas">Equipas</Link>
              <Link href="/socios">Sócios</Link>
              <Link href="/contactos">Contactos</Link>
              <Link href="/noticias">Notícias</Link>
            </nav>

          </div>
        </header>

        {/* CONTEÚDO DAS PÁGINAS */}
        {children}

      </body>
    </html>
  );
}
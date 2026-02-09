"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Esconde no ecrã principal e em toda a área /admin
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  return (
    <header className="navbar">
      <div className="container navbarInner">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <img
            src="/logo.jpg"
            alt="AD Águias da Graça"
            style={{ width: 40, height: 40 }}
          />
          <strong>AD Águias da Graça FC</strong>
        </div>

        <nav style={{ display: "flex", gap: 16 }}>
          <Link href="/">Início</Link>
          <Link href="/socios">Sócios</Link>
        </nav>
      </div>
    </header>
  );
}
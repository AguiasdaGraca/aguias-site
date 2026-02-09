"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // estamos numa página do admin?
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="navbar">
      <div className="container navbarInner">
        {/* LOGO */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <img
            src="/logo.jpg"
            alt="AD Águias da Graça"
            style={{ width: 40, height: 40 }}
          />
          <strong>AD Águias da Graça FC</strong>
        </div>

        {/* MENU */}
        <nav style={{ display: "flex", gap: 20 }}>
          <Link href="/">Início</Link>
          <Link href="/socios">Sócios</Link>

          {/* mostrar link Admin apenas fora do admin */}
          {!isAdmin && <Link href="/admin">Admin</Link>}
        </nav>
      </div>
    </header>
  );
}
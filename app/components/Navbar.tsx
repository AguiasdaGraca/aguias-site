"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // verifica se estamos numa página do admin
  const isAdmin = pathname.startsWith("/admin");

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

        {/* MENU SÓ APARECE NO ADMIN */}
        {isAdmin && (
          <nav style={{ display: "flex", gap: 20 }}>
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/socios">Sócios</Link>
            <Link href="/admin/logout">Sair</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

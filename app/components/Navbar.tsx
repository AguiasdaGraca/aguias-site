"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {/* Troca o src se o teu logo tiver outro nome */}
        <img
          src="/logo.jpg"
          alt="AD Águias da Graça FC"
          style={styles.logo}
        />
        <span style={styles.title}>AD Águias da Graça FC</span>
      </div>

      <nav style={styles.nav}>
        <Link style={{ ...styles.link, ...(isActive("/") ? styles.active : {}) }} href="/">
          Início
        </Link>
        <Link
          style={{ ...styles.link, ...(isActive("/socios") ? styles.active : {}) }}
          href="/socios"
        >
          Sócios
        </Link>
        <Link
          style={{ ...styles.link, ...(isActive("/admin") ? styles.active : {}) }}
          href="/admin"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 34,
    height: 34,
    objectFit: "contain",
  },
  title: {
    fontWeight: 700,
  },
  nav: {
    display: "flex",
    gap: 16,
  },
  link: {
    textDecoration: "none",
    opacity: 0.85,
  },
  active: {
    opacity: 1,
    textDecoration: "underline",
  },
};

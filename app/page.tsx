// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 48, marginBottom: 10 }}>Área Reservada</h1>
        <p style={{ opacity: 0.8, marginBottom: 30 }}>
          Sistema interno de gestão de sócios
        </p>

        <Link href="/admin">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "10px",
              background: "#ffd200",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </Link>
      </div>
    </main>
  );
}

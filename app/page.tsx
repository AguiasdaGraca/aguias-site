import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "42px", marginBottom: 10 }}>
          Área Reservada
        </h1>

        <p style={{ opacity: 0.7, marginBottom: 30 }}>
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

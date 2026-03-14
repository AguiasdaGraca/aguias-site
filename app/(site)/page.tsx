export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            margin: 0,
            fontWeight: 800,
          }}
        >
          Área Reservada
        </h1>

        <p
          style={{
            marginTop: "16px",
            marginBottom: "28px",
            fontSize: "22px",
            color: "#d1d5db",
          }}
        >
          Sistema interno de gestão de sócios
        </p>

        <a
          href="/login"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "#facc15",
            color: "#000000",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "18px",
          }}
        >
          Entrar
        </a>
      </div>
    </main>
  );
}



export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#f5c400",
          }}
        />
        <div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>
            AD ÁGUIAS DA GRAÇA F.C.
          </div>
          <div style={{ opacity: 0.8 }}>Preto • Branco • Amarelo • Fundada em 1976</div>
        </div>
      </div>

      <h1 style={{ fontSize: 44, marginTop: 22, marginBottom: 10 }}>
        Bem-vindo ao clube
      </h1>

      <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: 16 }}>
        Website institucional do AD Águias da Graça F.C. e, em breve, sistema de validação de
        sócios por QR (iniciais + número de sócio + estado das quotas).
      </p>

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 16,
        }}
      >
        <div
          style={{
            gridColumn: "span 7",
            border: "1px solid #222",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Informação</h2>
          <ul style={{ opacity: 0.85, lineHeight: 1.8 }}>
            <li><b>Sede:</b> Rua Nogueiredo, 4700-652 Padim da Graça</li>
            <li><b>Email:</b> aguiasdagraca1976@gmail.com</li>
            <li><b>Telefone:</b> +351 918 711 208</li>
          </ul>
        </div>

        <div
          style={{
            gridColumn: "span 5",
            border: "1px solid #222",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Sócios</h2>
          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Em jogos e parcerias, a validação do sócio será feita por QR e mostrará apenas
            <b> iniciais + nº de sócio</b> e o estado das quotas.
          </p>
        </div>
      </div>

      <footer style={{ marginTop: 28, opacity: 0.7, fontSize: 13 }}>
        © {new Date().getFullYear()} AD Águias da Graça F.C.
      </footer>
    </main>
  );
}

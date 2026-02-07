export default function Dashboard() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Dashboard - Área Administrador</h1>

      <hr style={{ margin: "20px 0" }} />

      <h2>Gestão de Sócios</h2>
      <ul>
        <li>➕ Adicionar sócio</li>
        <li>📄 Lista de sócios</li>
        <li>💰 Registar pagamento</li>
        <li>⚠️ Sócios em dívida</li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h2>Eventos e Comunidade</h2>
      <ul>
        <li>🏆 Torneio de Verão</li>
        <li>📅 Criar evento</li>
      </ul>
    </main>
  )
}

export default function Home() {
  return (
    <section className="hero">
      <div className="badge">⚽ Site oficial • Em construção</div>

      <h1>AD Águias da Graça F.C.</h1>
      <p>
        Clube de futebol, formação e comunidade. Aqui vais encontrar notícias,
        equipas, informações do clube e contactos.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Notícias</h3>
          <p>Atualizações e comunicados do clube.</p>
        </div>
        <div className="card">
          <h3>Equipas</h3>
          <p>Escalões, plantéis e calendário.</p>
        </div>
        <div className="card">
          <h3>Clube</h3>
          <p>História, missão e estrutura.</p>
        </div>
      </div>
    </section>
  );
}

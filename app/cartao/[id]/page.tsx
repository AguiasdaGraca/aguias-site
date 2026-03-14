import { createClient } from "../../lib/client";

export default async function CartaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const supabase = createClient();

  const { data: socio } = await supabase
    .from("socios")
    .select("*")
    .eq("id", id)
    .single();

  if (!socio) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Sócio não encontrado</h1>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          textAlign: "center",
        }}
      >
        <h1>Cartão de Sócio</h1>

        <p><b>Nº Sócio:</b> {socio.n_socio}</p>
        <p><b>Nome:</b> {socio.nome}</p>
        <p><b>Email:</b> {socio.email}</p>
        <p><b>Telemóvel:</b> {socio.telemovel}</p>

        <p style={{ marginTop: "20px" }}>
          Sócio desde {socio.membro_desde}
        </p>
      </div>
    </main>
  );
}
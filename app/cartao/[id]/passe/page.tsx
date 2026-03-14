import { createClient } from "../../admin/lib/supabase/server";

export default async function CartaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: socio, error } = await supabase
    .from("socios")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
        }}
      >
        <div>
          <h1>Erro ao carregar sócio</h1>
          <p>{error.message}</p>
        </div>
      </main>
    );
  }

  if (!socio) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
        }}
      >
        <div>
          <h1>Sócio não encontrado</h1>
          <p>ID: {id}</p>
        </div>
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
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Cartão de Sócio
        </h1>

        <div
          style={{
            textAlign: "left",
            background: "#f9fafb",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <p><strong>Nº Sócio:</strong> {socio.n_socio}</p>
          <p><strong>Nome:</strong> {socio.nome}</p>
          <p><strong>Email:</strong> {socio.email || "—"}</p>
          <p><strong>Telemóvel:</strong> {socio.telemovel || "—"}</p>
          <p><strong>NIF:</strong> {socio.nif || "—"}</p>
          <p><strong>Morada:</strong> {socio.morada || "—"}</p>
          <p><strong>Membro desde:</strong> {socio.membro_desde || "—"}</p>
          <p><strong>Pago até:</strong> {socio.pago_ate || "—"}</p>
        </div>
      </div>
    </main>
  );
}
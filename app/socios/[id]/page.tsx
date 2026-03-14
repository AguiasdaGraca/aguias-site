import { createClient } from "@supabase/supabase-js";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SocioPublicPage({ params }: PageProps) {
  const { id } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: socio, error } = await supabase
    .from("socios")
    .select("n_socio, public_id, pago_ate")
    .eq("public_id", id)
    .single();

  if (error || !socio) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "32px",
            borderRadius: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            textAlign: "center",
            minWidth: "320px",
            color: "#111111",
          }}
        >
          <h1 style={{ margin: 0, marginBottom: "10px", color: "#111111" }}>
            AD ÁGUIAS DA GRAÇA FC
          </h1>

          <p style={{ margin: 0, color: "#444444" }}>
            Cartão inválido ou sócio não encontrado
          </p>
        </div>
      </div>
    );
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const pagoAte = socio.pago_ate ? new Date(socio.pago_ate) : null;

  if (pagoAte) {
    pagoAte.setHours(0, 0, 0, 0);
  }

  let estado = "Quotas em atraso";
  let cor = "#d32f2f";

  if (pagoAte && pagoAte >= hoje) {
    estado = "Quotas em dia";
    cor = "#2e7d32";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "32px",
          borderRadius: "18px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          textAlign: "center",
          minWidth: "320px",
          color: "#111111",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "8px",
            color: "#111111",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          AD ÁGUIAS DA GRAÇA FC
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "24px",
            color: "#555555",
            fontSize: "18px",
          }}
        >
          Validação de Sócio
        </p>

        <h2
          style={{
            margin: 0,
            marginBottom: "20px",
            color: "#111111",
            fontSize: "28px",
          }}
        >
          Nº de Sócio: {socio.n_socio}
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            color: cor,
          }}
        >
          {estado}
        </p>
      </div>
    </div>
  );
}

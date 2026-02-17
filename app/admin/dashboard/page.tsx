"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Socio = {
  id: string;
  public_id: string;
  n_socio: number;
  nome: string;
  email: string | null;
  telemovel: string | null;
  nif?: string | null;
  morada?: string | null;
  created_at?: string;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [socios, setSocios] = useState<Socio[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [nif, setNif] = useState("");
  const [morada, setMorada] = useState("");

  async function loadSocios() {
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("socios")
      .select("id, public_id, n_socio, nome, email, telemovel, nif, morada, created_at")
      .order("n_socio", { ascending: false })
      .limit(50);

    if (error) {
      setErrorMsg(`Erro ao carregar sócios: ${error.message}`);
      return;
    }

    setSocios((data ?? []) as Socio[]);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadSocios();
      setLoading(false);
    })();
  }, []);

  async function handleCreateSocio() {
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanNome = nome.trim();
    if (!cleanNome) {
      setErrorMsg("Preenche o nome do sócio.");
      return;
    }

    setSaving(true);

    try {
      const payload: any = {
        nome: cleanNome,
        email: email.trim() || null,
        telemovel: telemovel.trim() || null,
        // Se estas colunas não existirem na tua tabela, dá erro no insert.
        // (Mas como pediste NIF e morada, estou a assumir que já existem.)
        nif: nif.trim() || null,
        morada: morada.trim() || null,
      };

      const { data, error } = await supabase
        .from("socios")
        .insert(payload)
        .select("n_socio, public_id, nome")
        .single();

      if (error) {
        setErrorMsg(`Erro ao criar sócio: ${error.message}`);
        return;
      }

      setSuccessMsg(
        `Sócio criado com sucesso ✅ Nº ${data?.n_socio} | public_id (QR): ${data?.public_id}`
      );

      // limpar form
      setNome("");
      setEmail("");
      setTelemovel("");
      setNif("");
      setMorada("");

      await loadSocios();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  return (
    <main style={{ padding: 24, fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: 8 }}>Dashboard</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>
        Gestão de Sócios (criar + listar últimos 50)
      </p>

      {errorMsg && (
        <div
          style={{
            background: "rgba(255,0,0,0.10)",
            border: "1px solid rgba(255,0,0,0.25)",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          style={{
            background: "rgba(0,255,0,0.10)",
            border: "1px solid rgba(0,255,0,0.25)",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {successMsg}
        </div>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          maxWidth: 720,
          padding: 16,
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Criar sócio</h2>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Nome *</span>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
            style={{ padding: 10, borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            style={{ padding: 10, borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Telemóvel</span>
          <input
            value={telemovel}
            onChange={(e) => setTelemovel(e.target.value)}
            placeholder="9xx xxx xxx"
            style={{ padding: 10, borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>NIF</span>
          <input
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            placeholder="123456789"
            style={{ padding: 10, borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Morada</span>
          <input
            value={morada}
            onChange={(e) => setMorada(e.target.value)}
            placeholder="Rua..., nº..., Localidade..."
            style={{ padding: 10, borderRadius: 8 }}
          />
        </label>

        <button
          onClick={handleCreateSocio}
          disabled={saving}
          style={{
            padding: 12,
            borderRadius: 10,
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: 700,
          }}
        >
          {saving ? "A criar..." : "Criar sócio"}
        </button>
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0 }}>Últimos sócios</h2>
          <button
            onClick={loadSocios}
            style={{ padding: "8px 10px", borderRadius: 10, cursor: "pointer" }}
          >
            Recarregar
          </button>
        </div>

        <div
          style={{
            marginTop: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12,
            overflow: "hidden",
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1.4fr 1fr 1fr",
              gap: 0,
              padding: 12,
              fontWeight: 700,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div>Nº</div>
            <div>Nome</div>
            <div>Email</div>
            <div>Telemóvel</div>
          </div>

          {socios.length === 0 ? (
            <div style={{ padding: 12, opacity: 0.8 }}>Ainda não há sócios.</div>
          ) : (
            socios.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1.4fr 1fr 1fr",
                  padding: 12,
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div style={{ fontWeight: 700 }}>{s.n_socio}</div>
                <div>
                  {s.nome}
                  <div style={{ opacity: 0.7, fontSize: 12 }}>
                    public_id (QR): {s.public_id}
                  </div>
                </div>
                <div>{s.email ?? "-"}</div>
                <div>{s.telemovel ?? "-"}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

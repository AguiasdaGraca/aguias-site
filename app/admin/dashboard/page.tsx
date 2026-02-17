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
  nif: string | null;
  morada: string | null;
  created_at: string;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [socios, setSocios] = useState<Socio[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // FORM
  const [nSocio, setNSocio] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [nif, setNif] = useState("");
  const [morada, setMorada] = useState("");

  useEffect(() => {
    loadSocios();
  }, []);

  async function loadSocios() {
    const { data } = await supabase
      .from("socios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) setSocios(data);
    setLoading(false);
  }

  async function handleCreateSocio() {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!nome.trim()) {
      setErrorMsg("Preenche o nome do sócio.");
      return;
    }

    if (!nSocio.trim()) {
      setErrorMsg("Preenche o nº de sócio.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("socios")
      .insert({
        n_socio: Number(nSocio),
        nome: nome.trim(),
        email: email.trim() || null,
        telemovel: telemovel.trim() || null,
        nif: nif.trim() || null,
        morada: morada.trim() || null,
      })
      .select()
      .single();

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    setSuccessMsg(`Sócio criado com sucesso ✅ Nº ${data.n_socio}`);

    // limpar form
    setNSocio("");
    setNome("");
    setEmail("");
    setTelemovel("");
    setNif("");
    setMorada("");

    loadSocios();
    setSaving(false);
  }

  if (loading) return null;

  return (
    <main style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 500,
          padding: 16,
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12,
          marginBottom: 30,
        }}
      >
        <h2>Criar sócio</h2>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "lightgreen" }}>{successMsg}</p>}

        <label>
          Nº Sócio *
          <input
            value={nSocio}
            onChange={(e) => setNSocio(e.target.value)}
            placeholder="Ex: 123"
          />
        </label>

        <label>
          Nome *
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
          />
        </label>

        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
          />
        </label>

        <label>
          Telemóvel
          <input
            value={telemovel}
            onChange={(e) => setTelemovel(e.target.value)}
          />
        </label>

        <label>
          NIF
          <input value={nif} onChange={(e) => setNif(e.target.value)} />
        </label>

        <label>
          Morada
          <input value={morada} onChange={(e) => setMorada(e.target.value)} />
        </label>

        <button onClick={handleCreateSocio} disabled={saving}>
          {saving ? "A criar..." : "Criar sócio"}
        </button>
      </div>

      <h2>Últimos sócios</h2>

      <ul>
        {socios.map((s) => (
          <li key={s.id}>
            Nº {s.n_socio} — {s.nome}
          </li>
        ))}
      </ul>
    </main>
  );
}


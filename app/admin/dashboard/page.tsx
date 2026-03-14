"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RoleGuard from "../../../components/RoleGuard";
import SessionHeader from "../../../components/SessionHeader";
import DashboardStats from "../../../components/DashboardStats";
import { createClient } from "../../lib/client";

type FormState = {
  n_socio: string;
  nome: string;
  email: string;
  telemovel: string;
  nif: string;
  morada: string;
  membro_desde: string;
  pago_ate: string;
};

type Socio = {
  id: string;
  n_socio: number;
  nome: string;
  email: string | null;
  telemovel: string | null;
  nif: string | null;
  morada: string | null;
  membro_desde: string | null;
  pago_ate: string | null;
};

type FieldProps = {
  label: string;
  name: keyof FormState;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "14px",
          border: "1px solid #d1d5db",
          fontSize: "15px",
          outline: "none",
          background: "#fff",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const supabase = createClient();

  const [form, setForm] = useState<FormState>({
    n_socio: "",
    nome: "",
    email: "",
    telemovel: "",
    nif: "",
    morada: "",
    membro_desde: "",
    pago_ate: "",
  });

  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSocios, setLoadingSocios] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function carregarSocios() {
    setLoadingSocios(true);

    const { data, error } = await supabase
      .from("socios")
      .select("*")
      .order("n_socio", { ascending: true });

    if (!error && data) {
      setSocios(data as Socio[]);
    }

    setLoadingSocios(false);
  }

  useEffect(() => {
    carregarSocios();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    if (!form.n_socio || !form.nome) {
      setErro("Preenche pelo menos o nº de sócio e o nome.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("socios").insert([
      {
        n_socio: Number(form.n_socio),
        nome: form.nome,
        email: form.email || null,
        telemovel: form.telemovel || null,
        nif: form.nif || null,
        morada: form.morada || null,
        membro_desde: form.membro_desde || null,
        pago_ate: form.pago_ate || null,
      },
    ]);

    setLoading(false);

    if (error) {
      setErro(`Erro ao criar sócio: ${error.message}`);
      return;
    }

    setMensagem("Sócio criado com sucesso.");

    setForm({
      n_socio: "",
      nome: "",
      email: "",
      telemovel: "",
      nif: "",
      morada: "",
      membro_desde: "",
      pago_ate: "",
    });

    await carregarSocios();
  }

  return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f3f4f6",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <SessionHeader />
          <DashboardStats />

          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                margin: 0,
                color: "#111827",
                fontWeight: 800,
              }}
            >
              Dashboard
            </h1>

            <p
              style={{
                marginTop: "10px",
                marginBottom: 0,
                color: "#6b7280",
                fontSize: "17px",
              }}
            >
              Gestão interna de sócios do clube
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "24px",
              alignItems: "start",
              marginBottom: "24px",
            }}
          >
            <section
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "28px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ marginBottom: "22px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    color: "#111827",
                  }}
                >
                  Criar sócio
                </h2>

                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: 0,
                    color: "#6b7280",
                    fontSize: "15px",
                  }}
                >
                  Preenche os dados para registar um novo sócio.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <Field
                    label="Nº Sócio *"
                    name="n_socio"
                    placeholder="Ex: 123"
                    value={form.n_socio}
                    onChange={handleChange}
                  />

                  <Field
                    label="Nome *"
                    name="nome"
                    placeholder="Nome completo"
                    value={form.nome}
                    onChange={handleChange}
                  />

                  <Field
                    label="Email"
                    name="email"
                    placeholder="email@exemplo.com"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <Field
                    label="Telemóvel"
                    name="telemovel"
                    placeholder="Ex: 912345678"
                    value={form.telemovel}
                    onChange={handleChange}
                  />

                  <Field
                    label="NIF"
                    name="nif"
                    placeholder="Ex: 123456789"
                    value={form.nif}
                    onChange={handleChange}
                  />

                  <Field
                    label="Morada"
                    name="morada"
                    placeholder="Morada"
                    value={form.morada}
                    onChange={handleChange}
                  />

                  <Field
                    label="Membro desde"
                    name="membro_desde"
                    type="date"
                    value={form.membro_desde}
                    onChange={handleChange}
                  />

                  <Field
                    label="Pago até"
                    name="pago_ate"
                    type="date"
                    value={form.pago_ate}
                    onChange={handleChange}
                  />
                </div>

                {erro && (
                  <p
                    style={{
                      color: "#dc2626",
                      marginTop: "16px",
                      marginBottom: 0,
                      fontWeight: 600,
                    }}
                  >
                    {erro}
                  </p>
                )}

                {mensagem && (
                  <p
                    style={{
                      color: "#16a34a",
                      marginTop: "16px",
                      marginBottom: 0,
                      fontWeight: 600,
                    }}
                  >
                    {mensagem}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px 18px",
                    background: "#111827",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "A criar..." : "Criar sócio"}
                </button>
              </form>
            </section>

            <aside
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "22px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "10px",
                  }}
                >
                  Total de sócios
                </div>

                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "#000000",
                  }}
                >
                  {socios.length}
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "22px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                    fontSize: "22px",
                    color: "#000000",
                  }}
                >
                  Próximo passo
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.5,
                  }}
                >
                  Usa a lista abaixo para abrir rapidamente o cartão de qualquer sócio.
                </p>
              </div>
            </aside>
          </div>

          <section
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    color: "#000000",
                  }}
                >
                  Lista de sócios
                </h2>

                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: 0,
                    color: "#6b7280",
                    fontSize: "15px",
                  }}
                >
                  Consulta os sócios registados e abre o cartão.
                </p>
              </div>

              <a
                href="/admin/socios"
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  background: "#000000",
                  color: "#ffffff",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Ver página completa
              </a>
            </div>

            {loadingSocios ? (
              <p style={{ color: "#6b7280" }}>A carregar sócios...</p>
            ) : socios.length === 0 ? (
              <p style={{ color: "#6b7280" }}>Ainda não existem sócios registados.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        textAlign: "left",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <th style={{ padding: "12px" }}>Nº Sócio</th>
                      <th style={{ padding: "12px" }}>Nome</th>
                      <th style={{ padding: "12px" }}>Email</th>
                      <th style={{ padding: "12px" }}>Pago até</th>
                      <th style={{ padding: "12px" }}>Cartão</th>
                    </tr>
                  </thead>

                  <tbody>
                    {socios.map((socio) => (
                      <tr
                        key={socio.id}
                        style={{
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <td style={{ padding: "12px" }}>{socio.n_socio}</td>
                        <td style={{ padding: "12px" }}>{socio.nome}</td>
                        <td style={{ padding: "12px" }}>{socio.email || "—"}</td>
                        <td style={{ padding: "12px" }}>{socio.pago_ate || "—"}</td>
                        <td style={{ padding: "12px" }}>
                          <Link
                            href={`/cartao/${socio.id}`}
                            style={{
                              color: "#000000",
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            Ver cartão
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
  );
}
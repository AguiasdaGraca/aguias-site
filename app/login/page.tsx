"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/client";

export default function LoginPage() {

  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    setErro("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setErro("Email ou palavra-passe inválidos.");
      setLoading(false);
      return;
    }

    const { data: staffUser, error: roleError } = await supabase
      .from("staff_users")
      .select("role")
      .eq("email", email.toLowerCase())
      .single();

    if (roleError || !staffUser) {
      setErro("Utilizador sem permissões.");
      setLoading(false);
      return;
    }

    setLoading(false);

    router.refresh();

    if (staffUser.role === "admin") {
      router.replace("/admin/dashboard");
      return;
    }

    if (staffUser.role === "secretaria") {
      router.replace("/painel/dashboard");
      return;
    }

    setErro("Perfil inválido.");
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
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "34px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Área Interna
        </h1>

        <p
          style={{
            marginTop: "10px",
            marginBottom: "26px",
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          Águias da Graça F.C.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {erro && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#facc15",
              border: "none",
              borderRadius: "12px",
              fontWeight: 800,
              fontSize: "18px",
              cursor: "pointer",
              color: "#111827",
            }}
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>

        </form>
      </div>
    </main>
  );
}


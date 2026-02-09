"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      alert("Preenche email e password 🙃");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      console.log("LOGIN RESPONSE:", data, error);

      if (error) {
        alert("Erro Supabase: " + error.message);
        return;
      }

      alert("Login com sucesso 🎉");
      router.push("/admin/dashboard");
      router.refresh(); // ✅ força re-render / revalidação
    } catch (err) {
      console.error("ERRO GRAVE:", err);
      alert("Erro inesperado 😵");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Área Administrador</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "A entrar..." : "Entrar"}
      </button>
    </main>
  );
}
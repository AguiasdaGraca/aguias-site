"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
    e.preventDefault();
    alert("Login ainda não ligado à base de dados 🙂");
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#111",
      color: "white",
      fontFamily: "Arial"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#222",
          padding: 40,
          borderRadius: 12,
          width: 320
        }}
      >
        <h1 style={{ textAlign: "center" }}>Área Administrador</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width:"100%", padding:10, marginTop:20 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width:"100%", padding:10, marginTop:10 }}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            padding:12,
            marginTop:20,
            background:"#f5c400",
            border:"none",
            fontWeight:"bold"
          }}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

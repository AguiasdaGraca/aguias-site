"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    const { error } = await supabase.from("posts").insert([
      {
        title: title,
        content: content,
      },
    ]);

    if (error) {
      alert("Erro a guardar 😢");
      console.log(error);
      return;
    }

    alert("Notícia guardada 🎉");

    setTitle("");
    setContent("");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Painel Admin</h1>

      <input
        placeholder="Título da notícia"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "300px" }}
      />

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "300px", height: "120px" }}
      />

      <button onClick={handleSave}>Guardar notícia</button>
    </main>
  );
}
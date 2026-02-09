"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const { data, error } = await supabase.auth.getSession();

      const session = data?.session;

      if (!session) {
        router.replace("/admin");
        return;
      }

      if (isMounted) {
        setEmail(session.user.email ?? null);
        setLoading(false);
      }
    }

    load();

    // se a sessão mudar (logout/login), reage
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin");
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return null;

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo à área interna 😇</p>
      {email && <p style={{ opacity: 0.8 }}>Logado como: {email}</p>}
    </main>
  );
}
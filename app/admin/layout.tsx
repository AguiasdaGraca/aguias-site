"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      // Se não tiver sessão e não estiver no /admin (login), manda para /admin
      if (!session && window.location.pathname !== "/admin") {
        router.replace("/admin");
        return;
      }

      if (mounted) setChecking(false);
    }

    checkSession();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  // Enquanto valida sessão, evita “piscar” a página
  if (checking) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
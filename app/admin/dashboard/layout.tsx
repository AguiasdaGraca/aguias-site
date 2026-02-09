"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();

      // Se não há sessão, volta ao login
      if (!data.session) {
        router.replace("/admin");
        return;
      }

      // Se há sessão, deixa renderizar
      setReady(true);
    };

    check();
  }, [router]);

  if (!ready) return null; // ou um "Loading..."

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
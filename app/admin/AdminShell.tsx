"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      {hasSession ? <Navbar /> : null}
      {children}
    </>
  );
}
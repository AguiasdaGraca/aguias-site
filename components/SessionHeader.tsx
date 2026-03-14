"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../app/lib/client";

type StaffUser = {
  nome?: string;
  role?: string;
  email?: string;
};

export default function SessionHeader() {
  const router = useRouter();
  const supabase = createClient();

  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("staff_users")
        .select("nome, role, email")
        .ilike("email", user.email.toLowerCase())
        .single();

      setStaffUser(data || null);
      setLoading(false);
    }

    loadUser();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        background: "#111111",
        color: "#ffffff",
        borderRadius: "18px",
        padding: "18px 22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div>
        <div style={{ fontSize: "14px", color: "#d1d5db", marginBottom: "4px" }}>
          Sessão iniciada
        </div>

        <div style={{ fontSize: "20px", fontWeight: 800 }}>
          {loading ? "A carregar..." : staffUser?.nome || "Utilizador"}
        </div>

        <div style={{ fontSize: "14px", color: "#facc15", marginTop: "4px" }}>
          {staffUser?.role === "admin" ? "Admin" : "Secretaria"}
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#FFD100",
          color: "#000",
          border: "none",
          borderRadius: "12px",
          padding: "12px 18px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
} 
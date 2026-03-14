"use client";

import RoleGuard from "../../../components/RoleGuard";
import SessionHeader from "../../../components/SessionHeader";
import DashboardStats from "../../../components/DashboardStats";

export default function PainelDashboardPage() {
  return (
    <RoleGuard allowedRoles={["secretaria", "admin"]}>
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
              background: "#ffffff",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h1
              style={{
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "34px",
                color: "#111827",
              }}
            >
              Painel da Secretaria
            </h1>

            <p
              style={{
                marginTop: 0,
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Área interna para procurar sócios, atualizar quotas, ver cartões,
              criar sócios e editar dados.
            </p>
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
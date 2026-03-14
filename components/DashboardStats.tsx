"use client";

import { useEffect, useState } from "react";
import { createClient } from "../app/lib/client";

type Stats = {
  total: number;
  emDia: number;
  emAtraso: number;
};

export default function DashboardStats() {
  const supabase = createClient();
  const [stats, setStats] = useState<Stats>({
    total: 0,
    emDia: 0,
    emAtraso: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const { data: socios } = await supabase
        .from("socios")
        .select("pago_ate");

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      let emDia = 0;
      let emAtraso = 0;

      for (const socio of socios || []) {
        if (!socio.pago_ate) {
          emAtraso++;
          continue;
        }

        const dataPago = new Date(socio.pago_ate);
        dataPago.setHours(0, 0, 0, 0);

        if (dataPago >= hoje) {
          emDia++;
        } else {
          emAtraso++;
        }
      }

      setStats({
        total: socios?.length || 0,
        emDia,
        emAtraso,
      });
    }

    loadStats();
  }, [supabase]);

  const cards = [
    { titulo: "Total de sócios", valor: stats.total },
    { titulo: "Quotas em dia", valor: stats.emDia },
    { titulo: "Quotas em atraso", valor: stats.emAtraso },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.titulo}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "22px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
            {card.titulo}
          </div>
          <div style={{ fontSize: "34px", fontWeight: 800, color: "#111827" }}>
            {card.valor}
          </div>
        </div>
      ))}
    </div>
  );
} 

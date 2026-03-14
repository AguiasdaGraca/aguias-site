"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeSocio({ id }: { id: string }) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  return (
    <div style={{ marginTop: 18, background: "white", padding: 10, borderRadius: 12 }}>
      <QRCodeCanvas 
      value={`${origin}/cartao/${id}`} size={180} 
      includeMargin />
    </div>
  );
}
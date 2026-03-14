import { renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";

import CartaoPdf from "./CartaoPdf";

function bufferToDataUri(buf: Buffer, mime: string) {
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function tryLoadLogoDataUri() {
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.jpg");
    const logoBuffer = fs.readFileSync(logoPath);
    return bufferToDataUri(logoBuffer, "image/jpeg");
  } catch {
    return undefined;
  }
}

export async function GET() {
const publicId = "8122d973-d37d-4a16-a1cb-d272a0a0b187"; // depois vamos buscar da base real
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const qrText = `${siteUrl}/socios/${publicId}`;

const qrDataUri = await QRCode.toDataURL(qrText, {
  margin: 0,
  width: 256,
});

  const logoDataUrl = await tryLoadLogoDataUri();

  const pdfBuffer = await renderToBuffer(
    <CartaoPdf
      nome="Teste"
      numero={155}
      socioDesde="2025"
      qrBase64={qrDataUri}
      logoDataUrl={logoDataUrl}
    />
  );

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="cartao.pdf"',
      "Cache-Control": "no-store",
    },
  });
}


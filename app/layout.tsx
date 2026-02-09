import "./globals.css";

export const metadata = {
  title: "AD Águias da Graça FC",
  description: "Site oficial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
} 
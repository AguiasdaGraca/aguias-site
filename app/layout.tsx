import "./globals.css";
import Navbar from "./components/Navbar";
import type { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="pt">
  </body>
  <Navbar />
  {children}
  </body>
  </html>
);
}

import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function AdminShell({
  hasSession,
  children,
}: {
  hasSession: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {hasSession ? <Navbar /> : null}
      {children}
    </>
  );
}

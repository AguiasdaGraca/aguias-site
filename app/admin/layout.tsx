import Navbar from "../components/Navbar";
import { createClient } from "../lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔒 Proteção do admin
  if (!session) {
    redirect("/admin");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
import { createClient } from "../..//lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔒 Se não existir sessão → volta ao login
  if (!session) {
    redirect("/admin");
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bem-vinda à área interna 😎</p>
    </main>
  );
}
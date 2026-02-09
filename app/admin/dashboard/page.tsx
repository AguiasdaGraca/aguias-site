import { supabase } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bem-vinda à área interna 😇</p>
    </main>
  );
}
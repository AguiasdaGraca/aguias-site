import { createClient } from "../../lib/supabase/server";
import Link from "next/link";

export default async function SociosPage() {

  const supabase = await createClient();

  const { data: socios, error } = await supabase
    .from("socios")
    .select("*")
    .order("n_socio", { ascending: true });

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Lista de Sócios</h1>

      <table style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Cartão</th>
          </tr>
        </thead>

        <tbody>
          {socios?.map((socio) => (
            <tr key={socio.id}>
              <td>{socio.n_socio}</td>
              <td>{socio.nome}</td>
              <td>{socio.email || "-"}</td>
              <td>
                <Link href={`/cartao/${socio.id}`}>
                  Ver cartão
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <Link href="/admin/socios/novo">
          Criar novo sócio
        </Link>
      </div>
    </main>
  );
} 
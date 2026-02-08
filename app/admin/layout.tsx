import type { ReactNode } from "react";

import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import AdminShell from "./AdminShell";



export default async function AdminLayout({ children }: { children: ReactNode }) {

  const supabase = createServerComponentClient({ cookies });



  const {

    data: { session },

  } = await supabase.auth.getSession();



  return <AdminShell hasSession={!!session}>{children}</AdminShell>;

}
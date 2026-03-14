"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../app/lib/client";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {

  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkRole() {

      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        router.replace("/login");
        return;
      }

      const email = session.session.user.email;

      const { data } = await supabase
        .from("staff_users")
        .select("role")
        .eq("email", email)
        .single();

      if (!data || !allowedRoles.includes(data.role)) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    }

    checkRole();

  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}


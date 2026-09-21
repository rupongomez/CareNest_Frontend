import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
      <DashboardShell role="SUPER_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}

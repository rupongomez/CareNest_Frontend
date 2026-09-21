import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShell roles="DOCTOR">{children}</DashboardShell>
    </RoleGuard>
  );
}

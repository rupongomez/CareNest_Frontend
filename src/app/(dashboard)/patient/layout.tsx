import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["PATIENT"]}>
      <DashboardShell roles="PATIENT">{children}</DashboardShell>
    </RoleGuard>
  );
}
